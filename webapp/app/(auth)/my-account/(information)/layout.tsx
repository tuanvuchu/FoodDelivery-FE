import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { SidebarNav } from "../components/sidebar-nav";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
};

const sidebarNavItems = [
  {
    title: "Tài khoản",
    href: "/my-account",
  },
  {
    title: "Thông tin cá nhân",
    href: "/my-account/profile",
  },
  {
    title: "Quản lý đơn hàng",
    href: "/my-account/order",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function MyAccount({ children }: SettingsLayoutProps) {
  return (
    <>
      <Header />
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Cài đặt</h2>
          <p className="text-muted-foreground">
            Quản lý đơn hàng và các cài đặt của bạn.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 ">{children}</div>
        </div>
      </div>
      <Footer />
    </>
  );
}
