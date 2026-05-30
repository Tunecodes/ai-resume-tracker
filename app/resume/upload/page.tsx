"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function ResumeUpload() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setLoading(true);
    setStatus("Reading file and extracting text...");

    // 1. Prepare file data to send via HTTP
    const formData = new FormData();
    formData.append("file", file);

    try {
      // 2. Hit our Next.js API route
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed.");

      setStatus("Success! Resume parsed and saved.");
    } catch (error) {
      console.error(error);
      setStatus("Error parsing your resume. Try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Configure react-dropzone options
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] }, // Restrict files to PDF only
    maxFiles: 1,
    disabled: loading,
  });

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? "border-zinc-500 bg-zinc-50 dark:bg-zinc-900" : "border-zinc-300 hover:border-zinc-400 dark:border-zinc-700"}
          ${loading ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-zinc-600 dark:text-zinc-400">
            Drop your resume here...
          </p>
        ) : (
          <p className="text-zinc-600 dark:text-zinc-400">
            Drag & drop your master resume PDF, or{" "}
            <span className="text-blue-500 font-medium">browse</span>
          </p>
        )}
        <p className="text-xs text-zinc-400 mt-2">Only PDF files supported</p>
      </div>
      {status && (
        <p className="text-sm font-medium mt-4 text-center text-zinc-700 dark:text-zinc-300">
          {status}
        </p>
      )}
    </div>
  );
}
