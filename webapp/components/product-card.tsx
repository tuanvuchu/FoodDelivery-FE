import Link from "next/link";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Eye, Heart } from "lucide-react";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { ProductCard } from "@/types/product-card";
import { FormatCurrency } from "@/hooks/format-currency";
import { useUser } from "@/context/user-context";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import Slug from "@/hooks/slug";

type ProductProps = {
  product: ProductCard;
};

interface AddCartItemDto {
  product_id: string;
  quantity: number;
}

type CartItem = {
  cart_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  updated_at: string;
};

type Cart = {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  cart_items: CartItem[];
};

interface AddWishlistItemDto {
  product_id: string;
  wishlist_id?: number;
}
export async function addToCart(
  accessToken: string,
  user_id: string,
  item: AddCartItemDto,
): Promise<void> {
  try {
    const resCarts = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/carts`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const carts: Cart[] = await resCarts.json();
    let cart = carts.find((c) => c.user_id === user_id);
    if (!cart) {
      const resCreate = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/carts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ user_id }),
        },
      );

      if (!resCreate.ok) throw new Error("Không thể tạo giỏ hàng");
      cart = await resCreate.json();
    }
    const resAddItem = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/carts/${cart?.id}/items`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          product_id: item.product_id,
          quantity: item.quantity,
        }),
      },
    );
    if (!resAddItem.ok) throw new Error("Không thể thêm sản phẩm vào giỏ");
    toast("Đã thêm");
  } catch (error) {
    console.error(error);
  }
}

export async function addToWishlist(
  accessToken: string,
  user_id: string,
  item: AddWishlistItemDto,
): Promise<void> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishlists`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const carts: Cart[] = await res.json();
    let cart = carts.find((c) => c.user_id === user_id);
    if (!cart) {
      const resCreate = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/wishlists`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ user_id }),
        },
      );

      if (!resCreate.ok) throw new Error("Không thể tạo giỏ hàng");
      cart = await resCreate.json();
    }
    const resAddItem = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/wishlists/${cart?.id}/items`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          wishlist_id: item.wishlist_id,
          product_id: item.product_id,
        }),
      },
    );
    if (!resAddItem.ok) throw new Error("Không thể thêm sản phẩm vào giỏ");
    toast("Đã thêm");
  } catch (error) {
    console.error(error);
  }
}

export default function ProductCardComponent({ product }: ProductProps) {
  const { user, accessToken } = useUser();
  return (
    <Card className="group/product size-fit shadow-none text-center items-center">
      <CardContent className=" p-0">
        <div className="overflow-hidden relative">
          <Link href={`shop/${product.slug}`}>
            <Image
              className="transition-transform duration-300 ease-in-out transform group-hover/product:scale-110"
              src={`${process.env.NEXT_PUBLIC_API_IMAGE_URL}/${product.image}`}
              width={234}
              height={177}
              alt={product.name}
            />
          </Link>
          {/* todo */}
          <div className="absolute inset-x-0 bottom-10 flex justify-center gap-1 opacity-0 group-hover/product:opacity-100 group-hover/product:bottom-5 transition-[opacity,bottom] duration-300">
            <Button
              variant="ghost"
              className="shop-control"
              onClick={() =>
                addToWishlist(accessToken!, user?.id ?? "", {
                  product_id: product.id,
                })
              }
            >
              <Heart />
            </Button>
            {/* <Button variant="ghost" className="shop-control">
              <GitCompareArrows />
            </Button> */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" className="shop-control">
                  <Eye />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-none w-[900px]">
                <DialogTitle></DialogTitle>
                <div className="grid grid-cols-5 gap-4">
                  <div className="col-span-2">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_IMAGE_URL}/${product.image}`}
                      width="350"
                      height="350"
                      alt={product.name}
                    />
                  </div>
                  <div className="col-span-3 col-start-3">
                    <h2 className="font-bold text-3xl text-green-900 mb-5">
                      {product.name}
                    </h2>
                    <p className="text-yellow-900 font-bold mb-5">
                      {FormatCurrency(Number(product.price))}
                    </p>
                    <p className="mb-5">{product.description}</p>
                    {product.quantity > 0 ? (
                      <div className="flex items-center w-3/6 space-x-2 my-5">
                        <Input type="number" min={1} defaultValue={1} />
                        <Button
                          type="submit"
                          className="bg-yellow-600 hover:cursor-pointer hover:bg-yellow-900"
                          onClick={() =>
                            addToCart(accessToken!, user?.id ?? "", {
                              product_id: product.id,
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
                    <Separator className="my-5" />
                    <p className="mb-5">
                      SKU: <span className="text-[#999]">{product.sku}</span>
                    </p>
                    <p>
                      Danh mục:{" "}
                      {product.categories?.length > 0 && (
                        <span>
                          {product.categories.map((p, i) => (
                            <Link key={i} href={`product-category/${Slug(p)}`}>
                              <Button
                                variant="link"
                                className="p-0 text-[#999]"
                              >
                                {p}
                                {i < product.categories.length - 1 && ","}
                              </Button>
                            </Link>
                          ))}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="grid justify-items-center">
          <h3>
            <Link
              href={`shop/${product.slug}`}
              className="hover:text-[#a8b324]"
            >
              {product.name}
            </Link>
          </h3>
          <span className="text-[#a8b324] my-1.5">
            {FormatCurrency(product.price)}
          </span>
        </div>
      </CardContent>
      <div
        className="w-[50px] group-hover/product:w-[100px] 
             transition-all duration-700 ease-in-out"
      >
        <Separator className="bg-[#999]" />
      </div>
      <CardFooter className="justify-center">
        <Button
          variant="ghost"
          className="hover:text-[#a8b324] hover:bg-white hover:cursor-pointer"
          onClick={() =>
            addToCart(accessToken!, user?.id ?? "", {
              product_id: product.id,
              quantity: 1,
            })
          }
        >
          Thêm vào giỏ hàng
        </Button>
      </CardFooter>
    </Card>
  );
}
