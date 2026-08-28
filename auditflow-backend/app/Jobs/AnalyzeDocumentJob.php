<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;
use App\Services\PdfExtractionService;
use App\Models\Document;
use App\Models\AuditResult;
use App\Services\ComplianceAnalysisService;
use App\Enums\DocumentProcessingStatus;
use Throwable;

class AnalyzeDocumentJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(public int $documentId)
    {

    }

    /**
     * Execute the job.
     */
    public function handle(
        PdfExtractionService $pdfExtractionService,
        ComplianceAnalysisService $complianceAnalysisService
    ): void {
        Log::info('AnalyzeDocumentJob started.', [
            'document_id' => $this->documentId,
        ]);

        $document = Document::findOrFail($this->documentId);

        $document->update([
            'processing_status' => DocumentProcessingStatus::Processing,
        ]);

        $pdfExtractionService->extract($document);

        $document->refresh();

        $analysis = $complianceAnalysisService->analyzeDocument(
            $document->extracted_text
        );

        AuditResult::updateOrCreate(
            [
                'document_id' => $document->id,
            ],
            [
                'overall_risk' => $analysis['overall_risk'],
                'compliance_score' => $analysis['compliance_score'],
                'summary' => $analysis['summary'],
                'issues' => collect($analysis['findings'])
                    ->map(fn($finding) => [
                        'category' => $finding['category'],
                        'severity' => $finding['severity'],
                        'clause' => $finding['clause'],
                        'issue' => $finding['issue'],
                    ])
                    ->values()
                    ->all(),
                'recommendations' => collect($analysis['findings'])
                    ->map(fn($finding) => [
                        'category' => $finding['category'],
                        'severity' => $finding['severity'],
                        'recommendation' => $finding['recommendation'],
                    ])
                    ->values()
                    ->all(),
                'analyzed_at' => now(),
            ]
        );

        $document->update([
            'processing_status' => DocumentProcessingStatus::Completed,
        ]);

        Log::info('AnalyzeDocumentJob finished.', [
            'document_id' => $this->documentId,
        ]);
    }

    /**
     * Handle a failed job.
     */
    public function failed(Throwable $exception): void
    {
        Document::where('id', $this->documentId)->update([
            'processing_status' => DocumentProcessingStatus::Failed,
        ]);

        Log::error('AnalyzeDocumentJob failed.', [
            'document_id' => $this->documentId,
            'error' => $exception->getMessage(),
        ]);
    }
}
