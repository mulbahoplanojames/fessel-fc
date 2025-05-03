import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginWithCredentials } from "@/actions/auth";
import SubmitButton from "@/components/auth/submit-button";

const LoginForm = () => {
  return (
    <form
      action={async (formData: FormData) => {
        "use server";
        const result = await loginWithCredentials(formData);
        if (result?.error) {
          console.error(result.error.message);
        }
      }}
    >
      <div className="flex flex-col gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="m@example.com"
            required
            autoComplete="email"
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="password"
          />
        </div>
        <div className="flex flex-col gap-3">
          <SubmitButton />
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
