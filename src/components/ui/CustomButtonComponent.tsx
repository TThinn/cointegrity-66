
import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outlined" | "ghost" | "link" | "cta-primary" | "cta-secondary";
  size?: "sm" | "md" | "lg";
  isGlowing?: boolean;
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
  href?: string;
  transitionDuration?: string;
  target?: string;
  rel?: string;
}

const Button = ({
  variant = "primary",
  size = "md",
  isGlowing = false,
  className,
  children,
  as: Component = "button",
  href,
  transitionDuration = "400ms",
  target,
  rel,
  ...props
}: ButtonProps) => {
  const styles = cn(
    "relative inline-flex items-center justify-center rounded-full font-bold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
    {
      "bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 shadow-lg hover:from-pink-600 hover:to-purple-700 hover:translate-y-[-3px] hover:shadow-xl": 
        variant === "primary" || variant === "cta-primary",
      
      "bg-transparent border-2 border-[#8B5CF6] text-[#8B5CF6] px-8 py-3 hover:bg-[#8B5CF6]/10 hover:translate-y-[-3px]": 
        variant === "secondary" || variant === "cta-secondary",
      
      "bg-transparent border border-purple-600 text-purple-600 hover:bg-purple-500/10": 
        variant === "outlined",
      
      "bg-transparent text-white hover:bg-white/5": 
        variant === "ghost",
      
      "bg-transparent text-[#8B5CF6] hover:text-[#6366F1] p-0 hover:underline focus:ring-0": 
        variant === "link",

      "text-sm px-5 py-2 text-[14px]": size === "sm",
      "text-base px-8 py-3 text-[16px]": size === "md",
      "text-lg px-10 py-4 text-[18px]": size === "lg",

      "button-glow": isGlowing,
    },
    className
  );

  if (href) {
    const { 
      onClick,
      title,
      id,
      role,
      tabIndex,
      'aria-label': ariaLabel,
      style
    } = props as any;
    
    const anchorProps = {
      href,
      className: styles,
      onClick,
      target,
      rel,
      title,
      id,
      role,
      tabIndex,
      'aria-label': ariaLabel,
      style: { ...style, transitionDuration }
    };
    
    return (
      <a {...anchorProps}>
        {children}
      </a>
    );
  }

  return (
    <Component 
      className={styles} 
      style={{ transitionDuration }}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button;
