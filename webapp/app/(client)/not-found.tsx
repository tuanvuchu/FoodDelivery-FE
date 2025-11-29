"use client";
import Image from "next/image";
import "@/styles/style.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div
      style={{ fontFamily: "Mazzard Soft H" }}
      className="bg-pink-100 bg-[url(/images/background_404.png)] bg-auto bg-center min-h-screen flex items-center justify-center"
    >
      <div className="grid grid-cols-1 gap-12 justify-items-center text-center px-4">
        <div>
          <Image src="/images/404.png" width={442} height={227} alt="404" />
        </div>

        <h1 className="text-6xl font-bold mb-4 leading-tight">
          Ôi không, liên kết này đã bị hỏng.
        </h1>
        <p className="text-lg max-w-xl">
          Trang không tồn tại hoặc đã xảy ra lỗi nào đó. Trở về <br />
          <button
            onClick={() => router.back()}
            className="text-[#de2d24] hover:cursor-pointer hover:text-[#a8b324]"
          >
            trang trước
          </button>{" "}
          hoặc quay lại{" "}
          <Link href="/" className="text-[#de2d24] hover:text-[#a8b324]">
            trang chủ
          </Link>
        </p>
      </div>
    </div>
  );
}
