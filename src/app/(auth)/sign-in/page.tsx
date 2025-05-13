import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// import LoginGitHub from "@/components/auth/login-github";
// import LoginForm from "@/components/auth/login-form";
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
            <CardTitle className="mt-2">Login to your account</CardTitle>
            <CardDescription>
              Sign in with your Google account Easy and Fast
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* <LoginForm /> */}
            {/* <div className="mt-3">
              <LoginGitHub />
            </div> */}
            <div className="mt-3">
              <LoginGoogle />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
