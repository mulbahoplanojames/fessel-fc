import { ForumPost, GalleryPhoto } from "@/types/fanzone-type";

export const initialPosts: ForumPost[] = [
  {
    id: "1",
    author: "Fan 1",
    authorAvatar: "/coach/coach2.jpg",
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
    authorAvatar: "/coach/coach3.jpg",
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
    authorAvatar: "/coach/coach.jpg",
    image: "/about-images/img5.jpg",
    caption:
      "Supporting the team at Antoinette Tubman Stadium! What an atmosphere!",
    timestamp: Date.now() - 259200000, // 3 days ago
    likes: 24,
    comments: 8,
  },
  {
    id: "2",
    author: "Fan 2",
    authorAvatar: "/coach/coach2.jpg",
    image: "/about-images/img3.jpg",
    caption: "Got to meet my favorite player after the match. Best day ever!",
    timestamp: Date.now() - 345600000, // 4 days ago
    likes: 18,
    comments: 6,
  },
  {
    id: "3",
    author: "Fan 3",
    authorAvatar: "/coach/coach3.jpg",
    image: "/about-images/img4.jpg",
    caption:
      "Away day with fellow fans. We may have lost but the support was incredible!",
    timestamp: Date.now() - 432000000, // 5 days ago
    likes: 15,
    comments: 4,
  },
];

export const initialEvents = [
  {
    id: "1",
    title: "Meet & Greet with Players",
    image: "/about-images/img5.jpg",
    date: "10 April 2025",
    description:
      "Get a chance to meet your favorite FC Fassell players, take photos, and get autographs.",
    attendese: "50 fans attending",
  },
  {
    id: "2",
    title: "Fan Club Party",
    image: "/about-images/img3.jpg",
    date: "11 April 2025",
    description:
      "Join fellow fans to watch our away match against LISCR FC on the big screen.",
    attendese: "60 fans attending",
  },
  {
    id: "3",
    title: "Fan Club Party",
    image: "/liberia-africa-staduim.webp",
    date: "12 April 2025",
    description:
      "Exclusive behind-the-scenes tour of Antoinette Tubman Stadium with club legends.",
    attendese: "75 fans attending",
  },
];

// Format timestamp
export const formatTimestamp = (timestamp: number) => {
  const now = Date.now();
  const diff = now - timestamp;

  // Less than a minute
  if (diff < 60000) {
    return "Just now";
  }

  // Less than an hour
  if (diff < 3600000) {
    const minutes = Math.floor(diff / 60000);
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  }

  // Less than a day
  if (diff < 86400000) {
    const hours = Math.floor(diff / 3600000);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  }

  // Less than a week
  if (diff < 604800000) {
    const days = Math.floor(diff / 86400000);
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  }

  // Format as date
  return new Date(timestamp).toLocaleDateString();
};
