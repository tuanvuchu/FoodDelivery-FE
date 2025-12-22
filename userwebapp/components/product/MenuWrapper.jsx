import Slider from "react-slick";
import Title from "../ui/Title";
import Image from "next/image";

export default function MenuWrapper() {
  return (
    <div className="relative w-full min-h-[500px] bg-[#ee4d2d] flex flex-col items-center justify-center text-white overflow-hidden px-4 py-10">
      {/* Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <Image
          src="/images/merchant-register-landing-4.jpg"
          alt="City Background"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl">
        <div className="relative w-[300px] h-[200px] md:w-[450px] md:h-[300px] mb-6">
          <Image
            src="/images/merchant-register-landing-4.jpg"
            alt="Đội ngũ tài xế ShopeeFood"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>

        <p className="text-sm md:text-lg font-light max-w-3xl mb-10 leading-relaxed opacity-95">
          Sử dụng App UFood để có nhiều giảm giá và trải nghiệm tốt hơn
        </p>

        <div className="flex flex-wrap justify-center items-center gap-4">
          <div className="relative w-[140px] h-[42px] cursor-pointer">
            <Image
              src="/images/Google-Play-Logo-Vector.png"
              alt="Tải trên Google Play"
              layout="fill"
              objectFit="contain"
            />
          </div>

          <div className="relative w-[140px] h-[42px] cursor-pointer">
            <Image
              src="/images/76748a84c1793ffdf9883dba680125b6.png"
              alt="Tải trên App Store"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
