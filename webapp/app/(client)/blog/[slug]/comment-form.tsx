"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  content: z.string().min(1, {
    message: "Hãy để lại một bình luận",
  }),
  blog_id: z.string(),
  user_id: z.string(),
  parent_id: z.string().optional(),
});

type CommentFormProps = {
  blog_id: string;
  user_id: string;
  parent_id?: string;
  onSuccess?: () => void;
  onResetParentId?: () => void;
};

export default function CommentForm({
  blog_id,
  user_id,
  parent_id,
  onSuccess,
  onResetParentId,
}: CommentFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      blog_id,
      user_id,
    },
  });

  useEffect(() => {
    form.setValue("parent_id", parent_id || undefined);
  }, [parent_id]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (onSuccess) onSuccess();
      if (onResetParentId) onResetParentId();
      form.reset({ content: "", blog_id, user_id, parent_id: undefined });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Input type="hidden" {...form.register("blog_id")} />
        <Input type="hidden" {...form.register("user_id")} />
        <Input type="hidden" {...form.register("parent_id")} />
        <Button
          className="border h-10 w-fit bg-[#a8b324] rounded-full hover:cursor-pointer hover:bg-[] mb-20"
          type="submit"
        >
          Gửi bình luận
        </Button>
      </form>
    </Form>
  );
}
