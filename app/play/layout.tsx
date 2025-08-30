import GlassmorphNavbar from "@/components/ui/glassmorph-navbar";

export default async function PlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GlassmorphNavbar />
      <div className="px-5">{children}</div>
    </>
  );
}
