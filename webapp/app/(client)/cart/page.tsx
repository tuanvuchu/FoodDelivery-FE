"use client";
import BreadcrumbComponent from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/context/user-context";
import { useEffect, useState, useRef } from "react";
import { FormatCurrency } from "@/hooks/format-currency";
import type { Cart } from "@/types/cart";

type CartItems = {
  id: string;
  name: string;
  description: string;
  additional_information: {
    weight: string;
  };
  price: number;
  unit: string;
  quantity: number;
  image: string;
  sku: string;
  slug: string;
  created_at: string;
  updated_at: string;
};
export default function Cart() {
  const { user, accessToken } = useUser();
  const [cartItems, setCartItems] = useState<CartItems[]>([]);
  const [cartId, setCartId] = useState<string | null>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    if (user?.id) {
      getCart(user.id);
    }
  }, [user]);

  async function getCart(user_id: string) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/carts/?user_id=${user_id}`,
        {
          method: "get",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      const data = await res.json();
      if (res.status === 200) {
        setCartId(data.cart_id);
        setCartItems(data.products);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteItem(cart_id: string, product_id: string) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/carts/${cart_id}/items/${product_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        },
      );
      if (res.status === 200) {
        setCartItems(cartItems.filter((item) => item.id !== product_id));
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function updateQuantity(
    cart_id: string,
    product_id: string,
    quantity: number,
  ) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/carts/${cart_id}/items/${product_id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity }),
        },
      );
      if (res.status === 200) {
        setCartItems(
          cartItems.map((item) =>
            item.id === product_id ? { ...item, quantity } : item,
          ),
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleUpdateCart() {
    if (!cartId) {
      return;
    }
    if (!tableRef.current) {
      return;
    }
    const rows = tableRef.current.querySelectorAll("tbody tr");
    const updates: Array<{ productId: string; quantity: number }> = [];
    rows.forEach((row) => {
      const productId = row.getAttribute("data-id");
      const input = row.querySelector("input[type=number]") as HTMLInputElement;
      if (productId && input) {
        const quantity = parseInt(input.value);
        if (quantity > 0) {
          const currentItem = cartItems.find((item) => item.id === productId);
          if (currentItem && currentItem.quantity !== quantity) {
            updates.push({ productId, quantity });
          }
        } else {
        }
      }
    });
    if (updates.length === 0) {
      return;
    }
    for (const { productId, quantity } of updates) {
      await updateQuantity(cartId, productId, quantity);
    }
  }

  return (
    <>
      <BreadcrumbComponent
        backgroundImage="/images/breadcrumb_woo.jpg"
        title="Giỏ hàng"
        breadcrumbs={[{ label: "Trang chủ", href: "/" }, { label: "Giỏ hàng" }]}
      />
      <div className="grid grid-cols-12 gap-6 px-6 pb-10">
        <div className="col-span-8">
          <Table ref={tableRef} className="[&_tr:hover]:bg-transparent">
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead></TableHead>
                <TableHead>Sản phẩm</TableHead>
                <TableHead>Giá</TableHead>
                <TableHead>Số lượng</TableHead>
                <TableHead>Tổng</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartItems.map((p) => (
                <TableRow key={p.id} data-id={p.id}>
                  <TableCell>
                    <span
                      className="freshio-icon-times hover:cursor-pointer"
                      onClick={() => {
                        if (cartId) {
                          deleteItem(cartId, p.id);
                        }
                      }}
                    ></span>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger>
                        <Image
                          className="hover:cursor-pointer"
                          src={`${process.env.NEXT_PUBLIC_API_IMAGE_URL}/${p.image}`}
                          width="100"
                          height="100"
                          alt={p.name}
                        />
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-none w-[900px]">
                        <DialogTitle></DialogTitle>
                        <div className="grid grid-cols-5 gap-4">
                          <div className="col-span-2">
                            <Image
                              src={`${process.env.NEXT_PUBLIC_API_IMAGE_URL}/${p.image}`}
                              width="350"
                              height="350"
                              alt={p.name}
                            />
                          </div>
                          <div className="col-span-3 col-start-3">
                            <h2 className="font-bold text-3xl text-green-900 mb-5">
                              {p.name}
                            </h2>
                            <p className="text-yellow-900 font-bold mb-5">
                              {FormatCurrency(p.price)}
                            </p>
                            <p className="mb-5">{p.description}</p>
                            <p>
                              SKU: <span className="text-[#999]">{p.sku}</span>
                            </p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger>{p.name}</DialogTrigger>
                      <DialogContent className="sm:max-w-none w-[900px]">
                        <DialogTitle></DialogTitle>
                        <div className="grid grid-cols-5 gap-4">
                          <div className="col-span-2">
                            <Image
                              src={`${process.env.NEXT_PUBLIC_API_IMAGE_URL}/${p.image}`}
                              width="350"
                              height="350"
                              alt={p.name}
                            />
                          </div>
                          <div className="col-span-3 col-start-3">
                            <h2 className="font-bold text-3xl text-green-900 mb-5">
                              {p.name}
                            </h2>
                            <p className="text-yellow-900 font-bold mb-5">
                              {FormatCurrency(p.price)}
                            </p>
                            <p className="mb-5">{p.description}</p>
                            <p>
                              SKU: <span className="text-[#999]">{p.sku}</span>
                            </p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                  <TableCell>{FormatCurrency(p.price)}</TableCell>
                  <TableCell>
                    <Input
                      className="w-20"
                      type="number"
                      min={1}
                      defaultValue={p.quantity}
                    />
                  </TableCell>
                  <TableCell>
                    {FormatCurrency(Number(p.price) * p.quantity)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Separator className="mb-5" />
          <div className="flex justify-end">
            <Button
              variant="ghost"
              className="bg-yellow-600 text-white hover:cursor-pointer hover:bg-yellow-700 hover:text-white"
              onClick={handleUpdateCart}
            >
              Cập nhật
            </Button>
          </div>
        </div>
        <div className="col-span-4 col-start-9">
          <Card>
            <CardHeader>
              <CardTitle className="text-green-900">Tổng giỏ hàng</CardTitle>
              <Separator />
            </CardHeader>
            <CardContent className="font-bold">
              <div className="flex justify-between my-5">
                <p className="text-green-900">Tạm tính</p>
                <p>
                  {FormatCurrency(
                    cartItems.reduce(
                      (total, item) => total + item.price * item.quantity,
                      0,
                    ),
                  )}
                </p>
              </div>
              <Separator />
              <div className="flex justify-between my-5">
                <p className="text-green-900">Tổng</p>
                <p className="text-yellow-500">
                  {FormatCurrency(
                    cartItems.reduce(
                      (total, item) => total + item.price * item.quantity,
                      0,
                    ),
                  )}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex pt-5">
              <Link className="w-full" href="/checkout">
                <Button
                  variant="ghost"
                  className=" text-white bg-yellow-500 hover:cursor-pointer hover:text-white hover:bg-yellow-600"
                >
                  Tiến hành thanh toán
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
