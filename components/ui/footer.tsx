import { cn } from "@/lib/utils";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="retro mx-auto max-w-(--breakpoint-xl) px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <h3 className={cn("flex justify-center sm:justify-start")}>
          Textual Games
        </h3>

        <p className="text-center  text-sm lg:text-right">
          Copyright &copy; {year}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
