import React from "react";
import logoPath from "@assets/RUST Logo Words RGB.png";

interface HeaderLogoProps {
  className?: string;
}

export function HeaderLogo({ className = "h-16" }: HeaderLogoProps) {
  return (
    <img 
      src={logoPath} 
      alt="Rust Bunnies Logo" 
      className={className} 
    />
  );
}