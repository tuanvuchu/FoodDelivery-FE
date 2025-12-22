import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { Separator } from "./ui/separator";

type HomeBanner = {
  image: string;
  subtitle: string;
  title: string;
  description: string;
};

type HomeBannerProps = {
  homeBanner: HomeBanner;
};

export default function HomeBannerComponent({ homeBanner }: HomeBannerProps) {
  return (
    <div className="relative w-[279px] h-[370px] rounded-sm group overflow-hidden">
      <Image
        sizes="100vw"
        src={homeBanner.image}
        alt="Team1"
        fill
        className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
      />

      <div
        className="absolute inset-x-0 top-20 group-hover:top-10 flex flex-col items-center justify-center 
                   transition-all duration-500 ease-in-out text-center"
      >
        <div>
          <p
            className="text-white text-2xl leading-11 mb-4"
            style={{ fontFamily: "Greatest Richmond" }}
          >
            {homeBanner.subtitle}
          </p>
          <h2 className="text-[#f1de78] font-bold text-4xl leading-12 mb-4">
            {homeBanner.title}
          </h2>
          <p className="text-white">{homeBanner.description}</p>
        </div>

        <div
          className="grid justify-items-center opacity-0 group-hover:opacity-100
                     transition-opacity duration-500 ease-in-out"
        >
          <div
            className="w-[50px] group-hover:w-[100px] 
             transition-all duration-700 ease-in-out"
          >
            <Separator className="my-5" />
          </div>
          <Button variant="outline" className="rounded-full">
            <Link href="/shop" className="hover:text-[#bac34e]">
              Mua ngay
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
