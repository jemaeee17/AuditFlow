# AUDITFLOW - AI-Powered Automated Compliance & Risk Analyzer

An AI-powered web application that automates document compliance reviews by extracting text from uploaded PDF documents, analyzing potential legal and compliance risks using Google Gemini, and generating structured audit reports with actionable recommendations.
The application is designed using a scalable asynchronous architecture, allowing uploaded documents to be processed in the background while providing users with real-time status updates and detailed analytics.

**PROJECT STATUS:** In Development (Phase 8 - Complete - Phase 9 Next)
 --- 
 ## FEATURES

 ### Current Features

 - User Authentication (Laravel Sanctum)
 - Secure PDF Document Upload
 - Asynchronous Document Processing
 - Database Queue & Background Workers
 - PDF Text Extraction
 - Clean Text Normalization
 - Extracted Text Storage
 - Document Processing Status Tracking
 - PostgreSQL Data Storage
 - Gemini AI Integration
 - AI-Powered Compliance Analysis
 - Structured Compliance JSON Output
 - AI Response JSON Validation

### Planned Features

- Redis Queue Migration
- AI-Powered Compliance Analysis
- Risk Scoring
- Compliance Summary
- Clause Detection
- Dashboard and Analytics
- Audit History
- Real-Time Processing Updates
- PDF Report Export
- Chat with Document (RAG)

---
# ARCHITECTURE

```
                                  USER
                                    │
                                    │
                          Next.js Frontend
                                    │
                               REST API
                                    │
                           Laravel Backend API
                ┌───────────────────┼───────────────────┐
                │                   │                   │
                │                   │                   │
          PostgreSQL           File Storage         Database Queue
        (Metadata, Chat,     (PDF/Markdown)       (Background Jobs)
         Users, Documents)          │                   │
                │                   │                   │
                └──────────────┬────┘                   │
                               │                        │
                               │                  Queue Worker
                               │                        │
                               │                AnalyzeDocumentJob
                               │                        │
                               │                PDF Extraction
                               │                        │
                               │                Gemini Compliance Analysis
                               │                        │
                               │                Structured Compliance JSON    
                               │                            
                               └──────────────► Store Results
                                                (PostgreSQL)

```
# TECH STACK

## FRONTEND

- Next.js
- TypeScript
- Tailwind CSS

## BACKEND

- Laravel
- Laravel Sanctum
- REST API

## DATABASE

- PostgreSQL

## QUEUE SYSTEM

- Laravel Database Queue
- Laravel Queue Workers

## PLANNED INFRASTRUCTURE

- Redis Queue
- Redis-based Background Processing

## AI

- Google Gemini API 

## PDF PROCESSING

- PDF Parser Library

---

## CURRENT WORKFLOW

```
                User
                  │
                  ▼
         Next.js Frontend
                  │
          Upload PDF Document
                  │
                  ▼
             Laravel API
                  │
        Validate & Store Document
                  │
        Save Metadata (PostgreSQL)
                  │
        Store PDF (File Storage)
                  │
                  ▼
      Dispatch Background Job
             (Database Queue)
                  │
                  ▼
           Queue Worker
                  │
                  ▼
       AnalyzeDocumentJob
                  │
                  ▼
        PdfExtractionService
                  │
                  ▼
          Extract PDF Text
                  │
                  ▼
        Clean & Normalize Text
                  │
                  ▼
       Store Extracted Text
                  │
                  ▼
      Update Processing Status
            → completed

```

**Current Status:** The application successfully uploads PDF documents, stores document metadata and files, dispatches asynchronous background jobs through Laravel's database queue, extracts text from text-based PDF documents, normalizes the extracted content, and stores the processed text in PostgreSQL. Document processing status is updated upon successful completion. Phase 7 (PDF Text Extraction) is complete. Phase 8 (Gemini AI Integration) is also complete, including prompt engineering, structured compliance analysis, JSON parsing, and response validation. AI analysis has been successfully tested using both sample text and extracted text from an actual uploaded PDF document.
---

