import Header from "@/components/header";
import Footer from "@/components/footer";
import HeaderSec from "@/components/header-sec";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <HeaderSec />
      {children}
      <Footer />
    </>
  );
}
