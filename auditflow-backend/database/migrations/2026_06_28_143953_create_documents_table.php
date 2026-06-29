<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnDelete();
            $table->string('title');

            $table->string('original_filename');

            $table->string('file_path');

            $table->string('mime_type');

            $table->unsignedBigInteger('file_size');

            $table->enum('document_type', [
                'pdf',
                'markdown'
            ]);

            $table->longText('extracted_text')->nullable();

            $table->enum('processing_status', [
                'pending',
                'processing',
                'completed',
                'failed'
            ])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