# Planned Processing Pipeline

```
                User
                  │
                  ▼
         Next.js Frontend
                  │
             REST API
                  │
                  ▼
         Laravel Backend API
      ┌───────────┼───────────┐
      │           │           │
      │           │           │
 PostgreSQL   File Storage   Redis Queue
      │        (PDF Files)         │
      │             │              │
      └─────────────┼──────────────┘
                    │
              Queue Worker
                    │
        ┌───────────┴───────────┐
        │                       │
   Parse Document         Generate Chunks
        │                       │
        └───────────┬───────────┘
                    │
             Gemini AI Analysis
                    │
      Structured Compliance JSON
                    │
      Store Audit Results & Risks
                    │
             Update Dashboard
                    │
          Chat with Document (RAG)

```

---

# DEVELOPMENT ROADMAP

## Phase 0

- Project Planning
- System Architecture
- Database Design
- API Design
- Folder Structure

## Phase 1

- Laravel Backend
- PostgreSQL
- Redis
- Queue Configuration

## Phase 2

- Database Schema
- Relationships
- Migrations

## Phase 3

- Authentication
- Laravel Sanctum
- Protected API Routes

## Phase 4

- PDF Upload
- Document Storage
- Validation

## Phase 5

- Database Queue
- Background Processing
- Queue Configuration

## Phase 6

- Queue Worker
- AnalyzeDocumentJob

## Phase 7 

- PDF Text Extraction
- Text Cleaning
- Whitespace Normalization

## Phase 8 *(Complete)*

- Gemini API Integration
- Prompt Engineering
- Structured Compliance JSON Output
- JSON Parsing
- AI Response Validation
- Compliance Analysis Testing

## Phase 9 *(Current)*

- Store Result Database Schema
- Store Compliance Analysis
- Store Risk Findings
- Document Status Updates
- Failed Analysis Handling

## Phase 10

- Live Progress Updates

## Phase 11

- Analytics Dashboard
- Risk Score
- Compliance Summary
- Charts

## Phase 12

- Audit History

## Phase 13

- Chat with Document
- Retrieval-Augmented Generation (RAG)

---

# PLANNED DASHBOARD

The application dashboard will include:

- Overall Risk Score
- Executive Compliance Summary
- Risk Breakdown
- Clause Coverage
- Compliance Recommendations
- Previous Audits
- Document Status Timeline

---

# PROJECT STRUCTURE

```
# FRONTEND

auditflow-frontend/
├── src/
|     ├── app/
|     ├── components/
|     ├── context/
|     ├── hooks/
|     ├── lib/
|     ├── services/
|     ├── types/
|     ├── utils/

# BACKEND

auditflow-backend/
├── app/
|    ├── Enums/
|    ├── Http/
|    ├── Jobs/
|    ├── Models/
|    ├── Providers/
|    ├── Services/
├── config/
├── database/
|    ├── factories/
|    ├── migrations/
|    ├── seeders/
├── public/
├── resources/
├── routes/
├── storage/

```

## GOALS

This project was built to demonstrate modern software engineering practices, including:

- Full-Stack Development
- Next.js & Laravel Integration
- REST API Design
- Background Job Processing
- Queue-Based Architecture
- Secure Authentication
- PostgreSQL Database Design
- AI Integration
- Scalable System Design
- Retrieval-Augmented Generation (RAG)

---

# FUTURE IMPROVEMENTS

- Multi-Document Analysis
- OCR Support for Scanned PDFs
- Batch Processing
- Email Notifications
- Team Workspaces
- Compliance Templates
- Version history
- AI Citation References
- Export to Word/PDF
- Multi-Language Support

---

# Author and Developer

**Jemae Lyn Bandiola**

---

# LICENSE

This project is for educational and portfolio purposes.
