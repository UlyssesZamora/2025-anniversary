import { useQuery } from "@tanstack/react-query";

export interface Memory {
  _id: string;
  title: string;
  takenDay: number;
  takenMonth: number;
  takenYear: number;
  description: string;
  imageUrl: string;
  createdAt: string;
}

async function fetchMemories(): Promise<Memory[]> {
  const res = await fetch("http://localhost:4000/api/memories");
  if (!res.ok) throw new Error("Failed to fetch memories");
  const data = await res.json();
  return data.photos as Memory[];
}

export function useMemories() {
  return useQuery({
    queryKey: ["memories"],
    queryFn: fetchMemories,
  });
} 