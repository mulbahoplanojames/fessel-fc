"use client";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { logout } from "@/actions/auth";

const LogoutButton = () => {
  return (
    <Button
      onClick={() => logout()}
      className="bg-primary-clr text-white hover:bg-primary-clr/90 w-full flex justify-center items-center"
    >
      <LogOut className="text-white" />
      Log Out
    </Button>
  );
};

export default LogoutButton;
