import { RustLogo } from "@/lib/rust-logo";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function Logo({ size = "md", showText = true }: LogoProps) {
  const sizes = {
    sm: "h-12 w-12",
    md: "h-16 w-16",
    lg: "h-20 w-20"
  };
  
  return (
    <div className="flex items-center">
      <RustLogo className={sizes[size]} />
      
      {showText && (
        <div className="ml-3">
          <h1 className="font-heading text-2xl text-primary">RustBunnies</h1>
          <p className="text-xs text-light-dark/80 font-technical">Your cozy survival server</p>
        </div>
      )}
    </div>
  );
}
