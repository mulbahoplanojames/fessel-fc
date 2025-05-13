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
