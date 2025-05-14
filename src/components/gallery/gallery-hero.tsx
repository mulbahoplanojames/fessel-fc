import Image from "next/image";
import React from "react";

export default function GalleryHero() {
  return (
    <section className="relative w-full h-[300px] overflow-hidden">
      <Image
        src="/placeholder.svg?height=300&width=1400&text=Gallery"
        alt="Gallery"
        fill
        className="object-cover brightness-50"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
      <div className="container relative z-10 flex flex-col items-center justify-center h-full mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          Gallery
        </h1>
        <p className="mt-4 max-w-xl text-xl text-white/90">
          Photos and videos from FC Fassell matches, events, and more
        </p>
      </div>
    </section>
  );
}
