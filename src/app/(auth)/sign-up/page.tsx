import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import SignUpForm from "@/components/auth/sign-up-form";
import LoginGoogle from "@/components/auth/login-google";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex mt-20 w-full items-center justify-center ">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <Button size="icon" asChild>
              <Link href="/">
                <ArrowBigLeft />
              </Link>
            </Button>
            <CardTitle className="mt-2">Create an account</CardTitle>
            <CardDescription>
              Sign up to get started with FC Fassell
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignUpForm />
            <div className="my-4 flex items-center gap-3 text-xs text-muted-foreground">
              <div className="h-px flex-1 bg-border" />
              or continue with
              <div className="h-px flex-1 bg-border" />
            </div>
            <LoginGoogle label="Sign up with Google" />
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}