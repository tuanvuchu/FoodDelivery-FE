"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import BreadcrumbComponent from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useRouter } from "next/navigation";

type FormData = {
  username: string;
  password: string;
};

export default function Login() {
  const router = useRouter();
  const form = useForm<FormData>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data: FormData) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.status === 201) {
        const data = {
          access_token: json.access_token,
          user: json.user,
        };
        localStorage.setItem("auth", JSON.stringify(data));
        router.back();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <BreadcrumbComponent
        backgroundImage="/images/breadcrumb_woo.jpg"
        title="Đăng nhập"
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Tài khoản của tôi", href: "/my-account" },
          { label: "Đăng nhập" },
        ]}
      />
      <div className="flex justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/5 space-y-6 p-13 bg-[#f6f6f6] mb-7"
          >
            <FormField<FormData>
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số điện thoại hoặc email</FormLabel>
                  <FormControl>
                    <Input className="bg-white" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField<FormData>
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormControl>
                    <Input className="bg-white" type="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              className="w-full bg-yellow-600 hover:bg-yellow-700 hover:text-white text-white hover:cursor-pointer"
              variant="ghost"
              type="submit"
            >
              Đăng nhập
            </Button>
          </form>
        </Form>
      </div>
      <div className="flex justify-evenly mb-12">
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Nhớ tôi
          </label>
        </div>
        <Button variant="link">
          <Link href="/my-account/lost-password">Quên mật khẩu?</Link>
        </Button>
      </div>
    </>
  );
}
