import React from "react";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowDown } from "lucide-react";

export default function DonateHero() {
  return (
    <section className="relative w-full md:h-[500px] h-[400px] overflow-hidden">
      <Image
        src="/hero-placeholder.jpg"
        alt="Support Kigali Lonestar"
        fill
        className="object-cover brightness-50"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
      <div className="container relative z-10 flex flex-col items-center justify-center h-full mx-auto px-4 text-center">
        <Badge className="mb-4 bg-primary-clr text-primary-foreground">
          Support Our Club
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl max-w-4xl">
          Help Us Build the Future of&nbsp;
          <span className="text-primary-clr">Liberia Football</span>
        </h1>
        <p className="mt-4 max-w-2xl text-xl text-white/90">
          Your donation helps us develop talent, improve facilities, and create
          a lasting impact in our community
        </p>
        <div className="mt-8">
          <Button
            size="lg"
            className="rounded-full bg-primary-clr hover:bg-primary-clr/90 text-black"
            asChild
          >
            <a href="#donate-now">
              Donate Now <ArrowDown className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
