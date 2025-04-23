"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import heic2any from "heic2any";
import { useUploadMemory } from "../hooks/useUploadMemory";
import { Toaster, toast } from "react-hot-toast";
import { Plus } from "lucide-react";

export default function AddMemoryPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const uploadMemoryMutation = useUploadMemory();

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      if (
        selectedFile.type === "image/heic" ||
        selectedFile.name.endsWith(".heic")
      ) {
        // Convert HEIC to JPEG
        const output = await heic2any({
          blob: selectedFile,
          toType: "image/jpeg",
        });
        const convertedBlob = Array.isArray(output) ? output[0] : output;
        setPreview(URL.createObjectURL(convertedBlob));
      } else {
        setPreview(URL.createObjectURL(selectedFile));
      }
    } else {
      setPreview(null);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!file) return;
    const takenDate = new Date(file.lastModified);
    const takenDay = takenDate.getDate();
    const takenMonth = takenDate.getMonth() + 1;
    const takenYear = takenDate.getFullYear();

    // Convert file to base64
    const toBase64 = (file: File) =>
      new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });
    const image = await toBase64(file);

    uploadMemoryMutation.mutate({
      title,
      description,
      takenDay,
      takenMonth,
      takenYear,
      image,
    });
  }

  // Show toast on success
  if (uploadMemoryMutation.isSuccess) {
    toast.success("Memory added!");
    setTitle("");
    setDescription("");
    setFile(null);
    setPreview(null);
    uploadMemoryMutation.reset();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Toaster position="top-center" />
      <Navbar />
      <main className="flex-1 bg-rose-50/50 px-4 py-12">
        <div className="mx-auto max-w-md">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-rose-700">
                Add a New Memory
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Photo
                  </label>
                  <input
                    id="photo-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  {preview ? (
                    <div className="relative mt-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={preview}
                        alt="Preview"
                        className="h-40 w-full object-cover rounded-md border"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setFile(null);
                          setPreview(null);
                        }}
                        className="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full p-1 text-gray-700 hover:bg-rose-100 hover:text-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
                        aria-label="Remove photo preview"
                      >
                        &times;
                      </button>
                    </div>
                  ) : (
                    <label
                      htmlFor="photo-input"
                      className="mt-4 flex flex-col items-center justify-center h-40 w-full border-2 border-dashed border-rose-200 rounded-md bg-rose-50 text-rose-300 cursor-pointer hover:bg-rose-100 transition-colors"
                      style={{ minHeight: "10rem" }}
                    >
                      <Plus size={40} />
                      <span className="mt-2 text-rose-400 font-medium">
                        Add Photo
                      </span>
                    </label>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                    placeholder="Give this memory a title..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                    placeholder="Describe this memory..."
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-rose-600 hover:bg-rose-700 flex items-center justify-center"
                  disabled={uploadMemoryMutation.isPending}
                >
                  {uploadMemoryMutation.isPending ? (
                    <span className="inline-block w-5 h-5 border-2 border-white border-t-rose-500 rounded-full animate-spin mr-2"></span>
                  ) : null}
                  {uploadMemoryMutation.isPending ? "Adding..." : "Add Memory"}
                </Button>
              </form>
            </CardContent>
          </Card>
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
