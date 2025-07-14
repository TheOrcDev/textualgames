"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { getPaymentIntent } from "@/server/tokens";

import { Button } from "@/components/ui/button";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const [paymentIntentData, setPaymentIntentData] = useState<number | null>(
    null
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
  }, []);

  return (
    <main>
      {paymentIntentData && (
        <div className="flex flex-col items-center justify-center gap-5">
          <h2>You have successfully bought {paymentIntentData} tokens!</h2>
          <Button asChild>
            <Link href={"/play/create-character"}>Go and play your story!</Link>
          </Button>
        </div>
      )}
    </main>
  );
}
