"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

type FanPostRow = {
  id: string;
  authorName: string;
  content: string;
  image: string | null;
  status: string;
  createdAt: string;
  likes: number;
  comments: number;
};

type FanPhotoRow = {
  id: string;
  authorName: string;
  caption: string;
  image: string;
  status: string;
  createdAt: string;
  likes: number;
  comments: number;
};

type CommunityAdminProps = {
  posts: FanPostRow[];
  photos: FanPhotoRow[];
};

const STATUSES = ["approved", "pending", "rejected"];

export default function CommunityAdmin({ posts, photos }: CommunityAdminProps) {
  const router = useRouter();

  const updateStatus = async (
    kind: "fanpost" | "fanphoto",
    id: string,
    status: string
  ) => {
    try {
      await axios.patch("/api/admin/fan-content", { kind, id, status });
      toast.success("Status updated");
      router.refresh();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const removeContent = async (kind: "fanpost" | "fanphoto", id: string) => {
    if (!window.confirm("Delete this content permanently?")) return;
    try {
      await axios.delete("/api/admin/fan-content", { data: { kind, id } });
      toast.success("Deleted");
      router.refresh();
    } catch {
      toast.error("Failed to delete content");
    }
  };

  if (posts.length === 0 && photos.length === 0) {
    return (
      <p className="py-12 text-center text-muted-foreground">
        No community content yet.
      </p>
    );
  }

  return (
    <div className="space-y-10">
      {posts.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-4">Forum Posts</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Author</TableHead>
                <TableHead>Content</TableHead>
                <TableHead className="hidden md:table-cell">Engagement</TableHead>
                <TableHead className="hidden lg:table-cell">Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.authorName}</TableCell>
                  <TableCell className="max-w-md">
                    <p className="line-clamp-2">{post.content}</p>
                    {post.image && (
                      <span className="text-xs text-muted-foreground">
                        has image
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                    {post.likes} likes · {post.comments} comments
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <StatusPill
                      value={post.status}
                      onChange={(v) => updateStatus("fanpost", post.id, v)}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeContent("fanpost", post.id)}
                    >
                      <Trash className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      )}

      {photos.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-4">Fan Photos</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Photo</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Caption</TableHead>
                <TableHead className="hidden md:table-cell">Votes</TableHead>
                <TableHead className="hidden lg:table-cell">Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {photos.map((photo) => (
                <TableRow key={photo.id}>
                  <TableCell>
                    <div className="relative h-12 w-16 rounded overflow-hidden">
                      <Image
                        src={photo.image}
                        alt={photo.caption}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{photo.authorName}</TableCell>
                  <TableCell className="max-w-xs">
                    <p className="line-clamp-2">{photo.caption}</p>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                    {photo.likes} votes · {photo.comments} comments
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                    {new Date(photo.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <StatusPill
                      value={photo.status}
                      onChange={(v) => updateStatus("fanphoto", photo.id, v)}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeContent("fanphoto", photo.id)}
                    >
                      <Trash className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      )}
    </div>
  );
}

function StatusPill({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-32 capitalize">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {STATUSES.map((status) => (
          <SelectItem key={status} value={status} className="capitalize">
            {status}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}