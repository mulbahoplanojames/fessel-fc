"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  KeyRound,
  Link2,
  Loader2,
  MonitorSmartphone,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { authClient } from "@/lib/auth-client";

interface SessionRow {
  id: string;
  token: string;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
  expiresAt: string;
}

interface AccountRow {
  id: string;
  providerId: string;
  accountId: string;
}

interface AccountSettingsProps {
  sessions: SessionRow[];
  accounts: AccountRow[];
  hasPassword: boolean;
  githubEnabled: boolean;
}

const PROVIDER_LABELS: Record<string, string> = {
  google: "Google",
  github: "GitHub",
  credential: "Email & password",
};

export function AccountSettings({
  sessions,
  accounts,
  hasPassword,
  githubEnabled,
}: AccountSettingsProps) {
  const router = useRouter();
  const { data } = authClient.useSession();
  const currentToken = data?.session?.token;

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordPending, setPasswordPending] = useState(false);
  const [sessionPending, setSessionPending] = useState<string | null>(null);
  const [deletePending, setDeletePending] = useState(false);

  const googleLinked = accounts.some((a) => a.providerId === "google");
  const githubLinked = accounts.some((a) => a.providerId === "github");

  const handleChangePassword = async (event: React.FormEvent) => {
    event.preventDefault();
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("The new passwords do not match.");
      return;
    }
    setPasswordPending(true);
    const { error } = await authClient.changePassword({
      currentPassword,
      newPassword,
      revokeOtherSessions: true,
    });
    setPasswordPending(false);
    if (error) {
      toast.error(error.message ?? "Failed to change your password.");
      return;
    }
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    toast.success("Password updated. Other sessions have been signed out.");
  };

  const revokeSession = async (token: string) => {
    setSessionPending(token);
    await authClient.revokeSession({ token });
    setSessionPending(null);
    toast.success("That session has been signed out.");
    router.refresh();
  };

  const revokeOthers = async () => {
    setSessionPending("others");
    await authClient.revokeOtherSessions();
    setSessionPending(null);
    toast.success("Signed out all other sessions.");
    router.refresh();
  };

  const revokeAll = async () => {
    setSessionPending("all");
    if (currentToken) {
      await authClient.revokeOtherSessions();
      await authClient.revokeSession({ token: currentToken });
    } else {
      await authClient.revokeOtherSessions();
    }
    setSessionPending(null);
    router.replace("/");
    router.refresh();
  };

  const unlinkAccount = async (account: AccountRow) => {
    const { error } = await authClient.unlinkAccount({
      accountId: account.id,
    });
    if (error) {
      toast.error(error.message ?? "Failed to remove this sign-in method.");
      return;
    }
    toast.success(
      `${PROVIDER_LABELS[account.providerId] ?? account.providerId} removed.`
    );
    router.refresh();
  };

  const linkSocial = (provider: "google" | "github") => {
    void authClient.linkSocial({
      provider,
      callbackURL: "/account/settings",
    });
  };

  const deleteAccount = async () => {
    setDeletePending(true);
    await authClient.deleteUser({ callbackURL: "/" });
    router.replace("/");
    router.refresh();
  };

  return (
    <div className="grid gap-6">
      <div className="rounded-xl border bg-card p-6 md:p-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Account Settings
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your password, active sessions, and sign-in methods.
        </p>
      </div>

      {/* Password */}
      <section className="rounded-xl border bg-card p-6 md:p-8">
        <div className="flex items-center gap-3">
          <KeyRound className="size-5 text-primary-clr" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Password
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Use a strong password you don&apos;t reuse elsewhere.
            </p>
          </div>
        </div>
        <Separator className="my-4" />
        {hasPassword ? (
          <form
            onSubmit={handleChangePassword}
            className="grid max-w-md gap-4"
          >
            <div className="grid gap-2">
              <Label htmlFor="current-password">Current password</Label>
              <Input
                id="current-password"
                type="password"
                autoComplete="current-password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-password">New password</Label>
              <Input
                id="new-password"
                type="password"
                autoComplete="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm new password</Label>
              <Input
                id="confirm-password"
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <Button
                type="submit"
                disabled={passwordPending}
                className="bg-primary-clr text-white hover:bg-primary-clr/90"
              >
                {passwordPending && (
                  <Loader2 className="size-4 animate-spin" />
                )}
                Update password
              </Button>
            </div>
          </form>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Your account uses social sign-in and doesn&apos;t have a password
            yet. You can sign in with email &amp; password after connecting one
            of the options below.
          </p>
        )}
      </section>

      {/* Sign-in methods */}
      <section className="rounded-xl border bg-card p-6 md:p-8">
        <div className="flex items-center gap-3">
          <Link2 className="size-5 text-primary-clr" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Sign-in methods
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Ways you can sign in to your account.
            </p>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          {accounts.map((account) => (
            <div
              key={account.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {PROVIDER_LABELS[account.providerId] ?? account.providerId}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {account.providerId === "credential" ? "password account" : "connected"}
                </p>
              </div>
              {account.providerId !== "credential" ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => unlinkAccount(account)}
                >
                  Remove
                </Button>
              ) : (
                <Badge variant="outline">Primary</Badge>
              )}
            </div>
          ))}
        </div>
        {(!googleLinked || (!githubLinked && githubEnabled)) && (
          <div className="mt-4">
            <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
              Connect an additional sign-in method:
            </p>
            <div className="flex flex-wrap gap-3">
              {!googleLinked && (
                <Button
                  variant="outline"
                  onClick={() => linkSocial("google")}
                >
                  Connect Google
                </Button>
              )}
              {!githubLinked && githubEnabled && (
                <Button
                  variant="outline"
                  onClick={() => linkSocial("github")}
                >
                  Connect GitHub
                </Button>
              )}
            </div>
            <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
              You&apos;ll be redirected to the provider to authorize the
              connection, then brought back here.
            </p>
          </div>
        )}
      </section>

      {/* Sessions */}
      <section className="rounded-xl border bg-card p-6 md:p-8">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <MonitorSmartphone className="size-5 text-primary-clr" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Active sessions
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Devices that are currently signed in.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={sessionPending !== null || sessions.length <= 1}
              onClick={revokeOthers}
            >
              {sessionPending === "others" && (
                <Loader2 className="size-4 animate-spin" />
              )}
              Sign out others
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={sessionPending !== null}
              onClick={revokeAll}
            >
              {sessionPending === "all" && (
                <Loader2 className="size-4 animate-spin" />
              )}
              Sign out all
            </Button>
          </div>
        </div>
        <Separator className="my-4" />
        {sessions.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No active sessions found.
          </p>
        ) : (
          <ul className="grid gap-3">
            {sessions.slice(0, 10).map((session) => {
              const isCurrent = Boolean(
                currentToken && session.token === currentToken
              );
              return (
                <li
                  key={session.id}
                  className="flex items-start justify-between rounded-lg border p-4"
                >
                  <div className="flex items-start gap-3">
                    <ShieldCheck
                      className={
                        isCurrent
                          ? "mt-0.5 size-5 text-green-600"
                          : "mt-0.5 size-5 text-gray-400"
                      }
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          {session.userAgent
                            ? `${session.userAgent.slice(0, 60)}${session.userAgent.length > 60 ? "…" : ""}`
                            : "Unknown device"}
                        </p>
                        {isCurrent && <Badge>This device</Badge>}
                      </div>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {session.ipAddress ?? "Unknown IP"} · Signed in{" "}
                        {new Date(session.createdAt).toLocaleDateString()} ·
                        Expires{" "}
                        {new Date(session.expiresAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  {!isCurrent && (
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={sessionPending !== null}
                      onClick={() => revokeSession(session.token)}
                    >
                      {sessionPending === session.token && (
                        <Loader2 className="size-4 animate-spin" />
                      )}
                      Sign out
                    </Button>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {/* Danger zone */}
      <section className="rounded-xl border border-red-200 bg-red-50/60 p-6 md:p-8 dark:border-red-900/50 dark:bg-red-950/20">
        <div className="flex items-center gap-3">
          <AlertTriangle className="size-5 text-red-600 dark:text-red-400" />
          <div>
            <h2 className="text-lg font-semibold text-red-700 dark:text-red-300">
              Danger zone
            </h2>
            <p className="text-sm text-red-600/80 dark:text-red-400/80">
              Permanently delete your account and all stored data, including
              support tickets.
            </p>
          </div>
        </div>
        <Separator className="my-4" />
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-100 hover:text-red-700 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
            >
              <Trash2 className="size-4" />
              Delete account
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete your account?</DialogTitle>
              <DialogDescription>
                This action is permanent. Your profile, sessions, and support
                tickets will be removed. To keep the account, cancel.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" disabled={deletePending}>
                  Cancel
                </Button>
              </DialogClose>
              <Button
                variant="destructive"
                disabled={deletePending}
                onClick={deleteAccount}
              >
                {deletePending && <Loader2 className="size-4 animate-spin" />}
                Yes, delete my account
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>
    </div>
  );
}