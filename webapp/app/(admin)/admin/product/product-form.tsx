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
import { useEffect, useState } from "react";
import { useUser } from "@/context/user-context";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ProductFormProps = {
  url: string;
  product?: {
    id: string;
    restaurant_id: string;
    name: string;
    description: string;
    ingredients: string;
    price: number;
    sale_price: number;
    image: string;
    restaurants: {
      id: string;
      name: string;
    };
  };
};

type ProductFormValues = {
  id: string;
  restaurant_id: string;
  name: string;
  description: string;
  ingredients: string;
  price: number;
  sale_price: number;
  image: string;
};

export default function ProductForm({ url, product }: ProductFormProps) {
  const { accessToken } = useUser();
  const [restaurants, setRestaurants] = useState<
    { id: string; name: string }[]
  >([]);

  async function getRes() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/restaurants/get-all-admin`,
      );
      const data = await res.json();
      setRestaurants(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getRes();
  }, []);

  const [imageUrl, setImageUrl] = useState(product?.image ?? "");
  const form = useForm<ProductFormValues>({
    defaultValues: {
      id: product?.id ?? "",
      restaurant_id: product?.restaurant_id ?? "",
      name: product?.name ?? "",
      description: product?.description ?? "",
      ingredients: product?.ingredients ?? "",
      price: product?.price ?? 0,
      sale_price: product?.sale_price ?? 0,
      image: product?.image ?? "",
    },
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      const payload = {
        ...data,
        price: Number(data.price),
        sale_price: Number(data.sale_price),
      };
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });
      form.reset();
      toast("Thành công");
      const result = await res.json();
      if (url.includes("/create")) {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tags`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product_id: result.id,
          }),
        });
      }
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
              <FormLabel>Tên sản phẩm</FormLabel>
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả</FormLabel>
              <FormControl>
                <Textarea className="max-h-[20px] overflow-y-auto" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2.5">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá</FormLabel>
                <FormControl>
                  <Input min={0} type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sale_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá khuyến mãi</FormLabel>
                <FormControl>
                  <Input min={0} type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="restaurant_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nhà hàng</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn nhà hàng" />
                  </SelectTrigger>
                  <SelectContent>
                    {restaurants.map((r) => (
                      <SelectItem key={r.id} value={r.id}>
                        {r.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="submit">Lưu thay đổi</Button>
        </div>
      </form>
    </Form>
  );
}
