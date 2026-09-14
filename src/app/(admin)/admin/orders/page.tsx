import { Card, CardContent } from "@/components/ui/card";
import prisma from "../../../../../prisma";
import OrdersAdmin from "@/components/admin/records/orders-admin";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  });

  const serialized = orders.map((order) => ({
    id: order.id,
    customerName: order.customerName,
    email: order.email,
    phone: order.phone,
    items: order.items as {
      id?: string;
      name?: string;
      price?: number;
      quantity?: number;
    }[],
    total: order.total,
    currency: order.currency,
    paymentMethod: order.paymentMethod,
    status: order.status,
    createdAt: order.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground mt-1">
          Shop orders placed through the checkout page.
        </p>
      </div>

      <Card>
        <CardContent className="p-0">
          <OrdersAdmin orders={serialized} />
        </CardContent>
      </Card>
    </div>
  );
}