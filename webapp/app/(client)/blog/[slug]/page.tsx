"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import SearchForm from "@/components/search-form";
import { FormatDate } from "@/hooks/format-date";
import { use, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import BlogTag from "../../../../components/tag";
import BlogCategory from "../../../../components/category";
import { Blog } from "@/types/blog";
import BlogRecentPost from "../components/blog-recent-post";
import BreadcrumbComponent from "@/components/breadcrumb";
import { Comment } from "@/types/comment";
import CommentForm from "./comment-form";
import { useUser } from "@/context/user-context";
import { Skeleton } from "@/components/ui/skeleton";

const tags = [
  "Kinh doanh",
  "lành mạnh",
  "tự nhiên",
  "hữu cơ",
  "Bài viết",
  "cà chua",
  "Chủ đề",
];

async function getBlogPost(slug: string): Promise<Blog | undefined> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blogs/get-by-slug?slug=${slug}`,
      { method: "get" },
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function getComment(slug: string): Promise<Comment[] | undefined> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/comments/?slug=${slug}`,
      { method: "get" },
    );
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
  const { slug } = use(params);
  const { user } = useUser();
  const [parentId, setParentId] = useState<string | undefined>(undefined);
  const [blog, setBlog] = useState<Blog | undefined>(undefined);
  const [comment, setComment] = useState<Comment[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchComments = async () => {
    try {
      const data = await getComment(slug);
      setComment(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogData, commentData] = await Promise.all([
          getBlogPost(slug),
          getComment(slug),
        ]);
        setBlog(blogData);
        setComment(commentData);
      } catch (error) {
        console.error(error);
        setError("err");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <Skeleton className="w-full h-80" />;
  }

  if (error || !blog) {
    notFound();
  }

  return (
    <>
      <BreadcrumbComponent
        title="Về chúng tôi"
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          {
            label: blog.categories[0]?.name ?? "",
            href: `/blog/category/${blog.categories[0]?.slug ?? ""}`,
          },
          { label: blog.title },
        ]}
      />
      <div className="grid grid-cols-8 gap-4 px-7.5">
        <div className="col-span-6 mr-12 pr-12 border-r">
          <article className="mb-12.5">
            {blog.categories.map((p, i) => (
              <Button
                key={i}
                className="bg-[#a8b324] hover:bg-[#80891b] mb-3.5 max-h-6 mr-2"
              >
                <Link href={`category/${p.slug}`}>{p.name}</Link>
              </Button>
            ))}
            <h2 className="mb-3.5 text-[#0a472e] font-bold text-3xl leading-10">
              {blog.title}
            </h2>
            <header>
              <div className="flex mb-3 text-[#0a472e]">
                <span className="freshio-icon-calendar px-1.5">
                  <Link
                    className="underline pl-1.5"
                    href={`/blog/${blog.slug}`}
                  >
                    {FormatDate(blog.created_at)}
                  </Link>
                </span>
                {"/"}
                <span className="freshio-icon-user px-1.5">
                  bởi
                  <Link
                    className="underline pl-1.5"
                    href={`/blog/author/${blog.author}`}
                  >
                    {blog.author}
                  </Link>
                </span>
                {"/"}
                <span className="freshio-icon-comments-alt px-1.5">
                  {blog.comment_count}
                </span>
              </div>
            </header>
            <Separator className="my-5" />
            <Image
              className="mb-5.5"
              src={`${process.env.NEXT_PUBLIC_API_IMAGE_URL}/${blog.image}`}
              width={1000}
              height={565}
              alt="Picture of the author"
            />
            <div className="pt-5">
              <div className="mb-5">
                {blog.content.map((p, i) => {
                  if (p.paragraph) {
                    return (
                      <p className="text-[#555] text-[14px] mb-5" key={i}>
                        {p.paragraph}
                      </p>
                    );
                  }
                  if (p.quote) {
                    return (
                      <blockquote
                        key={i}
                        className="leading-9 text-[#333] text-[20px] pl-9 my-7 border-l-5 border-[#a8b324]"
                      >
                        {p.quote}
                      </blockquote>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </article>
          <Separator className="my-5" />
          <div className="flex justify-between">
            {blog.pre && (
              <Link href={blog.pre.slug} className="group">
                <div className="flex items-center">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_IMAGE_URL}/${blog.pre.image}`}
                    width={120}
                    height={120}
                    alt={blog.pre.title}
                    className="mr-5"
                  />
                  <div>
                    <h2>Trước</h2>
                    <p className="group-hover:text-yellow-500 max-w-[150px] truncate">
                      {blog.pre.title}
                    </p>
                  </div>
                </div>
              </Link>
            )}
            {blog.next && (
              <Link href={blog.next.slug} className="group">
                <div className="flex items-center">
                  <div>
                    <h2>Sau</h2>
                    <p className="group-hover:text-yellow-500 max-w-[150px] truncate">
                      {blog.next.title}
                    </p>
                  </div>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_IMAGE_URL}/${blog.next.image}`}
                    width={120}
                    height={120}
                    alt={blog.next.title}
                    className="ml-5"
                  />
                </div>
              </Link>
            )}
          </div>
          <Separator className="my-5" />
          <div>
            <h2 className="font-bold text-green-800 py-5 text-2xl">
              {blog.comment_count} bình luận
            </h2>

            {comment?.map((p, i) => (
              <div key={i} data-id={p.id}>
                <div className="flex">
                  <div className="mr-4">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_IMAGE_URL}/${p.users.image}`}
                      alt={p.users.name}
                      width={50}
                      height={50}
                    />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h2 className="pr-5 font-bold">{p.users.name}</h2>
                      <p className="text-[#999]">
                        {FormatDate(new Date(p.created_at))}
                      </p>
                    </div>
                    <p className="py-2 text-[#555]">{p.content}</p>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setParentId(p.id);
                      }}
                      className="hover:cursor-pointer hover:bg-white text-[#a8b324]"
                    >
                      Trả lời
                    </Button>
                  </div>
                </div>
                <Separator className="my-5" />
                {p.other_comments && (
                  <div className="reply-comment pl-10">
                    {p.other_comments.map((p1, i) => (
                      <div key={i}>
                        <div className="flex">
                          <div className="mr-4">
                            <Image
                              src={`${process.env.NEXT_PUBLIC_API_IMAGE_URL}/${p1.users.image}`}
                              alt={p1.users.name}
                              width={50}
                              height={50}
                              className="rounded-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-4">
                              <h2 className="font-bold">{p1.users.name}</h2>
                              <p className="text-[#999]">
                                {FormatDate(new Date(p1.created_at))}
                              </p>
                            </div>
                            <p className="py-2 text-[#555]">{p1.content}</p>
                            <Button
                              variant="ghost"
                              onClick={() => {
                                setParentId(p.id);
                              }}
                              className="hover:cursor-pointer hover:bg-white text-[#a8b324]"
                            >
                              Trả lời
                            </Button>
                          </div>
                        </div>
                        <Separator className="my-5" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          {user && (
            <div>
              <h2 className="font-bold text-green-800 py-5 text-2xl">
                Để lại bình luận
              </h2>
              <CommentForm
                blog_id={blog.id}
                user_id={user.id}
                parent_id={parentId}
                onSuccess={fetchComments}
                onResetParentId={() => setParentId(undefined)}
              />
            </div>
          )}
        </div>
        <div className="col-span-2 col-start-7">
          <SearchForm />
          <BlogCategory title="Danh mục" url="category" url_api="blogs" />
          <BlogRecentPost />
          <BlogTag title="Thẻ" url="tag" tags={tags} />
        </div>
      </div>
    </>
  );
}
