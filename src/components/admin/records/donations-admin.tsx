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

type DonationRow = {
  id: string;
  donationType: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  firstName: string;
  lastName: string | null;
  email: string;
  phone: string | null;
  message: string | null;
  anonymous: boolean;
  status: string;
  createdAt: string;
};

type DonationsAdminProps = {
  donations: DonationRow[];
};

const DONATION_STATUSES = ["PENDING", "COMPLETED", "FAILED"];

export default function DonationsAdmin({ donations }: DonationsAdminProps) {
  if (donations.length === 0) {
    return (
      <p className="py-12 text-center text-muted-foreground">
        No donations recorded yet.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Donor</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead className="hidden md:table-cell">Method</TableHead>
          <TableHead className="hidden lg:table-cell">Date</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {donations.map((donation) => (
          <TableRow key={donation.id}>
            <TableCell>
              <div className="flex flex-col">
                <span className="font-medium">
                  {donation.anonymous
                    ? "Anonymous"
                    : `${donation.firstName} ${donation.lastName ?? ""}`.trim()}
                </span>
                <span className="text-sm text-muted-foreground">
                  {donation.email}
                </span>
              </div>
            </TableCell>
            <TableCell className="capitalize">{donation.donationType}</TableCell>
            <TableCell className="font-medium">
              {donation.currency}{" "}
              {donation.amount.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </TableCell>
            <TableCell className="hidden md:table-cell capitalize">
              {donation.paymentMethod}
            </TableCell>
            <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
              {new Date(donation.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <StatusSelect
                kind="donation"
                id={donation.id}
                value={donation.status}
                options={DONATION_STATUSES}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}