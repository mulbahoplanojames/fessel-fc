"use client";

import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { toast } from "sonner";

type UserRow = {
  id: string;
  name: string;
  email: string;
  role: string | null;
  image: string | null;
  createdAt: string;
  providers: string[];
};

type UserRoleAdminProps = {
  users: UserRow[];
  currentUserId?: string;
};

const ROLES = ["USER", "ADMIN", "PLAYER"];

export default function UserRoleAdmin({
  users,
  currentUserId,
}: UserRoleAdminProps) {
  const router = useRouter();

  const handleRoleChange = async (userId: string, role: string) => {
    try {
      await axios.post("/api/admin/user", { userId, role });
      toast.success("Role updated");
      router.refresh();
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error("Failed to update role");
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead className="hidden md:table-cell">Providers</TableHead>
          <TableHead className="hidden md:table-cell">Joined</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <span className="font-medium">{user.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {user.email}
                  </span>
                </div>
              </div>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <div className="flex flex-wrap gap-1">
                {user.providers.length > 0 ? (
                  user.providers.map((provider) => (
                    <Badge key={provider} variant="outline">
                      {provider}
                    </Badge>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">-</span>
                )}
              </div>
            </TableCell>
            <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
              {new Date(user.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                {user.id === currentUserId && (
                  <Badge variant="outline">You</Badge>
                )}
                <Select
                  value={user.role ?? "USER"}
                  onValueChange={(role) => handleRoleChange(user.id, role)}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ROLES.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}