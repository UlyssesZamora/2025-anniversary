import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Heart } from "lucide-react"

import { Button } from "@/components/ui/button"

// This would typically come from a database or API
const getMemoryById = (id: string) => {
  const memories = [
    {
      id: "1",
      title: "Our First Date",
      date: "January 15, 2022",
      description: "That amazing dinner at the Italian restaurant downtown.",
      fullDescription:
        "We met at that cozy Italian restaurant downtown. I remember being so nervous, but as soon as I saw your smile, all my worries melted away. We talked for hours about our dreams, our favorite books, and our childhood memories. The way you laughed at my jokes made my heart skip a beat. I knew that night that there was something special between us.",
      image: "/placeholder.svg?height=600&width=800",
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
    },
    {
      id: "2",
      title: "Beach Vacation",
      date: "June 10, 2022",
      description: "Those perfect days by the ocean we'll never forget.",
      fullDescription:
        "Our first vacation together was magical. We spent days lounging on the beach, swimming in the crystal-clear water, and watching the most beautiful sunsets. Remember that night we stayed up talking under the stars? Or when we tried paddleboarding and you kept falling off? Those moments of laughter and connection are etched in my memory forever.",
      image: "/placeholder.svg?height=600&width=800",
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
    },
    // Add more memories as needed
  ]

  return memories.find((memory) => memory.id === id) || memories[0]
}

export default function MemoryPage({ params }: { params: { id: string } }) {
  const memory = getMemoryById(params.id)

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
          <Link href="/memories" className="text-sm font-medium text-rose-600">
            Memories
          </Link>
          <Link href="/letter" className="text-sm font-medium hover:text-rose-600">
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
      <main className="flex-1 bg-rose-50/30 px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/memories"
            className="mb-6 inline-flex items-center text-sm font-medium text-rose-600 hover:text-rose-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all memories
          </Link>

          <div className="overflow-hidden rounded-xl bg-white shadow-md">
            <div className="relative h-80 w-full sm:h-96">
              <Image
                src={memory.image || "/placeholder.svg"}
                alt={memory.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="p-6 sm:p-8">
              <h1 className="mb-2 text-3xl font-bold text-rose-700">{memory.title}</h1>
              <p className="mb-6 text-sm text-gray-500">{memory.date}</p>

              <div className="prose max-w-none text-gray-700">
                <p className="text-lg">{memory.fullDescription}</p>
              </div>

              <div className="mt-8">
                <h2 className="mb-4 text-xl font-semibold text-gray-900">Photo Gallery</h2>
                <div className="grid gap-4 sm:grid-cols-3">
                  {memory.gallery.map((photo, index) => (
                    <div key={index} className="relative aspect-square overflow-hidden rounded-lg">
                      <Image
                        src={photo || "/placeholder.svg"}
                        alt={`${memory.title} photo ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
