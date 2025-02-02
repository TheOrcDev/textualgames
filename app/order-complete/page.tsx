import { Suspense } from "react";

import { PaymentSuccess } from "@/components/features";
import { Skeleton } from "@/components/ui/skeleton";

export default async function BuyTokensPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-10 p-24 pt-20 md:p-24">
        <h2>Congratulations!</h2>
        <Suspense fallback={<Skeleton className="size-72" />}>
          <PaymentSuccess />
        </Suspense>
      </div>
    </>
  );
}
