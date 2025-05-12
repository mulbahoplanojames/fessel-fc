"use client";

import type React from "react";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import news from "@/data/news.json";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { News } from "@/types/news-type";
import Image from "next/image";
import { toast } from "sonner";
import NewsSkeleton from "./news-skeleton";
import { handleNewsFetch } from "@/utils/helpers/handle-fetch";
import { deleteNews } from "@/utils/helpers/handle-delete";

export default function NewsClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNews, setFilteredNews] = useState([] as News[]);

  const { data: news, isFetching } = useQuery({
    queryKey: ["news"],
    queryFn: handleNewsFetch,
  });

  useEffect(() => {
    if (!news) {
      return;
    }

    setFilteredNews(news);
  }, [news]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term.trim() === "") {
      setFilteredNews(news);
    } else {
      const filtered =
        news && Array.isArray(news) && news.length > 0
          ? news.filter(
              (item: News) =>
                item.title.toLowerCase().includes(term) ||
                item.excerpt.toLowerCase().includes(term) ||
                item.author.toLowerCase().includes(term)
            )
          : [];
      setFilteredNews(filtered);
    }
  };

  const queryClient = useQueryClient();

  const handleDeleteNews = async (id: string) => {
    try {
      await deleteNews(id);
      // Invalidate and refetch players
      queryClient.invalidateQueries({ queryKey: ["players"] });
      toast.success("Player deleted successfully");
    } catch (error) {
      toast.error("Failed to delete player", {
        description:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
    }
  };

  if (isFetching) {
    return <NewsSkeleton />;
  }

  return (
    <div className="space-y-6 mt-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">News Management</h1>
        <Button asChild>
          <Link href="/admin/news/add">
            <Plus className="mr-2 h-4 w-4" />
            Add News
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>News Articles</CardTitle>
          <CardDescription>
            Manage news articles for the Kigali Lonestar FC website.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search news..."
                className="pl-8"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Avatar</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Excerpt
                  </TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="hidden md:table-cell">Author</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Read Time
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNews?.length > 0 ? (
                  filteredNews?.map((item: News) => (
                    <TableRow key={item.id}>
                      <TableCell className="hidden md:table-cell max-w-[8rem] truncate">
                        <Image
                          src={item.image}
                          alt={item.title}
                          className="h-8 w-8 rounded-full"
                          width={32}
                          height={32}
                        />
                      </TableCell>
                      <TableCell className="hidden md:table-cell max-w-[8rem] truncate">
                        {item.title}
                      </TableCell>
                      <TableCell className="hidden md:table-cell max-w-[8rem] truncate">
                        {item.excerpt}
                      </TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {item.author}
                      </TableCell>
                      <TableCell>{item.readTime}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" disabled>
                            {/* <Link href={`/admin/news/edit/${item.id}`}> */}
                            Edit
                            {/* </Link> */}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-600"
                            onClick={() =>
                              handleDeleteNews(item.id.toString() || "")
                            }
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No news articles found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
