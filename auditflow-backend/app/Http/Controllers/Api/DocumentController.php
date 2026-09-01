<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDocumentRequest;
use App\Services\DocumentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Document;
use App\Jobs\AnalyzeDocumentJob;

class DocumentController extends Controller
{
    public function __construct(
        private readonly DocumentService $documentService
    ) {
    }

    public function index(Request $request): JsonResponse
    {
        $documents = Document::where('user_id', $request->user()->id)
            ->latest()
            ->get()
            ->map(function (Document $document) {
                return [
                    'id' => $document->id,
                    'title' => $document->title,
                    'original_filename' => $document->original_filename,
                    'document_type' => $document->document_type,
                    'file_size' => $document->file_size,
                    'processing_status' => $document->processing_status,
                    'processing_progress' => $document->processing_progress,
                    'created_at' => $document->created_at,
                    'updated_at' => $document->updated_at,
                ];
            });

        return response()->json($documents);
    }

    public function show(Request $request, Document $document): JsonResponse
    {
        if ($document->user_id !== $request->user()->id) {
            abort(403, 'Unauthorized access to this document.');
        }

        $document->load('auditResult');

        return response()->json([
            'id' => $document->id,
            'title' => $document->title,
            'original_filename' => $document->original_filename,
            'document_type' => $document->document_type,
            'file_size' => $document->file_size,
            'processing_status' => $document->processing_status,
            'processing_progress' => $document->processing_progress,
            'created_at' => $document->created_at,
            'updated_at' => $document->updated_at,
            'audit_result' => $document->auditResult,
        ]);
    }

    public function upload(StoreDocumentRequest $request): JsonResponse
    {
        $document = $this->documentService->upload(
            $request->file('file'),
            $request->user()->id
        );

        AnalyzeDocumentJob::dispatch($document->id);

        return response()->json([
            'message' => 'Document uploaded successfully.',
            'document' => $document,
        ], 201);
    }
}
