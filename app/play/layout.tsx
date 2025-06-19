import { getTokens } from "@/server/tokens";

import GlassmorphNavbar from "@/components/ui/glassmorph-navbar";

export default async function PlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tokens = await getTokens();

  return (
    <>
      <GlassmorphNavbar tokens={tokens} />
      <div className="px-5">{children}</div>
    </>
  );
}
