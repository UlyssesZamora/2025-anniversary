"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useGetMemory } from "@/app/hooks/useGetMemory";
import { useGetMemoryByDate } from "@/app/hooks/useGetMemoryByDate";
import { useSearchParams } from "next/navigation";
interface MemoryPageProps {
  params: { id: string; day: number; month: number; year: number };
}

export default function MemoryPage({ params }: MemoryPageProps) {
  const { id } = params;
  const searchParams = useSearchParams();
  const day = parseInt(searchParams.get("day") || "0");
  const month = parseInt(searchParams.get("month") || "0");
  const year = parseInt(searchParams.get("year") || "0");
  const { data: memory } = useGetMemory(id);
  const { data: memories } = useGetMemoryByDate(day, month, year, id);

  const filteredMemories = memories?.memories.filter(
    (memory) => memory._id !== id
  );

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
      <main className="flex-1 bg-rose-50/30 px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/memories"
            className="mb-6 inline-flex items-center text-sm font-medium text-rose-600 hover:text-rose-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all memories
          </Link>

          {memory && (
            <div className="overflow-hidden rounded-xl bg-white shadow-md">
              <div className="relative h-80 w-full sm:h-96">
                <Image
                  src={memory.imageUrl}
                  alt={memory.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="p-6 sm:p-8">
                <h1 className="mb-2 text-3xl font-bold text-rose-700">
                  {memory.title}
                </h1>
                <p className="mb-6 text-sm text-gray-500">
                  {memory.takenDay} {memory.takenMonth} {memory.takenYear}
                </p>

                <div className="prose max-w-none text-gray-700">
                  <p className="text-lg">{memory.description}</p>
                </div>

                <div className="mt-8">
                  <h2 className="mb-4 text-xl font-semibold text-gray-900">
                    Photo Gallery
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {filteredMemories?.map((photo, index) => (
                      <div
                        key={index}
                        className="relative aspect-square overflow-hidden rounded-lg"
                      >
                        <Image
                          src={photo.imageUrl}
                          alt={`${photo.title} photo ${index + 1}`}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
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
