import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CircuitBackground } from "@/components/thegridcn/circuit-background";
import { DataCard } from "@/components/thegridcn/data-card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "404 | Textual Games",
  description:
    "The page you are looking for does not exist. Please check the URL and try again.",
};

export default function NotFound() {
  return (
    <CircuitBackground
      opacity={0.08}
      className="grid min-h-screen w-full place-content-center gap-5 bg-background px-4 text-center"
    >
      <div className="mx-auto grid max-w-md gap-5">
        <Image
          src={"/img/404/pixel.webp"}
          width={300}
          height={300}
          alt="Textual Games 404"
          className="mx-auto rounded border border-primary/30 bg-card"
        />

        <DataCard
          title="Signal Lost"
          subtitle="404"
          status="alert"
          fields={[
            { label: "Route", value: "Unknown coordinate", highlight: true },
            { label: "Recovery", value: "Return to home grid" },
          ]}
        />

        <Button asChild>
          <Link href={"/"}>Return to Home Page</Link>
        </Button>
      </div>
    </CircuitBackground>
  );
}
