"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import UserForm from "./user-form";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: number;
  address: string;
  image: string;
  account_type: string;
  is_actived: string;
};

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên" />
    ),
  },

  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "SĐT",
  },
  {
    accessorKey: "address",
    header: "Địa chỉ",
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
    accessorKey: "account_type",
    header: "Loại",
  },
  {
    accessorKey: "is_actived",
    header: "Kích hoạt",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Sửa</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle></DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <UserForm
                url={`${process.env.NEXT_PUBLIC_API_URL}/users/update`}
                user={user}
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
                        `${process.env.NEXT_PUBLIC_API_URL}/users/delete/${user.id}`,
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
