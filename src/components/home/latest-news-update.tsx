import { Button } from "../ui/button";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { ChevronRight } from "lucide-react";
// import news from "@/data/news.json";
import { handleNewsFetch } from "@/utils/helpers/handle-fetch";

const LatestNewsUpdate = async () => {
  const news = await handleNewsFetch();

  return (
    <section className="py-14 bg-muted/50 container px-4 mx-auto">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">
          Latest News & Updates
        </h2>
      </div>

      <Tabs defaultValue="news" className="w-full">
        <TabsList className="mb-5 w-full max-w-md mx-auto grid grid-cols-3">
          <TabsTrigger value="news">Club News</TabsTrigger>
          <TabsTrigger value="interviews">Interviews</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>
        <TabsContent value="news">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {news &&
              Array.isArray(news) &&
              news?.map(
                (item) =>
                  item.category === "Club News" && (
                    <Card
                      key={item.id}
                      className="overflow-hidden p-0 border-none shadow-lg hover:shadow-xl transition-all"
                    >
                      <div className="relative h-56">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="px-6 pb-4">
                        <Badge className="mb-3 bg-primary-clr hover:bg-primary-clr/80">
                          {item.category}
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
                              className="flex items-center"
                            >
                              Read More
                              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
              )}
          </div>
        </TabsContent>
        <TabsContent value="interviews">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {news &&
              Array.isArray(news) &&
              news?.map(
                (item) =>
                  item.category === "Interview" && (
                    <Card
                      key={item.id}
                      className="overflow-hidden p-0 border-none shadow-lg hover:shadow-xl transition-all"
                    >
                      <div className="relative h-56">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="px-6 pb-4">
                        <Badge className="mb-3" variant="outline">
                          {item.category}
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
                              className="flex items-center"
                            >
                              Read More
                              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
              )}
          </div>
        </TabsContent>
        <TabsContent value="analysis">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {news &&
              Array.isArray(news) &&
              news?.map(
                (item) =>
                  item.category === "Analysis" && (
                    <Card
                      key={item.id}
                      className="overflow-hidden p-0 border-none shadow-lg hover:shadow-xl transition-all"
                    >
                      <div className="relative h-56">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="px-6 pb-4">
                        <Badge className="mb-3" variant="secondary">
                          {item.category}
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
                              className="flex items-center"
                            >
                              Read More
                              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
              )}
          </div>
        </TabsContent>
      </Tabs>
      <div className="flex justify-center mt-12">
        <Button
          className="rounded-full bg-primary-clr hover:bg-primary-clr/80 text-white"
          asChild
        >
          <Link href="/news">View All News</Link>
        </Button>
      </div>
    </section>
  );
};

export default LatestNewsUpdate;
