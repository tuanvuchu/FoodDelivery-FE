"use client";
import BreadcrumbComponent from "@/components/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCardComponent, {
  addToCart,
  addToWishlist,
} from "@/components/product-card";
import { ProductCard } from "@/types/product-card";
import { Product } from "@/types/product";
import { FormatCurrency } from "@/hooks/format-currency";
import Slug from "@/hooks/slug";
import { useUser } from "@/context/user-context";

async function findBySlug(slug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/slug/${slug}`,
      {
        method: "get",
      },
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function findRan4() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/ran`, {
      method: "get",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { user, accessToken } = useUser();
  const targetRef = useRef<HTMLDivElement>(null);
  const [showHeader, setShowHeader] = useState(false);
  const { slug } = use(params);
  const [a, setA] = useState<Product>();
  const [b, setB] = useState<ProductCard[]>([]);
  const [c, setC] = useState<ProductCard[]>([]);

  useEffect(() => {
    findBySlug(slug).then(setA);
    findRan4().then(setB);
    findRan4().then(setC);
    const handleScroll = () => {
      if (!targetRef.current) return;
      const rect = targetRef.current.getBoundingClientRect();
      const hasScrolledPast = rect.top <= 0;
      setShowHeader(hasScrolledPast);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [slug]);
  // if (!a) {
  //   return notFound();
  // }
  return (
    <>
      {a && (
        <>
          <BreadcrumbComponent
            backgroundImage="/images/breadcrumb_bkg.jpg"
            title={a.name}
            breadcrumbs={[
              { label: "Trang chủ", href: "/" },
              { label: "Sản phẩm", href: "/shop" },
              { label: `${a.name}` },
            ]}
          />
          <div className="px-7 space-y-15">
            <div className="grid grid-cols-2 gap-12 ">
              <div className="border size-125">
                <Image
                  className="w-full h-auto"
                  src={`${process.env.NEXT_PUBLIC_API_IMAGE_URL}/${a.image}`}
                  alt="test"
                  width={200}
                  height={200}
                ></Image>
              </div>
              <div>
                <div className="flex justify-between items-center mb-3">
                  <Badge className="border-0 bg-[#defaf2] text-black h-5">
                    {a.quantity > 0 ? "Còn hàng" : "Hết hàng"}
                  </Badge>
                  <div>
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Link href={a.pre?.slug ?? "#"}>
                          <Button
                            variant="link"
                            className="hover:no-underline hover:cursor-pointer hover:text-[#a8b324]"
                          >
                            Trước
                          </Button>
                        </Link>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-60 p-1.5">
                        <Link href={a.pre?.slug ?? "#"}>
                          <div className="grid grid-cols-3 grid-rows-2">
                            <div className="row-span-2">
                              <Image
                                alt="gg"
                                src={`${process.env.NEXT_PUBLIC_API_IMAGE_URL}/${a.pre?.image}`}
                                width={100}
                                height={100}
                              />
                            </div>
                            <div className="col-span-2 hover:text-[#a8b324]">
                              {a.pre?.name}
                            </div>
                            <div className="col-span-2 col-start-2 row-start-2 text-[#a8b324]">
                              {FormatCurrency(Number(a.pre?.price))}
                            </div>
                          </div>
                        </Link>
                      </HoverCardContent>
                    </HoverCard>
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Link href={a.next?.slug ?? "#"}>
                          <Button
                            variant="link"
                            className="hover:no-underline hover:cursor-pointer hover:text-[#a8b324]"
                          >
                            Sau
                          </Button>
                        </Link>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-60 p-1.5">
                        <Link href={a.next?.slug ?? "#"}>
                          <div className="grid grid-cols-3 grid-rows-2">
                            <div className="row-span-2">
                              <Image
                                alt={a.next?.name || "next image"}
                                src={`${process.env.NEXT_PUBLIC_API_IMAGE_URL}/${a.next?.image}`}
                                width={100}
                                height={100}
                              />
                            </div>
                            <div className="col-span-2 hover:text-[#a8b324]">
                              {a.next?.name}
                            </div>
                            <div className="col-span-2 col-start-2 row-start-2 text-[#a8b324]">
                              {FormatCurrency(Number(a.next?.price))}
                            </div>
                          </div>
                        </Link>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                </div>
                <h2 className="font-bold text-3xl text-green-900 mb-5">
                  {a.name}
                </h2>
                <p className="text-yellow-900 font-bold mb-5">
                  {FormatCurrency(Number(a.price))}
                </p>
                <p className="mb-5">{a.description}</p>
                {a.quantity > 0 ? (
                  <div className="flex items-center w-3/6 space-x-2 my-5">
                    <Input type="number" min={1} defaultValue={1} />
                    <Button
                      type="submit"
                      className="bg-yellow-600 hover:cursor-pointer hover:bg-yellow-900"
                      onClick={() =>
                        addToCart(accessToken!, user?.id ?? "", {
                          product_id: a.id,
                          quantity: 1,
                        })
                      }
                    >
                      Thêm vào giỏ hàng
                    </Button>
                  </div>
                ) : (
                  <Button disabled className="my-5 bg-gray-400 w-full">
                    Hết hàng
                  </Button>
                )}
                <div>
                  <Button
                    variant="ghost"
                    className="freshio-icon-random hover:bg-white hover:cursor-pointer hover:text-yellow-500"
                  >
                    So sánh
                  </Button>
                  <Button
                    onClick={() =>
                      addToWishlist(accessToken!, user?.id ?? "", {
                        product_id: a.id,
                      })
                    }
                    variant="ghost"
                    className="freshio-icon-heart hover:bg-white hover:cursor-pointer hover:text-yellow-500"
                  >
                    Danh sách yêu thích
                  </Button>
                </div>
                <Separator className="my-5" />
                <p className="mb-5">
                  SKU: <span className="text-[#999]">{a.sku}</span>
                </p>
                <p>
                  Danh mục:{" "}
                  <span>
                    {a.categories.map((p, i) => (
                      <Link key={i} href={`product-category/${Slug(p)}`}>
                        <Button variant="link" className="p-0 text-[#999]">
                          {p} {","}
                        </Button>
                      </Link>
                    ))}
                  </span>
                </p>
              </div>
            </div>
            <Tabs
              ref={targetRef}
              defaultValue="description"
              className=" items-center"
            >
              <TabsList className="flex justify-center">
                <TabsTrigger value="description">Mô tả</TabsTrigger>
                <TabsTrigger value="additional_information">
                  Thông tin bổ sung
                </TabsTrigger>
              </TabsList>
              <TabsContent className="w-5/6" value="description">
                {a.description}
              </TabsContent>
              <TabsContent className="w-5/6" value="additional_information">
                <p> Trọng lượng: {a.additional_information.weight}</p>
                <p>Đơn vị: {a.unit}</p>
              </TabsContent>
            </Tabs>
            <div>
              <div className="flex items-center gap-4">
                <Separator className="flex-1" />
                <h2 className="font-bold text-green-800 text-2xl">
                  Có thể bạn sẽ thích...
                </h2>
                <Separator className="flex-1" />
              </div>
              <div className="flex">
                {b.map((p, i) => (
                  <div key={i} className="md:basis-1/2 lg:basis-1/4 pl-0">
                    <ProductCardComponent product={p} />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-4">
                <Separator className="flex-1" />
                <h2 className="font-bold text-green-800 text-2xl">
                  Sản phẩm liên quan
                </h2>
                <Separator className="flex-1" />
              </div>
              <div className="flex">
                {c.map((p, i) => (
                  <div key={i} className="md:basis-1/2 lg:basis-1/4 pl-0">
                    <ProductCardComponent product={p} />
                  </div>
                ))}
              </div>
            </div>
            {showHeader && (
              <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow px-4 py-2 ">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="border">
                      <Image
                        alt={a.name}
                        src={`${process.env.NEXT_PUBLIC_API_IMAGE_URL}/${a.image}`}
                        width={75}
                        height={75}
                      />
                    </div>
                    <div>
                      <p>Bạn đang xem: {a.name}</p>
                      <p className="text-yellow-600">
                        {FormatCurrency(Number(a.price))}
                      </p>
                    </div>
                  </div>
                  <div>
                    <Button
                      type="submit"
                      className="bg-yellow-600 hover:bg-yellow-900"
                      onClick={() =>
                        addToCart(accessToken!, user?.id ?? "", {
                          product_id: a.id,
                          quantity: 1,
                        })
                      }
                    >
                      Thêm vào giỏ hàng
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
