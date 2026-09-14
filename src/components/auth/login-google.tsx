"use client";
import { Button } from "../ui/button";
import { Chrome } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const LoginGoogle = ({ label = "Login with Google" }: { label?: string }) => {
  return (
    <Button
      onClick={() =>
        authClient.signIn.social({
          provider: "google",
          callbackURL: "/admin",
        })
      }
      variant="outline"
      className="w-full"
    >
      <Chrome className="size-5" />
      {label}
    </Button>
  );
};

export default LoginGoogle;