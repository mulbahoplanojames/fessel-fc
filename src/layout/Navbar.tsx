import Link from "next/link";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import NavMenu from "./nav-menu";
import MobileNavbar from "./mobile-navbar";
import { auth } from "@/lib/auth";
import { UserDropDown } from "./user-dropdown";
import { ThemeModeToggle } from "@/components/mode-toggle";
import CartButton from "./cart-button";

export async function Navbar() {
  const session = await auth();

  return (
    <>
      <header className="flex items-center justify-between sticky top-0 z-[888] w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60  md:px-6 px-4 md:py-3 py-4">
        <Link
          href="/"
          className="flex items-center space-x-2 mr-6  md:w-12 md:h-12 w-10 h-10 overflow-hidden relative rounded-md"
        >
          <Image
            src="/logo.png"
            alt="Kigali Lonestar Stadium"
            className="md:w-12 md:h-12 w object-contain"
            fill
          />
        </Link>

        {/* Desktop Navigation */}
        <NavMenu />
        <div className="flex items-center gap-2">
          <div className="md:flex hidden items-center  space-x-1 ">
            <Button
              className="rounded-full hidden sm:flex text-black dark:text-white "
              asChild
              variant="outline"
            >
              <Link href="/donate">Donate</Link>
            </Button>
            {session ? (
              <UserDropDown />
            ) : (
              <Button
                className="mx-2 rounded-full hidden sm:flex bg-primary-clr text-black  hover:bg-primary-clr/80 dark:text-white"
                asChild
              >
                <Link href="/sign-in">Sign In</Link>
              </Button>
            )}
            <div className="md:hidden">
              <CartButton />
            </div>
            <ThemeModeToggle />
          </div>
          {/* Mobile Navigation */}
          <MobileNavbar />
          <CartButton />
        </div>
      </header>
    </>
  );
}
