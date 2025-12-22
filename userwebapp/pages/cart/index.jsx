import Title from "../../components/ui/Title";

import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    setTotal(
      cart.reduce(
        (sum, item) => sum + item.quantity * Number(item.unit_price),
        0
      )
    );

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    async function loadProducts() {
      const products = await Promise.all(
        storedCart.map(async (item) => {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/products/${item.id}`
          );
          const product = await res.json();

          return {
            ...product,
            quantity: item.quantity,
            unit_price: Number(item.unit_price),
          };
        })
      );

      setCart(products);
    }

    loadProducts();
  }, []);
  // const newOrder = {
  //   customer: user?.fullName,
  //   address: user?.address ? user?.address : "No address",
  //   total: cart.total,
  //   products: productState,
  //   method: 0,
  // };

  // useEffect(() => {
  //   const productTitles = cart.products.map((product) => {
  //     return {
  //       title: product.title,
  //       foodQuantity: product.foodQuantity,
  //       extras: product.extras,
  //     };
  //   });
  //   setProductState(productTitles);
  // }, [cart.products]);

  // const createOrder = async () => {
  //   // try {
  //   //   if (session) {
  //   //     if (confirm("Are you sure you want to create this order?")) {
  //   //       const res = await axios.post(
  //   //         `${process.env.NEXT_PUBLIC_API_URL}/orders`,
  //   //         newOrder
  //   //       );

  //   //       if (res.status === 201) {
  //   //         router.push(`/order/${res.data._id}`);
  //   //         toast.success("Order created successfully");
  //   //       }
  //   //     }
  //   //   } else {
  //   //     router.push("/auth/login");
  //   //     throw new Error("You must be logged in to create an order");
  //   //   }
  //   // } catch (error) {
  //   //   toast.error(error.message);
  //   //   console.log(error);
  //   // }
  // };

  const updateQuantity = (id, type) => {
    const newCart = cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity:
              type === 1 ? item.quantity + 1 : Math.max(1, item.quantity - 1),
          }
        : item
    );

    setCart(newCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(
        newCart.map((item) => ({
          id: item.id,
          quantity: item.quantity,
          unit_price: item.unit_price,
        }))
      )
    );
  };

  return (
    <div className="min-h-[calc(100vh_-_433px)]">
      <div className="flex justify-between items-center md:flex-row flex-col">
        <div className="md:min-h-[calc(100vh_-_433px)] flex items-center flex-1 p-10 overflow-x-auto w-full justify-center">
          {cart.length > 0 ? (
            <div className="max-h-[40rem] overflow-auto">
              <table
                className="w-full text-sm text-center text-gray-500 min-w-[591px] lg:min-w-[650px] xl:min-w-[1000px] 2xl:min-w-[1250px] lg:min-h-[500px] 
              md:min-h-[300px]  lg:text-lg"
              >
                <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                  <tr>
                    <th scope="col" className="py-3 px-0">
                      PRODUCT
                    </th>
                    <th scope="col" className="py-3 px-2">
                      PRICE
                    </th>
                    <th scope="col" className="py-3 px-6">
                      QUANTITY
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((product) => (
                    <tr
                      className="transition-all bg-secondary border-gray-700 hover:bg-primary"
                      key={product.id}
                    >
                      <td className="py-4 px-0 font-medium whitespace-nowrap hover:text-white ">
                        <span className="text-purple-600">{product.name}</span>
                      </td>
                      <td className="py-4 px-2 font-medium whitespace-nowrap hover:text-white">
                        ${product.price}
                      </td>
                      <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                        <button>
                          <i
                            className="fa-solid fa-chevron-left mr-3 text-primary"
                            onClick={() => quantityChange(0, product)}
                          ></i>
                        </button>
                        {product.foodQuantity}
                        <button>
                          <i
                            className="fa-solid fa-chevron-right ml-3 text-primary"
                            onClick={() => quantityChange(1, product)}
                          ></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-2xl font-semibold">Giỏ hàng trống</h1>
              <button
                className="btn-primary mt-4"
                onClick={() => router.push("/menu")}
              >
                Đi đến menu
              </button>
            </div>
          )}
        </div>
        <div className="bg-secondary min-h-[calc(100vh_-_433px)] md:h-screen flex flex-col justify-center text-white p-12 lg:w-auto md:w-[250px] w-full   md:text-start !text-center">
          <Title addClass="text-[40px]">TỔNG GIỎ HÀNG</Title>

          <div className="mt-6">
            <b>Tạm tính: </b>
            {total} <br />
            <b className="inline-block my-1">Giảm giá: </b>0.00 <br />
            <b>Tổng cộng: </b>
            {total}
          </div>

          <div>
            <button
              className="btn-primary mt-4 md:w-auto w-52"
              // onClick={createOrder}
            >
              Thanh toán ngay!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
