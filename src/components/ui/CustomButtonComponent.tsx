
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
}

const Button = ({
  variant = "primary",
  size = "md",
  isGlowing = false,
  className,
  children,
  as: Component = "button",
  href,
  transitionDuration = "300ms",
  ...props
}: ButtonProps) => {
  const styles = cn(
    "relative inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
    {
      "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-button hover:shadow-lg": variant === "primary",
      "bg-blue-600 text-white shadow-button hover:shadow-lg": variant === "secondary",
      "bg-transparent border border-purple-600 text-purple-600 hover:bg-purple-500/10": variant === "outlined",
      "bg-transparent text-white hover:bg-white/5": variant === "ghost",
      "bg-transparent text-blue-600 hover:text-blue-700 p-0 hover:underline focus:ring-0": variant === "link",
      
      // CTA Primary Button style
      "bg-gradient-to-br from-[#8B5CF6] to-[#6366F1] border-none px-6 py-3 rounded-lg text-white font-semibold shadow-md shadow-indigo-500/10 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-indigo-500/20": variant === "cta-primary",
      
      // CTA Secondary Button style
      "bg-transparent border-2 border-[#8B5CF6] px-6 py-3 rounded-lg text-[#8B5CF6] font-semibold hover:bg-[#8B5CF6]/10 hover:translate-y-[-2px]": variant === "cta-secondary",

      "text-sm px-3 py-1 h-8": size === "sm",
      "text-base px-4 py-2 h-10": size === "md",
      "text-lg px-6 py-3 h-12": size === "lg",

      "button-glow": isGlowing,
    },
    className
  );

  // If href is provided, render an anchor tag
  if (href) {
    // Only use properties that are valid for anchor elements
    // We explicitly extract common and anchor-specific props
    const { 
      onClick, 
      target, 
      rel, 
      title, 
      id, 
      role, 
      tabIndex, 
      'aria-label': ariaLabel,
      style 
    } = props;
    
    const anchorProps = {
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
      <a 
        href={href} 
        className={styles}
        {...anchorProps}
      >
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
