"use client";
import { useUser } from "@/context/user-context";
import { FormatCurrency } from "@/hooks/format-currency";
import { FormatDate } from "@/hooks/format-date";
import { Order } from "@/types/order";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function OrderDetail({ id }: { id: string }) {
  const { accessToken } = useUser();
  const [order, setOrder] = useState<Order | null>(null);

  async function getCart(id: string) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/get-test?id=${id}`,
        {
          method: "get",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  useEffect(() => {
    const fetchCart = async () => {
      const data = await getCart(id);
      setOrder(data);
    };

    if (id && accessToken) {
      fetchCart();
    }
  }, [id, accessToken]);
  return (
    <>
      <div>
        {order && (
          <>
            <div className="flex justify-between pb-5">
              <p>Ngày tạo: {FormatDate(order.created_at)}</p>
              <p>Tổng: {FormatCurrency(order.total)}</p>
            </div>
            <div>
              <p>
                Địa chỉ giao hàng: {order.users.delivery_address[0].address}
              </p>
            </div>
          </>
        )}
        <div className="grid grid-cols-2 gap-4">
          {order?.order_items?.map((p, i) => (
            <div key={i} className="flex gap-2 items-center">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_IMAGE_URL}/${p.products.image}`}
                width={50}
                height={50}
                alt={p.products.name}
              />
              <div>
                <p>
                  {p.products.name} x<span>{p.quantity}</span>
                </p>
                <p>{FormatCurrency(Number(p.total_price))}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
