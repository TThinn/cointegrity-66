
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
      "bg-purple-blue-gradient text-white shadow-button hover:shadow-lg": variant === "primary",
      "bg-blue-600 text-white shadow-button hover:shadow-lg": variant === "secondary",
      "bg-transparent border border-purple-600 text-purple-700 hover:bg-purple-50": variant === "outlined",
      "bg-transparent text-foreground hover:bg-muted": variant === "ghost",
      "bg-transparent text-blue-600 hover:text-blue-800 p-0 hover:underline focus:ring-0": variant === "link",

      "text-sm px-3 py-1 h-8": size === "sm",
      "text-base px-4 py-2 h-10": size === "md",
      "text-lg px-6 py-3 h-12": size === "lg",

      "button-glow": isGlowing,
    },
    className
  );

  if (Component === "a" || href) {
    return (
      <a href={href} className={styles} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
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
