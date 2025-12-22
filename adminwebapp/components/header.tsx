"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import Image from "next/image";
import SearchForm from "./search-form";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useUser } from "@/context/user-context";
import { useEffect, useState } from "react";

export default function Header() {
  const { user, accessToken, setUser } = useUser();
  const [count, setCount] = useState<number>(0);
  const [count1, setCount1] = useState<number>(0);

  async function cartCount(user_id?: string, accessToken?: string) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/carts/?user_id=${user_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      const data = await res.json();
      setCount(data.count);
    } catch (error) {
      console.error(error);
    }
  }

  async function wishlistCount(user_id?: string, accessToken?: string) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/wishlists/?user_id=${user_id}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      const data = await res.json();
      setCount1(data.count);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    const fetchCart = async () => {
      try {
        await cartCount(user?.id, accessToken!);
        await wishlistCount(user?.id, accessToken!);
      } catch (error) {
        console.error(error);
      }
    };
    if (accessToken) {
      fetchCart();
    }
  }, [user, accessToken]);

  return (
    <header>
      <div className="grid">
        <div className="grid grid-cols-5 px-7.5 py-5 items-center">
          <div>
            <Link href="/">
              <Image
                src="/images/logo.svg"
                alt="Freshio Logo"
                width={120}
                height={40}
              />
            </Link>
          </div>
          <div className="col-span-2 w-2/3">
            <SearchForm className="mb-0" />
          </div>
          <div className="flex col-start-4">
            <div className="freshio-icon-headphones-alt text-[40px] text-[#a8b324] mr-3" />
            <div>
              <p>Gọi chúng tôi 24/7:</p>
              <p className="text-[#a8b324]">(+84) 123456789</p>
            </div>
          </div>
          <div className="flex items-center justify-evenly col-start-5">
            {user ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Avatar className="size-10">
                            <AvatarImage
                              src={`${process.env.NEXT_PUBLIC_API_IMAGE_URL}/${user.image}`}
                              alt={user.name}
                            />
                          </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{user.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link href="/my-account">Tài khoản</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="hover:cursor-pointer"
                      onClick={() => {
                        setUser(null);
                        localStorage.removeItem("auth");
                      }}
                    >
                      Đăng xuất
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link href="/my-account/login">
                <Button
                  variant="ghost"
                  className="freshio-icon-user text-[16px] rounded-full bg-[#e8f8f7] hover:bg-[#80891b] hover:cursor-pointer"
                ></Button>
              </Link>
            )}

            <Link href="/wishlist">
              <Button
                variant="ghost"
                className="freshio-icon-heart text-[16px] rounded-full bg-[#e8f8f7] hover:bg-[#80891b] hover:cursor-pointer"
              >
                <div className="relative">
                  <span className="absolute -top-10 -right-4 bg-[#dfb178] text-white text-xs rounded-full size-5 flex items-center justify-center">
                    {count1}
                  </span>
                </div>
              </Button>
            </Link>

            <Link href="/cart">
              <Button
                variant="ghost"
                className="freshio-icon-shopping-basket text-[16px] rounded-full bg-[#e8f8f7] hover:bg-[#80891b] hover:cursor-pointer"
              >
                <div className="relative">
                  <span className="absolute -top-10 -right-4 bg-[#dfb178] text-white text-xs rounded-full size-5 flex items-center justify-center">
                    {count}
                  </span>
                </div>
              </Button>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-5 bg-[#0a472e] px-7.5">
          <div className="flex items-center py-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="freshio-icon-bars bg-[#80891b] hover:bg-[#80891b] h-13 rounded-full text-white hover:text-white hover:cursor-pointer border-0"
                >
                  {" "}
                  Mua theo Danh mục
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-70">
                <DropdownMenuItem className="px-7.5 py-2.5">
                  <div className="freshio-icon-salad"></div>
                  <span>Trái cây & Rau củ</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="px-7.5 py-2.5">
                    <div className="freshio-icon-meat"></div>
                    <span>Thực phẩm bổ sung</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>
                        <span>Rau củ</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span>Thịt tươi</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span>Quà tặng Trái cây & Hạt</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span>Quả mọng tươi</span>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="px-7.5 py-2.5">
                    <div className="freshio-icon-egg-fried"></div>
                    <span>Sữa, Bánh mì & Trứng</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>
                        <span>Bánh mì kẹp trứng</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span>Bánh Phục sinh</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span>Bánh ngọt Bồ Đào Nha</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span>Bánh mì Challah</span>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="px-7.5 py-2.5">
                  <div className="freshio-icon-pizza-slice"></div>
                  <span>Thực phẩm Đóng gói</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="px-7.5 py-2.5">
                    <div className="freshio-icon-apple-alt"></div>
                    <span>Làm đẹp & Chăm sóc</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>
                        <span>Móng gel</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span>Đông mỡ</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span>Tái tạo bề mặt da</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span>Nối mi</span>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="px-7.5 py-2.5">
                  <div className="freshio-icon-volleyball-ball"></div>
                  <span>Sức khỏe & Thể chất</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="px-7.5 py-2.5">
                  <div className="freshio-icon-ice-cream"></div>
                  <span>Em bé & Trẻ nhỏ</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="px-7.5 py-2.5">
                  <div className="freshio-icon-leaf"></div>
                  <span>Chăm sóc Nhà cửa</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="px-7.5 py-2.5">
                  <div className="freshio-icon-badge-percent"></div>
                  <span>Ưu đãi Nóng</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
            <nav className="flex space-x-6 pl-10 whitespace-nowrap">
              <Link href="/" className="text-white hover:text-[#a8b324]">
                Trang chủ
              </Link>
              <Link href="/shop" className="text-white hover:text-[#a8b324]">
                Cửa hàng
              </Link>
              <Link href="/blog" className="text-white hover:text-[#a8b324]">
                Bài đăng
              </Link>
              <Link
                href="/contact-us"
                className="text-white hover:text-[#a8b324]"
              >
                Liên hệ
              </Link>
              <Link
                href="/about-us"
                className="text-white hover:text-[#a8b324]"
              >
                Về chúng tôi
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
