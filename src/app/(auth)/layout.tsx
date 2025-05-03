import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "FC Fassell - Official Website",
  description:
    "The official website of FC Fassell Football Club. Get the latest news, match updates, player profiles, and buy tickets for upcoming matches.",
  icons: {
    icon: "/logo.png",
  },
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      {children}
    </div>
  );
}
