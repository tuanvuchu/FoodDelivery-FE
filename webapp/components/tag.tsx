import Link from "next/link";
import { Button } from "@/components/ui/button";
import slug from "@/hooks/slug";
import { Separator } from "@/components/ui/separator";

type TagProps = {
  title: string;
  url: string;
  tags: string[];
};

export default function BlogTag({ title, url, tags }: TagProps) {
  return (
    <div className="mb-11">
      <span className="text-[#0a472e] font-bold">{title}</span>
      <Separator className="my-5" />
      {tags.map((p, i) => (
        <Link key={i} href={`${url}/${slug(p)}`}>
          <Button
            variant="outline"
            className="rounded-[50] hover:bg-[#a8b324] hover:text-white hover:cursor-pointer px-4 m-1"
          >
            {p}
          </Button>
        </Link>
      ))}
    </div>
  );
}
