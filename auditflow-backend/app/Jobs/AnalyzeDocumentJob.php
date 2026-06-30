<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

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
    public function handle(): void
    {
        Log::info("AnalyzeDocumentJob started.", [
            "document_id" => $this->documentId,
        ]);

        sleep(5);

        Log::info("AnalyzeDocumentJob finished.", [
            "document_id" => $this->documentId,
        ]);
    }
}
