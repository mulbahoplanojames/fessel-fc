import React from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import axios from "axios";

interface SponsorTier {
  id: string;
  name: string;
  description: string;
  minAmount: number;
  benefits: string[];
}

interface SponsorTiersProps {
  value: string;
  onValueChange: (value: string) => void;
}

export default function SponsorTiers({ value, onValueChange }: SponsorTiersProps) {
  const [tiers, setTiers] = React.useState<SponsorTier[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchTiers = async () => {
      try {
        const response = await axios.get("/api/donation/tiers");
        setTiers(response.data);
      } catch (error) {
        console.error("Error fetching sponsor tiers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTiers();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading sponsorship options...</div>;
  }

  if (tiers.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No sponsorship tiers available</div>;
  }

  return (
    <RadioGroup value={value} onValueChange={onValueChange} className="space-y-4">
      {tiers.map((tier) => (
        <div key={tier.id} className="flex items-center justify-between space-x-2 border p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={tier.id} id={tier.id} />
            <div>
              <Label htmlFor={tier.id} className="text-base font-medium">
                {tier.name}
              </Label>
              <p className="text-sm text-muted-foreground">{tier.description}</p>
              {tier.benefits.length > 0 && (
                <ul className="text-xs text-muted-foreground mt-1 list-disc list-inside">
                  {tier.benefits.slice(0, 3).map((benefit, idx) => (
                    <li key={idx}>{benefit}</li>
                  ))}
                  {tier.benefits.length > 3 && (
                    <li className="text-primary">+{tier.benefits.length - 3} more benefits</li>
                  )}
                </ul>
              )}
            </div>
          </div>
          <div className="font-semibold">
            {tier.minAmount.toLocaleString()} LRD
          </div>
        </div>
      ))}
    </RadioGroup>
  );
}
