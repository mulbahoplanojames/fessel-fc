import TicketClient from "./_component/ticket-client";

export default async function TicketPurchasePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <TicketClient ticketId={id} />;
}
