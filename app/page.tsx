import Link from "next/link";
import { Heart } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white/80 px-6 backdrop-blur-sm">
        <div className="flex items-center gap-2 font-semibold text-rose-600">
          <Heart className="h-5 w-5 fill-rose-600" />
          <span>Our Story</span>
        </div>
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
      <main className="flex-1">
        <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-rose-50 to-white px-4 py-24 text-center">
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute left-1/4 top-1/4 h-32 w-32 rounded-full bg-rose-300 blur-3xl" />
            <div className="absolute right-1/4 top-1/2 h-32 w-32 rounded-full bg-pink-300 blur-3xl" />
            <div className="absolute bottom-1/4 left-1/2 h-32 w-32 rounded-full bg-red-300 blur-3xl" />
          </div>
          <div className="relative z-10 max-w-3xl">
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-rose-700 md:text-6xl">
              Our Beautiful Journey
            </h1>
            <p className="mb-8 text-xl text-gray-700">
              A digital scrapbook of our most cherished memories together. Happy
              Anniversary, my love!
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-rose-600 hover:bg-rose-700"
              >
                <Link href="/memories">Explore Our Memories</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/letter">Read My Letter</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
              Our Journey Together
            </h2>
            <div className="relative">
              <div className="absolute left-1/2 h-full w-0.5 -translate-x-1/2 bg-rose-200"></div>

              <div className="mb-16 ml-auto mr-auto md:ml-0 md:mr-[50%] md:pr-8 md:text-right">
                <div className="relative mb-4 inline-block rounded-lg bg-rose-100 p-6">
                  <div className="absolute right-0 top-1/2 hidden h-3 w-3 -translate-y-1/2 translate-x-1.5 rotate-45 bg-rose-100 md:block"></div>
                  <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-rose-500 md:left-auto md:right-0 md:translate-x-[1.5rem]"></div>
                  <h3 className="mb-2 text-xl font-semibold text-rose-700">
                    When We First Met
                  </h3>
                  <p className="text-gray-700">
                    Add the story of how you two first met and what made that
                    moment special.
                  </p>
                </div>
              </div>

              <div className="mb-16 ml-auto mr-auto md:ml-[50%] md:pl-8">
                <div className="relative mb-4 inline-block rounded-lg bg-rose-100 p-6">
                  <div className="absolute left-0 top-1/2 hidden h-3 w-3 -translate-x-1.5 -translate-y-1/2 rotate-45 bg-rose-100 md:block"></div>
                  <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-rose-500 md:left-0 md:translate-x-[-1.5rem]"></div>
                  <h3 className="mb-2 text-xl font-semibold text-rose-700">
                    Our First Date
                  </h3>
                  <p className="text-gray-700">
                    Describe your first date together and what made it
                    memorable.
                  </p>
                </div>
              </div>

              <div className="mb-16 ml-auto mr-auto md:ml-0 md:mr-[50%] md:pr-8 md:text-right">
                <div className="relative mb-4 inline-block rounded-lg bg-rose-100 p-6">
                  <div className="absolute right-0 top-1/2 hidden h-3 w-3 -translate-y-1/2 translate-x-1.5 rotate-45 bg-rose-100 md:block"></div>
                  <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-rose-500 md:left-auto md:right-0 md:translate-x-[1.5rem]"></div>
                  <h3 className="mb-2 text-xl font-semibold text-rose-700">
                    Our First Trip
                  </h3>
                  <p className="text-gray-700">
                    Share details about your first trip together and the
                    memories you made.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Button asChild className="bg-rose-600 hover:bg-rose-700">
                <Link href="/memories">See All Memories</Link>
              </Button>
            </div>
          </div>
        </section>
        <section className="px-4 py-16 bg-white">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
              Behind The Scenes
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-center text-gray-700">
              Curious about how this digital scrapbook was made? Watch the
              time-lapse video of the entire creation process.
            </p>
            <div className="flex justify-center">
              <Button asChild className="bg-rose-600 hover:bg-rose-700">
                <Link href="/making-of">Watch The Making Of</Link>
              </Button>
            </div>
          </div>
        </section>
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
