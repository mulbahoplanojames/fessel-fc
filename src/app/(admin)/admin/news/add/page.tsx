"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Plus,
  Trash,
  Calendar,
  Clock,
  Tag,
  User,
  ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { NewsItem } from "@/types/news-type";
import axios from "axios";
import { toast } from "sonner";

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export default function AddNews() {
  const [news, setNews] = useState<NewsItem>({
    id: Date.now(),
    title: "",
    slug: generateSlug(""),
    excerpt: "",
    category: "Club News",
    author: "",
    image: "",
    date: new Date().toISOString().split("T")[0],
    readTime: "5 min read",
    content: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [featureImageFile, setFeatureImageFile] = useState<File | null>(null);
  const [featureImagePreview, setFeatureImagePreview] = useState<string>("");

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);

      const formData = new FormData();

      formData.append("title", news.title);
      formData.append("slug", news.slug);
      formData.append("excerpt", news.excerpt);
      formData.append("category", news.category);
      formData.append("author", news.author);
      formData.append("date", news.date);
      formData.append("readTime", news.readTime);
      formData.append("content", JSON.stringify(news.content));

      // Add feature image if it exists
      if (featureImageFile) {
        formData.append("image", featureImageFile);
      }

      console.log("Form Data", formData);

      // For demo purposes, we'll simulate a successful upload
      // const updatedNews = {
      //   ...news,
      //   image: featureImageFile
      //     ? URL.createObjectURL(featureImageFile)
      //     : news.image,
      // };

      // console.log("News data:", updatedNews);

      const response = await axios.post("/api/news", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = await response.data;
      console.log("Response data:", data);

      if (response.status === 201 || response.status === 200) {
        toast.success("News added successfully", {
          description: "News added successfully",
        });
      }
      return data;
    } catch (error) {
      console.log("Error", error);
      toast.error("Error adding news", {
        description: "Error adding news",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input changes
  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setNews((prev) => ({ ...prev, [name]: value }));
  // };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNews((prev) => ({
      ...prev,
      [name]: value,
      slug: name === "title" ? generateSlug(value) : prev.slug,
    }));
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setNews((prev) => ({ ...prev, [name]: value }));
  };

  // Handle feature image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFeatureImageFile(file);
      setFeatureImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle content changes
  const handleContentChange = (index: number, value: string) => {
    const updatedContent = [...news.content];
    updatedContent[index] = { ...updatedContent[index], label: value };
    setNews((prev) => ({ ...prev, content: updatedContent }));
  };

  // Add content section
  const addContentSection = () => {
    const newContent = { id: Date.now(), label: "" };
    setNews((prev) => ({
      ...prev,
      content: [...prev.content, newContent],
    }));
  };

  // Remove content section
  const removeContentSection = (index: number) => {
    const updatedContent = [...news.content];
    updatedContent.splice(index, 1);
    setNews((prev) => ({ ...prev, content: updatedContent }));
  };

  // Handle drag over event
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Handle drop event for feature image
  const handleFeatureImageDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        setFeatureImageFile(file);
        setFeatureImagePreview(URL.createObjectURL(file));
      }
    }
  };

  return (
    <div className="space-y-6 mt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/news">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">
            Add News Article
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" type="button" asChild>
            <Link href="/admin/news">Cancel</Link>
          </Button>
          <Button type="submit" form="news-form" disabled={isSubmitting}>
            {isSubmitting ? "Publishing..." : "Publish Article"}
          </Button>
        </div>
      </div>

      <form id="news-form" onSubmit={handleSubmit}>
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-2">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
          </TabsList>

          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>Article Content</CardTitle>
                <CardDescription>
                  Enter the main details and content for your article.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={news.title}
                    onChange={handleChange}
                    placeholder="Enter news title"
                    required
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Slug</Label>
                  <Input
                    id="slug"
                    name="slug"
                    value={news.slug}
                    onChange={handleChange}
                    placeholder="Enter news slug"
                    required
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    value={news.excerpt}
                    onChange={handleChange}
                    placeholder="Enter a brief summary of the article"
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">
                    A short summary that appears in article previews and search
                    results.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="category">Category</Label>
                    </div>
                    <Select
                      value={news.category}
                      onValueChange={(value) =>
                        handleSelectChange("category", value)
                      }
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Club News">Club News</SelectItem>
                        <SelectItem value="Match Reports">
                          Match Reports
                        </SelectItem>
                        <SelectItem value="Interview">Interview</SelectItem>
                        <SelectItem value="Analysis">Analysis</SelectItem>
                        <SelectItem value="Transfer News">
                          Transfer News
                        </SelectItem>
                        <SelectItem value="Youth Academy">
                          Youth Academy
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="author">Author</Label>
                    </div>
                    <Input
                      id="author"
                      name="author"
                      value={news.author}
                      onChange={handleChange}
                      placeholder="Enter author name"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="date">Publication Date</Label>
                    </div>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={news.date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="readTime">Read Time</Label>
                    </div>
                    <Select
                      value={news.readTime}
                      onValueChange={(value) =>
                        handleSelectChange("readTime", value)
                      }
                    >
                      <SelectTrigger id="readTime">
                        <SelectValue placeholder="Select read time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2 min read">2 min read</SelectItem>
                        <SelectItem value="3 min read">3 min read</SelectItem>
                        <SelectItem value="4 min read">4 min read</SelectItem>
                        <SelectItem value="5 min read">5 min read</SelectItem>
                        <SelectItem value="6 min read">6 min read</SelectItem>
                        <SelectItem value="7 min read">7 min read</SelectItem>
                        <SelectItem value="8 min read">8 min read</SelectItem>
                        <SelectItem value="10 min read">10 min read</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Article Body</h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addContentSection}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Section
                    </Button>
                  </div>

                  {news.content.length > 0 ? (
                    <div className="space-y-6">
                      {news.content.map((content, index) => (
                        <div
                          key={content.id}
                          className="flex items-start gap-4"
                        >
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                              <Label htmlFor={`content-${index}`}>
                                Section {index + 1}
                              </Label>
                              <Badge variant="outline" className="text-xs">
                                {index === 0
                                  ? "Introduction"
                                  : index === news.content.length - 1
                                  ? "Conclusion"
                                  : "Body"}
                              </Badge>
                            </div>
                            <Textarea
                              id={`content-${index}`}
                              value={content.label || ""}
                              onChange={(e) =>
                                handleContentChange(index, e.target.value)
                              }
                              placeholder="Enter content for this section"
                              rows={5}
                              className="min-h-[120px]"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="mt-8"
                            onClick={() => removeContentSection(index)}
                          >
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 border rounded-lg">
                      <p className="text-muted-foreground mb-4">
                        No content sections added yet.
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addContentSection}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Content Section
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="media">
            <Card>
              <CardHeader>
                <CardTitle>Media Assets</CardTitle>
                <CardDescription>
                  Upload images for your article.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-4">
                  <Label className="text-base">Featured Image</Label>
                  <div
                    className={`relative h-64 w-full max-w-2xl mx-auto border-2 border-dashed rounded-lg overflow-hidden transition-colors ${
                      featureImagePreview
                        ? "border-transparent"
                        : "border-muted-foreground/25 hover:border-muted-foreground/40"
                    }`}
                    onDragOver={handleDragOver}
                    onDrop={handleFeatureImageDrop}
                  >
                    {featureImagePreview ? (
                      <div className="relative h-full w-full group">
                        <Image
                          src={featureImagePreview || "/placeholder.svg"}
                          alt="Featured image preview"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                          <p className="text-white text-sm">
                            Click or drag to replace
                          </p>
                          <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            onClick={() => {
                              setFeatureImageFile(null);
                              setFeatureImagePreview("");
                            }}
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
                        onClick={() =>
                          document.getElementById("featureImage")?.click()
                        }
                      >
                        <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-muted-foreground font-medium">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          SVG, PNG, JPG or GIF (max. 2MB)
                        </p>
                      </div>
                    )}
                    <Input
                      id="featureImage"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 text-center">
                    Upload a featured image for the article. Recommended size:
                    1200x630px.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  );
}
