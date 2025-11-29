import { Separator } from "@/components/ui/separator";
import { FormatDate } from "@/hooks/format-date";
import type { Blog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

async function blogRecent(): Promise<Blog[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blogs/get-recent`,
    );
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data: Blog[] = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
}
export default function BlogRecentPost() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await blogRecent();
      setBlogs(data);
    };
    load();
  }, []);

  return (
    <div className="mb-10">
      <p className="text-[#0a472e] font-bold">Bài đăng gần đây</p>
      <Separator className="my-5" />
      <ul className="space-y-3">
        {blogs.map((p) => (
          <li className="grid grid-cols-3" key={p.slug}>
            <Link className="mr-5" href={`/blog/${p.slug}`}>
              <Image
                src={`${process.env.NEXT_PUBLIC_API_IMAGE_URL}/${p.image}`}
                width={100}
                height={100}
                alt="Picture of the author"
              />
            </Link>
            <div className="col-span-2">
              <Link
                className="hover:text-[#80891b] font-bold"
                href={`/blog/${p.slug}`}
              >
                {p.title}
              </Link>
              <p className="mt-1.5 text-[#b0b0b0] text-[12px]">
                {FormatDate(p.created_at)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
