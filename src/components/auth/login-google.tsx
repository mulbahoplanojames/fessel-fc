"use client";
import { login } from "@/actions/auth";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";

const LoginGoogle = () => {
  return (
    <Button
      onClick={() => login("google")}
      variant="outline"
      className="w-full"
    >
      <FcGoogle className="size-5" />
      Login with Google
    </Button>
  );
};

export default LoginGoogle;
