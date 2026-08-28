# AUDITFLOW - AI-Powered Automated Compliance & Risk Analyzer

An AI-powered web application that automates document compliance reviews by extracting text from uploaded PDF documents, analyzing potential legal and compliance risks using Google Gemini, and generating structured audit reports with actionable recommendations.
The application is designed using a scalable asynchronous architecture, allowing uploaded documents to be processed in the background while providing users with real-time status updates and detailed analytics.

**PROJECT STATUS:** In Development (Phase 9 - Complete - Phase 10 Next)
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
 - Compliance Score Generation
 - Risk Finding Detection
 - Compliance Recommendations
 - Compliance Summary Generation
 - Audit Result Database Storage
 - Document-to-Aid Result Relationship
 - Analysis Timestamp Tracking

### Planned Features

- Redis Queue Migration
- Live Progress Updates
- Dashboard and Analytics
- Risk Visualization
- Audit History
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
        (Metadata,            (PDF/Markdown)       (Background Jobs)
         Users, Documents,          |                   |
         Audit Results)             │                   │
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
                               └──────────────► Store Audit Results
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

- Spatie Laravel PDF-to-text
- Poppler pdftotext

---

## CURRENT WORKFLOW

```text
User
 │
 ▼
Next.js Frontend
 │
 │ Upload PDF
 ▼
Laravel API
 │
 ├───────────────┐
 │               │
 ▼               ▼
Validate       Store PDF
Document       File Storage
 │
 ▼
Store Metadata
PostgreSQL
 │
 ▼
Dispatch Background Job
Database Queue
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
ComplianceAnalysisService
 │
 ▼
Gemini AI Analysis
 │
 ▼
Structured Compliance JSON
 │
 ▼
Validate AI Response
 │
 ▼
Create/Update AuditResult
 │
 ├── Compliance Score
 ├── Issues / Findings
 ├── Recommendations
 └── Summary
 │
 ▼
Store Audit Result
PostgreSQL
 │
 ▼
Update Document Status
 │
 ▼
completed
```

**Current Status:** The application successfully uploads PDF documents, stores document metadata and files, dispatches asynchronous background jobs through Laravel's database queue, extracts text from text-based PDF documents, normalizes the extracted content, and stores the processed text in PostgreSQL.
The extracted document content is then analyzed using Google Gemini through a dedicated ComplianceAnalysisService. The AI generates structured compliance results containing an overall risk level, compliance score, summary, findings, and recommendations.
The AI response is validated and persisted through the AuditResult model and database schema.
Phase 7 (PDF Text Extraction), Phase 8 (Gemini AI Integration), and Phase 9 (Audit Result Storage) are complete.
The system has been successfully tested using both sample text and extracted text from an actual uploaded PDF document.
---

## Audit Result Data

Each analyzed document can have a corresponding audit result containing:

```text
AuditResult
├── document_id
├── compliance_score
├── issues
│   ├── category
│   ├── severity
│   ├── clause
│   └── issue
├── recommendations
│   ├── category
│   └── recommendation
├── summary
├── analyzed_at
└── timestamps

# Example AI Analysis

- Example output generated from an uploaded PDF document:
```
{ "overall_risk": "low", "compliance_score": 90, "summary": "The document is a standard job application cover letter...", "findings": [ { "category": "Missing Information", "severity": "low", "clause": "Sincerely, Jemae Lyn Bandiola", "issue": "The document does not contain contact information..." } ], "recommendations": [ { "category": "Missing Information", "severity": "low", "recommendation": "Request the candidate's contact details..." } ] }
```
- this demonstrates the complete pipeline from the PDF upload -> text extraction -> AI Analysis -> structured JSON -> database persistence

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
- Extracted Text Storage
- Document Processing Status

## Phase 8 

- Gemini API Integration
- Prompt Engineering
- Structured Compliance JSON Output
- JSON Parsing
- AI Response Validation
- Compliance Analysis Testing
- Testing with Extracted PDF Text

## Phase 9 *(Complete)*

- Audit Result Database Schema
- AuditResult Model
- Document-to-AuditResult Relationship
- Store Compliance Score
- Store Risk Findings
- Store Recommendations
- Store Compliance Summary
- Store Analysis Timestamp
- Update Document Status
- Verify End-to-End AI Analysis Persistence

## Phase 10 *(Current)*

- Processing Status API
- Live Processing Updates
- Frontend Status Indicator

## Phase 11

- Risk Score
- Compliance Summary
- Risk Breakdown
- Charts
- Compliance Recommendations
- Document Analysis

## Phase 12

- Previous Audits
- Audit Result History
- Document Analysis History

## Phase 13

- Document Question Answering
- Retrieval-Augmented Generation (RAG)
- Document Chunk Retrieval
- Context-Aware AI Responses

---

# PLANNED DASHBOARD

The application dashboard will include:

- Overall Compliance Score
- Overall Risk Level
- Executive Compliance Summary
- Risk Breakdown
- Compliance Findings
- Compliance Recommendations
- Previous Audits
- Document Processing Status
- Analysis Timestamp
- Document Audit History

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
- Structured AI Output
- JSON Validation
- Service-Oriented Architecture
- Scalable System Design
- Retrieval-Augmented Generation (RAG)

---

# FUTURE IMPROVEMENTS

- Redis Queue Migration
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
