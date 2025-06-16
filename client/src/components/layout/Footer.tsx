import { Link } from "wouter";
import { RustLogo } from "@/lib/rust-logo";
import { FaDiscord, FaTiktok, FaInstagram, FaTwitter, FaYoutube, FaSteam } from "react-icons/fa";
import { ExternalLink, ChevronRight, ScrollText, ShieldAlert, Mail, HelpCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark border-t border-teal-700/30 mt-auto">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
          {/* Logo and Disclaimer */}
          <div className="md:col-span-4">
            <div className="flex items-center">
              <RustLogo className="h-16" />
            </div>
            <p className="text-light-dark/70 mt-4 max-w-md text-sm leading-relaxed">
              Join our professional Rust gaming community featuring dedicated servers with high performance, 
              active administration, and carefully balanced gameplay for serious players.
            </p>
          </div>
          
          {/* Navigation */}
          <div className="md:col-span-2">
            <h4 className="font-heading text-primary font-bold text-lg mb-4 flex items-center">
              <ScrollText className="h-4 w-4 mr-2" />
              NAVIGATION
            </h4>
            <ul className="space-y-2 text-light-dark">
              {[
                { href: "/", label: "Home" },
                { href: "/servers", label: "Servers" },
                { href: "/wipe", label: "Wipe Schedule" },
                { href: "/store", label: "Store" },
                { href: "/link-account", label: "Link Steam" }
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <div className="hover:text-primary transition-colors cursor-pointer text-sm flex items-center group">
                      <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Legal */}
          <div className="md:col-span-2">
            <h4 className="font-heading text-primary font-bold text-lg mb-4 flex items-center">
              <ShieldAlert className="h-4 w-4 mr-2" />
              LEGAL
            </h4>
            <ul className="space-y-2 text-light-dark">
              {[
                { href: "#terms", label: "Terms of Service" },
                { href: "#privacy", label: "Privacy Policy" },
                { href: "#refund", label: "Refund Policy" },
                { href: "#rules", label: "Server Rules" }
              ].map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-primary transition-colors text-sm flex items-center group">
                    <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div className="md:col-span-2">
            <h4 className="font-heading text-primary font-bold text-lg mb-4 flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              CONTACT
            </h4>
            <ul className="space-y-2 text-light-dark">
              {[
                { href: "#support", label: "Support" },
                { href: "https://discord.gg/H4b6MjJG", label: "Discord" },
                { href: "#email", label: "Email Us" },
                { href: "#report", label: "Report Issue" }
              ].map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-primary transition-colors text-sm flex items-center group">
                    <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Help */}
          <div className="md:col-span-2">
            <h4 className="font-heading text-primary font-bold text-lg mb-4 flex items-center">
              <HelpCircle className="h-4 w-4 mr-2" />
              RESOURCES
            </h4>
            <ul className="space-y-2 text-light-dark">
              {[
                { href: "#faq", label: "FAQ" },
                { href: "#commands", label: "Server Commands" },
                { href: "#plugins", label: "Plugin List" },
                { href: "#updates", label: "Server Updates" }
              ].map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="hover:text-primary transition-colors text-sm flex items-center group">
                    <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Social Links */}
        <div className="border-t border-teal-700/30 pt-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
            <p className="text-light-dark/70 text-sm font-technical">
              © {new Date().getFullYear()} RUSTBUNNIES. All rights reserved.
            </p>
            <p className="text-light-dark/50 text-xs mt-1">
              Not affiliated with Facepunch Studios or the official Rust game.
            </p>
          </div>
          
          <div className="flex space-x-5">
            {[
              { icon: <FaDiscord />, href: "https://discord.gg/H4b6MjJG", label: "Discord" },
              { icon: <FaSteam />, href: "#steam", label: "Steam Group" },
              { icon: <FaTiktok />, href: "#tiktok", label: "TikTok" },
              { icon: <FaInstagram />, href: "#instagram", label: "Instagram" },
              { icon: <FaTwitter />, href: "#twitter", label: "Twitter" },
              { icon: <FaYoutube />, href: "#youtube", label: "YouTube" }
            ].map((social, index) => (
              <a 
                key={index}
                href={social.href} 
                className="text-light-dark hover:text-primary transition-colors p-2 rounded-full hover:bg-dark-light/5"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom Banner */}
      <div className="bg-dark-light/20 py-3 border-t border-teal-700/20">
        <div className="container mx-auto px-4 flex justify-center items-center">
          <p className="text-light-dark/60 text-xs flex items-center">
            <ExternalLink className="h-3 w-3 mr-1" />
            View our server status at <a href="#status" className="text-primary hover:text-primary-dark ml-1 mr-1">status.rustbunnies.com</a> | 
            <a href="#steamcmd" className="text-primary hover:text-primary-dark ml-1">Connect via Steam</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
