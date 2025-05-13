import React from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { News } from "@/types/news-type";

interface AllNewsProps {
  filteredNews: News[];
  clearSearch: () => void;
}

const AnalysisNews: React.FC<AllNewsProps> = ({
  filteredNews,
  clearSearch,
}) => {
  return (
    <>
      {filteredNews.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredNews.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all dark:bg-background p-0"
            >
              <div className="relative h-56">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="px-6 pb-4">
                <Badge className="mb-3 bg-primary-clr" variant="outline">
                  Match Analysis
                </Badge>
                <h3 className="text-xl font-semibold mb-3 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {item.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {item.date}
                  </span>
                  <Button variant="link" className="p-0 group" asChild>
                    <Link
                      href={`/news/${item.id}`}
                      className="flex items-center text-primary-clr"
                    >
                      Read More{" "}
                      <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No results found</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            We couldn&apos;t find any analysis articles matching your search
            criteria.
          </p>
          <Button variant="outline" onClick={clearSearch}>
            Clear Search
          </Button>
        </div>
      )}
    </>
  );
};

export default AnalysisNews;
