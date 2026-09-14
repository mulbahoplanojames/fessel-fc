import Link from "next/link";
import Image from "next/image";
import { Search, X } from "lucide-react";
import products from "@/data/products.json";
import prisma from "../../../../prisma";

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage(props: SearchPageProps) {
  const { q } = await props.searchParams;
  const query = (q || "").trim();
  const lower = query.toLowerCase();

  if (!query) {
    return (
      <div className="container px-4 py-12 mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Search</h1>
        <SearchForm />
      </div>
    );
  }

  const [newsResults, playerResults, matchResults] = await Promise.all([
    prisma.news.findMany({
      where: {
        OR: [
          { title: { contains: query } },
          { excerpt: { contains: query } },
          { category: { contains: query } },
        ],
      },
      take: 6,
    }),
    prisma.player.findMany({
      where: {
        OR: [{ name: { contains: query } }, { position: { contains: query } }],
      },
      take: 6,
    }),
    prisma.match.findMany({
      where: {
        OR: [
          { homeTeam: { contains: query } },
          { awayTeam: { contains: query } },
          { venue: { contains: query } },
          { competition: { contains: query } },
        ],
      },
      take: 6,
    }),
  ]);

  const productResults = products.filter(
    (product) =>
      product.name.toLowerCase().includes(lower) ||
      product.description.toLowerCase().includes(lower) ||
      product.category.toLowerCase().includes(lower)
  );

  const total =
    newsResults.length + playerResults.length + matchResults.length + productResults.length;

  return (
    <div className="container px-4 py-12 mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold tracking-tight mb-2">
        Search Results for &ldquo;{query}&rdquo;
      </h1>
      <p className="text-muted-foreground mb-8">
        {total} result{total === 1 ? "" : "s"} found
      </p>

      <div className="mb-10">
        <SearchForm defaultValue={query} />
      </div>

      {newsResults.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">News</h2>
          <div className="space-y-3">
            {newsResults.map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.id}`}
                className="block border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{item.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {playerResults.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Players</h2>
          <div className="space-y-3">
            {playerResults.map((item) => (
              <Link
                key={item.id}
                href={`/players/${item.id}`}
                className="flex items-center gap-3 border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                )}
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    #{item.number} · {item.position}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {matchResults.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Matches</h2>
          <div className="space-y-3">
            {matchResults.map((item) => (
              <Link
                key={item.id}
                href={`/matches/details/${item.id}`}
                className="block border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <h3 className="font-medium">
                  {item.homeTeam} vs {item.awayTeam}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.date} · {item.time} · {item.venue}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {productResults.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Shop</h2>
          <div className="space-y-3">
            {productResults.map((item) => (
              <Link
                key={item.id}
                href={`/shop/${item.id}`}
                className="flex items-center justify-between border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.category}</p>
                </div>
                <span className="font-semibold">${item.price.toFixed(2)}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {total === 0 && (
        <div className="text-center py-16">
          <Search className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-semibold mb-2">No results found</h2>
          <p className="text-muted-foreground">
            Try a different keyword, or browse the site sections.
          </p>
        </div>
      )}
    </div>
  );
}

function SearchForm({ defaultValue = "" }: { defaultValue?: string }) {
  return (
    <form action="/search" className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <input
        name="q"
        type="search"
        defaultValue={defaultValue}
        placeholder="Search news, players, matches and shop..."
        className="w-full rounded-full border bg-background pl-10 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-clr/40"
      />
      {defaultValue && (
        <Link
          href="/search"
          className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground hover:text-foreground"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </Link>
      )}
      <button type="submit" className="sr-only">Search</button>
    </form>
  );
}