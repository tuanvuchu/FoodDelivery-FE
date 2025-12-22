"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../../../../components/data-table/data-table-column-header";
import { useState } from "react";
import { FormatCurrency } from "@/hooks/format-currency";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import OrderDetail from "./order-detail";
import { useUser } from "@/context/user-context";
import { FormatDate } from "@/hooks/format-date";

export type Order = {
  id: string;
  user_id: string;
  total: number;
  status: string;
  payment_method: string;
  note: string;
  created_at: string;
};

type Status = {
  value: string;
  label: string;
};

const statuses: Status[] = [
  { value: "shipping", label: "Đang giao hàng" },
  { value: "delivered", label: "Đã giao" },
  { value: "canceled", label: "Đã hủy" },
];

type StatusCellProps = {
  initialStatus: string;
  order: Order;
};

const StatusCell = ({ initialStatus, order }: StatusCellProps) => {
  const { accessToken } = useUser();

  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(
    statuses.find((s) => s.value === initialStatus) || null,
  );

  const updateStatusApi = async (orderId: string, newStatus: string) => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}/status`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        },
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="justify-start">
            {selectedStatus ? selectedStatus.label : "Trạng thái"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Trạng thái..." />
            <CommandList>
              <CommandGroup>
                {statuses.map((status) => (
                  <CommandItem
                    key={status.value}
                    value={status.value}
                    onSelect={(value) => {
                      updateStatusApi(order.id, value);
                      setSelectedStatus(
                        statuses.find((s) => s.value === value) || null,
                      );
                      setOpen(false);
                    }}
                  >
                    {status.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export const columns: ColumnDef<Order>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tổng" />
    ),
    cell: ({ row }) => FormatCurrency(row.original.total),
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => (
      <StatusCell initialStatus={row.getValue("status")} order={row.original} />
    ),
  },
  {
    accessorKey: "payment_method",
    header: "Phương thức",
  },
  {
    accessorKey: "note",
    header: "Ghi chú",
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
        <>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Xem chi tiết</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <AlertDialogHeader>
                <DialogTitle></DialogTitle>
              </AlertDialogHeader>
              <OrderDetail id={payment.id} />
            </DialogContent>
          </Dialog>
        </>
      );
    },
  },
];
