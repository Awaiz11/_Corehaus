import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost";

type Props = {
  children: ReactNode;
  href: string;
  variant?: Variant;
  className?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
};

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
  target,
  rel,
  onClick,
}: Props) {
  const isOutline = variant === "outline";
  const isGhost = variant === "ghost";

  return (
    <motion.a
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative inline-flex items-center justify-center overflow-hidden px-7 py-3.5 text-[11px] font-medium tracking-[0.28em] uppercase transition-colors duration-500 ${
        isGhost
          ? "px-0 py-1 tracking-[0.22em]"
          : isOutline
            ? "border border-cream/40 text-cream"
            : "bg-cream text-burgundy"
      } ${className}`}
    >
      {!isGhost && (
        <span
          aria-hidden
          className={`absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 ${
            isOutline ? "bg-cream" : "bg-gold"
          }`}
        />
      )}
      <span
        className={`relative z-10 flex items-center gap-3 transition-colors duration-500 ${
          isGhost
            ? "text-cream group-hover:text-gold"
            : isOutline
              ? "group-hover:text-burgundy"
              : "group-hover:text-ink"
        }`}
      >
        {children}
        <span
          aria-hidden
          className="inline-block transition-transform duration-500 group-hover:translate-x-1"
        >
          →
        </span>
      </span>
    </motion.a>
  );
}
