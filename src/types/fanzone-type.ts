export interface ForumPost {
  id: string;
  author: string;
  authorAvatar: string;
  content: string;
  timestamp: number;
  likes: number;
  comments: number;
  isFanClubMember: boolean;
}

export interface GalleryPhoto {
  id: string;
  author: string;
  authorAvatar: string;
  image: string;
  caption: string;
  timestamp: number;
  likes: number;
  comments: number;
}

export interface FanPostItem {
  id: string;
  authorName: string;
  authorAvatar: string | null;
  content: string;
  image: string | null;
  createdAt: string;
  likes: number;
  comments: number;
  likedByMe: boolean;
}

export interface FanPhotoItem {
  id: string;
  authorName: string;
  authorAvatar: string | null;
  caption: string;
  image: string;
  createdAt: string;
  likes: number;
  comments: number;
  likedByMe: boolean;
}

export interface FanClubMemberItem {
  id: string;
  firstName: string;
  lastName: string;
  membershipType: string;
}

export function formatPostTime(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
