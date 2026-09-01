# AUDITFLOW - AI-Powered Automated Compliance & Risk Analyzer

An AI-powered web application that automates document compliance reviews by extracting text from uploaded PDF documents, analyzing potential legal and compliance risks using Google Gemini, and generating structured audit reports with actionable recommendations.
The application is designed using a scalable asynchronous architecture, allowing uploaded documents to be processed in the background while providing users with live processing status and progress updates.

**PROJECT STATUS:** In Development (Phase 10 - Complete - Phase 11 Next)
 --- 
 ## FEATURES

 ### Current Features

### AUTHENTICATION & SECURITY
- User Authentication with Laravel Sanctum
- Protected API Routes
- User-specific Document Access
- Secure Document Upload
- Request Validation
- Authorization Checks

### DOCUMENT PROCESSING
- PDF Document Upload
- Document Metadata Storage
- File Storage
- Asynchronous Document Processing
- Laravel Database Queue
- Background Queue Worker
- PDF Text Extraction
- Clean Text Normalization
- Extracted Text Storage
- Document Processing Status Tracking
- Processing Progress Tracking

### AI COMPLIANCE ANALYSIS
- Google Gemini API Integration
- AI-Powered Compliance Analysis
- Structured Compliance JSON Output
- AI Response JSON Parsing
- AI Response Structure Validation
- Compliance Score Generation
- Overall Risk Classification
- Risk Finding Detection
- Comliance Recommendations
- Compliance Summary Generation

### AUDIT RESULTS
- Audit Result Database Storage
- Document-to-AuditResult Relationship
- Compliance Score Storage
- Risk Findings Storage
- Recommendations Storage
- Compliance Summary Storage
- Overall Risk Storage
- Analysis Timestamp Tracking

### FRONTEND
- Next.js Dashboard
- Document Listing
- Clickable Document Cards
- Document Analysis Details Page
- Processing Status Indicators
- Live Processing Progress Updates
- Visual Progress Bar
- Compliance Score Display
- Overall Risk Display
- Findings Display 
- Recommendations Display
- AI Summary Display

### Planned Features

- Redis Queue Migration
- Risk Visualization
- Dashboard Analytics
- Audit History
- PDF Report Export
- Chat with Document (RAG)
- Document Chunk Retrieval
- Context-Aware AI Responses
- OCR Support for Scanned PDFs
- Batch Document Processing
- Email Notifications
- Team Workspaces
- Compliance Templates
- Document Version History
- AI Citation References
- Multi-Language Support


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
 ├──────────────────────┐
 │                      │
 ▼                      ▼
Validate Document     Store PDF
 │                    File Storage
 ▼
Store Metadata
 │
 ▼
PostgreSQL
 │
 ▼
Dispatch Background Job
 │
 ▼
Database Queue
 │
 ▼
Queue Worker
 │
 ▼
AnalyzeDocumentJob
 │
 ├── Update Progress: 10%
 │
 ▼
PdfExtractionService
 │
 ├── Update Progress: 30%
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
 ├── Update Progress: 70%
 │
 ▼
ComplianceAnalysisService
 │
 ▼
Gemini AI Analysis
 │
 ├── Update Progress: 90%
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
 ├── Overall Risk
 ├── Issues / Findings
 ├── Recommendations
 └── Summary
 │
 ▼
Store Audit Result
 │
 ▼
PostgreSQL
 │
 ▼
Update Document Status
 │
 ├── Processing Progress: 100%
 └── Status: Completed


\*\*Current Status:\*\*
The application currently supports the complete document auditing workflow.

Users can:

Create an account and authenticate.
Upload a PDF document.
Store the document and its metadata in PostgreSQL.
Dispatch the document for asynchronous background processing.
Extract text from the uploaded PDF.
Clean and normalize the extracted text.
Send the extracted content to Google Gemini.
Generate structured compliance analysis.
Validate the AI response.
Store the audit results in PostgreSQL.
Track document processing status.
View live processing progress.
View the completed compliance analysis.
View the compliance score and overall risk.
Review detected issues and recommendations.

The complete pipeline has been successfully tested using multiple uploaded PDF documents and multiple user accounts.
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

## Phase 9 

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

## Phase 10 *(Complete)*

- Processing Status API
- Processing Progress Tracking
- Live Processing Updates
- Frontend Status Indicator
- Visual Progress Bar
- Automatic Dashboard Updates
- Clickable Document Cards
- Document Analysis Details Page

## Phase 11 *(Current)*

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
