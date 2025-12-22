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
import { useUser } from "@/context/user-context";
import { useEffect } from "react";

type AccountFormSchema = {
  email: string;
  phone: string;
  password: string;
};

export function AccountForm() {
  const { user, accessToken } = useUser();

  const form = useForm<AccountFormSchema>({
    defaultValues: {
      email: "",
      phone: "",
      password: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        email: user.email || "",
        phone: user.phone || "",
        password: "",
      });
    }
  }, [user, form]);

  async function onSubmit(data: AccountFormSchema) {
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
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
                <Input placeholder="Số điện thoại" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <Input
                  autoComplete="new-password"
                  placeholder="Mật khẩu"
                  type="password"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Cập nhật</Button>
      </form>
    </Form>
  );
}
