"use client";

import { useEffect, useState } from "react";
import { getDocument } from "@/services/document.service";
import { Document } from "@/types/document";

export const useDocumentStatus = (id: number) => {
    const [document, setDocument] = useState<Document | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        let intervalId: NodeJS.Timeout | null = null;
        let isMounted = true;

        const loadDocument = async () => {
            try {
                const data = await getDocument(id);

                if (!isMounted) return;

                setDocument(data);
                setError(null);

                if (
                    data.processing_status === "completed" ||
                    data.processing_status === "failed"
                ) {
                    if (intervalId) {
                        clearInterval(intervalId);
                    }
                }
            } catch (error) {
                console.error(error);

                if (isMounted) {
                    setError("Failed to load document.");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadDocument();

        intervalId = setInterval(loadDocument, 2000);

        return () => {
            isMounted = false;

            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [id]);

    return {
        document,
        loading,
        error,
    };
};