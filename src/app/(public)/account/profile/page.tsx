import { requireUser } from "@/lib/session";
import { EditProfileForm } from "@/components/account/edit-profile-form";

export const metadata = {
  title: "Edit Profile - FC Fassell",
};

export default async function ProfilePage() {
  const session = await requireUser();

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <EditProfileForm
        initialName={session.user.name}
        initialImage={session.user.image ?? ""}
        email={session.user.email}
      />
      <div className="grid gap-6">
        <div className="rounded-xl border bg-card p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Membership
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Your account role on FC Fassell.
          </p>
          <div className="mt-4 inline-flex items-center rounded-full bg-primary-clr/10 px-3 py-1 text-sm font-medium text-primary-clr">
            {session.user.role ?? "USER"}
          </div>
        </div>
        <div className="rounded-xl border bg-card p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Email
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Email notifications are sent to this address.
          </p>
          <p className="mt-4 break-all text-sm font-medium text-gray-800 dark:text-gray-200">
            {session.user.email}
          </p>
        </div>
      </div>
    </div>
  );
}