"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StatusSelect from "@/components/admin/records/status-select";

type MemberRow = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  membershipType: string;
  amount: number;
  status: string;
  createdAt: string;
};

type FanClubAdminProps = {
  members: MemberRow[];
};

const MEMBER_STATUSES = ["pending", "active", "cancelled"];

export default function FanClubAdmin({ members }: FanClubAdminProps) {
  if (members.length === 0) {
    return (
      <p className="py-12 text-center text-muted-foreground">
        No fan club applications yet.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Member</TableHead>
          <TableHead>Tier</TableHead>
          <TableHead className="hidden md:table-cell">Fee (LRD)</TableHead>
          <TableHead className="hidden lg:table-cell">Date</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((member) => (
          <TableRow key={member.id}>
            <TableCell>
              <div className="flex flex-col">
                <span className="font-medium">
                  {member.firstName} {member.lastName}
                </span>
                <span className="text-sm text-muted-foreground">
                  {member.email}
                </span>
              </div>
            </TableCell>
            <TableCell className="capitalize">{member.membershipType}</TableCell>
            <TableCell className="hidden md:table-cell">
              {member.amount.toLocaleString()}
            </TableCell>
            <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
              {new Date(member.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <StatusSelect
                kind="fanclub"
                id={member.id}
                value={member.status}
                options={MEMBER_STATUSES}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}