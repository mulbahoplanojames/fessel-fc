"use client";
import { login } from "@/actions/auth";
import { Button } from "../ui/button";

const LoginGoogle = () => {
  return (
    <Button
      onClick={() => login("google")}
      variant="outline"
      className="w-full"
    >
      Login with Google
    </Button>
  );
};

export default LoginGoogle;
