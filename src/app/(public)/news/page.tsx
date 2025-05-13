"use client";

import { useState, useEffect } from "react";
import { Filter, Search, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// import news from "@/data/news.json";
import NewsHero from "@/components/news/news-hero";
import AllNews from "@/components/news/all-news";
import { News } from "@/types/news-type";
import ClubNews from "@/components/news/club-news";
import InterviewNews from "@/components/news/interview-news";
import AnalysisNews from "@/components/news/analysis-news";
import { useQuery } from "@tanstack/react-query";
import { handleNewsFetch } from "@/utils/helpers/handle-fetch";

// Date sorting options
const sortOptions = [
  { label: "Newest First", value: "newest" },
  { label: "Oldest First", value: "oldest" },
];

export default function NewsPage() {
  const { data } = useQuery({
    queryKey: ["news"],
    queryFn: handleNewsFetch,
  });

  useEffect(() => {
    if (!data) {
      return;
    }
  }, [data]);

  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [filteredNews, setFilteredNews] = useState<News[]>(data);

  // Filter and sort news based on active tab, search query, and sort order
  useEffect(() => {
    let result = data?.map((item: News) => item) || [];

    // Filter by category if not "all"
    if (activeTab !== "all") {
      const categoryMap: Record<string, string> = {
        club: "Club News",
        interviews: "Interview",
        analysis: "Analysis",
      };

      result = result.filter(
        (item: News) => item.category === categoryMap[activeTab]
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (item: News) =>
          item.title?.toLowerCase().includes(query) ||
          (item.excerpt?.toLowerCase().includes(query) ?? false)
      );
    }

    // Sort by date
    result.sort((a: News, b: News) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    setFilteredNews(result);
  }, [activeTab, searchQuery, sortOrder, data]);

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div>
      <NewsHero />
      <div className="container px-4 py-12 mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-2">
              Latest News
            </h2>
            <p className="text-muted-foreground">
              Club news, interviews, match analysis and more
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search news..."
                className="pl-10 pr-10 rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2"
                  onClick={clearSearch}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Clear search</span>
                </Button>
              )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-full flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Sort:
                  {sortOrder === "newest" ? "Newest First" : "Oldest First"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {sortOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => setSortOrder(option.value)}
                    className={sortOrder === option.value ? "bg-muted" : ""}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="mb-10 w-full max-w-md mx-auto grid grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="club">Club News</TabsTrigger>
            <TabsTrigger value="interviews">Interviews</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <AllNews filteredNews={filteredNews} clearSearch={clearSearch} />
          </TabsContent>
          <TabsContent value="club">
            <ClubNews filteredNews={filteredNews} clearSearch={clearSearch} />
          </TabsContent>
          <TabsContent value="interviews">
            <InterviewNews
              filteredNews={filteredNews}
              clearSearch={clearSearch}
            />
          </TabsContent>
          <TabsContent value="analysis">
            <AnalysisNews
              filteredNews={filteredNews}
              clearSearch={clearSearch}
            />
          </TabsContent>
        </Tabs>
        {filteredNews?.length > 9 && (
          <div className="flex justify-center mt-12">
            <Button variant="outline" className="rounded-full">
              Load More
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
