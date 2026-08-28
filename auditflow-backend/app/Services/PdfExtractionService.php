<?php

namespace App\Services;

use App\Models\Document;
use Spatie\PdfToText\Pdf;

class PdfExtractionService
{
    public function extract(Document $document): void
    {
        $filePath = storage_path('app/public/' . $document->file_path);

        $text = Pdf::getText(
            $filePath,
            config('services.pdf.pdftotext_binary')
        );

        $text = preg_replace('/\s+/', ' ', $text);
        $text = trim($text);

        $document->update([
            'extracted_text' => $text,
        ]);
    }
}