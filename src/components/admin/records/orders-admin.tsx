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

type OrderItem = {
  id?: string;
  name?: string;
  price?: number;
  quantity?: number;
};

type OrderRow = {
  id: string;
  customerName: string;
  email: string;
  phone: string | null;
  items: OrderItem[];
  total: number;
  currency: string;
  paymentMethod: string;
  status: string;
  createdAt: string;
};

type OrdersAdminProps = {
  orders: OrderRow[];
};

const ORDER_STATUSES = [
  "PENDING",
  "CONFIRMED",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

export default function OrdersAdmin({ orders }: OrdersAdminProps) {
  if (orders.length === 0) {
    return (
      <p className="py-12 text-center text-muted-foreground">
        No orders yet.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead className="hidden md:table-cell">Items</TableHead>
          <TableHead>Total</TableHead>
          <TableHead className="hidden md:table-cell">Payment</TableHead>
          <TableHead className="hidden lg:table-cell">Date</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => {
          const itemCount = order.items.reduce(
            (sum, item) => sum + (item.quantity ?? 0),
            0
          );
          return (
            <TableRow key={order.id}>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">
                    {order.customerName}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {order.email}
                  </span>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <details>
                  <summary className="cursor-pointer text-sm font-medium">
                    {itemCount} item{itemCount === 1 ? "" : "s"}
                  </summary>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    {order.items.map((item, index) => (
                      <li key={item.id ?? index} className="flex gap-2">
                        <span>
                          {item.name} x{item.quantity}
                        </span>
                        <span className="ml-auto">
                          ${((item.price ?? 0) * (item.quantity ?? 0)).toFixed(
                            2
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </details>
              </TableCell>
              <TableCell className="font-medium">
                {order.currency} {order.total.toFixed(2)}
              </TableCell>
              <TableCell className="hidden md:table-cell capitalize">
                {order.paymentMethod}
              </TableCell>
              <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                {new Date(order.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <StatusSelect
                  kind="order"
                  id={order.id}
                  value={order.status}
                  options={ORDER_STATUSES}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}