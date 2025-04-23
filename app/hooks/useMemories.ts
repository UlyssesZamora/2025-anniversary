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

async function fetchMemories(year: string = "all"): Promise<Memory[]> {
  const url = year && year !== "all"
    ? `http://192.168.1.148:4000/api/memories?year=${year}`
    : "http://192.168.1.148:4000/api/memories";
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch memories");
  const data = await res.json();
  return data.photos as Memory[];
}

export function useMemories(year: string = "all") {
  return useQuery({
    queryKey: ["memories", year],
    queryFn: () => fetchMemories(year),
  });
} 