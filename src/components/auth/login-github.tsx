"use client";
import { login } from "@/actions/auth";
import { Button } from "../ui/button";
import { Github } from "lucide-react";

const LoginGitHub = () => {
  return (
    <Button
      onClick={() => login("github")}
      variant="outline"
      className="w-full"
    >
      <Github className="size-5" />
      Login with Github
    </Button>
  );
};

export default LoginGitHub;
