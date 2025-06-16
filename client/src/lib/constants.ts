import { NavLink, SocialMediaLink } from "@/lib/types";

// Navigation Links
export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/servers", label: "Servers" },
  { href: "/wipe", label: "Wipe" },
  { href: "/store", label: "Store" },
  { href: "/link-account", label: "Link Account" }
];

// Social Media Links
export const SOCIAL_LINKS: SocialMediaLink[] = [
  {
    name: "Discord",
    url: "https://discord.gg/rustbunnies",
    icon: "discord",
    color: "#5865F2"
  },
  {
    name: "TikTok",
    url: "https://tiktok.com/@rustbunnies",
    icon: "tiktok",
    color: "#000000"
  },
  {
    name: "Instagram",
    url: "https://instagram.com/rustbunnies",
    icon: "instagram",
    color: "#E1306C"
  }
];

// Server Status Types
export const SERVER_STATUS = {
  ONLINE: "online",
  OFFLINE: "offline",
  MAINTENANCE: "maintenance"
};

// Store Categories
export const STORE_CATEGORIES = [
  "kits",
  "vip",
  "bundles",
  "donations"
];

// Wipe Frequency Types
export const WIPE_FREQUENCIES = {
  WEEKLY: "weekly",
  BIWEEKLY: "biweekly",
  MONTHLY: "monthly"
};

// Server Images
export const SERVER_IMAGES = {
  VANILLA: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&h=400",
  MODDED: "https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?auto=format&fit=crop&w=600&h=300",
  PVE: "https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=600&h=300"
};

// Footer Links
export const FOOTER_LINKS = {
  LEGAL: [
    { label: "Terms of Service", url: "#terms" },
    { label: "Privacy Policy", url: "#privacy" },
    { label: "Refund Policy", url: "#refund" },
    { label: "Server Rules", url: "#rules" }
  ],
  CONTACT: [
    { label: "Support", url: "#support" },
    { label: "Discord", url: "#discord" },
    { label: "Email Us", url: "#email" },
    { label: "Report an Issue", url: "#report" }
  ]
};

// After-Wipe Events
export const AFTER_WIPE_EVENTS = [
  {
    title: "Supply Drop Festival",
    timing: "First 3 hours after wipe",
    description: "Increased supply drops across the map with better loot."
  },
  {
    title: "Starter Kits",
    timing: "First 24 hours after wipe",
    description: "Free starter kits available for all players who join within 24h."
  },
  {
    title: "Double XP Weekend",
    timing: "First weekend after wipe",
    description: "Earn double XP for all activities during the weekend."
  }
];

// Theme Colors
export const THEME_COLORS = {
  PRIMARY: "#00B6B6", // Turquoise
  PRIMARY_DARK: "#009999",
  PRIMARY_LIGHT: "#33CCCC",
  SECONDARY: "#D93025", // Red
  SECONDARY_DARK: "#B82219",
  SECONDARY_LIGHT: "#E15B52",
  ACCENT: "#E9C583", // Tan/Beige
  ACCENT_DARK: "#D4B06E",
  ACCENT_LIGHT: "#F2D59B",
  DARK: "#003A3A", // Dark Teal
  DARK_LIGHT: "#005252",
  LIGHT: "#F5F5F5", // Off-White
  LIGHT_DARK: "#E0E0E0"
};
