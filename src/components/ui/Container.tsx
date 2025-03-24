
import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

const Container = ({ 
  children, 
  className, 
  as: Component = "div", 
  ...props 
}: ContainerProps) => {
  return (
    <Component
      className={cn(
        "w-full max-w-7xl mx-auto px-12 sm:px-18 lg:px-24",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Container;
