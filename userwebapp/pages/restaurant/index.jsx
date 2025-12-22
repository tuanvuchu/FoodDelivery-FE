import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Restaurant() {
  const [res1, setRes] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/restaurants/get-all-admin`,
      );

      setRes(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  if (!res1) {
    return <div>...</div>;
  }
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">Các nhà hàng nổi bật</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {res1.slice(0, 12).map((item) => (
          <Link
            key={item.id}
            href={`/restaurant/${item.id}`}
            className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden cursor-pointer"
          >
            <a className="block overflow-hidden rounded-lg bg-white shadow transition hover:shadow-lg">
              <div className="relative h-[180px] w-full">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_IMAGE_URL}/${item.image}`}
                  alt={item.name}
                  layout="fill"
                  className="object-cover"
                  priority
                />
              </div>

              <div className="relative z-10 p-4 bg-white">
                <h3 className="text-lg font-semibold">{item.name}</h3>

                <p className="mt-1 text-sm text-gray-500">{item.type}</p>

                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  {item.address}
                </p>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
