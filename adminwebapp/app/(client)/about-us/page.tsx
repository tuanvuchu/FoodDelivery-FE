import BreadcrumbComponent from "@/components/breadcrumb";
import Image from "next/image";
import "@/styles/style.css";
import CarouselAboutUs from "./carousel";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Về chúng tôi - U Food",
  description:
    "U Food là thương hiệu tiên phong trong lĩnh vực thực phẩm sạch và tiện lợi, cam kết mang đến bữa ăn chất lượng và an toàn cho mọi gia đình Việt.",
};

export default function AboutUs() {
  return (
    <>
      <BreadcrumbComponent
        backgroundImage="/images/breadcrumb_bkg.jpg"
        title="Về chúng tôi"
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Về chúng tôi" },
        ]}
      />
      <div className="[&>div]:mx-5 pb-15">
        <div className="flex justify-center justify-items-center mt-16.5 mb-7.5">
          <Image
            src="/images/icon1-h8.jpg"
            width={234}
            height={177}
            alt="Picture of the author"
          />
        </div>
        <div className="grid grid-cols-3 gap-9 mb-14.5">
          <div className="text-center">
            <Image
              className="transition duration-300 hover:-translate-y-2"
              src="/images/image1-h8.jpg"
              layout="responsive"
              width={404}
              height={256}
              alt="Who we are"
            />
            <h3 className="text-[#0a472e] leading-10 font-bold">
              Chúng tôi là ai
            </h3>
            <p>
              Chúng tôi là nền tảng thương mại nông sản kết nối trực tiếp giữa
              người nông dân địa phương và người tiêu dùng. Sứ mệnh của chúng
              tôi là thúc đẩy nông nghiệp bền vững, mang đến thực phẩm tươi
              sạch, hữu cơ và truy xuất nguồn gốc rõ ràng từ nông trại đến bàn
              ăn của bạn.
            </p>
          </div>
          <div className="text-center">
            <Image
              className="transition duration-300 hover:-translate-y-2"
              src="/images/image2-h8.jpg"
              layout="responsive"
              width={404}
              height={256}
              alt="Our products"
            />
            <h3 className="text-[#0a472e] leading-10 font-bold">
              Các sản phẩm
            </h3>
            <p>
              Từ trái cây theo mùa giòn ngọt, rau củ hữu cơ tươi mới đến trứng
              gà thả vườn và mật ong thiên nhiên - tất cả đều được tuyển chọn kỹ
              lưỡng về chất lượng và độ tươi ngon. Chúng tôi hợp tác với các
              nông trại quy mô nhỏ nhằm đảm bảo nguồn cung có đạo đức và hỗ trợ
              kinh tế địa phương.
            </p>
          </div>
          <div className="text-center">
            <Image
              className="transition duration-300 hover:-translate-y-2"
              src="/images/image3-h8.jpg"
              layout="responsive"
              width={404}
              height={256}
              alt="How we work"
            />
            <h3 className="text-[#0a472e] leading-10 font-bold">
              Cách hoạt động
            </h3>
            <p>
              Chúng tôi làm việc trực tiếp với những người nông dân đáng tin
              cậy, sử dụng phương pháp canh tác thân thiện với môi trường. Nông
              sản được thu hoạch theo đơn đặt hàng để đảm bảo độ tươi tối đa.
              Đơn hàng sẽ được đóng gói và giao đến bạn trong vòng 24 - 48 giờ
              với chất lượng tốt nhất.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1">
          <div
            className="text-[#bac34e] text-center text-2xl"
            style={{ fontFamily: "Greatest Richmond" }}
          >
            Sản phẩm của chúng tôi
          </div>
          <div className="text-center text-[#0a472e] text-4xl leading-10 font-bold mb-10">
            <h2>Chất lượng cao nhất</h2>
          </div>
        </div>
        <div className="grid grid-cols-4 grid-rows-3 gap-3 text-center mb-24.5">
          <div className="mb-10">
            <div className="flex justify-center items-center">
              <div className="freshio-icon-handmade_2 text-[50px] text-[#e4d98b] mr-5"></div>
              <div className="text-left max-w-[150px]">
                <h3 className="text-[16px] text-[#0a472e]">Thủ công</h3>
                <p className="text-[12px] text-[#555]">
                  Được tạo ra với đam mê bởi hơn 300 người tuyển chọn trên khắp
                  cả nước.
                </p>
              </div>
            </div>
          </div>
          <div className="col-start-1 row-start-2 ">
            <div className="mb-10">
              <div className="flex justify-center items-center">
                <div className="freshio-icon-natural text-[50px] text-[#e4c28b] mr-5"></div>
                <div className="text-left max-w-[150px]">
                  <h3 className="text-[16px] text-[#0a472e]">100% Tự nhiên</h3>
                  <p className="text-[12px] text-[#555]">
                    Sản phẩm không qua xử lý hóa học, giữ nguyên hương vị và giá
                    trị dinh dưỡng tự nhiên.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-start-1 row-start-3 ">
            <div className="mb-10">
              <div className="flex justify-center items-center">
                <div className="freshio-icon-curated text-[50px] text-[#a9ebd9] mr-5"></div>
                <div className="text-left max-w-[150px]">
                  <h3 className="text-[16px] text-[#0a472e]">
                    Sản phẩm tuyển chọn
                  </h3>
                  <p className="text-[12px] text-[#555]">
                    Mỗi sản phẩm đều được kiểm định nghiêm ngặt để đảm bảo chất
                    lượng cao nhất.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-start-4 row-start-1 ">
            <div className="mb-10">
              <div className="flex justify-center items-center">
                <div className="freshio-icon-farm text-[50px] text-[#b3cde3] mr-5"></div>
                <div className="text-left max-w-[150px]">
                  <h3 className="text-[16px] text-[#0a472e]">
                    Nông trại hiện đại
                  </h3>
                  <p className="text-[12px] text-[#555]">
                    Ứng dụng công nghệ tiên tiến kết hợp canh tác bền vững, mang
                    đến thực phẩm sạch mỗi ngày.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-start-4 row-start-2 ">
            <div className="mb-10">
              <div className="flex justify-center items-center">
                <div className="freshio-icon-fresh text-[50px] text-[#cbb1e7] mr-5"></div>
                <div className="text-left max-w-[150px]">
                  <h3 className="text-[16px] text-[#0a472e]">Luôn tươi mới</h3>
                  <p className="text-[12px] text-[#555]">
                    Cam kết giao hàng nhanh, bảo quản đúng chuẩn để giữ được độ
                    tươi ngon tối đa.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-start-4 row-start-3 ">
            <div className="mb-10">
              <div className="flex justify-center items-center">
                <div className="freshio-icon-sustainable text-[50px] text-[#e1afbf] mr-5"></div>
                <div className="text-left max-w-[150px]">
                  <h3 className="text-[16px] text-[#0a472e]">Bền vững</h3>
                  <p className="text-[12px] text-[#555]">
                    Ưu tiên nguyên liệu hữu cơ và quy trình thân thiện với môi
                    trường để bảo vệ sức khỏe lâu dài.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 row-span-3 col-start-2 row-start-1 bg-[url(/images/h5_img.jpg)] bg-cover bg-center flex justify-center items-center">
            <Image
              src="/images/h5_quality.png"
              width={140}
              height={140}
              alt="How we work"
            />
          </div>
        </div>
        <div className="grid select-none mx-0 mb-20">
          <div className="bg-[url('/images/bg2-h4.jpg')] bg-cover bg-center py-12">
            <CarouselAboutUs />
          </div>
        </div>
        <div className="grid grid-rows-2">
          <div
            className="text-[#bac34e] text-center text-2xl mb-8"
            style={{ fontFamily: "Greatest Richmond" }}
          >
            Đội ngũ của chúng tôi
          </div>
          <div className="text-center text-[#0a472e] text-4xl leading-10 font-bold mb-10">
            <h2>Chúng tôi là đội ngũ tốt nhất</h2>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-8 text-center">
          <div>
            <Image
              className="mb-7.5 duration-500 hover:brightness-50 rounded-sm"
              src="/images/team1.jpg"
              layout="responsive"
              width={288}
              height={345}
              alt="Team1"
            />
            <p className="text-[#03472e] hover:text-[#a8b324] mb-2.5">
              Chu Tuấn Vũ
            </p>
            <p className="text-[#999] pb-4">Nhà sáng lập</p>
          </div>
          <div>
            <Image
              className="mb-7.5 duration-500 hover:brightness-50 rounded-sm"
              src="/images/team2.jpg"
              layout="responsive"
              width={288}
              height={345}
              alt="Team1"
            />
            <p className="text-[#03472e] hover:text-[#a8b324] mb-2.5">
              Chu Tuấn Vũ
            </p>
            <p className="text-[#999] pb-4">Nông dân</p>
          </div>
          <div>
            <Image
              className="mb-7.5 duration-500 hover:brightness-50 rounded-sm"
              src="/images/team3.jpg"
              layout="responsive"
              width={288}
              height={345}
              alt="Team1"
            />
            <p className="text-[#03472e] hover:text-[#a8b324] mb-2.5">
              Chu Tuấn Vũ
            </p>
            <p className="text-[#999] pb-4">Nông dân</p>
          </div>
          <div>
            <Image
              className="mb-7.5 duration-500 hover:brightness-50 rounded-sm"
              src="/images/team4.jpg"
              layout="responsive"
              width={288}
              height={345}
              alt="Team1"
            />
            <p className="text-[#03472e] hover:text-[#a8b324] mb-2.5">
              Chu Tuấn Vũ
            </p>
            <p className="text-[#999] pb-4">Nông dân</p>
          </div>
        </div>
      </div>
    </>
  );
}
