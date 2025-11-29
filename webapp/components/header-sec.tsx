"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { Avatar, AvatarImage } from "./ui/avatar";
import { useUser } from "@/context/user-context";
import { useEffect, useState } from "react";

export default function HeaderSec() {
  const { user, accessToken, setUser } = useUser();
  const [count, setCount] = useState<number>(0);
  const [count1, setCount1] = useState<number>(0);
  const [show, setShow] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 150) {
        setShow(false);
      } else {
        if (currentScrollY < lastScrollY) {
          setShow(true);
        } else {
          setShow(false);
        }
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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
        await cartCount(user?.id, accessToken ?? undefined);
        await wishlistCount(user?.id, accessToken ?? undefined);
      } catch (error) {
        console.error(error);
      }
    };
    if (accessToken) {
      fetchCart();
    }
  }, [user, accessToken]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-white shadow transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="grid">
        <div className="grid grid-cols-5 px-7.5 py-2 items-center">
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
          <div>
            <nav className="flex space-x-6 pl-10 whitespace-nowrap">
              <Link href="/" className=" hover:text-[#a8b324]">
                Trang chủ
              </Link>
              <Link href="/shop" className=" hover:text-[#a8b324]">
                Cửa hàng
              </Link>
              <Link href="/blog" className=" hover:text-[#a8b324]">
                Bài đăng
              </Link>
              <Link href="/contact-us" className=" hover:text-[#a8b324]">
                Liên hệ
              </Link>
              <Link href="/about-us" className=" hover:text-[#a8b324]">
                Về chúng tôi
              </Link>
            </nav>
          </div>
          <div className="flex items-center justify-evenly col-start-5">
            <Button
              variant="ghost"
              className="freshio-icon-search text-[16px] rounded-full bg-[#e8f8f7] hover:bg-[#80891b] hover:cursor-pointer"
            ></Button>
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
      </div>
    </header>
  );
}
