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

async function fetchMemory(photoId: string): Promise<Memory> {
  const url = `http://192.168.1.148:4000/api/getMemory?id=${photoId}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch memories");
  const data = await res.json();
  console.log(data);
  return data as Memory;
}


export function useGetMemory(photoId: string) {
  return useQuery({
    queryKey: ["memory", photoId],
    queryFn: () => fetchMemory(photoId),
  });
} 