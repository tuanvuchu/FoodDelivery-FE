"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useEffect } from "react";
import { useUser } from "@/context/user-context";

type ProfileFormSchema = {
  name: string;
  image: string;
  address: string;
};

export function ProfileForm() {
  const { user, accessToken } = useUser();

  const form = useForm<ProfileFormSchema>({
    defaultValues: {
      name: "",
      image: "",
      address: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || "",
        image: user.image || "",
        address: user.address || "",
      });
    }
  }, [user, form]);

  async function onSubmit(data: ProfileFormSchema) {
    try {
      const payload = {
        id: user?.id,
        ...data,
      };
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/update`, {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Họ và tên</FormLabel>
              <FormControl>
                <Input placeholder="Họ và tên" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_IMAGE_URL}/${user?.image}`}
            className="pr-5"
            alt="ttt"
            width={100}
            height={100}
          ></Image>
          <FormField
            control={form.control}
            name="image"
            render={({}) => (
              <FormItem>
                <FormLabel>Ảnh đại diện</FormLabel>
                <FormControl>
                  <Input type="file" accept="image/*" />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Địa chỉ</FormLabel>
              <FormControl>
                <Input placeholder="Địa chỉ" type="address" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Cập nhật</Button>
      </form>
    </Form>
  );
}
