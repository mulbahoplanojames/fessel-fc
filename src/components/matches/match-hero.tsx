import Image from "next/image";

const MatchHero = () => {
  return (
    <>
      <section className="relative w-full md:h-[300px] h-[200px] overflow-hidden">
        <Image
          src="/team/team4.jpeg"
          alt="Matches"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        <div className="container relative z-10 flex flex-col items-center justify-center h-full mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Matches
          </h1>
          <p className="mt-4 max-w-xl text-xl text-white/90">
            Follow all Kigali Lonestar FC matches, results and upcoming fixtures
          </p>
        </div>
      </section>
    </>
  );
};

export default MatchHero;
