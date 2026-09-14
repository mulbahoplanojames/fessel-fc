import { useState } from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Loader2,
  MessageSquare,
  Share2,
  ThumbsUp,
  X,
} from "lucide-react";
import { FanPhotoItem, formatPostTime } from "@/types/fanzone-type";

interface FanGalleryProps {
  handlePhotoSubmit: (e: React.FormEvent) => void;
  previewUrl: string | null;
  clearFileSelection: () => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  photoCaption: string;
  setPhotoCaption: React.Dispatch<React.SetStateAction<string>>;
  photos: FanPhotoItem[];
  submitting: boolean;
  onLikePhoto: (photoId: string) => void;
  onCommentPhoto: (photoId: string, content: string) => void;
  onSharePhoto: (photo: FanPhotoItem) => void;
}

export default function FanGallery({
  handlePhotoSubmit,
  previewUrl,
  clearFileSelection,
  handleFileChange,
  photoCaption,
  setPhotoCaption,
  photos,
  submitting,
  onLikePhoto,
  onCommentPhoto,
  onSharePhoto,
}: FanGalleryProps) {
  const [commentingPhotoId, setCommentingPhotoId] = useState<string | null>(
    null
  );
  const [commentText, setCommentText] = useState("");

  const submitComment = (photoId: string) => {
    if (!commentText.trim()) return;
    onCommentPhoto(photoId, commentText.trim());
    setCommentText("");
    setCommentingPhotoId(null);
  };

  return (
    <>
      <div className="mb-8">
        <Card className="border-none shadow-lg dark:bg-background p-0">
          <CardContent className="p-6">
            <form onSubmit={handlePhotoSubmit}>
              <h3 className="text-lg font-semibold mb-4">
                Share Your Fan Photos
              </h3>
              <div className="flex flex-col gap-4">
                {previewUrl ? (
                  <div className="relative">
                    <div className="relative h-64 rounded-lg overflow-hidden">
                      <Image
                        src={previewUrl || "/placeholder.svg"}
                        alt="Preview"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 rounded-full"
                      onClick={clearFileSelection}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-8 text-center">
                    <p className="text-muted-foreground mb-4">
                      Drag and drop your photos here or click to upload
                    </p>
                    <Button
                      className="rounded-full bg-primary-clr text-primary-foreground hover:bg-primary-clr/90"
                      onClick={() =>
                        document.getElementById("photo-upload")?.click()
                      }
                    >
                      Upload Photos
                    </Button>
                    <input
                      id="photo-upload"
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
                  value={photoCaption}
                  onChange={(e) => setPhotoCaption(e.target.value)}
                />
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="rounded-full bg-primary-clr text-primary-foreground hover:bg-primary-clr/90"
                  >
                    {submitting && (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    )}
                    Share
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      {photos.length === 0 && (
        <Card className="border-none shadow-lg dark:bg-background">
          <CardContent className="p-10 text-center text-muted-foreground">
            No photos yet. Share the first shot from the stands!
          </CardContent>
        </Card>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <Card
            key={photo.id}
            className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all dark:bg-background p-0"
          >
            <div className="relative h-64">
              <Image
                src={photo.image || "/placeholder.svg"}
                alt={`Fan Photo by ${photo.authorName}`}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={photo.authorAvatar || "/placeholder.svg"}
                    alt={photo.authorName}
                  />
                  <AvatarFallback>{photo.authorName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{photo.authorName}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatPostTime(photo.createdAt)}
                  </p>
                </div>
              </div>
              <p className="text-sm">{photo.caption}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <div className="flex items-center gap-4 w-full">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => onLikePhoto(photo.id)}
                >
                  <ThumbsUp
                    className={`h-4 w-4 ${photo.likedByMe ? "fill-primary-clr text-primary-clr" : ""}`}
                  />
                  <span>{photo.likes}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() =>
                    setCommentingPhotoId(
                      commentingPhotoId === photo.id ? null : photo.id
                    )
                  }
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>{photo.comments}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1 ml-auto"
                  onClick={() => onSharePhoto(photo)}
                >
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </Button>
              </div>
              {commentingPhotoId === photo.id && (
                <div className="mt-4 flex gap-2">
                  <Input
                    placeholder="Write a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        submitComment(photo.id);
                      }
                    }}
                  />
                  <Button
                    size="sm"
                    className="rounded-full bg-primary-clr hover:bg-primary-clr/90"
                    onClick={() => submitComment(photo.id)}
                  >
                    Comment
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCommentingPhotoId(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}