"use client";
import {
  Clock,
  CheckCircle2,
  Truck,
  PackageCheck,
  CircleOff,
} from "lucide-react";
import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}
const statuses = [
  {
    value: "pending",
    label: "Đang chờ",
    icon: Clock,
  },
  {
    value: "confirmed",
    label: "Đã xác nhận",
    icon: CheckCircle2,
  },
  {
    value: "shipping",
    label: "Đang giao hàng",
    icon: Truck,
  },
  {
    value: "delivered",
    label: "Đã giao",
    icon: PackageCheck,
  },
  {
    value: "canceled",
    label: "Đã hủy",
    icon: CircleOff,
  },
];

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Ngày..."
          value={
            (table.getColumn("created_at")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("created_at")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Trạng thái"
            options={statuses}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Đặt lại
            <X />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
