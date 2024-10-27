import { Suspense } from "react";

import { PaymentSuccess } from "@/components/features";
import { Header, Skeleton } from "@/components/ui";

export default async function BuyTokensPage() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center gap-10 p-24">
        <h2>Congratulations!</h2>
        <Suspense fallback={<Skeleton className="size-72" />}>
          <PaymentSuccess />
        </Suspense>
      </div>
    </>
  );
}
