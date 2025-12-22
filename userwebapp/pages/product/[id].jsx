import Image from "next/image";
import { useEffect, useState } from "react";
import Title from "../../components/ui/Title";
import { useRouter } from "next/router";

export default function Product() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:3001/api/v1/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      });
  }, [id]);

  function addToCart(id, quantity, unit_price) {
    try {
      const existingCart = localStorage.getItem("cart");
      let cart = existingCart ? JSON.parse(existingCart) : [];

      const index = cart.findIndex((item) => item.id === id);

      if (index !== -1) {
        cart[index].quantity += quantity;
      } else {
        cart.push({ id, quantity, unit_price });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error(error);
    }
  }

  if (!product) {
    return <div className="py-20 text-center">Đang tải sản phẩm...</div>;
  }

  return (
    <div className="container mx-auto py-20">
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        <div className="relative w-64 h-64 lg:w-[420px] lg:h-[420px] mx-auto">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_IMAGE_URL}/${product.image}`}
            alt={product.name}
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>

        <div className="flex-1 text-center lg:text-left">
          <Title addClass="text-4xl lg:text-5xl font-bold mb-4">
            {product.name}
          </Title>

          <span className="text-primary text-3xl font-semibold mb-6 block">
            ${product.price}
          </span>

          <p className="text-gray-600 leading-relaxed max-w-xl mb-10">
            {product.description}
          </p>

          <div className="mt-16 max-w-2xl">
            <h3 className="text-2xl font-semibold mb-6">
              Đánh giá ({product.comments.length})
            </h3>

            <div className="space-y-6">
              {product.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="flex gap-4 bg-white p-4 rounded-xl shadow-sm border"
                >
                  <div className="relative w-12 h-12 shrink-0">
                    <Image
                      src={`http://localhost:3001/api/v1/uploads/${comment.users.image}`}
                      alt={comment.users.name}
                      layout="fill"
                      className="rounded-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-800">
                        {comment.users.name}
                      </h4>
                      <span className="text-xs text-gray-400">
                        {new Date(comment.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex gap-1 mt-1 mb-2 text-sm">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={
                            i < comment.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }
                        >
                          ★
                        </span>
                      ))}
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed">
                      {comment.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className="btn-primary mt-10 px-8 py-3 text-lg"
            onClick={addToCart(product.id, 1, product.price)}
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
}
