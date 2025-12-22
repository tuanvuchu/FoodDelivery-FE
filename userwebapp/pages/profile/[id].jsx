import Image from "next/image";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import Account from "../../components/profile/Account";
import Order from "../../components/profile/Order";
import Password from "../../components/profile/Password";
import { toast } from "react-toastify";

export default function Profile() {
  const router = useRouter();
  const { id } = router.query;

  const [tabs, setTabs] = useState(0);
  const [user, setProduct] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    const existingCart = localStorage.getItem("auth");
    if (existingCart) {
      setProduct(JSON.parse(existingCart));
    }
  }, [id]);

  const handleSignOut = () => {
    if (confirm("Bạn có muốn đăng xuất không?")) {
      localStorage.removeItem("auth");
      router.push("/auth/login");
      toast.success("Đăng xuất thành công", {
        position: "bottom-left",
        theme: "colored",
      });
    }
  };
  if (!user) {
    return <div className="py-20 text-center">...</div>;
  }
  return (
    <div className="flex px-10 min-h-[calc(100vh_-_433px)] lg:flex-row flex-col lg:mb-0 mb-10">
      <div className="lg:w-80 w-100 flex-shrink-0 lg:h-[80vh]   justify-center flex flex-col border-l-2 border-r-4 shadow-2xl">
        <div className="relative flex flex-col items-center px-10 py-5 border border-b-0 ">
          <Image
            src={
              user.user.image
                ? `${process.env.NEXT_PUBLIC_API_IMAGE_URL}/${user.user.image}`
                : "/images/client2.jpg"
            }
            alt=""
            width={100}
            height={100}
            className="rounded-full"
          />
          <b className="text-2xl mt-1">{user.user.name}</b>
        </div>
        <ul className="text-center font-semibold">
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
              tabs === 0 && "bg-primary text-white"
            }`}
            onClick={() => setTabs(0)}
          >
            <i className="fa fa-home"></i>
            <button className="ml-1 ">Tài khoản</button>
          </li>
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
              tabs === 1 && "bg-primary text-white"
            }`}
            onClick={() => setTabs(1)}
          >
            <i className="fa fa-key"></i>
            <button className="ml-1">Mật khẩu</button>
          </li>
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
              tabs === 2 && "bg-primary text-white"
            }`}
            onClick={() => setTabs(2)}
          >
            <i className="fa fa-motorcycle"></i>
            <button className="ml-1">Đơn hàng</button>
          </li>
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all`}
            onClick={handleSignOut}
          >
            <i className="fa fa-sign-out"></i>
            <button className="ml-1">Đăng xuất</button>
          </li>
        </ul>
      </div>
      {tabs === 0 && <Account />}
      {tabs === 1 && <Password />}
      {tabs === 2 && <Order />}
    </div>
  );
}
