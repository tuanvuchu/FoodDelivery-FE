"use client";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "./data-table";
import { getColumns } from "./columns";
import { useUser } from "@/context/user-context";
import { useEffect, useState } from "react";
import { Order } from "@/types/order";

export default function SettingsAccountPage() {
  const { user, accessToken } = useUser();
  const [order, setOrder] = useState<Order[]>([]);
  const columns = getColumns(accessToken!);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/api/v1/orders/${user?.id}`,
          {
            method: "get",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        const data = await res.json();
        setOrder(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (user) {
      fetchPayment();
    }
  }, [user, accessToken]);
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Đơn hàng</h3>
      </div>
      <Separator />
      <DataTable columns={columns} data={order} />
    </div>
  );
}
