import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { formatToVND } from "../../lib/formatToVND";
import jsPDF from "jspdf";
import addRoboto from "../../public/fonts/Roboto-Regular-normal";

export default function Order() {
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

  const router = useRouter();
  const { id } = router.query;
  const [orders, setOrders] = useState([]);
  const statusMap = {
    pending: "Đang chờ",
    shipping: "Đang giao",
    delivered: "Đã giao",
    cancelled: "Đã hủy",
  };
  useEffect(() => {
    if (!id) return;
    const getOrders = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/orders/get-test/?id=${id}`
        );
        setOrders(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, [id]);

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-6 bg-gray-50">
      <div className="grid grid-cols-2 gap-6 bg-white p-6 rounded-lg border border-gray-200">
        <div>
          <h3 className="text-sm text-gray-500">Mã đơn hàng</h3>
          <p className="font-medium text-gray-900">{orders.id}</p>
        </div>

        <div>
          <h3 className="text-sm text-gray-500">Trạng thái</h3>
          <p className="font-medium text-blue-600">
            {statusMap[orders.status] || orders.status}
          </p>
        </div>

        <div>
          <h3 className="text-sm text-gray-500">Khách hàng</h3>
          <p className="text-gray-900">{orders?.users?.name}</p>
          <p className="text-sm text-gray-500">{orders?.users?.phone}</p>
        </div>

        <div>
          <h3 className="text-sm text-gray-500">Địa chỉ giao hàng</h3>
          <p className="text-gray-900">
            {orders?.users?.delivery_address[0]?.address}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="py-3 px-4 text-left">Sản phẩm</th>
              <th className="py-3 px-4 text-center">Giá</th>
              <th className="py-3 px-4 text-center">Số lượng</th>
              <th className="py-3 px-4 text-right">Tổng</th>
            </tr>
          </thead>
          <tbody>
            {orders?.order_items?.map((item) => (
              <tr
                key={item.product_id}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="py-4 px-4 flex items-center gap-3">
                  <Image
                    layout="fill"
                    alt={item.products.name}
                    src={`/images/${item.products.image}`}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <span className="text-gray-900">{item.products.name}</span>
                </td>
                <td className="py-4 px-4 text-center">
                  {formatToVND(item.unit_price)}
                </td>
                <td className="py-4 px-4 text-center">{item.quantity}</td>
                <td className="py-4 px-4 text-right font-medium">
                  {formatToVND(item.total_price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center bg-white p-6 rounded-lg border border-gray-200">
        <span className="text-lg font-medium text-gray-700">Tổng</span>
        <span className="text-2xl font-bold text-emerald-600">
          {formatToVND(orders.total)}
        </span>
      </div>

      <button
        onClick={() => exportInvoicePDF(orders)}
        className="px-5 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 relative z-50"
      >
        Xuất hóa đơn PDF
      </button>
    </div>
  );
}
