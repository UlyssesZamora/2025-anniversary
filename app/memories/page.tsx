"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useInView } from "react-intersection-observer";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Memory = {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
};

// Simulated function to fetch memories
const fetchMemories = async (year: string, page: number) => {
  const allMemories = [
    // 2020
    {
      id: "1",
      title: "Our First Date",
      date: "January 15, 2020",
      description: "That amazing dinner at the Italian restaurant downtown.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "2",
      title: "Beach Vacation",
      date: "June 10, 2020",
      description: "Those perfect days by the ocean we'll never forget.",
      image: "/placeholder.svg?height=400&width=600",
    },
    // 2021
    {
      id: "3",
      title: "Hiking Adventure",
      date: "August 22, 2021",
      description: "When we conquered that mountain trail together.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "4",
      title: "Concert Night",
      date: "October 5, 2021",
      description: "Dancing to our favorite band under the stars.",
      image: "/placeholder.svg?height=400&width=600",
    },
    // 2022
    {
      id: "5",
      title: "Holiday Celebration",
      date: "December 25, 2022",
      description: "Our first holiday season together was magical.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "6",
      title: "Surprise Birthday",
      date: "February 14, 2022",
      description: "When I surprised you with that special gift.",
      image: "/placeholder.svg?height=400&width=600",
    },
    // 2023
    {
      id: "7",
      title: "Cooking Class",
      date: "March 30, 2023",
      description: "Learning to make pasta from scratch together.",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "8",
      title: "Road Trip",
      date: "July 4, 2023",
      description: "Exploring new cities and making memories on the open road.",
      image: "/placeholder.svg?height=400&width=600",
    },
    // Add more memories here...
  ];

  const filteredMemories =
    year === "all"
      ? allMemories
      : allMemories.filter((memory) => memory.date.includes(year));
  const paginatedMemories = filteredMemories.slice(0, page * 6);

  return {
    memories: paginatedMemories,
    hasMore: paginatedMemories.length < filteredMemories.length,
  };
};

export default function MemoriesPage() {
  const [selectedYear, setSelectedYear] = useState("all");
  const [memories, setMemories] = useState<Memory[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  useEffect(() => {
    loadMoreMemories();
  }, [selectedYear]);

  useEffect(() => {
    if (inView && hasMore) {
      loadMoreMemories();
    }
  }, [inView, hasMore]);

  const loadMoreMemories = async () => {
    const result = await fetchMemories(selectedYear, page);
    setMemories(result.memories);
    setHasMore(result.hasMore);
    setPage((prevPage) => prevPage + 1);
  };

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    setPage(1);
    setMemories([]);
    setHasMore(true);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white/80 px-6 backdrop-blur-sm">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-rose-600"
        >
          <Heart className="h-5 w-5 fill-rose-600" />
          <span>Our Story</span>
        </Link>
        <nav className="hidden space-x-4 md:block">
          <Link href="/" className="text-sm font-medium hover:text-rose-600">
            Home
          </Link>
          <Link href="/memories" className="text-sm font-medium text-rose-600">
            Memories
          </Link>
          <Link
            href="/letter"
            className="text-sm font-medium hover:text-rose-600"
          >
            Love Letter
          </Link>
          <Link
            href="/making-of"
            className="text-sm font-medium hover:text-rose-600"
          >
            Making Of
          </Link>
        </nav>
        <Button variant="ghost" size="icon" className="md:hidden">
          <span className="sr-only">Toggle menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </Button>
      </header>
      <main className="flex-1 bg-rose-50/50 px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-8 text-center text-4xl font-bold text-rose-700">
            Our Memories
          </h1>
          <p className="mx-auto mb-12 max-w-2xl text-center text-gray-700">
            A collection of our most cherished moments together. Each memory
            tells a story of our journey and the love we share.
          </p>

          <div className="mb-8 flex justify-center">
            <Select
              onValueChange={handleYearChange}
              defaultValue={selectedYear}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                <SelectItem value="2020">2020</SelectItem>
                <SelectItem value="2021">2021</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {memories.map((memory) => (
              <Link key={memory.id} href={`/memories/${memory.id}`}>
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={memory.image || "/placeholder.svg"}
                      alt={memory.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="mb-1 text-xl font-semibold text-rose-700">
                      {memory.title}
                    </h3>
                    <p className="mb-2 text-sm text-gray-500">{memory.date}</p>
                    <p className="text-gray-700">{memory.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {hasMore && (
            <div ref={ref} className="mt-8 flex justify-center">
              <Button onClick={loadMoreMemories} variant="outline">
                Load More Memories
              </Button>
            </div>
          )}
        </div>
      </main>
      <footer className="border-t bg-gray-50 px-6 py-8">
        <div className="mx-auto max-w-7xl text-center">
          <p className="mb-2 text-sm text-gray-600">Made with ❤️ for you</p>
          <p className="text-xs text-gray-500">
            Happy Anniversary! {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
