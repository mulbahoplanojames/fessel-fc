"use client";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <>
      <Button
        disabled={pending}
        type="submit"
        className="w-full"
        variant={pending ? "outline" : "default"}
      >
        {pending ? "Loading..." : "  Sign in"}
      </Button>
    </>
  );
};

export default SubmitButton;
