"use client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";

const LogoutButton = () => {
  const router = useRouter();

  return (
    <Button
      onClick={async () => {
        await authClient.signOut();
        router.push("/");
        router.refresh();
      }}
      className="bg-primary-clr text-white hover:bg-primary-clr/90 w-full flex justify-center items-center"
    >
      <LogOut className="text-white" />
      Log Out
    </Button>
  );
};

export default LogoutButton;