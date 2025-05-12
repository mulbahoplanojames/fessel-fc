export type NewsItem = {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  author: string;
  image: string;
  date: string;
  readTime: string;
  content: { id: number; label?: string }[];
  relatedNews: number[];
};

export interface News {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  image: string;
  date: string;
  readTime: string;
  content: { id: number; label: string }[]; // add this type annotation
  createdAt: Date;
  updatedAt: Date;
}
