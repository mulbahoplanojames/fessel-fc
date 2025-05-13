import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MessageSquare, Share2, ThumbsUp } from "lucide-react";
import { Badge } from "../ui/badge";
import { Textarea } from "../ui/textarea";
import { ForumPost } from "@/types/fanzone-type";

export interface FanForumProps {
  forumPosts: ForumPost[];
  handlePostSubmit: (e: React.FormEvent) => void;
  handleLikePost: (postId: string) => void;
  postContent: string;
  setPostContent: React.Dispatch<React.SetStateAction<string>>;
  formatTimestamp: (timestamp: number) => string;
}

export default function FanForum({
  forumPosts,
  handlePostSubmit,
  handleLikePost,
  postContent,
  setPostContent,
  formatTimestamp,
}: FanForumProps) {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-8">
        <Card className="border-none shadow-lg dark:bg-background">
          <CardContent className="p-6">
            <form onSubmit={handlePostSubmit}>
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40&text=You"
                    alt="@user"
                  />
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Share your thoughts with fellow fans..."
                    className="mb-4"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      className="rounded-full bg-primary-clr hover:bg-primary-clr/90 text-primary-foreground "
                    >
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {forumPosts.map((post) => (
          <Card
            key={post.id}
            className="border-none shadow-lg dark:bg-background p-0"
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={post.authorAvatar || "/placeholder.svg"}
                    alt={`@${post.author}`}
                  />
                  <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-medium">{post.author}</h3>
                      <p className="text-xs text-muted-foreground">
                        {formatTimestamp(post.timestamp)}
                      </p>
                    </div>
                    {post.isFanClubMember && (
                      <Badge
                        variant="outline"
                        className="bg-primary-clr/10 text-primary-clr"
                      >
                        Fan Club Member
                      </Badge>
                    )}
                  </div>
                  <p className="mb-4">{post.content}</p>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => handleLikePost(post.id)}
                    >
                      <ThumbsUp className="h-4 w-4" />
                      <span>{post.likes}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>{post.comments}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <Share2 className="h-4 w-4" />
                      <span>Share</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <div className="flex justify-center">
          <Button variant="outline" className="rounded-full">
            Load More
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        <Card className="border-none shadow-lg dark:bg-background p-0">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Popular Topics</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-primary-clr hover:underline flex items-center justify-between"
                >
                  <span>Match Predictions</span>
                  <span className="text-xs text-muted-foreground">
                    32 posts
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-primary-clr hover:underline flex items-center justify-between"
                >
                  <span>Transfer Rumors</span>
                  <span className="text-xs text-muted-foreground">
                    28 posts
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-primary-clr hover:underline flex items-center justify-between"
                >
                  <span>Away Day Planning</span>
                  <span className="text-xs text-muted-foreground">
                    15 posts
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-primary-clr hover:underline flex items-center justify-between"
                >
                  <span>Player Performances</span>
                  <span className="text-xs text-muted-foreground">
                    42 posts
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-primary-clr hover:underline flex items-center justify-between"
                >
                  <span>Fan Chants</span>
                  <span className="text-xs text-muted-foreground">
                    19 posts
                  </span>
                </Link>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg dark:bg-background p-0">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Active Members</h3>
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={`/placeholder.svg?height=32&width=32&text=U${i + 1}`}
                      alt="@user"
                    />
                    <AvatarFallback>U{i + 1}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Fan {i + 1}</p>
                    <p className="text-xs text-muted-foreground">
                      {20 - i * 2} posts
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg bg-primary-clr text-primary-foreground p-0">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Join Our Fan Club</h3>
            <p className="mb-4 text-primary-foreground/90">
              Get exclusive benefits, discounts, and access to special events by
              joining our official fan club.
            </p>
            <Button variant="secondary" className="w-full rounded-full" asChild>
              <Link href="/fan-zone/join">Join Now</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
