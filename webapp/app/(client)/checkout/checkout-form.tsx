"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

type FormData = {
  first_name: string;
  last_name: string;
  street: string;
  city: string;
  district: string;
  phone: string;
  email: string;
};

export default function CheckoutForm() {
  const form = useForm<FormData>({
    defaultValues: {
      first_name: "",
      last_name: "",
      street: "",
      city: "",
      district: "",
      phone: "",
      email: "",
    },
  });

  function onSubmit() {}
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex justify-between">
          <FormField
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Họ<span className="text-[#e2401c]">*</span>
                </FormLabel>
                <FormControl>
                  <Input className="h-12 px-5 py-3.5" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Tên<span className="text-[#e2401c]">*</span>
                </FormLabel>
                <FormControl>
                  <Input className="h-12 px-5 py-3.5" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormField
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Địa chỉ đường phố<span className="text-[#e2401c]">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="h-12 px-5 py-3.5"
                  placeholder="Số nhà hoặc tên phố"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Thành phố / Thị xã<span className="text-[#e2401c]">*</span>
              </FormLabel>
              <FormControl>
                <Input type="text" className="h-12 px-5 py-3.5" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="district"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Quận / Huyện<span className="text-[#e2401c]">*</span>
              </FormLabel>
              <FormControl>
                <Input type="text" className="h-12 px-5 py-3.5" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Số điện thoại<span className="text-[#e2401c]">*</span>
              </FormLabel>
              <FormControl>
                <Input type="text" className="h-12 px-5 py-3.5" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Địa chỉ email<span className="text-[#e2401c]">*</span>
              </FormLabel>
              <FormControl>
                <Input type="email" className="h-12 px-5 py-3.5" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
