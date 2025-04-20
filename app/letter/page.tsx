import Link from "next/link"
import { Heart } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function LoveLetterPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white/80 px-6 backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-2 font-semibold text-rose-600">
          <Heart className="h-5 w-5 fill-rose-600" />
          <span>Our Story</span>
        </Link>
        <nav className="hidden space-x-4 md:block">
          <Link href="/" className="text-sm font-medium hover:text-rose-600">
            Home
          </Link>
          <Link href="/memories" className="text-sm font-medium hover:text-rose-600">
            Memories
          </Link>
          <Link href="/letter" className="text-sm font-medium text-rose-600">
            Love Letter
          </Link>
          <Link href="/making-of" className="text-sm font-medium hover:text-rose-600">
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
      <main className="flex-1 bg-gradient-to-b from-rose-50 to-white px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <div className="relative mb-12 text-center">
            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-rose-200"></div>
            <span className="relative inline-block bg-gradient-to-b from-rose-50 to-white px-4 text-rose-600">
              <Heart className="h-8 w-8 fill-rose-600" />
            </span>
          </div>

          <div className="rounded-xl bg-white p-8 shadow-lg">
            <h1 className="mb-8 text-center text-3xl font-bold text-rose-700">My Love Letter to You</h1>

            <div className="prose mx-auto max-w-2xl text-gray-700">
              <p className="mb-4 text-lg">My Dearest,</p>

              <p className="mb-4">
                As we celebrate another year together, I wanted to take a moment to reflect on our journey and express
                just how much you mean to me.
              </p>

              <p className="mb-4">
                From the moment we met, you've brought immeasurable joy and meaning to my life. Your smile brightens my
                darkest days, and your strength inspires me to be the best version of myself. The way you [describe
                something specific you love about them] never fails to make my heart skip a beat.
              </p>

              <p className="mb-4">
                Remember when we [mention a special memory]? Or that time we [mention another memory]? These moments,
                both big and small, have woven together to create the beautiful tapestry of our relationship.
              </p>

              <p className="mb-4">
                I love the way you [mention something you love about them], and how you always [mention another
                quality]. Your passion for [something they're passionate about] and your dedication to [something else]
                are just a few of the countless reasons I fall more in love with you each day.
              </p>

              <p className="mb-4">
                As we look toward our future together, I'm filled with excitement and gratitude. There's no one I'd
                rather share this journey with than you. Thank you for being my partner, my confidant, and my best
                friend.
              </p>

              <p className="mb-4">
                Happy Anniversary, my love. Here's to many more years of laughter, adventure, and love.
              </p>

              <p className="mb-4">Forever yours,</p>

              <p className="font-semibold">[Your Name]</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button asChild className="bg-rose-600 hover:bg-rose-700">
              <Link href="/">Return Home</Link>
            </Button>
          </div>
        </div>
      </main>
      <footer className="border-t bg-gray-50 px-6 py-8">
        <div className="mx-auto max-w-7xl text-center">
          <p className="mb-2 text-sm text-gray-600">Made with ❤️ for you</p>
          <p className="text-xs text-gray-500">Happy Anniversary! {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  )
}
