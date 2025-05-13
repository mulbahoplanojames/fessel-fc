"use client";

import FanEvents from "@/components/fan-zone/fan-events";
import FanForum from "@/components/fan-zone/fan-forum";
import FanGallery from "@/components/fan-zone/fan-gallery";
import FanZoneHero from "@/components/fan-zone/fan-zone-hero";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  formatTimestamp,
  initialPhotos,
  initialPosts,
} from "@/data/fanzone-data";
import { ForumPost, GalleryPhoto } from "@/types/fanzone-type";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function FanZonePage() {
  const [activeTab, setActiveTab] = useState("forum");
  const [postContent, setPostContent] = useState("");
  const [photoCaption, setPhotoCaption] = useState("");
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([]);
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedPosts = localStorage.getItem("forumPosts");
    if (storedPosts) {
      setForumPosts(JSON.parse(storedPosts));
    } else {
      setForumPosts(initialPosts);
      localStorage.setItem("forumPosts", JSON.stringify(initialPosts));
    }

    const storedPhotos = localStorage.getItem("galleryPhotos");
    if (storedPhotos) {
      setGalleryPhotos(JSON.parse(storedPhotos));
    } else {
      setGalleryPhotos(initialPhotos);
      localStorage.setItem("galleryPhotos", JSON.stringify(initialPhotos));
    }
  }, []);

  // Handle file selection for gallery uploads
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Clear file selection
  const clearFileSelection = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  // Submit a new forum post
  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!postContent.trim()) {
      toast("Error", {
        description: "Please enter some content for your post.",
      });
      return;
    }

    const newPost: ForumPost = {
      id: Date.now().toString(),
      author: "You",
      authorAvatar: "/placeholder.svg?height=40&width=40&text=You",
      content: postContent,
      timestamp: Date.now(),
      likes: 0,
      comments: 0,
      isFanClubMember: false,
    };

    const updatedPosts = [newPost, ...forumPosts];
    setForumPosts(updatedPosts);
    localStorage.setItem("forumPosts", JSON.stringify(updatedPosts));
    setPostContent("");

    toast("Success", {
      description: "Your post has been published!",
    });
  };

  // Submit a new gallery photo
  const handlePhotoSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      toast("Error", {
        description: "Please select a photo to upload.",
      });
      return;
    }

    // In a feature update, I will upload the file to a server
    // For now, we'll use the preview URL
    const newPhoto: GalleryPhoto = {
      id: Date.now().toString(),
      author: "You",
      authorAvatar: "/placeholder.svg?height=32&width=32&text=You",
      image:
        previewUrl || "/placeholder.svg?height=300&width=400&text=Your+Photo",
      caption: photoCaption,
      timestamp: Date.now(),
      likes: 0,
      comments: 0,
    };

    const updatedPhotos = [newPhoto, ...galleryPhotos];
    setGalleryPhotos(updatedPhotos);
    localStorage.setItem("galleryPhotos", JSON.stringify(updatedPhotos));
    setPhotoCaption("");
    setSelectedFile(null);
    setPreviewUrl(null);

    toast("Success", {
      description: "Your photo has been uploaded!",
    });
  };

  // Like a forum post
  const handleLikePost = (postId: string) => {
    const updatedPosts = forumPosts.map((post) => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    });

    setForumPosts(updatedPosts);
    localStorage.setItem("forumPosts", JSON.stringify(updatedPosts));
  };

  // Like a gallery photo
  const handleLikePhoto = (photoId: string) => {
    const updatedPhotos = galleryPhotos.map((photo) => {
      if (photo.id === photoId) {
        return { ...photo, likes: photo.likes + 1 };
      }
      return photo;
    });

    setGalleryPhotos(updatedPhotos);
    localStorage.setItem("galleryPhotos", JSON.stringify(updatedPhotos));
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
              forumPosts={forumPosts}
              handlePostSubmit={handlePostSubmit}
              handleLikePost={handleLikePost}
              postContent={postContent}
              setPostContent={setPostContent}
              formatTimestamp={formatTimestamp}
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
              galleryPhotos={galleryPhotos}
              handleLikePhoto={handleLikePhoto}
              formatTimestamp={formatTimestamp}
            />
          </TabsContent>
          <TabsContent value="events">
            <FanEvents />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
