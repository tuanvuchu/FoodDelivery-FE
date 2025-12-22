import React from "react";
import Title from "../ui/Title";
import CustomerItem from "./CustomerItem";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Customers = () => {
  function NextBtn({ onClick }) {
    return (
      <button
        className="absolute -bottom-12 left-1/2 bg-primary flex items-center justify-center w-10 h-10 rounded-full text-white"
        onClick={onClick}
      >
        <IoIosArrowForward />
      </button>
    );
  }

  function PrevBtn({ onClick }) {
    return (
      <button
        className="absolute -bottom-12 right-1/2 bg-primary flex items-center justify-center w-10 h-10 rounded-full text-white mr-2"
        onClick={onClick}
      >
        <IoIosArrowBack />
      </button>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: true,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto mb-20 mt-12">
      <Title addClass="text-[40px] text-center">
        Khách hàng nói gì về chúng tôi
      </Title>
      <Slider {...settings}>
        <CustomerItem
          imgSrc="/images/client1.jpg"
          text="Mình đặt đồ ăn ở đây khá nhiều lần rồi. Món nào cũng nóng hổi, ăn vừa miệng, giao hàng nhanh hơn mình nghĩ."
          name="Nguyễn Minh Tuấn"
          test="Khách hàng"
        />

        <CustomerItem
          imgSrc="/images/client2.jpg"
          text="Lúc đầu chỉ đặt thử cho biết, ai ngờ ăn hợp khẩu vị thật. Giá ổn, đóng gói kỹ, không bị đổ."
          name="Trần Thị Hồng"
          test="Khách quen"
        />

        <CustomerItem
          imgSrc="/images/client1.jpg"
          text="Mình hay đặt buổi tối, quán làm khá nhanh, đồ ăn vẫn ngon như ăn tại chỗ. Sẽ còn ủng hộ dài dài."
          name="Lê Quốc Anh"
          test="Khách hàng"
        />

        <CustomerItem
          imgSrc="/images/client2.jpg"
          text="Nhân viên dễ thương, có lần giao trễ chút nhưng có gọi xin lỗi. Quan trọng là đồ ăn ngon nên vẫn hài lòng."
          name="Phạm Ngọc Lan"
          test="Khách hàng thân thiết"
        />
      </Slider>
    </div>
  );
};

export default Customers;
