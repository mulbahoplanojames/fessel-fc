import { NextRequest, NextResponse } from "next/server";
import { requireUserInRequest } from "@/lib/session";
import { uploadAvatarImageToCloudinary } from "@/lib/upload-to-cloudinary";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export async function POST(request: NextRequest) {
  const session = await requireUserInRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "No image provided." }, { status: 400 });
  }

  const file = formData.get("avatar");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No image provided." }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json(
      { error: "Please choose an image file." },
      { status: 400 }
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: "Image must be smaller than 5MB." },
      { status: 400 }
    );
  }

  try {
    const imageUrl = await uploadAvatarImageToCloudinary(file);
    if (!imageUrl) {
      return NextResponse.json(
        { error: "Failed to upload image." },
        { status: 500 }
      );
    }
    return NextResponse.json({ imageUrl }, { status: 200 });
  } catch (error) {
    console.error("Error uploading avatar:", error);
    return NextResponse.json(
      { error: "Failed to upload image. Please try again." },
      { status: 500 }
    );
  }
}