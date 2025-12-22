import Image from "next/image";
import Title from "./ui/Title";
import { MdShoppingCart } from "react-icons/md";

export default function Campaigns() {
  return (
    <div className="flex justify-between container mx-auto py-20 gap-6 flex-wrap">
      <div className="bg-secondary flex-1 rounded-md py-5 px-[15px] flex items-center gap-x-4">
        <div className="relative md:w-44 md:h-44 w-36 h-36 after:content-['']   border-[5px] border-primary rounded-full overflow-hidden">
          <Image
            src="/images/o1.jpg"
            alt=""
            layout="fill"
            className="hover:scale-105 transition-all"
            objectFit="cover"
            priority
          />
        </div>
        <div className="text-white">
          <Title addClass="text-2xl">Thứ Năm Ngon Miệng</Title>
          <div className="font-dancing my-1">
            <span className="text-[40px]">Giảm 20%</span>
          </div>
          <button className="btn-primary flex items-center gap-x-2">
            Đặt hàng ngay <MdShoppingCart size={20} />
          </button>
        </div>
      </div>
      <div className="bg-secondary flex-1 rounded-md py-5 px-[15px] flex items-center gap-x-4">
        <div className="relative md:w-44 md:h-44 w-36 h-36 after:content-['']   border-[5px] border-primary rounded-full overflow-hidden">
          <Image
            src="/images/o1.jpg"
            alt=""
            layout="fill"
            className="hover:scale-105 transition-all"
            objectFit="cover"
            priority
          />
        </div>
        <div className="text-white">
          <Title addClass="text-2xl">Thứ Năm Ngon Miệng</Title>
          <div className="font-dancing my-1">
            <span className="text-[40px]">Giảm 20%</span>
          </div>
          <button className="btn-primary flex items-center gap-x-2">
            Đặt hàng ngay <MdShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
