import { useMutation } from "@tanstack/react-query";

export interface UploadMemoryInput {
  title: string;
  description: string;
  takenDay: number;
  takenMonth: number;
  takenYear: number;
  image: string; // base64
}

function toUrlEncoded(data: Record<string, string | number>) {
  return new URLSearchParams(
    Object.entries(data).map(([k, v]) => [k, String(v)])
  ).toString();
}

async function uploadMemory(data: UploadMemoryInput) {
  const res = await fetch("http://192.168.1.148:4000/api/upload-memory", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: toUrlEncoded(data as unknown as Record<string, string | number>),
  });
  if (!res.ok) {
    throw new Error("Failed to upload memory");
  }
  return res.json();
}

export function useUploadMemory() {
  return useMutation({ mutationFn: uploadMemory });
} 