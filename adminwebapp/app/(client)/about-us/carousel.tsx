"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type CarouselData = {
  name: string;
  role: string;
  avatar: string;
  content: string;
};

const carouselItems: CarouselData[] = [
  {
    name: "Việt Anh",
    role: "Giám đốc truyền thông",
    avatar: "/images/avatar-1.jpg",
    content:
      "Chúng tôi tin rằng thực phẩm sạch không chỉ là nhu cầu mà còn là quyền của mỗi người. Vì vậy, toàn bộ nông sản trên hệ thống đều có nguồn gốc rõ ràng, được canh tác tự nhiên và không hóa chất.",
  },
  {
    name: "Quốc Anh",
    role: "Giám đốc sản xuất",
    avatar: "/images/avatar-2.jpg",
    content:
      "Để giảm thiểu rác thải nhựa, chúng tôi triển khai dự án 'Zero Waste' - để bạn có thể chọn nhận hàng bằng túi giấy kraft, hộp bã mía hoặc hũ thủy tinh tái sử dụng. Đây không chỉ là giải pháp, mà là cam kết với môi trường.",
  },
];
export default function CarouselAboutUs() {
  return (
    <>
      <Carousel
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        opts={{
          loop: true,
        }}
        className="max-w-4xl mx-auto"
      >
        <CarouselContent>
          {carouselItems.map((item, index) => (
            <CarouselItem key={index}>
              <div className="grid grid-rows-3 gap-4 text-center">
                <div className="flex justify-center">
                  <Avatar className="size-[70px]">
                    <AvatarImage src={item.avatar} alt={`@${item.name}`} />
                    <AvatarFallback>{item.name}</AvatarFallback>
                  </Avatar>
                </div>
                <div>&quot;{item.content}&quot;</div>
                <p className="text-[#aaa]">{`${item.name} - ${item.role}`}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className=" hover:bg-[#a8b324] hover:cursor-pointer size-[50]" />
        <CarouselNext className="hover:bg-[#a8b324] hover:cursor-pointer size-[50]" />
      </Carousel>
    </>
  );
}
