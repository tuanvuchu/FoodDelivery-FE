"use client";
import { useUser } from "@/context/user-context";
import { FormatCurrency } from "@/hooks/format-currency";
import { FormatDate } from "@/hooks/format-date";
import { Order } from "@/types/order";
import Image from "next/image";
import { useEffect, useState } from "react";

import jsPDF from "jspdf";
import addRoboto from "@/public/fonts/Roboto-Regular-normal";

export default function OrderDetail({ id }: { id: string }) {
  const exportInvoicePDF = (order) => {
    const pdf = new jsPDF("p", "mm", "a4");
    addRoboto(pdf);
    pdf.setFont("Roboto");
    pdf.setFontSize(18);
    let y = 15;
    pdf.setFontSize(18);
    pdf.text("HÓA ĐƠN BÁN HÀNG", 105, y, { align: "center" });
    y += 10;

    pdf.setFontSize(10);
    pdf.text(`Mã đơn: ${order.id}`, 14, y);
    pdf.text(
      `Ngày: ${new Date(order.created_at).toLocaleDateString("vi-VN")}`,
      150,
      y
    );
    y += 8;

    pdf.setFontSize(12);
    pdf.text("Thông tin khách hàng", 14, y);
    y += 6;

    pdf.setFontSize(10);
    pdf.text(`Tên: ${order.users.name}`, 14, y);
    y += 5;
    pdf.text(`SĐT: ${order.users.phone}`, 14, y);
    y += 5;
    pdf.text(
      `Địa chỉ: ${order.users.delivery_address?.[0]?.address || ""}`,
      14,
      y,
      { maxWidth: 180 }
    );
    y += 10;

    pdf.setFontSize(12);
    pdf.text("Danh sách sản phẩm", 14, y);
    y += 6;

    pdf.setFontSize(10);
    pdf.text("Sản phẩm", 14, y);
    pdf.text("Đơn giá", 110, y, { align: "right" });
    pdf.text("SL", 135, y, { align: "right" });
    pdf.text("Thành tiền", 190, y, { align: "right" });

    y += 4;
    pdf.line(14, y, 196, y);
    y += 6;

    order.order_items.forEach((item) => {
      pdf.text(item.products.name, 14, y, { maxWidth: 90 });
      pdf.text(Number(item.unit_price).toLocaleString("vi-VN") + " ₫", 110, y, {
        align: "right",
      });
      pdf.text(String(item.quantity), 135, y, { align: "right" });
      pdf.text(
        Number(item.total_price).toLocaleString("vi-VN") + " ₫",
        190,
        y,
        { align: "right" }
      );
      y += 6;
    });

    y += 4;
    pdf.line(14, y, 196, y);
    y += 8;

    pdf.setFontSize(12);
    pdf.text("Tổng cộng:", 135, y, { align: "right" });
    pdf.text(Number(order.total).toLocaleString("vi-VN") + " ₫", 190, y, {
      align: "right",
    });
    y += 10;

    pdf.setFontSize(10);
    pdf.text(`Thanh toán: ${order.payment_method.toUpperCase()}`, 14, y);
    y += 6;
    pdf.text("Cảm ơn quý khách!", 105, y, { align: "center" });

    pdf.save(`hoa-don-${order.id}.pdf`);
  };

  const { accessToken } = useUser();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchCart = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/orders/get-test?id=${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const data = await res.json();
        setOrder(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCart();
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
            <div className="flex pb-4">
              <button
                onClick={() => exportInvoicePDF(order)}
                className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-900"
              >
                Xuất hóa đơn
              </button>
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
