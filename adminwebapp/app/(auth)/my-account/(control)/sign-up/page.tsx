import BreadcrumbComponent from "@/components/breadcrumb";

export default function SignUp() {
  return (
    <>
      <BreadcrumbComponent
        backgroundImage="/images/breadcrumb_woo.jpg"
        title="Cửa hàng"
        breadcrumbs={[{ label: "Trang chủ", href: "/" }, { label: "Cửa hàng" }]}
      />
    </>
  );
}
