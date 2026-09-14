"use client";
import { Button } from "../ui/button";
import { Github } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const LoginGitHub = () => {
  return (
    <Button
      onClick={() =>
        authClient.signIn.social({
          provider: "github",
          callbackURL: "/admin",
        })
      }
      variant="outline"
      className="w-full"
    >
      <Github className="size-5" />
      Login with Github
    </Button>
  );
};

export default LoginGitHub;