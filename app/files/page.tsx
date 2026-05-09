"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

type StorageFile = {
  name: string;
  id: string;
  updated_at: string;
  size?: number;
  downloadUrl?: string;
};

export default function FilesPage() {
  const [files, setFiles] = useState<StorageFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    loadFiles();
  }, []);

  async function loadFiles() {
    setMessage(null);
    const { data, error } = await supabase.storage.from("uncut-files").list("", {
      limit: 100,
      offset: 0,
      sortBy: { column: "name", order: "asc" },
    });

    if (error) {
      setMessage("Unable to load files. Check your Supabase config.");
      return;
    }

    if (!data) {
      setFiles([]);
      return;
    }

    const filesWithUrls = await Promise.all(
      data.map(async (file) => {
        const { data: urlData, error: urlError } = await supabase.storage
          .from("uncut-files")
          .createSignedUrl(file.name, 60);

        return {
          ...file,
          id: file.id || '',
          downloadUrl: urlData?.signedUrl ?? "",
        };
      })
    );

    setFiles(filesWithUrls);
  }

  async function handleUpload() {
    if (!selectedFile) {
      setMessage("Please select a file to upload.");
      return;
    }

    setUploading(true);
    setMessage(null);

    const filePath = selectedFile.name;
    const { error } = await supabase.storage
      .from("uncut-files")
      .upload(filePath, selectedFile, { cacheControl: "3600", upsert: true });

    if (error) {
      setMessage(`Upload failed: ${error.message}`);
      setUploading(false);
      return;
    }

    setSelectedFile(null);
    setMessage("Upload complete. Refreshing file list...");
    await loadFiles();
    setUploading(false);
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    setSelectedFile(file);
    setMessage(null);
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 py-16">
        <div className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_0_160px_rgba(255,255,255,0.05)] backdrop-blur-md sm:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">UNCUT OS Dashboard</p>
              <h1 className="mt-3 text-5xl font-black tracking-tight text-white sm:text-6xl">Files</h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                Upload and manage files in the <span className="font-semibold text-white">uncut-files</span> bucket.
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Back to Home
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
            <section className="space-y-6 rounded-3xl border border-white/10 bg-black/50 p-8">
              <div className="rounded-3xl border border-dashed border-white/20 bg-white/5 p-8 text-center transition hover:border-white/40 hover:bg-white/10">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Upload area</p>
                <h2 className="mt-4 text-2xl font-semibold text-white">Drop your file or choose one manually</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Files are stored in the secure <span className="font-semibold text-white">uncut-files</span> bucket.
                </p>

                <label className="mt-8 inline-flex w-full cursor-pointer items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold text-white transition hover:bg-white/10">
                  <input type="file" className="hidden" onChange={handleFileChange} />
                  {selectedFile ? selectedFile.name : "Select a file to upload"}
                </label>

                <button
                  type="button"
                  onClick={handleUpload}
                  disabled={uploading}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {uploading ? "Uploading…" : "Upload File"}
                </button>

                {message ? (
                  <p className="mt-4 text-sm text-slate-300">{message}</p>
                ) : null}
              </div>
            </section>

            <section className="space-y-4 rounded-3xl border border-white/10 bg-black/50 p-8">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">File list</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">Uploaded files</h2>
              </div>
              {files.length === 0 ? (
                <div className="rounded-3xl bg-white/5 p-6 text-slate-300">
                  No uploaded files found yet. Upload a file to see it here.
                </div>
              ) : (
                <div className="space-y-4">
                  {files.map((file) => (
                    <div key={file.id} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="font-semibold text-white">{file.name}</p>
                          <p className="text-sm text-slate-400">{file.size ? `${(file.size / 1024).toFixed(2)} KB` : "Size unknown"}</p>
                        </div>
                        <a
                          href={file.downloadUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-slate-200"
                        >
                          Download
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
