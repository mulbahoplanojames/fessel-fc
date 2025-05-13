import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
// import news from "@/data/news.json";
import prisma from "../../../../../prisma";
import { handleNewsFetch } from "@/utils/helpers/handle-fetch";

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const singlenew = await prisma.news.findUnique({
    where: {
      id: id,
    },
  });

  const relatedNews = await handleNewsFetch();

  // const relatedArticles = relatedNews
  //   .filter((relatedId) => relatedId !== Number(id))
  //   .map((relatedId) => relatedNews.find((item) => item.id === relatedId))
  //   .filter(Boolean);

  // console.log("Signle News", singlenew);

  // Find the news article by ID
  // const newsItem = news.find((item) => item.id === Number(id));

  if (!singlenew) {
    return (
      <div className="container px-4 py-12 mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">News article not found</h1>
        <Button asChild>
          <Link href="/news">Back to News</Link>
        </Button>
      </div>
    );
  }

  // Get related news articles
  // const relatedArticles = news.relatedNews
  //   .map((id) => news.find((item) => item.id === Number(id)))
  //   .filter(Boolean);

  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="mb-8">
        <Button variant="ghost" className="group" asChild>
          <Link href="/news" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to News
          </Link>
        </Button>
      </div>

      <div className="max-w-4xl mx-auto">
        <Badge className="mb-4 bg-primary-clr">{singlenew.category}</Badge>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
          {singlenew.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
          <div className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            <span>{singlenew.author}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{singlenew.date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            <span>{singlenew.readTime}</span>
          </div>
        </div>

        <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden">
          <Image
            src={singlenew.image || "/placeholder.svg"}
            alt={singlenew.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="prose max-w-none mb-12">
          {(singlenew.content as { id: number; label: string }[]).map(
            (item) => {
              return (
                <p key={item.id} className="pb-5 md:text-lg text-base">
                  {item.label}
                </p>
              );
            }
          )}
        </div>
        {relatedNews &&
          Array.isArray(relatedNews) &&
          relatedNews.length > 0 && (
            <div className="border-t pt-8">
              <h2 className="text-2xl font-bold mb-6">Related News</h2>
              {relatedNews.length > 0 ? (
                relatedNews.some(
                  (item) => item.category === singlenew.category
                ) ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedNews.map((article) =>
                      article.id != id ? (
                        <Card
                          key={article.id}
                          className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all p-0"
                        >
                          <div className="relative h-48">
                            <Image
                              src={article.image || "/placeholder.svg"}
                              alt={article.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <CardContent className="px-4 pb-4">
                            <Badge className="mb-2" variant="outline">
                              {article.category}
                            </Badge>
                            <h3 className="font-semibold mb-2 line-clamp-2">
                              {article.title}
                            </h3>
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-muted-foreground">
                                {article.date}
                              </span>
                              <Button variant="link" className="p-0" asChild>
                                <Link href={`/news/${article.id}`}>
                                  Read More
                                </Link>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ) : null
                    )}
                  </div>
                ) : (
                  <p className="text-center text-lg text-muted-foreground">
                    There is no related news for this article.
                  </p>
                )
              ) : (
                <p className="text-center text-sm text-muted-foreground">
                  There is no related news for this article.
                </p>
              )}
            </div>
          )}
      </div>
    </div>
  );
}
