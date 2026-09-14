import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Loader2, MessageSquare, Share2, ThumbsUp, X } from "lucide-react";
import { Badge } from "../ui/badge";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import {
  FanClubMemberItem,
  FanPostItem,
  formatPostTime,
} from "@/types/fanzone-type";

export interface FanForumProps {
  posts: FanPostItem[];
  isMember: boolean;
  members: FanClubMemberItem[];
  submitting: boolean;
  postContent: string;
  setPostContent: React.Dispatch<React.SetStateAction<string>>;
  onPostSubmit: (e: React.FormEvent) => void;
  onLikePost: (postId: string) => void;
  onCommentPost: (postId: string, content: string) => void;
  onSharePost: (post: FanPostItem) => void;
}

export default function FanForum({
  posts,
  isMember,
  members,
  submitting,
  postContent,
  setPostContent,
  onPostSubmit,
  onLikePost,
  onCommentPost,
  onSharePost,
}: FanForumProps) {
  const [commentingPostId, setCommentingPostId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");

  const submitComment = (postId: string) => {
    if (!commentText.trim()) return;
    onCommentPost(postId, commentText.trim());
    setCommentText("");
    setCommentingPostId(null);
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-8">
        <Card className="border-none shadow-lg dark:bg-background">
          <CardContent className="p-6">
            <form onSubmit={onPostSubmit}>
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg" alt="You" />
                  <AvatarFallback>FC</AvatarFallback>
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
                      disabled={submitting}
                      className="rounded-full bg-primary-clr hover:bg-primary-clr/90 text-primary-foreground"
                    >
                      {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {posts.length === 0 && (
          <Card className="border-none shadow-lg dark:bg-background">
            <CardContent className="p-10 text-center text-muted-foreground">
              No posts yet. Be the first to start the conversation!
            </CardContent>
          </Card>
        )}

        {posts.map((post) => (
          <Card
            key={post.id}
            className="border-none shadow-lg dark:bg-background p-0"
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={post.authorAvatar || "/placeholder.svg"}
                    alt={post.authorName}
                  />
                  <AvatarFallback>{post.authorName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-medium">{post.authorName}</h3>
                      <p className="text-xs text-muted-foreground">
                        {formatPostTime(post.createdAt)}
                      </p>
                    </div>
                    {isMember && (
                      <Badge
                        variant="outline"
                        className="bg-primary-clr/10 text-primary-clr"
                      >
                        Fan Club Member
                      </Badge>
                    )}
                  </div>
                  <p className="mb-4">{post.content}</p>
                  {post.image && (
                    <div className="relative h-64 rounded-lg overflow-hidden mb-4">
                      <Image
                        src={post.image}
                        alt="Post attachment"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => onLikePost(post.id)}
                    >
                      <ThumbsUp
                        className={`h-4 w-4 ${post.likedByMe ? "fill-primary-clr text-primary-clr" : ""}`}
                      />
                      <span>{post.likes}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() =>
                        setCommentingPostId(
                          commentingPostId === post.id ? null : post.id
                        )
                      }
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>{post.comments}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => onSharePost(post)}
                    >
                      <Share2 className="h-4 w-4" />
                      <span>Share</span>
                    </Button>
                  </div>
                  {commentingPostId === post.id && (
                    <div className="mt-4 flex gap-2">
                      <Input
                        placeholder="Write a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            submitComment(post.id);
                          }
                        }}
                      />
                      <Button
                        size="sm"
                        className="rounded-full bg-primary-clr hover:bg-primary-clr/90"
                        onClick={() => submitComment(post.id)}
                      >
                        Comment
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setCommentingPostId(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-8">
        <Card className="border-none shadow-lg dark:bg-background p-0">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Popular Topics</h3>
            <ul className="space-y-3">
              {[
                { label: "Match Predictions", count: 32, href: "/matches" },
                { label: "Transfer Rumors", count: 28, href: "/news" },
                { label: "Away Day Planning", count: 15, href: "/matches" },
                { label: "Player Performances", count: 42, href: "/players" },
                { label: "Fan Chants", count: 19, href: "/fan-zone" },
              ].map((topic) => (
                <li key={topic.label}>
                  <Link
                    href={topic.href}
                    className="text-primary-clr hover:underline flex items-center justify-between"
                  >
                    <span>{topic.label}</span>
                    <span className="text-xs text-muted-foreground">
                      {topic.count} posts
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg dark:bg-background p-0">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Active Members</h3>
            {members.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No active fan club members yet.
              </p>
            ) : (
              <div className="space-y-4">
                {members.map((member) => (
                  <div key={member.id} className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src="/placeholder.svg"
                        alt={member.firstName}
                      />
                      <AvatarFallback>
                        {member.firstName.charAt(0)}
                        {member.lastName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">
                        {member.firstName} {member.lastName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {member.membershipType} member
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
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