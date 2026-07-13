<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;
use App\Services\PdfExtractionService;
use App\Models\Document;

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
    public function handle(PdfExtractionService $pdfExtractionService): void
    {
        Log::info("AnalyzeDocumentJob started.", [
            'document_id' => $this->documentId,
        ]);

        $document = Document::findOrFail($this->documentId);

        $pdfExtractionService->extract($document);

        Log::info("AnalyzeDocumentJob finished.", [
            'document_id' => $this->documentId,
        ]);
    }
}
