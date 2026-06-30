import api from "@/lib/axios";

export const uploadDocument = async (
    file: File,
    onUploadProgress?: (progress: number) => void
) => {
    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post(
        "/documents/upload",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },

            onUploadProgress: (event) => {
                if (!event.total) return;

                const progress = Math.round(
                    (event.loaded * 100) / event.total
                );

                onUploadProgress?.(progress);
            },
        }
    );

    return response.data;
};

export const getDocuments = async () => {
    const response = await api.get("/documents");

    return response.data;
};