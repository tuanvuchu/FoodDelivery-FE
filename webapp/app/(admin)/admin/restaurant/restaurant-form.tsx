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
import { toast } from "sonner";
import { useUser } from "@/context/user-context";

type UserFormProps = {
  url: string;
  restaurant?: {
    id: string;
    name: string;
    type: string;
    address: string;
    image: string;
  };
};
type UserFormValues = {
  id: string;
  name: string;
  type: string;
  address: string;
  image: string;
};

export default function RestaurantForm({ url, restaurant }: UserFormProps) {
  const { accessToken } = useUser();
  const [imageUrl, setImageUrl] = useState(restaurant?.image ?? "");
  const form = useForm<UserFormValues>({
    defaultValues: {
      id: restaurant?.id ?? undefined,
      name: restaurant?.name ?? "",
      type: restaurant?.type ?? "",
      address: restaurant?.address ?? "",
      image: restaurant?.image ?? "",
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
          name="type"
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
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu</FormLabel>
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
