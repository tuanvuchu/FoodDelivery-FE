import Image from "next/image";
import { useEffect, useState } from "react";
import Title from "../../components/ui/Title";
import { useRouter } from "next/router";
import { useRef } from "react";

export default function Product() {
  const topRef = useRef(null);
  const [shake, setShake] = useState(null);

  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:3001/api/v1/restaurants/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      });
  }, [id]);

  if (!product) {
    return <div className="py-20 text-center">Đang tải sản phẩm...</div>;
  }

  return (
    <>
      <div className="flex gap-6 p-6 ">
        <div className="relative w-1/2 h-80 overflow-hidden">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_IMAGE_URL}/${product.image}`}
            alt={product.name}
            layout="fill"
            className="object-cover"
            priority
          />
        </div>

        <div ref={topRef} className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold leading-snug">
            {product.name}
          </h2>

          <p className="text-base text-gray-600 leading-relaxed">
            {product.address}
          </p>

          <span className="w-fit rounded-full bg-orange-500 px-4 py-1 text-sm text-white">
            {product.type}
          </span>
          <div className="mx-auto flex w-48 flex-col items-center gap-2  bg-orange-600">
            <div
              className={`relative h-48 w-48 mx-auto overflow-hidden rounded-lg 
    ${shake ? "animate-shake" : ""}`}
            >
              <Image
                src="/images/IMG_0322.PNG"
                alt={product.name}
                layout="fill"
                className="object-cover"
              />
            </div>

            <p className="text-center text-sm text-gray-700">
              Quét mã để đặt món trên app UFood
            </p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h2 className="mb-4 text-xl font-semibold">Thực đơn</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {product.products?.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 rounded-xl border bg-white p-4 hover:shadow-md transition"
            >
              <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_IMAGE_URL}/${item.image}`}
                  alt={item.name}
                  layout="fill"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {item.sale_price ? (
                    <>
                      <span className="font-semibold text-orange-500">
                        {Number(item.sale_price).toLocaleString()}đ
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        {Number(item.price).toLocaleString()}đ
                      </span>
                    </>
                  ) : (
                    <span className="font-semibold">
                      {Number(item.price).toLocaleString()}đ
                    </span>
                  )}
                  <button
                    onClick={() => {
                      setShake(true);
                      setTimeout(() => setShake(false), 400);

                      topRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white hover:bg-orange-600"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
