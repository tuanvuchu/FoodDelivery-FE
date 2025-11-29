"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { useUser } from "@/context/user-context";
import { toast } from "sonner";

type UserFormProps = {
  url: string;
  user?: {
    id: string;
    name: string;
    password: string;
    email: string;
    phone: number;
    address: string;
    image: string;
  };
};
type UserFormValues = {
  id: string;
  name: string;
  password: string;
  email: string;
  phone?: number;
  address: string;
  image: string;
};

export default function UserForm({ url, user }: UserFormProps) {
  const { accessToken } = useUser();
  const [imageUrl, setImageUrl] = useState(user?.image ?? "");
  const form = useForm<UserFormValues>({
    defaultValues: {
      id: user?.id ?? undefined,
      name: user?.name ?? "",
      password: user?.password ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? undefined,
      address: user?.address ?? "",
      image: user?.image ?? "",
    },
  });

  const onSubmit = async (data: UserFormValues) => {
    try {
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      });
      form.reset();
      toast("Thành công");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex">
          <Input
            className="mr-5"
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const formData = new FormData();
              formData.append("file", file);
              try {
                const res = await fetch(
                  `${process.env.NEXT_PUBLIC_API_URL}/file-upload/upload`,
                  {
                    method: "POST",
                    body: formData,
                  },
                );

                const result = await res.json();
                setImageUrl(result.filePath);
                form.setValue("image", result.filePath);
              } catch (error) {
                console.error(error);
              }
            }}
          />
          {imageUrl && (
            <div className="mt-2">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_IMAGE_URL}/${imageUrl}`}
                alt="Preview"
                width={50}
                height={50}
                className="object-cover border"
              />
            </div>
          )}
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2.5">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số điện thoại</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Địa chỉ</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button type="submit">Lưu thay đổi</Button>
        </div>
      </form>
    </Form>
  );
}
