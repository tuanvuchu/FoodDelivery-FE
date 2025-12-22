"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FormatDate } from "@/hooks/format-date";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Order } from "@/types/order";

const statusMap: Record<Order["status"], string> = {
  pending: "Chờ xác nhận",
  confirmed: "Đã xác nhận",
  shipping: "Đang giao",
  delivered: "Đã giao",
  canceled: "Đã hủy",
};
async function deleteOrder(id: string, accessToken: string) {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
}

export function getColumns(accessToken: string): ColumnDef<Order>[] {
  return [
    {
      accessorKey: "id",
      header: "ID Đơn hàng",
    },
    {
      accessorKey: "status",
      header: "Trạng thái",
      cell: ({ row }) => statusMap[row.getValue("status") as Order["status"]],
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Ngày đặt" />
      ),
      cell: ({ row }) => FormatDate(row.getValue("created_at")),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {payment.status === "pending" && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full hover:cursor-pointer justify-start px-2"
                    >
                      Hủy đơn
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Bạn có chắc chắn muốn hủy đơn?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Hành động này không thể hoàn tác. Đơn hàng sẽ bị xóa
                        khỏi hệ thống.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Hủy</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteOrder(payment.id, accessToken)}
                      >
                        Đồng ý
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
              {payment.status === "delivered" && (
                <DropdownMenuItem>
                  <Link href={`/my-account/order/bill?id=${payment.id}`}>
                    Xem hóa đơn
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem>
                <Link href={`/my-account/order/detail?id=${payment.id}`}>
                  Xem chi tiết
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
