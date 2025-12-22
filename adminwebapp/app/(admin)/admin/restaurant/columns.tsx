"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../../../../components/data-table/data-table-column-header";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import RestaurantForm from "./restaurant-form";
import Image from "next/image";

export type Restaurant = {
  id: string;
  name: string;
  type: string;
  address: string;
  image: string;
  created_at: string;
  updated_at: string;
};

export const columns: ColumnDef<Restaurant>[] = [
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
    accessorKey: "image",
    header: "Hình ảnh",
    cell: ({ row }) => {
      const image = row.getValue<string>("image");
      return (
        <div>
          <Image
            src={`${process.env.NEXT_PUBLIC_API_IMAGE_URL}/${image}`}
            alt="Hình ảnh"
            width={50}
            height={50}
            priority
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Tên",
  },
  {
    accessorKey: "type",
    header: "Phân loại",
  },
  {
    accessorKey: "address",
    header: "Địa chỉ",
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày tạo" />
    ),
    cell: ({ row }) => FormatDate(row.getValue("created_at")),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Sửa</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle></DialogTitle>
              </DialogHeader>
              <RestaurantForm
                url={`${process.env.NEXT_PUBLIC_API_URL}/restaurants/update/${product.id}`}
                user={product}
              />
            </DialogContent>
          </Dialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="ml-5" variant="destructive">
                Xóa
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Bạn có chắc không?</AlertDialogTitle>
                <AlertDialogDescription>
                  Hành động này không thể hoàn tác.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Hủy</AlertDialogCancel>
                <AlertDialogAction
                  onClick={async () => {
                    try {
                      await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/restaurants/delete/${product.id}`,
                        {
                          method: "delete",
                        },
                      );
                    } catch (error) {
                      console.error(error);
                    }
                  }}
                >
                  Ok
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      );
    },
  },
];
