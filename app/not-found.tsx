import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/8bit/button";

export const metadata: Metadata = {
  title: "404 | Textual Games",
  description:
    "The page you are looking for does not exist. Please check the URL and try again.",
};

export default function NotFound() {
  return (
    <div className="grid h-screen w-full place-content-center gap-5 bg-background px-4 text-center">
      <Image
        src={"/img/404/pixel.webp"}
        width={300}
        height={300}
        alt="Textual Games 404"
        className="bg-white"
      />

      <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">Uh-oh!</h1>

      <p>You are lost.</p>
      <div className="flex justify-center">
        <Button asChild>
          <Link href={"/"}>Return to Home Page</Link>
        </Button>
      </div>
    </div>
  );
}
