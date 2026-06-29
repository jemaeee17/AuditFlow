"use client";

import { useEffect } from "react";
import api from "@/lib/axios";

export default function Home() {
  useEffect(() => {
    api.get("/health")
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="text-3xl font-bold">
        AuditFlow Frontend
      </h1>
    </main>
  );
}