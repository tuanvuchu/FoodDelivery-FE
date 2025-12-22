import { useEffect, useState } from "react";
import { FaUserAlt, FaSearch } from "react-icons/fa";
import Logo from "../ui/Logo";
import Search from "../ui/Search";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Header() {
  const router = useRouter();
  const [isSearchModal, setIsSearchModal] = useState(false);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const storedCart = localStorage.getItem("auth");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  return (
    <div
      className={`h-[5.5rem] z-50 relative w-full ${
        router.asPath === "/" ? "bg-transparent fixed" : "bg-secondary"
      }`}
    >
      <div className="container mx-auto text-white flex justify-between items-center h-full">
        <Logo />
        <nav
          className={`sm:static absolute top-0 left-0 sm:w-auto sm:h-auto w-full h-screen sm:text-white text-black sm:bg-transparent bg-white sm:flex hidden z-50`}
        >
          <ul className="flex gap-x-2 sm:flex-row flex-col items-center">
            <li
              className={`px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer ${
                router.asPath === "/" && "text-primary"
              }`}
            >
              <Link href="/">Trang chủ</Link>
            </li>
            <li
              className={`px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer ${
                router.asPath === "/menu" && "text-primary"
              }`}
            >
              <Link href="/menu">Menu</Link>
            </li>
            <li
              className={`px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer ${
                router.asPath === "/about" && "text-primary"
              }`}
            >
              <Link href="/about">Về chúng tôi</Link>
            </li>
            <li
              className={`px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer ${
                router.asPath === "/restaurant" && "text-primary"
              }`}
            >
              <Link href="/restaurant">Quán ăn nổi bật</Link>
            </li>
            <li
              className={`px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer ${
                router.asPath === "/reservation" && "text-primary"
              }`}
            >
              <Link href="/reservation">Liên hệ</Link>
            </li>
          </ul>
        </nav>
        <div className="flex gap-x-4 items-center">
          <Link href={cart ? `/profile/${cart.user.id}` : "/auth/login"}>
            <span>
              {router.asPath.includes("auth") ? (
                <i
                  className={`fa-solid fa-right-to-bracket ${
                    router.asPath.includes("login") && "text-primary"
                  } `}
                ></i>
              ) : (
                <FaUserAlt
                  className={`hover:text-primary transition-all cursor-pointer ${
                    (router.asPath.includes("auth") ||
                      router.asPath.includes("profile")) &&
                    "text-primary"
                  }`}
                />
              )}
            </span>
          </Link>

          <button onClick={() => setIsSearchModal(true)}>
            <FaSearch className="hover:text-primary transition-all cursor-pointer" />
          </button>
        </div>
      </div>
      {isSearchModal && <Search setIsSearchModal={setIsSearchModal} />}
    </div>
  );
}
