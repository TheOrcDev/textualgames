import { cn } from "@/lib/utils";

type BrandLogoProps = {
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  markClassName?: string;
  textClassName?: string;
};

const logoSizes = {
  sm: {
    gap: "gap-2",
    mark: "size-7",
    text: "text-xs tracking-[0.2em]",
    glyph: "text-[9px]",
  },
  md: {
    gap: "gap-3",
    mark: "size-9",
    text: "text-sm tracking-[0.24em]",
    glyph: "text-[11px]",
  },
  lg: {
    gap: "gap-3",
    mark: "size-11",
    text: "text-base tracking-[0.26em]",
    glyph: "text-xs",
  },
};

export function BrandLogo({
  showWordmark = true,
  size = "md",
  className,
  markClassName,
  textClassName,
}: BrandLogoProps) {
  const styles = logoSizes[size];

  return (
    <span
      className={cn(
        "inline-flex min-w-0 items-center font-mono font-semibold uppercase text-foreground",
        styles.gap,
        className,
      )}
    >
      <span
        className={cn(
          "relative grid shrink-0 place-items-center overflow-hidden rounded border border-primary/50 bg-background/80 text-primary shadow-[0_0_18px_color-mix(in_oklch,var(--glow)_28%,transparent)]",
          styles.mark,
          markClassName,
        )}
        aria-hidden="true"
      >
        <span className="absolute inset-1 rounded border border-primary/20" />
        <span className="absolute inset-[7px] rotate-45 border border-primary/45 bg-primary/10" />
        <span className="absolute left-0 top-1/2 h-px w-full bg-primary/35" />
        <span className="absolute left-1/2 top-0 h-full w-px bg-primary/25" />
        <span className="absolute -right-2 top-1 h-4 w-4 rotate-45 border border-cyan-300/40" />
        <span
          className={cn(
            "relative z-10 font-display font-black leading-none tracking-wider text-primary",
            styles.glyph,
          )}
        >
          TG
        </span>
      </span>

      {showWordmark && (
        <span
          className={cn(
            "truncate font-display font-black text-primary",
            styles.text,
            textClassName,
          )}
        >
          Textual Games
        </span>
      )}
    </span>
  );
}
