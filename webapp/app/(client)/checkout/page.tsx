"use client";
import CheckoutForm from "./checkout-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BreadcrumbComponent from "@/components/breadcrumb";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
import { useUser } from "@/context/user-context";
import { FormatCurrency } from "@/hooks/format-currency";

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
export default function Checkout() {
  const { user, accessToken } = useUser();
  const [cartItems, setCartItems] = useState<CartItems[]>([]);
  const [cartId, setCartId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "vnpay">("cod");
  const [couponCode, setCouponCode] = useState("");

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

  async function vnPay(amount: number, info: string) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payment-url`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            amount: amount,
            info: info,
          }),
        },
      );

      const data = await res.text();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const applyCoupon = async () => {
    if (!couponCode) {
      return;
    }
    setCouponCode("");
  };

  const handlePlaceOrder = async () => {
    const total = calculateTotal();

    try {
      if (!user || !cartId) return;

      if (paymentMethod === "vnpay") {
        const paymentUrl = await vnPay(total, cartId);
        window.location.href = paymentUrl as string;
      } else {
        window.location.href = `/checkout/return?vnp_Amount=${total}&vnp_OrderInfo=Thanh+toan+don+hang+${user.id}&vnp_ResponseCode=00`;
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      getCart(user.id);
    }
  }, [user]);

  return (
    <>
      <BreadcrumbComponent
        backgroundImage="/images/breadcrumb_woo.jpg"
        title="Thanh toán"
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Thanh toán" },
        ]}
      />
      <Accordion type="single" collapsible className="mx-5 pb-10">
        <AccordionItem value="item-1">
          <AccordionTrigger className="bg-blue-300 px-5 [&_svg]:hidden">
            Có mã giảm giá? Nhấn vào đây để nhập mã của bạn.
          </AccordionTrigger>
          <AccordionContent>
            <Label htmlFor="coupon-code" className="my-7">
              Nếu bạn có mã giảm giá, vui lòng nhập ở bên dưới.
            </Label>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                id="coupon-code"
                type="text"
                placeholder="Mã giảm giá"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <Button
                className="text-white bg-yellow-500 hover:bg-yellow-600 hover:text-white hover:cursor-pointer"
                onClick={applyCoupon}
              >
                Áp dụng
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <h2 className="font-bold text-green-700 mx-5 pb-6">Chi tiết đơn hàng</h2>
      <div className="grid grid-cols-7 gap-12 mx-5">
        <div className="col-span-4">
          <CheckoutForm />
        </div>
        <div className="col-span-3 col-start-5">
          <Card>
            <CardHeader className="text-green-900">
              <CardTitle>Đơn hàng của bạn</CardTitle>
              <div className="flex justify-between my-5">
                <div>Sản phẩm</div>
                <div>Tạm tính</div>
              </div>
            </CardHeader>
            <CardContent>
              <Separator />
              <div className=" my-5">
                {cartItems.map((p, i) => (
                  <>
                    <div key={i} className="flex justify-between">
                      <p className="text-green-900">
                        {p.name} <span>x {p.quantity}</span>
                      </p>
                      <p className="text-green-900">
                        {FormatCurrency(p.price)}
                      </p>
                    </div>
                  </>
                ))}
              </div>
              <div className="flex justify-between my-5 font-bold">
                <p className="text-green-900">Tạm tính</p>
                <p className="text-green-900">
                  {FormatCurrency(calculateTotal())}
                </p>
              </div>
              <Separator />
              <div className="flex justify-between my-5 font-bold">
                <p className="text-green-900">Tổng cộng</p>
                <p className="text-yellow-500 text-2xl">
                  {" "}
                  {FormatCurrency(calculateTotal())}
                </p>
              </div>
              <RadioGroup
                defaultValue="comfortable"
                onValueChange={(value) =>
                  setPaymentMethod(value as "cod" | "vnpay")
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cod" id="r1" />
                  <Label htmlFor="r1">Thanh toán khi nhận hàng</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="vnpay" id="r2" />
                  <Label htmlFor="r2">VNPay</Label>
                </div>
              </RadioGroup>
            </CardContent>
            <CardFooter className="pt-5 flex flex-col">
              <p className="my-5">
                Dữ liệu cá nhân của bạn sẽ được sử dụng để xử lý đơn hàng, hỗ
                trợ trải nghiệm của bạn trên trang web này, và cho các mục đích
                khác được mô tả trong{" "}
                <span className="text-yellow-500">
                  <Link href="/termsandconditions">
                    chính sách quyền riêng tư
                  </Link>
                </span>{" "}
                của chúng tôi.
              </p>
              <Button
                onClick={handlePlaceOrder}
                variant="ghost"
                className="w-full text-white bg-yellow-500 hover:cursor-pointer hover:text-white hover:bg-yellow-600"
              >
                Đặt hàng
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
