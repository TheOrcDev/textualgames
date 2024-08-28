"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui";
import { getPaymentIntent } from "@/lib/tokens";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const [paymentIntentData, setPaymentIntentData] = useState<number | null>(
    null,
  );

  const paymentIntent = searchParams.get("payment_intent");
  const paymentIntentSecret = searchParams.get("payment_intent_client_secret");

  useEffect(() => {
    const getData = async () => {
      if (!paymentIntent || !paymentIntentSecret) {
        return;
      }
      const data = await getPaymentIntent(paymentIntent, paymentIntentSecret);

      setPaymentIntentData(data!);
    };

    getData();
    // Disabling ESLint warning - Hooks cannot go in here
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      {paymentIntentData && (
        <div className="flex flex-col items-center justify-center gap-5">
          <h2>You have successfully bought {paymentIntentData} tokens!</h2>
          <Link href={"/play"}>
            <Button>Go and play your story!</Button>
          </Link>
        </div>
      )}
    </main>
  );
}
