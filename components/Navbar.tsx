import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
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
        <Link
          href="/memories"
          className="text-sm font-medium hover:text-rose-600"
        >
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
        <Link
          href="/add-memory"
          className="ml-4 inline-block rounded-md bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-rose-700 transition-colors"
        >
          Add Memory
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
  );
}
