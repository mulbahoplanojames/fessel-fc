"use client";

import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { handleNewsFetch } from "@/utils/helpers/handle-fetch";
import { useQuery } from "@tanstack/react-query";
import { News } from "@/types/news-type";

// Sample news items
// const newsItems = [
//   "FC Fassell signs new promising midfielder from Ghana",
//   "Team captain returns from injury ahead of crucial match",
//   "Youth academy player called up to national team",
//   "New partnership announced with local sports brand",
//   "Season tickets for 2025-2026 season now available",
// ];

export function NewsTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: news } = useQuery({
    queryKey: ["news"],
    queryFn: handleNewsFetch,
  });

  const newsLength = news && Array.isArray(news) ? news.length : 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % newsLength);
    }, 5000);

    return () => clearInterval(interval);
  }, [newsLength]);

  return (
    <div className="bg-primary-clr text-black py-3 overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="flex items-center">
          <div className="font-semibold mr-4 whitespace-nowrap">
            BREAKING NEWS
          </div>
          <div className="overflow-hidden relative flex-1">
            <div
              className="whitespace-nowrap transition-transform duration-1000 ease-in-out flex items-center"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {news &&
                Array.isArray(news) &&
                news.length > 0 &&
                news.map((item: News, index: number) => (
                  <Link
                    key={index}
                    href={`/news/${item.id}`}
                    className="inline-flex items-center min-w-full hover:underline"
                  >
                    {item.title}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
