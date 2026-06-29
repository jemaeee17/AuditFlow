<?php

namespace App\Enums;

enum DocumentType: string
{
    case Pdf = 'pdf';
    case Markdown = 'markdown';
}