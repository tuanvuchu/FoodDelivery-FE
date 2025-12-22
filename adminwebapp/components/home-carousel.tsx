"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import ProductCardComponent from "./product-card";
import { ProductCard } from "@/types/product-card";

type CarouselProps = {
  products: ProductCard[];
};

export default function HomeCarouselComponent({ products }: CarouselProps) {
  return (
    <Carousel
      className="group relative"
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {products.map((p, i) => (
          <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/4 pl-0">
            <ProductCardComponent product={p} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-0 opacity-0 group-hover:opacity-100 hover:bg-[#a8b324] hover:cursor-pointer" />
      <CarouselNext className="right-5 opacity-0 group-hover:opacity-100 hover:bg-[#a8b324] hover:cursor-pointer" />
    </Carousel>
  );
}
