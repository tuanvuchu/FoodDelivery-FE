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
type FormData = {
  username: string;
};
export default function LostPassword() {
  const form = useForm<FormData>({
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(data: FormData) {
    console.log(JSON.stringify(data, null, 2));
  }
  return (
    <>
      <BreadcrumbComponent
        backgroundImage="/images/breadcrumb_woo.jpg"
        title="Quên mật khẩu"
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Tài khoản của tôi", href: "/my-account" },
          { label: "Quên mật khẩu" },
        ]}
      />
      <div className="m-8 space-y-5">
        <p>
          Vui lòng nhập tên người dùng hoặc địa chỉ email của bạn. Bạn sẽ nhận
          được một liên kết để tạo mật khẩu mới qua email.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-1/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số điện thoại hoặc email </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              variant="ghost"
              className="bg-yellow-500 text-white hover:bg-yellow-600 hover:text-white"
              type="submit"
            >
              Đặt lại mật khẩu
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
