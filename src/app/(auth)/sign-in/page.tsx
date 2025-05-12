import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import LoginGitHub from "@/components/auth/login-github";
import LoginForm from "@/components/auth/login-form";
import LoginGoogle from "@/components/auth/login-google";

export default function Page() {
  return (
    <div className="flex mt-20 w-full items-center justify-center ">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
            <div className="mt-3">
              <LoginGitHub />
            </div>
            <div className="mt-3">
              <LoginGoogle />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
