<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AuditResult extends Model
{
    protected $fillable = [
        'document_id',
        'compliance_score',
        'issues',
        'recommendations',
        'summary',
        'analyzed_at',
    ];

    /**
     * The document this audit result belongs to.
     */
    public function document(): BelongsTo
    {
        return $this->belongsTo(Document::class);
    }

    protected $casts = [
        'issues' => 'array',
        'recommendations' => 'array',
        'analyzed_at' => 'datetime',
    ];
}