import { uploadNewsImageToCloudinary } from "@/lib/upload-to-cloudinary";
import { NextResponse, type NextRequest } from "next/server";
import prisma from "../../../../prisma";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();

    const title = data.get("title") as string;
    const slug = data.get("slug") as string;
    const excerpt = data.get("excerpt") as string;
    const category = data.get("category") as string;
    const author = data.get("author") as string;
    const date = data.get("date") as string;
    const readTime = data.get("readTime") as string;
    const content = JSON.parse(data.get("content") as string);
    const image = data.get("image") as File;

    const imagePath = await uploadNewsImageToCloudinary(image);

    // Test database connection
    try {
      await prisma.$connect();
      console.log("Database connected successfully");
    } catch (error) {
      console.error("Database connection failed:", error);
      throw error;
    }

    const news = await prisma.news.create({
      data: {
        title,
        slug,
        excerpt,
        category,
        author,
        date,
        readTime,
        content,
        image: imagePath,
      },
    });
    return NextResponse.json(news, { status: 200 });
  } catch (error) {
    console.error("Error creating News:", error); // Debug log
    return NextResponse.json(
      {
        error: "Failed to add News",
        details: (error as Error).message || "Unknown error occurred",
      },
      { status: 400 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
  try {
    await prisma.$connect();
    const news = await prisma.news.findMany();
    // console.log("News from server", news);
    return NextResponse.json(news, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch news",
        details: (error as Error).message,
      },
      { status: 400 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const data = await request.formData();
    const id = data.get("id") as string;
    await prisma.news.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(
      { message: "News deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting news:", error);
    return NextResponse.json(
      { error: "Failed to delete news", details: (error as Error).message },
      { status: 400 }
    );
  }
}
