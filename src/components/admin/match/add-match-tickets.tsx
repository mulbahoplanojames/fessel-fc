import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { TabsContent } from "@/components/ui/tabs";
import { DBMatch } from "@/types/match-type";
import { Plus, Trash } from "lucide-react";

interface AddMatchTicketsProps {
  match: DBMatch;
  handleTicketChange: (field: string, value: string | number) => void;
  handleTicketSectionChange: (
    index: number,
    field: string,
    value: string | number
  ) => void;
  removeTicketSection: (index: number) => void;
  addTicketSection: () => void;
}

const AddMatchTickets: React.FC<AddMatchTicketsProps> = ({
  match,
  handleTicketChange,
  handleTicketSectionChange,
  removeTicketSection,
  addTicketSection,
}) => {
  return (
    <TabsContent value="tickets">
      <Card>
        <CardHeader>
          <CardTitle>Ticket Information</CardTitle>
          <CardDescription>
            Configure ticket details for this match.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {match.ticketsAvailable ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="ticketPrice">Base Ticket Price (RWF)</Label>
                  <Input
                    id="ticketPrice"
                    type="number"
                    min="0"
                    value={match.tickets?.price || ""}
                    onChange={(e) =>
                      handleTicketChange("price", e.target.value)
                    }
                    placeholder="Enter base ticket price"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ticketQuantity">
                    Total Tickets Available
                  </Label>
                  <Input
                    id="ticketQuantity"
                    type="number"
                    min="1"
                    value={match.tickets?.quantity || ""}
                    onChange={(e) =>
                      handleTicketChange("quantity", e.target.value)
                    }
                    placeholder="Enter total number of tickets"
                    required
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Ticket Sections</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addTicketSection}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Section
                  </Button>
                </div>

                {match.tickets?.sections &&
                match.tickets.sections.length > 0 ? (
                  <div className="space-y-4">
                    {match.tickets.sections.map((section, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-medium">Section {index + 1}</h4>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeTicketSection(index)}
                          >
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`section-name-${index}`}>
                              Section Name
                            </Label>
                            <Input
                              id={`section-name-${index}`}
                              value={section.name}
                              onChange={(e) =>
                                handleTicketSectionChange(
                                  index,
                                  "name",
                                  e.target.value
                                )
                              }
                              placeholder="e.g., General, VIP"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`section-price-${index}`}>
                              Price (RWF)
                            </Label>
                            <Input
                              id={`section-price-${index}`}
                              type="number"
                              min="0"
                              value={section.price}
                              onChange={(e) =>
                                handleTicketSectionChange(
                                  index,
                                  "price",
                                  e.target.value
                                )
                              }
                              placeholder="Enter price"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`section-available-${index}`}>
                              Available Seats
                            </Label>
                            <Input
                              id={`section-available-${index}`}
                              type="number"
                              min="0"
                              value={section.available}
                              onChange={(e) =>
                                handleTicketSectionChange(
                                  index,
                                  "available",
                                  e.target.value
                                )
                              }
                              placeholder="Enter available seats"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 border rounded-lg">
                    <p className="text-muted-foreground">
                      No ticket sections added yet.
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-4"
                      onClick={addTicketSection}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Section
                    </Button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                Tickets are not available for this match.
              </p>
              <p className="text-sm text-muted-foreground">
                To enable ticket sales, go to the Basic Info tab and toggle
                Tickets Available.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default AddMatchTickets;
