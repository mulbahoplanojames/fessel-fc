"use client";

import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { toast } from "sonner";

type StatusSelectProps = {
  kind: "donation" | "sponsorship" | "order" | "ticket" | "fanclub";
  id: string;
  value: string;
  options: string[];
};

export default function StatusSelect({
  kind,
  id,
  value,
  options,
}: StatusSelectProps) {
  const router = useRouter();

  const handleChange = async (next: string) => {
    if (next === value) return;
    try {
      await axios.post("/api/admin/record", { kind, id, status: next });
      toast.success("Status updated");
      router.refresh();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger className="w-40">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}