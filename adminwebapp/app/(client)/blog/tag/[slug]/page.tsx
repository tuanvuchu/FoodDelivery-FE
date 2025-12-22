import BreadcrumbComponent from "@/components/breadcrumb";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <>
      <BreadcrumbComponent
        backgroundImage="/images/breadcrumb_bkg.jpg"
        title={slug}
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: `Bài đăng có thẻ "${slug}"` },
        ]}
      />
    </>
  );
}
