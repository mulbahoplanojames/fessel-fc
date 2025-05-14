"use client";

import { useState } from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { events, photos, videos } from "@/data/gallery-data";
import GalleryHero from "@/components/gallery/gallery-hero";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function GalleryPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  return (
    <div>
      <GalleryHero />
      <div className="container px-4 py-12 mx-auto">
        <Tabs defaultValue="photos" className="w-full">
          <TabsList className="mb-10 w-full max-w-md mx-auto grid grid-cols-3">
            <TabsTrigger value="photos">Photos</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>

          <TabsContent value="photos">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map((photo) => (
                <Dialog key={photo.id}>
                  <DialogTrigger
                    asChild
                    className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer"
                    onClick={() => setSelectedPhoto(photo.id)}
                  >
                    <div className="">
                      <Image
                        src={photo.src || "/placeholder.svg"}
                        alt={photo.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white font-medium">
                          {photo.title}
                        </span>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="">
                    {selectedPhoto !== null && (
                      <div className="relative w-full ">
                        <div className="relative aspect-square md:aspect-[4/3] w-full h-[300px] overflow-hidden">
                          <Image
                            src={
                              photos.find((p) => p.id === selectedPhoto)?.src ||
                              ""
                            }
                            alt={
                              photos.find((p) => p.id === selectedPhoto)
                                ?.title || ""
                            }
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="bg-black/80 p-4 text-white mt-2">
                          <h3 className="text-xl font-semibold">
                            {photos.find((p) => p.id === selectedPhoto)?.title}
                          </h3>
                          <p className="text-sm text-gray-300 mt-1">
                            {photos.find((p) => p.id === selectedPhoto)?.date} |{" "}
                            {
                              photos.find((p) => p.id === selectedPhoto)
                                ?.category
                            }
                          </p>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <Dialog key={video.id}>
                  <DialogTrigger
                    asChild
                    className="relative aspect-video overflow-hidden rounded-lg group cursor-pointer"
                    onClick={() => setSelectedVideo(video.id)}
                  >
                    <div>
                      <div>
                        <Image
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-[#e6da46] flex items-center justify-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6 text-black ml-1"
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                        <h3 className="text-white font-medium">
                          {video.title}
                        </h3>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-white/80 text-sm">
                            {video.duration}
                          </span>
                          <span className="text-white/80 text-sm">
                            {video.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="p-0">
                    {selectedVideo !== null && (
                      <div className="relative w-full max-w-4xl">
                        <div className="relative aspect-video w-full bg-black">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <p className="text-white text-lg">
                              Video player would be implemented here
                            </p>
                          </div>
                        </div>
                        <div className="bg-black/80 p-4 text-white mt-2">
                          <h3 className="text-xl font-semibold">
                            {videos.find((v) => v.id === selectedVideo)?.title}
                          </h3>
                          <p className="text-sm text-gray-300 mt-1">
                            {videos.find((v) => v.id === selectedVideo)?.date} |{" "}
                            {
                              videos.find((v) => v.id === selectedVideo)
                                ?.duration
                            }{" "}
                            |{" "}
                            {
                              videos.find((v) => v.id === selectedVideo)
                                ?.category
                            }
                          </p>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex flex-col md:flex-row gap-4 border rounded-lg overflow-hidden"
                >
                  <div className="relative w-full md:w-1/3 aspect-video md:aspect-square">
                    <Image
                      src={event.thumbnail || "/placeholder.svg"}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 flex-1">
                    <h3 className="text-xl font-semibold mb-2">
                      {event.title}
                    </h3>
                    <div className="text-sm text-muted-foreground mb-2">
                      <p>{event.date}</p>
                      <p>{event.location}</p>
                    </div>
                    <p className="text-sm">{event.description}</p>
                    <button className="mt-4 px-4 py-2 bg-[#e6da46] text-black rounded-md hover:bg-[#d6ca36] transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
