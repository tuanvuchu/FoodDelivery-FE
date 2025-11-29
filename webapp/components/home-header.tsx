import Link from "next/link";
import { Separator } from "./ui/separator";

type HomeHeaderProp = {
  title: string;
};
export default function HomeHeaderComponent({ title }: HomeHeaderProp) {
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="pr-3">
          <i aria-hidden="true" className="freshio-icon-circle"></i>
        </div>
        <div className="font-bold text-[#0a472e] text-3xl">{title}</div>
      </div>
      <div>
        <ul className="flex space-x-4 [&>li]:hover:cursor-pointer [&>li]:hover:text-[#bac34e]">
          <li>Hạt & Quả</li>
          <li>Dầu</li>
          <li>Trái cây</li>
          <li>Cà chua</li>
          <li>Súp</li>
          <li>
            <Separator orientation="vertical" />
          </li>
          <li className="text-[#a8b324] hover:text-[#80891b]">
            <Link href="/shop">Xem Tất cả</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
