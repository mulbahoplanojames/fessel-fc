import Image from "next/image";
import React from "react";

export default function FanZoneHero() {
  return (
    <section className="relative w-full md:h-[300px] h-[250px] overflow-hidden">
      <Image
        src="/hero-placeholder.jpg"
        alt="About Us"
        fill
        className="object-cover brightness-50"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
      <div className="container relative z-10 flex flex-col items-center justify-center h-full mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          Fan Zone
        </h1>
        <p className="mt-4 max-w-xl text-xl text-white/90">
          Join the FC Fassell community and connect with fellow fans
        </p>
      </div>
    </section>
  );
}
