"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import BreadcrumbComponent from "@/components/breadcrumb";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import SearchForm from "@/components/search-form";
import { useEffect, useState } from "react";
import { FormatDate } from "@/hooks/format-date";
import BlogCategory from "../../../components/category";
import type { Blog } from "@/types/blog";
import BlogRecentPost from "./components/blog-recent-post";
import BlogTag from "../../../components/tag";
import { Skeleton } from "@/components/ui/skeleton";

type BlogData = {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage: number | null;
  previousPage: number | null;
  items: Blog[];
};

async function getBlogs(current: number): Promise<BlogData> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blogs/get-all?current=${current}&pageSize=10`,
      {
        method: "GET",
      },
    );
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

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

export default function Blog() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [blogData] = await Promise.all([getBlogs(currentPage)]);
        setBlogs(blogData.items);
        setTotalPages(blogData.totalPages);
      } catch (error) {
        console.error(error);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <Skeleton className="w-full h-80 m-10" />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <BreadcrumbComponent
        backgroundImage="/images/breadcrumb_bkg.jpg"
        title="Bài đăng"
        breadcrumbs={[{ label: "Trang chủ", href: "/" }, { label: "Bài đăng" }]}
      />
      <div className="grid grid-cols-8 gap-4 px-7.5">
        <div className="col-span-6 mr-12 pr-12 border-r">
          {blogs.map((p, i) => (
            <article key={i} className="mb-12.5">
              <Image
                className="mb-5.5"
                src={`${process.env.NEXT_PUBLIC_API_IMAGE_URL}/${p.image}`}
                width={1000}
                height={565}
                alt="Picture of the author"
              />
              {p.categories[0]?.name && (
                <Button className="bg-[#a8b324] hover:bg-[#80891b] mb-3.5 max-h-6">
                  <Link href={`blog/category/${p.categories[0].slug}`}>
                    {p.categories[0].name}
                  </Link>
                </Button>
              )}
              <header>
                <div className="flex mb-3 text-[#0a472e]">
                  <span className="freshio-icon-calendar px-1.5">
                    <Link className="underline pl-1.5" href={`blog/${p.slug}`}>
                      {FormatDate(p.created_at)}
                    </Link>
                  </span>
                  {"/"}
                  <span className="freshio-icon-user px-1.5">
                    {" "}
                    bởi
                    <Link
                      className="underline pl-1.5"
                      href={`blog/author/${p.author}`}
                    >
                      {p.author}
                    </Link>
                  </span>
                  {"/"}
                  <span className="freshio-icon-comments-alt px-1.5">
                    {" "}
                    {p.comment_count}
                  </span>
                </div>
                <h2 className="mb-3.5 text-[#0a472e] hover:text-[#a8b324] font-bold text-3xl leading-10">
                  <Link href={`blog/${p.slug}`}>{p.title}</Link>
                </h2>
              </header>
              <div className="w-12">
                <Separator />
              </div>
              <div className="pt-5">
                <p className="mb-5">{p.description}</p>
                <Button
                  variant="link"
                  className="text-[#a8b324] hover:text-[#80891b] hover:cursor-pointer p-0 underline"
                >
                  <Link href={`blog/${p.slug}`}>Xem thêm</Link>
                </Button>
              </div>
            </article>
          ))}
          <Pagination className="pb-10">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() =>
                    currentPage > 1 && handlePageChange(currentPage - 1)
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
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}
              {totalPages > 3 && <PaginationEllipsis />}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() =>
                    currentPage < totalPages &&
                    handlePageChange(currentPage + 1)
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
        <div className="col-span-2 col-start-7">
          <SearchForm />
          <BlogCategory
            title="Danh mục bài đăng"
            url="/blog/category"
            url_api="blogs"
          />
          <BlogRecentPost />
          <BlogTag title="Nhãn" url="/blog/tag" tags={tags} />
        </div>
      </div>
    </>
  );
}
