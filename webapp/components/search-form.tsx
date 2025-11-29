"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type FormData = {
  keyword: string;
};

type SearchFormProps = {
  className?: string;
};

export default function SearchForm({ className }: SearchFormProps) {
  const form = useForm<FormData>({
    defaultValues: {
      keyword: "",
    },
  });

  function onSubmit(data: FormData) {
    console.log(JSON.stringify(data, null, 2));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        <FormField<FormData>
          control={form.control}
          name="keyword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    placeholder="Tìm kiếm ..."
                    className="rounded-full min-h-11 pl-9 pr-23"
                  />
                  <button
                    type="submit"
                    className="absolute inset-y-0 right-5 hover:text-[#80891b] hover:cursor-pointer"
                  >
                    Tìm kiếm
                  </button>
                  <p className="freshio-icon-search absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
