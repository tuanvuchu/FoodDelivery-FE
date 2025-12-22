import DynamicBreadcrumb from "@/components/breadcrumb";
import Header from "@/components/header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

export default function Faqs() {
  return (
    <>
      <Header />
      <DynamicBreadcrumb
        backgroundImage="/images/breadcrumb_bkg.jpg"
        title="Câu hỏi thường gặp"
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Câu hỏi thường gặp" },
        ]}
      />

      <section className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-12 mx-auto">
          <h1 className="text-2xl font-semibold text-center text-gray-800 lg:text-3xl dark:text-white">
            Chào mừng bạn, chúng tôi có thể giúp gì cho bạn?
          </h1>
          <p>
            Chúng tôi luôn sẵn sàng hỗ trợ bạn trong suốt quá trình mua sắm - từ
            việc lựa chọn sản phẩm, theo dõi đơn hàng, đến thanh toán và nhận
            hàng. Đội ngũ của chúng tôi cam kết mang lại trải nghiệm mua sắm an
            toàn và thuận tiện nhất cho bạn. Nếu bạn có bất kỳ thắc mắc nào,
            đừng ngần ngại liên hệ - chúng tôi luôn ở đây để hỗ trợ bạn!
          </p>
          <div className="mt-8 xl:mt-16 lg:flex lg:-mx-12">
            <div className="lg:mx-12">
              <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                Câu hỏi thường gặp
              </h1>

              <div className="mt-4 space-y-4 lg:mt-8">
                <a
                  href="#"
                  className="block text-blue-500 dark:text-blue-400 hover:underline"
                >
                  Giao hàng
                </a>
                <a
                  href="#"
                  className="block text-gray-500 dark:text-gray-300 hover:underline"
                >
                  Phương thức thanh toán
                </a>
                <a
                  href="#"
                  className="block text-gray-500 dark:text-gray-300 hover:underline"
                >
                  Tình trạng đơn hàng
                </a>
              </div>
            </div>

            <div className="flex-1 mt-8 lg:mx-12 lg:mt-0">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    Có thể mua sản phẩm nông sản theo số lượng lớn không?
                  </AccordionTrigger>
                  <AccordionContent>
                    Chúng tôi cung cấp các sản phẩm nông sản với đa dạng số
                    lượng, từ mua lẻ đến mua sỉ. Nếu bạn có nhu cầu mua số lượng
                    lớn, chẳng hạn như cho quán ăn, nhà hàng hoặc sự kiện, vui
                    lòng liên hệ trực tiếp với chúng tôi để được báo giá ưu đãi
                    và hỗ trợ giao hàng tận nơi.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    Sản phẩm có hỗ trợ giao hàng tận nơi không?
                  </AccordionTrigger>
                  <AccordionContent>
                    Chúng tôi cung cấp dịch vụ giao hàng tận nơi cho tất cả các
                    sản phẩm nông sản. Bạn có thể chọn phương thức giao hàng
                    nhanh hoặc giao hàng tiêu chuẩn, tùy vào nhu cầu của mình.
                    Vui lòng kiểm tra khu vực giao hàng trong phạm vi của chúng
                    tôi hoặc liên hệ để biết thêm chi tiết về dịch vụ và phí
                    giao hàng.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    Sản phẩm nông sản có thể bảo quản được bao lâu?
                  </AccordionTrigger>
                  <AccordionContent>
                    Thời gian bảo quản của mỗi sản phẩm nông sản phụ thuộc vào
                    loại và cách thức chế biến. Các sản phẩm tươi như rau củ quả
                    thường chỉ có thể bảo quản trong thời gian ngắn, từ vài ngày
                    đến một tuần, tùy vào loại và điều kiện bảo quản.
                    <br />
                    Trong khi đó, các sản phẩm chế biến sẵn như trái cây sấy,
                    các loại ngũ cốc hay thực phẩm đóng gói sẽ có thời gian bảo
                    quản lâu hơn, từ vài tháng đến một năm, nếu được lưu trữ
                    đúng cách ở nơi khô ráo, thoáng mát và tránh ánh nắng trực
                    tiếp.
                    <br />
                    Chúng tôi luôn khuyến cáo bạn nên kiểm tra hạn sử dụng và
                    điều kiện bảo quản ghi trên bao bì sản phẩm để đảm bảo chất
                    lượng tối ưu khi sử dụng.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    Làm thế nào để bảo quản rau củ tươi lâu hơn?
                  </AccordionTrigger>
                  <AccordionContent>
                    Để rau củ tươi lâu hơn, bạn nên bảo quản chúng trong tủ lạnh
                    và tránh để ở nơi có nhiệt độ cao hoặc ẩm ướt. Các loại rau
                    như rau lá xanh có thể được bọc trong khăn ẩm và để vào túi
                    kín trong tủ lạnh để giữ được độ tươi lâu hơn. Ngoài ra, bạn
                    cũng có thể sử dụng các hộp bảo quản chuyên dụng để kéo dài
                    thời gian sử dụng.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>
                    Sản phẩm sấy khô có thể ăn ngay không?
                  </AccordionTrigger>
                  <AccordionContent>
                    Sản phẩm nông sản sấy khô như trái cây sấy hoặc rau củ sấy
                    có thể ăn ngay sau khi mở bao bì. Tuy nhiên, nếu bạn muốn
                    bảo quản lâu dài, hãy đóng kín bao bì sau khi sử dụng và lưu
                    trữ ở nơi khô ráo, thoáng mát để tránh việc sản phẩm bị ẩm
                    hoặc hư hỏng.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>
                    Làm sao để biết sản phẩm nông sản có chất lượng tốt?
                  </AccordionTrigger>
                  <AccordionContent>
                    Chúng tôi cam kết cung cấp các sản phẩm nông sản chất lượng
                    cao từ các nguồn cung cấp đáng tin cậy. Bạn có thể kiểm tra
                    chất lượng sản phẩm qua các yếu tố như độ tươi mới (đối với
                    sản phẩm tươi), màu sắc tự nhiên, và bao bì không bị hư
                    hỏng. Đặc biệt, chú ý đến hạn sử dụng và điều kiện bảo quản
                    được ghi rõ trên bao bì để đảm bảo sản phẩm đạt chất lượng
                    tối ưu khi sử dụng.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
