"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Camera, Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

interface EditProfileFormProps {
  initialName: string;
  initialImage: string;
  email: string;
}

export function EditProfileForm({
  initialName,
  initialImage,
  email,
}: EditProfileFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(initialName);
  const [image, setImage] = useState(initialImage);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [pending, setPending] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file.");
      return;
    }
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    try {
      const file = fileInputRef.current?.files?.[0];
      let imageUrl = image || initialImage;
      if (file) {
        setUploading(true);
        const fd = new FormData();
        fd.append("avatar", file);
        const res = await fetch("/api/avatar", { method: "POST", body: fd });
        const data = (await res.json()) as { imageUrl?: string; error?: string };
        if (!res.ok || !data.imageUrl) {
          toast.error(data.error ?? "Failed to upload your image.");
          return;
        }
        imageUrl = data.imageUrl;
        setUploading(false);
      }

      const { data, error } = await authClient.updateUser({
        name: name.trim(),
        ...(imageUrl ? { image: imageUrl } : {}),
      });

      if (error) {
        toast.error(error.message ?? "Failed to update your profile.");
        return;
      }

      setImage(imageUrl);
      toast.success("Profile updated.");
      router.refresh();
      void data;
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update your profile."
      );
    } finally {
      setUploading(false);
      setPending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border bg-card p-6 md:p-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Edit Profile
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Update your name and profile picture.
          </p>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-4">
        <div className="relative">
          <Image
            src={preview || image || "/placeholder-user.jpg"}
            alt="Profile preview"
            width={80}
            height={80}
            className="size-20 rounded-full border object-cover"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute -bottom-1 -right-1 flex size-8 items-center justify-center rounded-full bg-primary-clr text-white shadow-md transition-transform hover:scale-105"
            aria-label="Change profile picture"
          >
            <Camera className="size-4" />
          </button>
        </div>
        <div>
          <Label htmlFor="avatar">Profile picture</Label>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            PNG or JPG. Cropped to a square for avatars.
          </p>
        </div>
      </div>
      <input
        ref={fileInputRef}
        id="avatar"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="mt-8 grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Display name</Label>
          <Input
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name"
            required
            minLength={2}
            maxLength={80}
            autoComplete="name"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            readOnly
            disabled
            className="opacity-70"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Email cannot be changed from your profile settings yet.
          </p>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Button
          type="submit"
          disabled={pending || uploading}
          className="bg-primary-clr text-white hover:bg-primary-clr/90"
        >
          {pending || uploading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Save className="size-4" />
          )}
          {uploading
            ? "Uploading image..."
            : pending
              ? "Saving..."
              : "Save changes"}
        </Button>
      </div>
    </form>
  );
}