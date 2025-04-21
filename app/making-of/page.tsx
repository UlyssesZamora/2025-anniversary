"use client";

import { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import Navbar from "@/components/Navbar";

export default function MakingOfPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      const seekTime = (value[0] / 100) * videoRef.current.duration;
      videoRef.current.currentTime = seekTime;
      setProgress(value[0]);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-rose-50/30 px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-center text-4xl font-bold text-rose-700">
            The Making Of Our Scrapbook
          </h1>
          <p className="mx-auto mb-12 max-w-2xl text-center text-gray-700">
            Watch this time-lapse of how I created this digital scrapbook as a
            labor of love for our anniversary.
          </p>

          <div className="mb-12 overflow-hidden rounded-xl bg-black shadow-xl">
            <div className="relative aspect-video w-full">
              {/* Replace with your actual video */}
              <video
                ref={videoRef}
                className="h-full w-full"
                poster="/placeholder.svg?height=720&width=1280"
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
              >
                <source src="/your-timelapse-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Video overlay with play button when paused */}
              {!isPlaying && (
                <div
                  className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/30 transition-opacity hover:bg-black/40"
                  onClick={togglePlay}
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-rose-600/90 text-white">
                    <Play className="h-10 w-10 fill-white" />
                  </div>
                </div>
              )}
            </div>

            {/* Video controls */}
            <div className="bg-gray-900 p-4">
              <div className="mb-2">
                <Slider
                  value={[progress]}
                  onValueChange={handleSeek}
                  max={100}
                  step={0.1}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-gray-800 hover:text-white"
                    onClick={togglePlay}
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-gray-800 hover:text-white"
                    onClick={toggleMute}
                  >
                    {isMuted ? (
                      <VolumeX className="h-5 w-5" />
                    ) : (
                      <Volume2 className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-8 shadow-md">
            <h2 className="mb-4 text-2xl font-bold text-rose-700">
              Behind The Scenes
            </h2>
            <div className="prose max-w-none text-gray-700">
              <p>
                Creating this digital scrapbook was a journey filled with love
                and memories. I wanted to make something special that captures
                our 4 years together in a way that we can revisit and cherish
                forever.
              </p>
              <p className="mt-4">
                The process involved gathering our photos, remembering all our
                special moments, and designing each page to reflect the unique
                feeling of that memory. I spent hours selecting the perfect
                images and writing descriptions that would transport us back to
                those moments.
              </p>
              <p className="mt-4">
                This time-lapse shows the entire creation process from start to
                finish - all the coding, designing, and love that went into
                making this gift for you. I hope you enjoy watching how it came
                together almost as much as I enjoyed making it.
              </p>
              <p className="mt-4 font-medium">
                Happy Anniversary! Here&apos;s to many more years of creating
                beautiful memories together.
              </p>
            </div>
          </div>
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
