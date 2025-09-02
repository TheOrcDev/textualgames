import Header from "@/components/header";

export default async function PlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="px-5">{children}</div>
    </>
  );
}
