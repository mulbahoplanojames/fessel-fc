"use client";
import { login } from "@/actions/auth";
import { Button } from "../ui/button";
import { Chrome } from "lucide-react";

const LoginGoogle = () => {
  return (
    <Button
      onClick={() => login("google")}
      variant="outline"
      className="w-full"
    >
      <Chrome className="size-5" />
      Login with Google
    </Button>
  );
};

export default LoginGoogle;
