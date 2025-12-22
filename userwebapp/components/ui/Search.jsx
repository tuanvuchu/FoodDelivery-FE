import Image from "next/image";
import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Title from "../ui/Title";
import { GiCancel } from "react-icons/gi";
import axios from "axios";
import Input from "../form/Input";
import { useRouter } from "next/router";
import PacmanLoader from "react-spinners/PacmanLoader";

export default function Search({ setIsSearchModal }) {
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  const router = useRouter();

  const getProducts = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products/get-all-admin`,
      );
      setProduct(res.data);
      setFiltered(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getProducts();
    }, 1000);
  }, []);

  const handleSearch = async (e) => {
    setSearch(e.target.value);
    const searchFilter = product.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    setFiltered(searchFilter);
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 after:content-[''] after:w-screen after:h-screen after:bg-white after:absolute after:top-0 after:left-0 after:opacity-60 grid place-content-center">
      <OutsideClickHandler onOutsideClick={() => setIsSearchModal(false)}>
        <div className="w-full h-full grid place-content-center relative">
          <div className="relative z-50 md:w-[600px] w-[370px]  bg-white border-2 p-10 rounded-3xl">
            <Title addClass="text-[40px] text-center">Tìm kiếm</Title>
            <Input
              type="text"
              placeholder="Tìm kiếm..."
              onChange={handleSearch}
            />
            {product.length > 0 ? (
              <ul className="mt-6">
                {filtered.length > 0 ? (
                  filtered.slice(0, 5).map((item) => (
                    <li
                      className="flex items-center justify-between p-1 hover:bg-primary transition-all px-3 cursor-pointer"
                      key={item.id}
                      onClick={() => {
                        router.push(`/product/${item?.id}`);
                        setIsSearchModal(false);
                      }}
                    >
                      <div className="relative flex">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_API_IMAGE_URL}/${item.image}`}
                          alt={item.name}
                          width={48}
                          height={48}
                          priority
                        />
                      </div>
                      <span className="font-bold">{item.name}</span>
                      <span className="font-bold">{item.price}</span>
                    </li>
                  ))
                ) : (
                  <span className="w-full text-center block font-bold my-6">
                    Không tìm thấy sản phẩm nào
                  </span>
                )}
              </ul>
            ) : (
              <div className="flex justify-center items-center my-9">
                <PacmanLoader />
              </div>
            )}

            <button
              className="absolute top-4 right-4"
              onClick={() => setIsSearchModal(false)}
            >
              <GiCancel size={25} className=" transition-all" />
            </button>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
}
