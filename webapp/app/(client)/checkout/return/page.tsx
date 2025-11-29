"use client";
import { useSearchParams } from "next/navigation";
import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/user-context";
import { useEffect } from "react";

export default function Return() {
  const { user, accessToken } = useUser();
  const searchParams = useSearchParams();
  const vnp_TxnRef = searchParams.get("vnp_TxnRef");
  const vnp_ResponseCode = searchParams.get("vnp_ResponseCode");
  const vnp_Amount = searchParams.get("vnp_Amount");
  const vnp_OrderInfo = searchParams.get("vnp_OrderInfo");
  const vnp_TmnCode = searchParams.get("vnp_TmnCode");

  useEffect(() => {
    let a;
    if (vnp_TmnCode) {
      a = "vnpay";
    } else {
      a = "cod";
    }
    if (vnp_ResponseCode === "00" && user?.id) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/carts/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          user_id: user.id,
          total: parseInt(vnp_Amount ?? "0"),
          payment_method: a,
          note: vnp_OrderInfo,
        }),
      }).catch((error) => {
        console.error(error);
      });
    }
  }, [user?.id, accessToken, vnp_Amount, vnp_OrderInfo]);

  if (vnp_ResponseCode === "00") {
    return (
      <>
        <div className="grid w-full items-start gap-4 py-10 justify-center">
          <Alert className="flex flex-col items-center">
            <div
              className="freshio-icon-check-square
 text-green-500 text-6xl"
            />
            <AlertTitle className="text-2xl">Thanh toán thành công</AlertTitle>
            <AlertDescription className="flex flex-col items-center">
              Đơn hàng ${vnp_TxnRef} đã được thanh toán. Vui lòng chờ 3 - 5 phút
              để hộ thống có thể xác nhận
              <Button variant="ghost">
                <Link href="/shop">Mua sắm tiếp</Link>
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      </>
    );
  } else if (vnp_ResponseCode === "24")
    return (
      <>
        <div className="grid w-full items-start gap-4 py-10 justify-center">
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Không thể xử lý thanh toán của bạn.</AlertTitle>
            <AlertDescription className="flex flex-col items-center">
              <div>
                <p>Vui lòng kiểm tra lại thông tin thanh toán và thử lại.</p>
                <ul className="list-inside list-disc text-sm">
                  <li>Kiểm tra thông tin thẻ</li>
                  <li>Đảm bảo số dư khả dụng</li>
                  <li>Xác minh địa chỉ thanh toán</li>
                </ul>
              </div>
              <Button variant="ghost">
                <Link href="/checkout">Quay lại</Link>
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      </>
    );
}
