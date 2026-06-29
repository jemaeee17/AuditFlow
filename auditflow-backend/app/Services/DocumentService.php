<?php

namespace App\Services;

use App\Models\Document;
use App\Enums\DocumentType;
use App\Enums\DocumentProcessingStatus;
use Illuminate\Http\UploadedFile;

class DocumentService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function upload(UploadedFile $file, int $userId): Document
    {
        $path = $file->store('documents', 'public');

        return Document::create([
            'user_id' => $userId,

            'title' => pathinfo(
                $file->getClientOriginalName(),
                PATHINFO_FILENAME
            ),

            'original_filename' => $file->getClientOriginalName(),

            'file_path' => $path,

            'mime_type' => $file->getMimeType(),

            'file_size' => $file->getSize(),

            'document_type' => DocumentType::Pdf->value,

            'extracted_text' => null,

            'processing_status' => DocumentProcessingStatus::Pending->value,
        ]);
    }
}
