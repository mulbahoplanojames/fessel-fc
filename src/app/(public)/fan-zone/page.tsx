"use client";

import FanEvents from "@/components/fan-zone/fan-events";
import FanForum from "@/components/fan-zone/fan-forum";
import FanGallery from "@/components/fan-zone/fan-gallery";
import FanZoneHero from "@/components/fan-zone/fan-zone-hero";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authClient } from "@/lib/auth-client";
import axios from "axios";
import {
  FanClubMemberItem,
  FanPhotoItem,
  FanPostItem,
} from "@/types/fanzone-type";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type FeedResponse = {
  posts: FanPostItem[];
  photos: FanPhotoItem[];
  clientMember: boolean;
  members: FanClubMemberItem[];
};

export default function FanZonePage() {
  const { data: session } = authClient.useSession();

  const queryClient = useQueryClient();
  const { data: feed, isLoading } = useQuery<FeedResponse>({
    queryKey: ["fan-feed"],
    queryFn: async () => (await axios.get<FeedResponse>("/api/fan/feed")).data,
  });

  const forumPosts = feed?.posts ?? [];
  const galleryPhotos = feed?.photos ?? [];
  const isMember = feed?.clientMember ?? false;
  const members = feed?.members ?? [];

  const updateFeed = (updater: (old: FeedResponse) => FeedResponse) => {
    queryClient.setQueryData<FeedResponse>(["fan-feed"], (old) =>
      old ? updater(old) : old
    );
  };

  const [activeTab, setActiveTab] = useState("forum");
  const [postContent, setPostContent] = useState("");
  const [photoCaption, setPhotoCaption] = useState("");
  const [postSubmitting, setPostSubmitting] = useState(false);
  const [photoSubmitting, setPhotoSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearFileSelection = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postContent.trim()) {
      toast("Error", { description: "Please enter some content for your post." });
      return;
    }
    if (!session) {
      toast("Sign in required", { description: "Please sign in to post in the fan zone." });
      return;
    }
    setPostSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("content", postContent.trim());
      if (selectedFile) formData.append("image", selectedFile);
      const response = await axios.post<{ post: FanPostItem }>("/api/fan/post", formData);
      updateFeed((f) => ({ ...f, posts: [response.data.post, ...f.posts] }));
      setPostContent("");
      clearFileSelection();
      toast("Success", { description: "Your post has been published!" });
    } catch (error: unknown) {
      const message =
        typeof error === "object" && error && "response" in error
          ? (error.response as { data?: { error?: string } }).data?.error
          : undefined;
      toast("Error", { description: message || "Failed to publish your post." });
    } finally {
      setPostSubmitting(false);
    }
  };

  const handlePhotoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toast("Error", { description: "Please select a photo to upload." });
      return;
    }
    if (!session) {
      toast("Sign in required", { description: "Please sign in to upload photos." });
      return;
    }
    setPhotoSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("caption", photoCaption.trim());
      formData.append("image", selectedFile);
      const response = await axios.post<{ photo: FanPhotoItem }>("/api/fan/photo", formData);
      updateFeed((f) => ({ ...f, photos: [response.data.photo, ...f.photos] }));
      setPhotoCaption("");
      clearFileSelection();
      toast("Success", { description: "Your photo has been uploaded!" });
    } catch (error: unknown) {
      const message =
        typeof error === "object" && error && "response" in error
          ? (error.response as { data?: { error?: string } }).data?.error
          : undefined;
      toast("Error", { description: message || "Failed to upload photo." });
    } finally {
      setPhotoSubmitting(false);
    }
  };

  const updatePost = (id: string, changes: Partial<FanPostItem>) =>
    updateFeed((f) => ({
      ...f,
      posts: f.posts.map((p) => (p.id === id ? { ...p, ...changes } : p)),
    }));

  const updatePhoto = (id: string, changes: Partial<FanPhotoItem>) =>
    updateFeed((f) => ({
      ...f,
      photos: f.photos.map((p) => (p.id === id ? { ...p, ...changes } : p)),
    }));

  const handleLikePost = async (postId: string) => {
    const post = forumPosts.find((p) => p.id === postId);
    if (!post) return;
    if (!session) {
      toast("Sign in required", { description: "Please sign in to like posts." });
      return;
    }
    updatePost(postId, { likedByMe: !post.likedByMe, likes: post.likes + (post.likedByMe ? -1 : 1) });
    try {
      const response = await axios.post<{ liked: boolean; likes: number }>("/api/fan/like", {
        kind: "post",
        id: postId,
      });
      updatePost(postId, { likedByMe: response.data.liked, likes: response.data.likes });
    } catch {
      updatePost(postId, { likedByMe: post.likedByMe, likes: post.likes });
      toast("Error", { description: "Failed to update like." });
    }
  };

  const handleLikePhoto = async (photoId: string) => {
    const photo = galleryPhotos.find((p) => p.id === photoId);
    if (!photo) return;
    if (!session) {
      toast("Sign in required", { description: "Please sign in to like photos." });
      return;
    }
    updatePhoto(photoId, { likedByMe: !photo.likedByMe, likes: photo.likes + (photo.likedByMe ? -1 : 1) });
    try {
      const response = await axios.post<{ liked: boolean; likes: number }>("/api/fan/like", {
        kind: "photo",
        id: photoId,
      });
      updatePhoto(photoId, { likedByMe: response.data.liked, likes: response.data.likes });
    } catch {
      updatePhoto(photoId, { likedByMe: photo.likedByMe, likes: photo.likes });
      toast("Error", { description: "Failed to update like." });
    }
  };

  const handleCommentPost = async (postId: string, content: string) => {
    if (!session) {
      toast("Sign in required", { description: "Please sign in to comment." });
      return;
    }
    try {
      const response = await axios.post<{ comments: number }>("/api/fan/comment", {
        kind: "post",
        id: postId,
        content,
      });
      updatePost(postId, { comments: response.data.comments });
    } catch {
      toast("Error", { description: "Failed to post comment." });
    }
  };

  const handleCommentPhoto = async (photoId: string, content: string) => {
    if (!session) {
      toast("Sign in required", { description: "Please sign in to comment." });
      return;
    }
    try {
      const response = await axios.post<{ comments: number }>("/api/fan/comment", {
        kind: "photo",
        id: photoId,
        content,
      });
      updatePhoto(photoId, { comments: response.data.comments });
    } catch {
      toast("Error", { description: "Failed to post comment." });
    }
  };

  const handleShare = (post: FanPostItem | FanPhotoItem) => {
    const url = window.location.origin + "/fan-zone";
    const title = post && "content" in post ? post.content : (post && "caption" in post ? post.caption : "");
    if (navigator.share) {
      navigator.share({ title: "Fessel FC Fan Zone", text: title, url }).catch(() => undefined);
    } else {
      navigator.clipboard.writeText(url).then(() => {
        toast("Link copied", { description: "The fan zone link is on your clipboard." });
      });
    }
  };

  return (
    <>
      <FanZoneHero />

      <div className="container px-4 py-12 mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-2">
              Fan Community
            </h2>
            <p className="text-muted-foreground">
              Share your passion for FC Fassell with other supporters
            </p>
          </div>
          <Button
            className="mt-4 md:mt-0 rounded-full bg-primary-clr hover:bg-primary-clr/80"
            asChild
          >
            <Link href="/fan-zone/join">Join Fan Club</Link>
          </Button>
        </div>

        <Tabs
          defaultValue="forum"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="mb-10 w-full max-w-md mx-auto grid grid-cols-3">
            <TabsTrigger value="forum">Fan Forum</TabsTrigger>
            <TabsTrigger value="gallery">Fan Gallery</TabsTrigger>
            <TabsTrigger value="events">Fan Events</TabsTrigger>
          </TabsList>
          <TabsContent value="forum">
            <FanForum
              posts={forumPosts}
              isMember={isMember}
              members={members}
              submitting={postSubmitting}
              postContent={postContent}
              setPostContent={setPostContent}
              onPostSubmit={handlePostSubmit}
              onLikePost={handleLikePost}
              onCommentPost={handleCommentPost}
              onSharePost={handleShare}
            />
          </TabsContent>
          <TabsContent value="gallery">
            <FanGallery
              handlePhotoSubmit={handlePhotoSubmit}
              previewUrl={previewUrl}
              clearFileSelection={clearFileSelection}
              handleFileChange={handleFileChange}
              photoCaption={photoCaption}
              setPhotoCaption={setPhotoCaption}
              photos={galleryPhotos}
              submitting={photoSubmitting}
              onLikePhoto={handleLikePhoto}
              onCommentPhoto={handleCommentPhoto}
              onSharePhoto={handleShare}
            />
          </TabsContent>
          <TabsContent value="events">
            <FanEvents />
          </TabsContent>
        </Tabs>
        {isLoading && (
          <p className="text-center text-sm text-muted-foreground animate-pulse">
            Loading fan community...
          </p>
        )}
      </div>
    </>
  );
}