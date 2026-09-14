"use client";

import { useState } from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { events, videos } from "@/data/gallery-data";
import GalleryHero from "@/components/gallery/gallery-hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  MessageSquare,
  Share2,
  ThumbsUp,
  Upload,
  X,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { FanPhotoItem, formatPostTime } from "@/types/fanzone-type";
import axios from "axios";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function GalleryPage() {
  const { data: session } = authClient.useSession();
  const queryClient = useQueryClient();
  const { data: photosData, isLoading } = useQuery<{ photos: FanPhotoItem[] }>({
    queryKey: ["fan-gallery"],
    queryFn: async () =>
      (await axios.get<{ photos: FanPhotoItem[] }>("/api/fan/feed?type=photos"))
        .data,
  });
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const photos = photosData?.photos ?? [];
  const [caption, setCaption] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [commentingId, setCommentingId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toast("Error", { description: "Please choose a photo to upload." });
      return;
    }
    if (!session) {
      toast("Sign in required", {
        description: "Please sign in to upload photos.",
      });
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("caption", caption.trim());
      formData.append("image", selectedFile);
      const response = await axios.post<{ photo: FanPhotoItem }>(
        "/api/fan/photo",
        formData
      );
      applyPhotoChange((prev) => [response.data.photo, ...prev]);
      setCaption("");
      setSelectedFile(null);
      setPreviewUrl(null);
      toast("Success", { description: "Your photo has been uploaded!" });
    } catch (error: unknown) {
      const message =
        typeof error === "object" && error && "response" in error
          ? (error.response as { data?: { error?: string } }).data?.error
          : undefined;
      toast("Error", { description: message || "Upload failed." });
    } finally {
      setUploading(false);
    }
  };

  const applyPhotoChange = (
    updater: (photos: FanPhotoItem[]) => FanPhotoItem[]
  ) => {
    queryClient.setQueryData<{ photos: FanPhotoItem[] }>(
      ["fan-gallery"],
      (old) => (old ? { photos: updater(old.photos) } : old)
    );
  };

  const updatePhoto = (id: string, changes: Partial<FanPhotoItem>) =>
    applyPhotoChange((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...changes } : p))
    );

  const handleLike = async (photoId: string) => {
    const photo = photos.find((p) => p.id === photoId);
    if (!photo) return;
    if (!session) {
      toast("Sign in required", { description: "Please sign in to vote." });
      return;
    }
    updatePhoto(photoId, {
      likedByMe: !photo.likedByMe,
      likes: photo.likes + (photo.likedByMe ? -1 : 1),
    });
    try {
      const response = await axios.post<{ liked: boolean; likes: number }>(
        "/api/fan/like",
        { kind: "photo", id: photoId }
      );
      updatePhoto(photoId, {
        likedByMe: response.data.liked,
        likes: response.data.likes,
      });
    } catch {
      updatePhoto(photoId, { likedByMe: photo.likedByMe, likes: photo.likes });
      toast("Error", { description: "Failed to update vote." });
    }
  };

  const handleComment = async (photoId: string) => {
    if (!commentText.trim()) return;
    if (!session) {
      toast("Sign in required", { description: "Please sign in to comment." });
      return;
    }
    try {
      const response = await axios.post<{ comments: number }>(
        "/api/fan/comment",
        { kind: "photo", id: photoId, content: commentText.trim() }
      );
      updatePhoto(photoId, { comments: response.data.comments });
      setCommentText("");
      setCommentingId(null);
    } catch {
      toast("Error", { description: "Failed to post comment." });
    }
  };

  const handleShare = (photo: FanPhotoItem) => {
    const url = window.location.origin + "/gallery";
    if (navigator.share) {
      navigator.share({ title: "Fessel FC Gallery", text: photo.caption, url }).catch(() => undefined);
    } else {
      navigator.clipboard.writeText(url).then(() => {
        toast("Link copied", { description: "The gallery link is on your clipboard." });
      });
    }
  };

  return (
    <div>
      <GalleryHero />
      <div className="container px-4 py-12 mx-auto">
        <Tabs defaultValue="photos" className="w-full">
          <TabsList className="mb-10 w-full max-w-md mx-auto grid grid-cols-3">
            <TabsTrigger value="photos">Photos</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>

          <TabsContent value="photos">
            <form onSubmit={handleUpload} className="mb-8">
              <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-6">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  {previewUrl ? (
                    <div className="relative h-32 w-40 rounded-lg overflow-hidden shrink-0">
                      <Image src={previewUrl} alt="Upload preview" fill className="object-cover" />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6 rounded-full"
                        type="button"
                        onClick={() => {
                          setSelectedFile(null);
                          setPreviewUrl(null);
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex-1 flex items-center justify-center gap-3 py-4">
                      <Button
                        variant="outline"
                        type="button"
                        onClick={() => document.getElementById("gallery-upload")?.click()}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Choose Photo
                      </Button>
                      <input
                        id="gallery-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                  )}
                  <Input
                    type="text"
                    placeholder="Add a caption..."
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    disabled={uploading}
                    className="rounded-full bg-primary-clr text-white hover:bg-primary-clr/90"
                  >
                    {uploading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    Upload
                  </Button>
                </div>
              </div>
            </form>

            {isLoading && (
              <p className="text-center text-sm text-muted-foreground animate-pulse py-8">
                Loading gallery...
              </p>
            )}

            {!isLoading && photos.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No photos yet. Upload the first fan shot!
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map((photo) => (
                <Dialog key={photo.id}>
                  <DialogTrigger
                    asChild
                    className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer"
                    onClick={() => setSelectedPhoto(photo.id)}
                  >
                    <div>
                      <Image
                        src={photo.image}
                        alt={photo.caption || photo.authorName}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white font-medium text-center px-4">
                          {photo.caption || "Fan photo"}
                        </span>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    {selectedPhoto !== null && (
                      <div className="w-full">
                        <div className="relative aspect-square md:aspect-[4/3] w-full h-[300px] overflow-hidden">
                          <Image
                            src={photos.find((p) => p.id === selectedPhoto)?.image || ""}
                            alt={photos.find((p) => p.id === selectedPhoto)?.caption || ""}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={photos.find((p) => p.id === selectedPhoto)?.authorAvatar || "/placeholder.svg"}
                                alt="author"
                              />
                              <AvatarFallback>
                                {(photos.find((p) => p.id === selectedPhoto)?.authorName || "?").charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">
                                {photos.find((p) => p.id === selectedPhoto)?.authorName}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {photos.find((p) => p.id === selectedPhoto)
                                  ? formatPostTime(photos.find((p) => p.id === selectedPhoto)!.createdAt)
                                  : ""}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm mb-3">
                            {photos.find((p) => p.id === selectedPhoto)?.caption}
                          </p>
                          {(() => {
                            const p = photos.find((x) => x.id === selectedPhoto);
                            if (!p) return null;
                            return (
                              <div className="flex items-center gap-4">
                                <Button variant="ghost" size="sm" className="flex items-center gap-1" onClick={() => handleLike(p.id)}>
                                  <ThumbsUp className={`h-4 w-4 ${p.likedByMe ? "fill-primary-clr text-primary-clr" : ""}`} />
                                  <span>{p.likes}</span>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="flex items-center gap-1"
                                  onClick={() => setCommentingId(commentingId === p.id ? null : p.id)}
                                >
                                  <MessageSquare className="h-4 w-4" />
                                  <span>{p.comments}</span>
                                </Button>
                                <Button variant="ghost" size="sm" className="flex items-center gap-1 ml-auto" onClick={() => handleShare(p)}>
                                  <Share2 className="h-4 w-4" />
                                  <span>Share</span>
                                </Button>
                              </div>
                            );
                          })()}
                          {commentingId === selectedPhoto && (
                            <div className="mt-4 flex gap-2">
                              <Input
                                placeholder="Write a comment..."
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleComment(selectedPhoto);
                                  }
                                }}
                              />
                              <Button size="sm" className="rounded-full bg-primary-clr hover:bg-primary-clr/90" onClick={() => handleComment(selectedPhoto)}>
                                Comment
                              </Button>
                            </div>
                          )}
                          <Badge variant="outline" className="mt-4">
                            Fan gallery
                          </Badge>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <Dialog key={video.id}>
                  <DialogTrigger
                    asChild
                    className="relative aspect-video overflow-hidden rounded-lg group cursor-pointer"
                    onClick={() => setSelectedVideo(video.id)}
                  >
                    <div>
                      <div>
                        <Image
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-[#e6da46] flex items-center justify-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6 text-black ml-1"
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                        <h3 className="text-white font-medium">{video.title}</h3>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-white/80 text-sm">{video.duration}</span>
                          <span className="text-white/80 text-sm">{video.date}</span>
                        </div>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="p-0">
                    {selectedVideo !== null && (
                      <div className="relative w-full max-w-4xl">
                        <div className="relative aspect-video w-full bg-black">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <p className="text-white text-lg">
                              Video player would be implemented here
                            </p>
                          </div>
                        </div>
                        <div className="bg-black/80 p-4 text-white mt-2">
                          <h3 className="text-xl font-semibold">
                            {videos.find((v) => v.id === selectedVideo)?.title}
                          </h3>
                          <p className="text-sm text-gray-300 mt-1">
                            {videos.find((v) => v.id === selectedVideo)?.date} |{" "}
                            {videos.find((v) => v.id === selectedVideo)?.duration} |{" "}
                            {videos.find((v) => v.id === selectedVideo)?.category}
                          </p>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex flex-col md:flex-row gap-4 border rounded-lg overflow-hidden"
                >
                  <div className="relative w-full md:w-1/3 aspect-video md:aspect-square">
                    <Image
                      src={event.thumbnail || "/placeholder.svg"}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 flex-1">
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <div className="text-sm text-muted-foreground mb-2">
                      <p>{event.date}</p>
                      <p>{event.location}</p>
                    </div>
                    <p className="text-sm">{event.description}</p>
                    <button className="mt-4 px-4 py-2 bg-[#e6da46] text-black rounded-md hover:bg-[#d6ca36] transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}