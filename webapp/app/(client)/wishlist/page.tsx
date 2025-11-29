"use client";
import BreadcrumbComponent from "@/components/breadcrumb";
import { addToCart } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useUser } from "@/context/user-context";
import { FormatCurrency } from "@/hooks/format-currency";
import { FormatDate } from "@/hooks/format-date";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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
export default function Wishlist() {
  const { user, accessToken } = useUser();
  const [wishlistItems, setWishlistItems] = useState<CartItems[]>([]);
  const [wishlistId, setWishlistId] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      getWishlist(user.id);
    }
  }, [user]);

  async function getWishlist(user_id: string) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/wishlists/?user_id=${user_id}`,
        {
          method: "get",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      const data = await res.json();
      if (res.status === 200) {
        setWishlistId(data.wishlist_id);
        setWishlistItems(data.products);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteItem(wishlist_id: string, product_id: string) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/wishlists/${wishlist_id}/items/${product_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        },
      );
      if (res.status === 200) {
        setWishlistItems(
          wishlistItems.filter((item) => item.id !== product_id),
        );
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <BreadcrumbComponent
        backgroundImage="/images/breadcrumb_bkg.jpg"
        title="Danh sách yêu thích"
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Danh sách yêu thích" },
        ]}
      />
      {wishlistItems.length === 0 ? (
        <div className="mx-5 pb-15">
          Không có sản phẩm nào trong danh sách yêu thích!
        </div>
      ) : (
        <Table className="m-5 w-auto">
          <TableBody>
            {wishlistItems.map((p, i) => (
              <TableRow key={i} data-id={p.id}>
                <TableCell className="border">
                  <span
                    className="freshio-icon-times hover:cursor-pointer"
                    onClick={() => {
                      if (wishlistId) {
                        deleteItem(wishlistId, p.id);
                      }
                    }}
                  ></span>
                </TableCell>
                <TableCell className="border">
                  <Link href={`/shop/${p.slug}`}>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_IMAGE_URL}/${p.image}`}
                      width="100"
                      height="100"
                      alt={p.name}
                    />
                  </Link>
                </TableCell>
                <TableCell className="w-3xl border">
                  <div>
                    <Link
                      href={`/shop/${p.slug}`}
                      className=" text-yellow-500 hover:text-yellow-600"
                    >
                      {p.name}
                    </Link>
                    <p className="py-1.5">{FormatCurrency(p.price)}</p>
                    <p>{FormatDate(new Date(p.created_at))}</p>
                  </div>
                </TableCell>
                <TableCell className="border">
                  <Button
                    onClick={() =>
                      addToCart(accessToken!, user?.id ?? "", {
                        product_id: p.id,
                        quantity: 1,
                      })
                    }
                    variant="ghost"
                    className="bg-yellow-600 text-white hover:bg-yellow-700 hover:text-white hover:cursor-pointer h-12"
                  >
                    Thêm vào giỏ hàng
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}
