<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Document extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'original_filename',
        'file_path',
        'mime_type',
        'file_size',
        'document_type',
        'extracted_text',
        'processing_status',
    ];

    /**
     * Document owner.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * AI audit result.
     */
    public function auditResult(): HasOne
    {
        return $this->hasOne(AuditResult::class);
    }
}