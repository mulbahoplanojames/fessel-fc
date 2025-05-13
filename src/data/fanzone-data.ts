import { ForumPost, GalleryPhoto } from "@/types/fanzone-type";

export const initialPosts: ForumPost[] = [
  {
    id: "1",
    author: "Fan 1",
    authorAvatar: "/placeholder.svg?height=40&width=40&text=U1",
    content:
      "What an amazing performance by the team yesterday! The defense was solid and our forwards were clinical. Can't wait for the next match!",
    timestamp: Date.now() - 7200000, // 2 hours ago
    likes: 12,
    comments: 5,
    isFanClubMember: true,
  },
  {
    id: "2",
    author: "Fan 2",
    authorAvatar: "/placeholder.svg?height=40&width=40&text=U2",
    content:
      "Does anyone know if tickets for the away match against LISCR FC are still available? Looking to organize a group of fans to support the team.",
    timestamp: Date.now() - 10800000, // 3 hours ago
    likes: 8,
    comments: 4,
    isFanClubMember: false,
  },
];

export const initialPhotos: GalleryPhoto[] = [
  {
    id: "1",
    author: "Fan 1",
    authorAvatar: "/placeholder.svg?height=32&width=32&text=U1",
    image: "/placeholder.svg?height=300&width=400&text=Fan+Photo+1",
    caption:
      "Supporting the team at Antoinette Tubman Stadium! What an atmosphere!",
    timestamp: Date.now() - 259200000, // 3 days ago
    likes: 24,
    comments: 8,
  },
  {
    id: "2",
    author: "Fan 2",
    authorAvatar: "/placeholder.svg?height=32&width=32&text=U2",
    image: "/placeholder.svg?height=300&width=400&text=Fan+Photo+2",
    caption: "Got to meet my favorite player after the match. Best day ever!",
    timestamp: Date.now() - 345600000, // 4 days ago
    likes: 18,
    comments: 6,
  },
  {
    id: "3",
    author: "Fan 3",
    authorAvatar: "/placeholder.svg?height=32&width=32&text=U3",
    image: "/placeholder.svg?height=300&width=400&text=Fan+Photo+3",
    caption:
      "Away day with fellow fans. We may have lost but the support was incredible!",
    timestamp: Date.now() - 432000000, // 5 days ago
    likes: 15,
    comments: 4,
  },
];
