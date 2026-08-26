<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use RuntimeException;

class ComplianceAnalysisService
{
    private string $apiKey;
    private string $model;

    public function __construct()
    {
        $this->apiKey = config('services.gemini.api_key');
        $this->model = config('services.gemini.model');
    }

    public function testConnection(): string
    {
        $response = Http::withHeaders([
            'x-goog-api-key' => $this->apiKey,
            'Content-Type' => 'application/json',
        ])->post(
                "https://generativelanguage.googleapis.com/v1beta/models/{$this->model}:generateContent",
                [
                    'contents' => [
                        [
                            'parts' => [
                                [
                                    'text' => 'Respond with exactly: AuditFlow Gemini connection successful.'
                                ],
                            ],
                        ],
                    ],
                ]
            );

        $response->throw();

        return $response->json(
            'candidates.0.content.parts.0.text'
        );
    }

    public function listModels(): array
    {
        $response = Http::withHeaders([
            'x-goog-api-key' => $this->apiKey,
        ])->get(
                'https://generativelanguage.googleapis.com/v1beta/models'
            );

        $response->throw();

        return $response->json('models', []);
    }

    public function analyzeDocument(string $documentText): array
    {
        $prompt = $this->buildAnalysisPrompt($documentText);

        $response = Http::withHeaders([
            'x-goog-api-key' => $this->apiKey,
            'Content-Type' => 'application/json',
        ])->post(
                "https://generativelanguage.googleapis.com/v1beta/models/{$this->model}:generateContent",
                [
                    'contents' => [
                        [
                            'parts' => [
                                [
                                    'text' => $prompt
                                ],
                            ],
                        ],
                    ],
                ]
            );

        $response->throw();

        $generatedText = $response->json(
            'candidates.0.content.parts.0.text'
        );

        if (!is_string($generatedText) || trim($generatedText) === '') {
            throw new RuntimeException(
                'Gemini returned an empty analysis response.'
            );
        }

        return $this->parseAnalysisResponse($generatedText);
    }

    private function buildAnalysisPrompt(string $documentText): string
    {
        return <<<PROMPT
You are an AI-powered document compliance analysis assistant for AuditFlow.

Your task is to analyze the provided document and identify potential compliance risks, missing requirements, ambiguous clauses, and areas that may require review.

IMPORTANT:
- Do not provide definitive legal advice.
- Identify potential compliance concerns based only on the provided document.
- Do not invent clauses, sections, facts, laws, or requirements.
- If a piece of information cannot be determined from the document, use "unknown".
- Be specific and concise.
- Return ONLY valid JSON.
- Do not wrap the JSON in Markdown code fences.
- Do not include explanations outside the JSON.

The response MUST follow this exact structure:

{
    "overall_risk": "low|medium|high|critical",
    "compliance_score": 0,
    "summary": "string",
    "findings": [
        {
            "category": "string",
            "severity": "low|medium|high|critical",
            "clause": "string",
            "issue": "string",
            "recommendation": "string"
        }
    ]
}

COMPLIANCE SCORE:
- 90-100 = Strong compliance
- 75-89 = Generally compliant with minor concerns
- 50-74 = Moderate compliance concerns
- 25-49 = Significant compliance concerns
- 0-24 = Critical compliance concerns

DOCUMENT TO ANALYZE:

{$documentText}
PROMPT;
    }

    private function parseAnalysisResponse(string $generatedText): array
    {
        $cleanedText = trim($generatedText);

        // Remove Markdown code fences if Gemini returns them
        $cleanedText = preg_replace(
            '/^```(?:json)?\s*|\s*```$/i',
            '',
            $cleanedText
        );

        $analysis = json_decode(
            trim($cleanedText),
            true
        );

        if (!is_array($analysis)) {
            throw new RuntimeException(
                'Gemini returned invalid JSON.'
            );
        }

        $this->validateAnalysisStructure($analysis);

        return $analysis;
    }

    private function validateAnalysisStructure(array $analysis): void
    {
        $requiredFields = [
            'overall_risk',
            'compliance_score',
            'summary',
            'findings',
        ];

        foreach ($requiredFields as $field) {
            if (!array_key_exists($field, $analysis)) {
                throw new RuntimeException(
                    "AI response is missing required field: {$field}"
                );
            }
        }

        $allowedRisks = [
            'low',
            'medium',
            'high',
            'critical',
        ];

        if (!in_array($analysis['overall_risk'], $allowedRisks, true)) {
            throw new RuntimeException(
                'AI response contains an invalid overall_risk value.'
            );
        }

        if (
            !is_int($analysis['compliance_score']) &&
            !is_float($analysis['compliance_score'])
        ) {
            throw new RuntimeException(
                'AI response contains an invalid compliance_score.'
            );
        }

        if (
            $analysis['compliance_score'] < 0 ||
            $analysis['compliance_score'] > 100
        ) {
            throw new RuntimeException(
                'AI response compliance_score must be between 0 and 100.'
            );
        }

        if (!is_string($analysis['summary'])) {
            throw new RuntimeException(
                'AI response contains an invalid summary.'
            );
        }

        if (!is_array($analysis['findings'])) {
            throw new RuntimeException(
                'AI response findings must be an array.'
            );
        }

        foreach ($analysis['findings'] as $index => $finding) {
            $requiredFindingFields = [
                'category',
                'severity',
                'clause',
                'issue',
                'recommendation',
            ];

            if (!is_array($finding)) {
                throw new RuntimeException(
                    "Finding {$index} is not a valid object."
                );
            }

            foreach ($requiredFindingFields as $field) {
                if (!array_key_exists($field, $finding)) {
                    throw new RuntimeException(
                        "Finding {$index} is missing required field: {$field}"
                    );
                }
            }

            if (!in_array($finding['severity'], $allowedRisks, true)) {
                throw new RuntimeException(
                    "Finding {$index} contains an invalid severity value."
                );
            }
        }
    }
}