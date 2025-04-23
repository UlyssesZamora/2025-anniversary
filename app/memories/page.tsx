"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { useMemories } from "../hooks/useMemories";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function MemoriesPage() {
  const { data: memories, isLoading, isError } = useMemories();
  const [selectedYear, setSelectedYear] = useState("all");

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-rose-50/50 px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-8 text-center text-4xl font-bold text-rose-700">
            Our Memories
          </h1>
          <p className="mx-auto mb-12 max-w-2xl text-center text-gray-700">
            A collection of our most cherished moments together. Each memory
            tells a story of our journey and the love we share.
          </p>

          <div className="mb-8 flex justify-center items-center gap-4">
            <Select onValueChange={setSelectedYear} value={selectedYear}>
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
            <Link href="/add-memory">
              <Button className="bg-rose-600 hover:bg-rose-700 text-white font-semibold">
                Add Memory
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="text-center text-rose-500">Loading memories...</div>
          ) : isError ? (
            <div className="text-center text-rose-500">
              Failed to load memories.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {memories?.map((memory) => (
                <Card
                  key={memory._id}
                  className="flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-lg"
                >
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={memory.imageUrl}
                      alt={memory.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardContent className="flex flex-1 flex-col p-4">
                    <h3 className="mb-1 line-clamp-1 text-xl font-semibold text-rose-700">
                      {memory.title}
                    </h3>
                    <p className="mb-2 text-sm text-gray-500">
                      {memory.takenMonth}/{memory.takenDay}/{memory.takenYear}
                    </p>
                    <p className="line-clamp-3 flex-1 text-gray-700">
                      {memory.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
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
