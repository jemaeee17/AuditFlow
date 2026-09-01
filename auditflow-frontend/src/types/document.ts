export type ProcessingStatus =
    | "pending"
    | "processing"
    | "completed"
    | "failed";

export interface AuditIssue {
    category: string;
    severity: string;
    clause: string;
    issue: string;
}

export interface AuditRecommendation {
    category: string;
    recommendation: string;
}

export interface AuditResult {
    id: number;
    document_id: number;
    compliance_score: number;
    issues: AuditIssue[];
    recommendations: AuditRecommendation[];
    summary: string;
    analyzed_at: string;
    created_at: string;
    updated_at: string;
    overall_risk: string;
}

export interface Document {
    id: number;
    title: string;
    original_filename: string;
    document_type: string;
    processing_status: ProcessingStatus;
    processing_progress?: number;
    file_size: number;
    created_at: string;
    updated_at?: string;
    audit_result?: AuditResult | null;
}