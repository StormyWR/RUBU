import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { HeaderLogo } from "@/lib/header-logo";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-mobile";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetClose 
} from "@/components/ui/sheet";
import { Menu, ChevronRight, Copy } from "lucide-react";
import { FaSteam } from "react-icons/fa";
import { BulletinBoard } from "@/components/ui/bulletin-board";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const NavLink = ({ href, label, currentPath }: { href: string, label: string, currentPath: string }) => {
  const isActive = currentPath === href || 
                  (href !== "/" && currentPath.startsWith(href));
  
  return (
    <Link href={href}>
      <div className={`nav-link font-technical font-bold px-4 py-2 rounded-sm transition-all 
                    ${isActive ? 
                    "text-primary bg-primary/10 border-b-2 border-primary" : 
                    "text-light hover:text-primary hover:bg-[#003A3A]/10"}`}>
        {label}
      </div>
    </Link>
  );
};

const AuthSection = () => {
  const { user, isAuthenticated, loginWithSteam, logout } = useAuth();

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center space-x-3">
        <div className="relative group cursor-pointer" onClick={() => logout()}>
          <Avatar className="h-15 w-15 border-2 border-primary/30 group-hover:border-primary/60 transition-all">
            <AvatarImage src={user.avatarUrl} alt={user.displayName}/>
            <AvatarFallback>{user.displayName?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>

          {/* Logout overlay */}
          <div
              className="absolute inset-0 bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-white text-xs font-bold text-center">LOG OUT</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 group cursor-pointer" onClick={() => navigator.clipboard.writeText(user.displayName)}>
          <span className="text-light font-technical font-bold">{user.displayName}</span>
          <Copy className="h-4 w-4 text-primary/60 group-hover:text-primary transition-colors" />
        </div>
      </div>
    );
  }

  return (
      <Button
          size="sm"
          className="bg-secondary hover:bg-secondary/90 text-white font-medium px-4"
      onClick={loginWithSteam}
    >
      <FaSteam className="w-4 h-4 mr-2" />
      LINK STEAM
    </Button>
  );
};

export default function Header() {
  const [currentPath, setCurrentPath] = useLocation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [sheetOpen, setSheetOpen] = useState(false);
  
  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/servers", label: "SERVERS" },
    { href: "/wipe", label: "WIPE SCHEDULE" },
    { href: "/store", label: "STORE" }
  ];
  
  useEffect(() => {
    // Close the mobile menu when changing routes
    setSheetOpen(false);
  }, [currentPath]);
  
  return (
    <header className="sticky top-0 z-50 bg-dark/95 backdrop-blur-sm shadow-lg border-b border-teal-700/20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left side - Auth and Navigation */}
          <div className="flex items-center space-x-6">
            <AuthSection />
            {!isMobile && (
              <nav className="flex items-center">
                <ul className="flex items-center space-x-1">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <NavLink href={link.href} label={link.label} currentPath={currentPath} />
                    </li>
                  ))}
                  <li>
                    <BulletinBoard />
                  </li>
                </ul>
              </nav>
            )}
          </div>
          
          {/* Right side - Logo */}
          <Link href="/">
            <div className="flex items-center cursor-pointer group">
              <HeaderLogo className="h-14 md:h-16 transition-transform group-hover:scale-105" />
            </div>
          </Link>
          
          {/* Mobile menu */}
          {isMobile && (
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden border-primary/30 hover:border-primary/60">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-dark border-l border-teal-700/30 text-light w-64">
                <div className="flex flex-col space-y-4 mt-10">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link href={link.href}>
                        <div className={`flex justify-between items-center text-md font-technical font-bold px-3 py-3 rounded cursor-pointer transition-all 
                                    ${currentPath === link.href ? 
                                    "bg-primary/10 text-primary border-l-4 border-primary" : 
                                    "text-light hover:bg-[#003A3A]/5 hover:text-primary"}`}>
                          {link.label}
                          <ChevronRight className={`h-5 w-5 ${currentPath === link.href ? "text-primary" : "text-primary/40"}`} />
                        </div>
                      </Link>
                    </SheetClose>
                  ))}
                  <div className="mt-4">
                    <BulletinBoard />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
}
