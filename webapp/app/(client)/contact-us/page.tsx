import BreadcrumbComponent from "@/components/breadcrumb";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import FormContact from "./contact-us-form";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liên hệ - U Food",
  description:
    "Liên hệ với U Food để được hỗ trợ nhanh chóng về đơn hàng, sản phẩm, hoặc bất kỳ thắc mắc nào.",
};

export default function ContactUs() {
  return (
    <>
      <BreadcrumbComponent
        backgroundImage="/images/breadcrumb_bkg.jpg"
        title="Liên hệ chúng tôi"
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Liên hệ chúng tôi" },
        ]}
      />
      <div
        className="grid grid-cols-5 gap-4 pt-5"
        style={{ fontFamily: "Mazzard Soft H" }}
      >
        <div className="col-span-2 grid justify-items-center">
          <Image
            src="/images/contact1.jpg"
            alt="contact1"
            width={422}
            height={633}
          />
        </div>
        <div className="col-span-3 col-start-3 text-[#555] mr-5 mb-20">
          <h2 className="text-[#0a472e] text-3xl leading-7 font-bold mb-5">
            Chúng tôi luôn muốn lắng nghe từ bạn
          </h2>
          <p className="mb-5">
            Chúng tôi rất trân trọng mọi ý kiến đóng góp của bạn. Hãy chia sẻ
            với chúng tôi những suy nghĩ, thắc mắc hoặc phản hồi của bạn để
            chúng tôi có thể cải thiện và phục vụ bạn tốt hơn. Mỗi phản hồi của
            bạn đều là động lực để chúng tôi hoàn thiện hơn từng ngày. Nếu bạn
            cần hỗ trợ hay muốn góp ý, đừng ngần ngại liên hệ. Chúng tôi luôn
            sẵn sàng lắng nghe.
          </p>
          <div className="grid grid-cols-6 mb-5">
            <div className="col-span-4">
              <div>
                <h3 className="font-bold mb-2 text-[#000]">
                  Cửa hàng của chúng tôi
                </h3>
                <p>
                  Hộp thư 904, Bình Minh, Khoái Châu, <br /> Hưng Yên, Việt Nam
                </p>
              </div>
              <div>
                <br />
                <h3 className="font-bold mb-2 text-[#000]">
                  Thông tin liên hệ
                </h3>
                <p>
                  (+84) 967785311 <br />
                  chutuanvu0206.work@gmail.com
                </p>
              </div>
            </div>
            <div className="col-span-2">
              <div>
                <h3 className="font-bold mb-2 text-[#000] leading-6">
                  Giờ làm việc
                </h3>
                <p>
                  Thứ Hai - Thứ Sáu:
                  <br />
                  <span className="text-[#000]">8:00 sáng - 4:00 chiều</span>
                  <br />
                  Thứ Bảy, Chủ Nhật:
                  <br />
                  <span className="text-[#000]">9:00 sáng - 5:00 chiều</span>
                </p>
              </div>
            </div>
          </div>
          <Separator className="mb-10" />
          <h2 className="text-[#0a472e] text-3xl leading-7 font-bold mb-5">
            Để lại một tin nhắn
          </h2>
          <FormContact />
        </div>
      </div>
    </>
  );
}
