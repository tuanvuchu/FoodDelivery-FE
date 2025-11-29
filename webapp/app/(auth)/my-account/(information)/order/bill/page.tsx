"use client";

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUser } from "@/context/user-context";
import { FormatCurrency } from "@/hooks/format-currency";
import ReadVietnameseNumber from "@/hooks/read-vietnamese-number";
import { Order } from "@/types/order";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { accessToken } = useUser();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    async function fetchOrder() {
      if (id && accessToken) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/orders/get-test?id=${id}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            },
          );
          const data = await res.json();
          setOrder(data);
        } catch (error) {
          console.error(error);
        }
      }
    }

    fetchOrder();
  }, [id, accessToken]);

  if (!order) return <Skeleton className="w-full h-80" />;

  return (
    <>
      <div className="flex flex-col items-center">
        <h2 className="font-bold">HÓA ĐƠN BÁN HÀNG</h2>
        <p className="italic">(SALE INVOICE)</p>
        <p>
          Ngày (date) {new Date(order.created_at).getDate()} tháng (month){" "}
          {new Date(order.created_at).getMonth() + 1} năm (year){" "}
          {new Date(order.created_at).getFullYear()}
        </p>
      </div>
      <Separator className="my-2" />
      <div className="space-y-2.5">
        <p>
          <span className="font-bold">Đơn vị bán hàng</span> (Issued):{" "}
          <span className="font-bold">U Food</span>
        </p>
        <p>
          <span className="font-bold">Mã số thuế</span> (Tax code):{" "}
          <span className="font-bold">0000000000</span>
        </p>
        <p>
          <span className="font-bold">Địa chỉ</span> (Address):{" "}
          <span className="font-bold">Hưng Yên</span>
        </p>
        <div className="flex gap-12">
          <p>
            <span className="font-bold">Số tài khoản</span> (Account No.):{" "}
            <span className="font-bold">000000000</span>
          </p>
          <p>
            <span className="font-bold">Ngân hàng </span>(Bank):{" "}
            <span className="font-bold">{/* {todo} */}</span>
          </p>
        </div>
        <div className="flex gap-12">
          <p>
            <span className="font-bold">Điện thoại</span> (Phone number):{" "}
            <span className="font-bold">0000000000</span>
          </p>
          <p>
            <span className="font-bold">Số Fax</span> (Fax number):{" "}
            <span className="font-bold">0000000000</span>
          </p>
          <p>
            <span className="font-bold">Website:</span> www.com.vn
          </p>
        </div>
      </div>

      <Separator className="my-2" />

      <div className="space-y-2.5">
        <p>
          <span className="font-bold">Họ tên người mua hàng</span>{" "}
          (Customer&apos;s name):{" "}
          <span className="font-bold">{order.users.name}</span>
        </p>
        <p>
          <span className="font-bold">Địa chỉ</span> (Address):{" "}
          <span className="font-bold">{order.users.address}</span>
        </p>
        <div className="flex gap-12">
          <p>
            <span className="font-bold">Số tài khoản</span> (Account No.):{" "}
            <span className="font-bold"></span>
          </p>
          <p>
            <span className="font-bold">Ngân hàng </span>(Bank):{" "}
            <span className="font-bold"></span>
          </p>
        </div>
        <div className="flex gap-12">
          <p>
            <span className="font-bold">Hình thức thanh toán </span>(Payment
            method): <span className="font-bold">{order.payment_method}</span>
          </p>
          <p>
            <span className="font-bold">Đơn vị tiền tệ </span>(Currency):{" "}
            <span className="font-bold">VND</span>
          </p>
        </div>
      </div>

      <Table className="rounded-full mt-4">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">STT (No.)</TableHead>
            <TableHead>Tên hàng hóa, dịch vụ (Description)</TableHead>
            <TableHead>ĐVT (Unit)</TableHead>
            <TableHead>Số lượng (Quantity)</TableHead>
            <TableHead>Đơn giá (Unit price)</TableHead>
            <TableHead>Thành tiền (Amount)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {order.order_items.map((p, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{i + 1}</TableCell>
              <TableCell>{p.products.name}</TableCell>
              <TableCell>{p.products.unit}</TableCell>
              <TableCell>{p.quantity}</TableCell>
              <TableCell>{FormatCurrency(p.unit_price)}</TableCell>
              <TableCell>{FormatCurrency(p.total_price)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5} className="text-right">
              <span className="font-bold">Cộng tiền hàng hóa, dịch vụ </span>
              (Total payment):
            </TableCell>
            <TableCell className="font-bold">
              {FormatCurrency(order.total)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={6}>
              <span className="font-bold">Số tiền viết bằng chữ </span>
              (Total payment): {ReadVietnameseNumber(order.total)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={6}>
              <span className="font-bold">Tỷ giá quy đổi </span>
              (Exchange rate): {/* {todo} */}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
