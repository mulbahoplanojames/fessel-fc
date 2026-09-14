"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import StatusSelect from "@/components/admin/records/status-select";

type SponsorshipRow = {
  id: string;
  company: string;
  contactName: string;
  position: string | null;
  email: string;
  phone: string | null;
  tier: string;
  message: string | null;
  status: string;
  createdAt: string;
};

type SponsorshipsAdminProps = {
  sponsorships: SponsorshipRow[];
};

const SPONSORSHIP_STATUSES = ["PENDING", "APPROVED", "REJECTED"];

const tierAmount: Record<string, number> = {
  bronze: 500000,
  silver: 1000000,
  gold: 2500000,
  platinum: 5000000,
};

export default function SponsorshipsAdmin({
  sponsorships,
}: SponsorshipsAdminProps) {
  if (sponsorships.length === 0) {
    return (
      <p className="py-12 text-center text-muted-foreground">
        No sponsorship requests yet.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Company</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead className="hidden md:table-cell">Tier</TableHead>
          <TableHead className="hidden lg:table-cell">Value</TableHead>
          <TableHead className="hidden lg:table-cell">Date</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sponsorships.map((sponsorship) => (
          <TableRow key={sponsorship.id}>
            <TableCell>
              <div className="flex flex-col">
                <span className="font-medium">{sponsorship.company}</span>
                <span className="text-sm text-muted-foreground">
                  {sponsorship.email}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <span>{sponsorship.contactName}</span>
                <span className="text-sm text-muted-foreground">
                  {sponsorship.position ?? "-"}
                </span>
              </div>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <Badge variant="outline" className="capitalize">
                {sponsorship.tier}
              </Badge>
            </TableCell>
            <TableCell className="hidden lg:table-cell">
              LRD {(tierAmount[sponsorship.tier] ?? 0).toLocaleString()}
            </TableCell>
            <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
              {new Date(sponsorship.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <StatusSelect
                kind="sponsorship"
                id={sponsorship.id}
                value={sponsorship.status}
                options={SPONSORSHIP_STATUSES}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}