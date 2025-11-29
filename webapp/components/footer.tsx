import Image from "next/image";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import "@/styles/style.css";

export default function Footer() {
  return (
    <>
      <div className="grid bg-[#0A472E] bg-[url(/images/footer-bg_1.png)] bg-auto bg-center px-7.5 align-items: center">
        <div className="grid grid-cols-5 gap-4 py-11">
          <div>
            <div className="flex">
              <div className="freshio-icon-headphones-alt text-[40px] text-[#a8b324] mr-3" />
              <div>
                <p>Gọi chúng tôi 24/7</p>
                <p className="text-[#a8b324]">(+84) 123456789</p>
              </div>
            </div>
          </div>
          <div>
            <p>Theo dõi chúng tôi</p>
            <div className="grid grid-cols-4">
              <div>
                <Link
                  href="https://www.facebook.com/61556175633114"
                  target="_blank"
                  className="freshio-icon-facebook"
                ></Link>
              </div>
              <div>
                <Link
                  href="https://www.youtube.com/channel/UComM7K5n3pIS2H9o1IT0tTw"
                  target="_blank"
                  className="freshio-icon-youtube"
                ></Link>
              </div>
              <div className="col-start-4 row-start-1">
                <Link href="#" className="freshio-icon-twitter"></Link>
              </div>
              <div className="col-start-3 row-start-1">
                <Link href="#" className="freshio-icon-instagram"></Link>
              </div>
            </div>
          </div>
          <div className="col-start-5">
            <Image
              src="/images/payment_1.png"
              width={300}
              height={177}
              alt="Payment"
            />
          </div>
        </div>
        <Separator />
        <div className="grid grid-cols-5 gap-4 [&>div>h2]:text-[#fff] [&>div>h2]:leading-3 [&>div>h2]:text-[12px] [&>div>h2]:font-bold [&>div>h2]:mb-6 [&>div>ul]:text-[#909896] [&>div>ul>li]:pb-2 [&>div>ul>li]:hover:text-[#bac34e] py-16">
          <div>
            <h2>Vị trí cửa hàng</h2>
            <p className="text-[#909896] mb-5">
              904, Bình Minh, Khoái Châu, <br /> Hưng Yên, Việt Nam
            </p>
            <p className="mb-5 text-[#fff] leading-6">
              chutuanvu0206@gmail.com
            </p>
            <Separator className="bg-[#BAC34E]" />
          </div>
          <div>
            <h2>Thông tin</h2>
            <ul>
              <li>
                <Link href="/about-us">Về chúng tôi</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <Link href="/checkout">Thanh toán</Link>
              </li>
              <li>
                <Link href="/contact-us">Liên hệ</Link>
              </li>
              <li>
                <Link href="/service">Dịch vụ</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2>Tài khoản của tôi</h2>
            <ul>
              <li>
                <Link href="/my-account">Tài khoản của tôi</Link>
              </li>
              <li>
                <Link href="/contact-us">Liên hệ</Link>
              </li>
              <li>
                <Link href="/cart">Giỏ hàng</Link>
              </li>
              <li>
                <Link href="/shop">Cửa hàng</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2>Danh mục</h2>
            <ul>
              <li>
                <Link href="">Trái cây & Rau củ</Link>
              </li>
              <li>
                <Link href="">Sản phẩm từ sữa</Link>
              </li>
              <li>
                <Link href="">Thực phẩm đóng gói</Link>
              </li>
              <li>
                <Link href="">Đồ uống</Link>
              </li>
              <li>
                <Link href="">Sức khỏe & Thể chất</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2>Đăng ký nhận tin</h2>
            <ul>
              <span>Đăng ký và nhận phiếu mua hàng trị giá 500.000 VNĐ</span>
              <div className="flex items-center space-x-2 pt-3">
                <Input className="bg-white" placeholder="Địa chỉ email..." />
                <Button
                  className="freshio-icon-long-arrow-right"
                  type="submit"
                ></Button>
              </div>
            </ul>
          </div>
        </div>
        <Separator />
        <div className="text-[#909896] text-center py-11">
          Bản quyền © 2025{" "}
          <Link href="/" className="text-[#a8b324] hover:text-[#80891b]">
            U Food
          </Link>
          . Đã đăng ký mọi quyền.
        </div>
      </div>
    </>
  );
}
