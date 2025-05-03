import { useQuery } from "@tanstack/react-query";

export interface Memory {
  memories: {
  _id: string;
  title: string;
  takenDay: number;
  takenMonth: number;
  takenYear: number;
  description: string;
  imageUrl: string;
  createdAt: string;
  }[];
}

async function fetchMemory(day: number, month: number, year: number, id: string): Promise<Memory> {
  const url = `http://192.168.1.148:4000/api/getMemoryByDate?day=${day}&month=${month}&year=${year}&id=${id}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch memories");
  const data = await res.json();
  console.log(data);
  return data as Memory;
}


export function useGetMemoryByDate(day: number, month: number, year: number, id: string ) {
  return useQuery({
    queryKey: ["memory", day, month, year, id],
    queryFn: () => fetchMemory(day, month, year, id),
  });
} 