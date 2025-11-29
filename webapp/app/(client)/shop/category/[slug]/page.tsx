"use client";
import BreadcrumbComponent from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import Link from "next/link";
import { useState, useEffect, use } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ProductCardComponent from "@/components/product-card";
import { ProductCard } from "@/types/product-card";
import { FormatCurrency } from "@/hooks/format-currency";
import ProductCategory from "@/components/category";
import BlogTag from "@/components/tag";

type Product = {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage: number | undefined;
  previousPage: number | undefined;
  items: ProductCard[];
};

const tags = [
  "bánh mì",
  "trái cây",
  "lành mạnh",
  "nước ép",
  "thịt",
  "tự nhiên",
  "hữu cơ",
  "cà chua",
  "rau củ",
];

async function getProduct(
  current: number,
  category?: string,
  minPrice?: number,
  maxPrice?: number,
  orderBy?: string,
): Promise<Product> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/get?current=${current}&min_price=${minPrice}&max_price=${maxPrice}&orderby=${orderBy}&category=${category}`,
      {
        method: "GET",
      },
    );
    return res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [products, setProducts] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000000);
  const [filterMinPrice, setFilterMinPrice] = useState<number>(0);
  const [filterMaxPrice, setFilterMaxPrice] = useState<number>(1000000);
  const [orderBy, setOrderBy] = useState<string>("menu_order");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProduct(
          currentPage,
          slug,
          filterMinPrice,
          filterMaxPrice,
          orderBy,
        );
        setProducts(data);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProducts();
  }, [currentPage, filterMinPrice, filterMaxPrice, orderBy, slug]);

  return (
    <>
      <BreadcrumbComponent
        backgroundImage="/images/breadcrumb_woo.jpg"
        title="Cửa hàng"
        breadcrumbs={[{ label: "Trang chủ", href: "/" }, { label: "Cửa hàng" }]}
      />
      <div className="grid grid-cols-7 gap-4 px-7.5">
        <div className="col-span-2">
          <div className="grid">
            <div className="mb-11">
              <ProductCategory
                title="Thẻ sản phẩm"
                url="shop/category"
                url_api="products"
              />
            </div>
            <div className="mb-11">
              <p className="text-[#0a472e]">Giá</p>
              <Separator className="my-5" />
              <Slider
                onValueChange={(value) => {
                  setMinPrice(value[0]);
                  setMaxPrice(value[1]);
                }}
                defaultValue={[0, 1000000]}
                max={1000000}
                step={10}
              />
              <div className="flex items-center justify-between my-5">
                <p className="text-[#0a472e]">
                  Giá: {FormatCurrency(minPrice)} - {FormatCurrency(maxPrice)}
                </p>
                <Button variant="link" className="hover:cursor-pointer">
                  <Link
                    href={`?min_price=${minPrice}&max_price=${maxPrice}`}
                    onClick={() => {
                      setCurrentPage(1);
                      setFilterMinPrice(minPrice);
                      setFilterMaxPrice(maxPrice);
                    }}
                  >
                    Lọc
                  </Link>
                </Button>
              </div>
            </div>
            <div>
              <BlogTag title="Nhãn" url="shop/tag" tags={tags} />
            </div>
          </div>
        </div>
        <div className="col-span-5 col-start-3">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <div className="grid grid-cols-2">
                <p>
                  Hiển thị 1 - 12 trên {products?.totalItems || 40} sản phẩm
                </p>
                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    className="freshio-icon-th-large"
                  ></Button>
                  <Button
                    variant="ghost"
                    className="freshio-icon-th-list"
                  ></Button>
                  <Select
                    value={orderBy}
                    onValueChange={(value) => {
                      setOrderBy(value);
                      setCurrentPage(1);
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="menu_order">Mặc định</SelectItem>
                      <SelectItem value="popularity">Phổ biến</SelectItem>
                      <SelectItem value="date">Mới nhất</SelectItem>
                      <SelectItem value="price">Giá: Thấp đến cao</SelectItem>
                      <SelectItem value="price-desc">
                        Giá: Cao đến thấp
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <ul className="grid grid-cols-3 gap-4">
              {products?.items?.map((product, index) => (
                <li key={product.id || index}>
                  <ProductCardComponent product={product} />
                </li>
              ))}
            </ul>
            <Pagination className="pb-15">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() =>
                      products?.hasPreviousPage &&
                      setCurrentPage(products.previousPage!)
                    }
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        className="rounded-full"
                        href="#"
                        isActive={page === currentPage}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ),
                )}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() =>
                      products?.hasNextPage &&
                      setCurrentPage(products.nextPage!)
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </>
  );
}
