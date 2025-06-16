import React from "react";
import logoPath from "@assets/RUST Logo RGB.png";

interface RustLogoProps {
  className?: string;
}

export function RustLogo({ className = "h-16" }: RustLogoProps) {
  return (
    <img 
      src={logoPath} 
      alt="Rust Bunnies Logo" 
      className={className} 
    />
  );
}
