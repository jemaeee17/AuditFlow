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

    public function index(Request $request)
    {
        $documents = Document::where('user_id', $request->user()->id)
            ->latest()
            ->get();

        return response()->json($documents);
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
