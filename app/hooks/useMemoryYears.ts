import { useQuery } from "@tanstack/react-query";

async function fetchMemoryYears(): Promise<number[]> {
  const res = await fetch("http://192.168.1.148:4000/api/memory-years");
  if (!res.ok) throw new Error("Failed to fetch memory years");
  const data = await res.json();
  return data.years as number[];
}

export function useMemoryYears() {
  return useQuery({
    queryKey: ["memory-years"],
    queryFn: fetchMemoryYears,
  });
} 