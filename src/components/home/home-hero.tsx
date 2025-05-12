import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Ticket } from "lucide-react";
import Image from "next/image";

export default function HomeHero() {
  return (
    <section className="relative w-full h-[480px] md:h-[560px] 2xl:h-[700px] overflow-hidden">
      <Image
        src="/hero-placeholder.jpg"
        alt="FC Fassell Stadium"
        fill
        className="object-cover brightness-50"
        priority
      />
      <div className="absolute inset-0 hero-gradient" />
      <div className="container relative z-10 flex flex-col items-start justify-end h-full md:pb-16 pb-8 mx-auto px-4">
        <Badge className="mb-4 bg-primary-clr text-black">
          Next Match: Saturday, 3:00 PM
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl xl:text-7xl max-w-4xl">
          The Pride of <span className="text-primary-clr">Liberia</span>
        </h1>
        <p className="mt-4 max-w-xl text-xl text-white/90">
          Join us as we continue our journey to become the champions of Liberian
          Premier League
        </p>
        <div className="flex flex-wrap gap-4 mt-8">
          <Button
            size="lg"
            className="rounded-full bg-primary-clr hover:bg-primary-clr/90 text-black"
            asChild
          >
            <Link href="/tickets">
              <Ticket className="mr-2 h-5 w-5" />
              Buy Tickets
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-primary-clr"
            asChild
          >
            <Link href="/matches">View Matches</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
