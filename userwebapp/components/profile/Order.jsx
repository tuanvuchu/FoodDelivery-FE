import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import axios from "axios";
import { useRouter } from "next/router";
import { formatToVND } from "../../lib/formatToVND";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const existingCart = localStorage.getItem("auth");
        if (existingCart) {
          setCurrentUser(JSON.parse(existingCart));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;
    const getOrders = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`
        );
        setOrders(res);
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, [id]);

  return (
    <div className="lg:p-8 flex-1 lg:mt-0 mt-5">
      <Title addClass="text-[40px]">Đơn hàng</Title>
      <div className="overflow-x-auto mt-5">
        <table className="text-sm text-center text-gray-500 w-full">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="py-3 px-6">
                Id
              </th>
              <th scope="col" className="py-3 px-6">
                Địa chỉ
              </th>
              <th scope="col" className="py-3 px-6">
                Ngày
              </th>
              <th scope="col" className="py-3 px-6">
                Tổng
              </th>
              <th scope="col" className="py-3 px-6">
                Trạng thái
              </th>
            </tr>
          </thead>
          <tbody>
            {orders?.data?.map((order) => (
              <tr
                key={order.id}
                className="transition-all bg-secondary border-gray-700 hover:bg-primary cursor-pointer"
                onClick={() => router.push(`/order/${order.id}`)}
              >
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white text-center">
                  {order.id.slice(0, 5)}...
                </td>

                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                  {currentUser?.user.address}
                </td>

                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                  {new Date(order.created_at).toLocaleString("vi-VN")}
                </td>

                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                  {formatToVND(order.total)}
                </td>

                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                  {order.status === "pending" && "Đang chơ"}
                  {order.status === "shipping" && "Đang giao"}
                  {order.status === "delivered" && "Đã giao"}
                  {order.status === "cancelled" && "Đã huỷ"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
