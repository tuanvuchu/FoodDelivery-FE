import type { Metadata } from "next";
import "./globals.css";
import "@/styles/style.css";

import { UserProvider } from "@/context/user-context";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "U Food",
  description: "Cửa hàng Thực phẩm & Hữu cơ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "Mazzard Soft H" }}>
        <UserProvider>{children}</UserProvider>
        <Toaster />
      </body>
    </html>
  );
}
