"use client";
import { login } from "@/actions/auth";
import { Button } from "../ui/button";
import { BsGithub } from "react-icons/bs";

const LoginGitHub = () => {
  return (
    <Button
      onClick={() => login("github")}
      variant="outline"
      className="w-full"
    >
      <BsGithub className="size-5" />
      Login with Github
    </Button>
  );
};

export default LoginGitHub;
