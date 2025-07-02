import React from "react";

interface CopyrightNoticeProps {
  variant?: "footer" | "inline" | "watermark";
  className?: string;
}

export const CopyrightNotice = ({ variant = "footer", className = "" }: CopyrightNoticeProps) => {
  const baseClasses = "text-white/60 text-sm";
  
  const variantClasses = {
    footer: "text-center",
    inline: "text-left",
    watermark: "fixed bottom-4 right-4 bg-black/20 backdrop-blur-sm px-3 py-1 rounded-lg border border-white/10 z-40 pointer-events-none"
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      <p>
        © 2024 Cointegrity. All rights reserved. 
        {variant === "watermark" && (
          <span className="block text-xs mt-1">Protected Content</span>
        )}
      </p>
      {variant !== "watermark" && (
        <p className="text-xs mt-1 text-white/40">
          Unauthorized scraping, data mining, or bulk extraction is prohibited.
        </p>
      )}
    </div>
  );
};