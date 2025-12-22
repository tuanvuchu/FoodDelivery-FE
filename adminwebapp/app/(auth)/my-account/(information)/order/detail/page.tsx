"use client";
import { useUser } from "@/context/user-context";
import { FormatCurrency } from "@/hooks/format-currency";
import { Order } from "@/types/order";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderPage() {
  const { accessToken } = useUser();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
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
        },
      );
      const data = await res.json();
      if (res.status === 200) {
        setOrder(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (id && accessToken) {
      getCart(id);
    }
  }, [id, accessToken]);

  return (
    <>
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
    </>
  );
}
