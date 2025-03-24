
import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outlined" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  isGlowing?: boolean;
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
  href?: string;
}

const Button = ({
  variant = "primary",
  size = "md",
  isGlowing = false,
  className,
  children,
  as: Component = "button",
  href,
  ...props
}: ButtonProps) => {
  const styles = cn(
    "relative inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
    {
      "bg-gradient-to-r from-pink-600 via-pink-500 to-purple-950 text-white shadow-button hover:shadow-lg": variant === "primary",
      "bg-gradient-to-r from-pink-600 to-purple-950 text-white shadow-button hover:shadow-lg": variant === "secondary",
      "bg-transparent border border-pink-600 text-pink-600 hover:bg-pink-500/10": variant === "outlined",
      "bg-transparent text-white hover:bg-white/5": variant === "ghost",
      "bg-transparent text-pink-600 hover:text-pink-700 p-0 hover:underline focus:ring-0": variant === "link",

      "text-sm px-3 py-1 h-8": size === "sm",
      "text-base px-4 py-2 h-10": size === "md",
      "text-lg px-6 py-3 h-12": size === "lg",

      "button-glow": isGlowing,
    },
    className
  );

  if (href) {
    return (
      <a href={href} className={styles}>
        {children}
      </a>
    );
  }

  return (
    <Component className={styles} {...props}>
      {children}
    </Component>
  );
};

export default Button;
