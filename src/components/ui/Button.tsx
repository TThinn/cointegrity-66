
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
      "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-button hover:shadow-lg": variant === "primary",
      "bg-blue-600 text-white shadow-button hover:shadow-lg": variant === "secondary",
      "bg-transparent border border-purple-600 text-purple-400 hover:bg-purple-500/10": variant === "outlined",
      "bg-transparent text-white hover:bg-white/5": variant === "ghost",
      "bg-transparent text-blue-400 hover:text-blue-300 p-0 hover:underline focus:ring-0": variant === "link",

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
