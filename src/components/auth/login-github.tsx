"use client";
import { login } from "@/actions/auth";
import { Button } from "../ui/button";

const LoginGitHub = () => {
  return (
    <Button
      onClick={() => login("github")}
      variant="outline"
      className="w-full"
    >
      Login with Github
    </Button>
  );
};

export default LoginGitHub;
