import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/lib/auth";
import { CircleUser, Grip, Handshake, Settings } from "lucide-react";
import prisma from "../../prisma";
import Link from "next/link";
import LogoutButton from "@/components/auth/logout-button";

export async function UserDropDown() {
  const session = await auth();

  const userEmail = session?.user?.email;

  const user = await prisma.user.findUnique({
    where: {
      email: userEmail!,
    },
  });

  const userRole = user?.role;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="mx-2">
        <Avatar>
          <AvatarImage src="/placeholder-user.jpg" alt="user" />
          <AvatarFallback>US</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[9999] mt-3">
        <DropdownMenuLabel>{userEmail}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {userRole && userRole === "ADMIN" && (
          <DropdownMenuItem
            className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            asChild
          >
            <Link href="/admin">
              <Grip className="size-6" />
              Dashboard
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
          <CircleUser className="size-6" />
          Edit profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
          <Settings className="size-6" />
          Account settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
          <Handshake className="size-6" />
          Support
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
