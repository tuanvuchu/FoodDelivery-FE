import Image from "next/image";
import Title from "./ui/Title";

const About = () => {
  return (
    <div className="bg-secondary py-14">
      <div className="container mx-auto flex items-center text-white gap-20 justify-center flex-wrap-reverse">
        <div className="flex justify-center">
          <div className="relative sm:w-[445px] sm:h-[600px]  flex justify-center w-[300px] h-[450px]">
            <Image src="/images/about-img.png" alt="" layout="fill" />
          </div>
        </div>
        <div className="md:w-1/2 ">
          <Title addClass="text-[40px]">Chúng tôi là UFood</Title>
          <p className="my-5 flex flex-col items-center">
            UFood là nền tảng đặt đồ ăn trực tuyến giúp bạn kết nối nhanh chóng
            với các quán ăn và nhà hàng xung quanh. Người dùng có thể dễ dàng
            tìm kiếm món ăn, đặt hàng chỉ với vài thao tác và theo dõi trạng
            thái giao hàng theo thời gian thực. UFood tập trung vào trải nghiệm
            tiện lợi, tốc độ và chất lượng dịch vụ, mang đến giải pháp đặt đồ ăn
            đơn giản, đáng tin cậy cho cuộc sống hằng ngày.
          </p>
          <button className="btn-primary">Xem thêm</button>
        </div>
      </div>
    </div>
  );
};

export default About;
