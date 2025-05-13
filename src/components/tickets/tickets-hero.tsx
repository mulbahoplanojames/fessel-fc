import Image from "next/image";
import React from "react";

const TicketsHero = () => {
  return (
    <>
      <section className="relative w-full h-[300px] overflow-hidden">
        <Image
          src="/hero-placeholder.jpg"
          alt="Tickets"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        <div className="container relative z-10 flex flex-col items-center justify-center h-full mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Tickets
          </h1>
          <p className="mt-4 max-w-xl text-xl text-white/90">
            Purchase tickets for upcoming Fassel FC matches
          </p>
        </div>
      </section>
    </>
  );
};

export default TicketsHero;
