import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "../../../../../prisma";
import { uploadNewsImageToCloudinary } from "@/lib/upload-to-cloudinary";
import { requireAdminInRequest } from "@/lib/session";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const news = await prisma.news.findUnique({
      where: { id },
    });

    if (!news) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    return NextResponse.json(news, { status: 200 });
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch news",
        details: (error as Error).message || "Unknown error occurred",
      },
      { status: 400 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAdminInRequest(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const data = await request.formData();

    const existing = await prisma.news.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    const title = (data.get("title") as string) || existing.title;
    const slug = (data.get("slug") as string) || existing.slug;
    const excerpt = (data.get("excerpt") as string) || existing.excerpt;
    const category = (data.get("category") as string) || existing.category;
    const author = (data.get("author") as string) || existing.author;
    const date = (data.get("date") as string) || existing.date;
    const readTime = (data.get("readTime") as string) || existing.readTime;
    const contentRaw = data.get("content") as string;
    const content = contentRaw ? JSON.parse(contentRaw) : existing.content;

    const imageEntry = data.get("image");
    let image = existing.image;
    if (imageEntry instanceof File && imageEntry.size > 0) {
      image = await uploadNewsImageToCloudinary(imageEntry);
    }

    const news = await prisma.news.update({
      where: { id },
      data: {
        title,
        slug,
        excerpt,
        category,
        author,
        date,
        readTime,
        content,
        image,
      },
    });

    revalidatePath("/admin/news");
    return NextResponse.json(news, { status: 200 });
  } catch (error) {
    console.error("Error updating news:", error);
    return NextResponse.json(
      {
        error: "Failed to update news",
        details: (error as Error).message || "Unknown error occurred",
      },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAdminInRequest(request);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    // console.log("Player Id", id);

    const deletedPlayer = await prisma.news.delete({
      where: {
        id,
      },
    });

    console.log("Deleted news:", deletedPlayer);
    revalidatePath("/admin/news");
    return NextResponse.json(deletedPlayer, { status: 200 });
  } catch (error) {
    console.error("Error deleting news:", error);
    return NextResponse.json(
      {
        error: "Failed to delete news",
        details: (error as Error).message || "Unknown error occurred",
      },
      { status: 400 }
    );
  }
}
