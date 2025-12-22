"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import "@/styles/style.css";
type BreadcrumbData = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  backgroundImage?: string;
  title: string;
  breadcrumbs: BreadcrumbData[];
};

export default function BreadcrumbComponent({
  backgroundImage,
  title,
  breadcrumbs,
}: BreadcrumbProps) {
  return (
    <div
      className={`bg-auto bg-center flex items-center px-6 mb-16.5 ${
        backgroundImage
          ? "min-h-38 md:min-h-75"
          : "min-h-5 md:min-h-10 py-5 bg-rose-100"
      }`}
      style={{
        backgroundImage: `url('${backgroundImage}')`,
      }}
    >
      <div>
        {backgroundImage && (
          <h1
            className="text-4xl md:text-5xl leading-15 font-bold mb-2 text-[#03472e]"
            style={{ fontFamily: "Mazzard Soft H" }}
          >
            {title}
          </h1>
        )}
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((item, index) => (
              <div
                key={index}
                className="flex items-center"
                style={{ fontFamily: "Mazzard Soft H" }}
              >
                <BreadcrumbItem>
                  {item.href ? (
                    <BreadcrumbLink asChild>
                      <Link
                        href={item.href}
                        className="hover:text-[#80891b] leading-6"
                      >
                        {item.label}
                      </Link>
                    </BreadcrumbLink>
                  ) : (
                    <span className="leading-6 text-black">{item.label}</span>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}
