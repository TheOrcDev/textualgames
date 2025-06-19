import { getTokens } from "@/server/tokens";

import GlassmorphNavbar from "@/components/ui/glassmorph-navbar";

const tokens = await getTokens();

export default function PlayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GlassmorphNavbar tokens={tokens} />
      {children}
    </>
  );
}
