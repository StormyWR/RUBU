// Server related types
export interface Server {
  id: number;
  name: string;
  description: string;
  ipAddress: string;
  port: number;
  status: "online" | "offline" | "maintenance";
  currentPlayers: number;
  maxPlayers: number;
  mapSize: number;
  lastWipe: Date | string;
  imageUrl: string;
}

// Wipe schedule related types
export interface WipeSchedule {
  id: number;
  serverId: number;
  wipeDate: Date | string;
  isBlueprintWipe: boolean;
  description: string;
  frequency: "weekly" | "biweekly" | "monthly";
}

// Store item related types
export interface StoreItem {
  id: number;
  name: string;
  description: string;
  price: number; // stored in cents
  imageUrl: string;
  category: "kits" | "vip" | "bundles" | "donations";
  contents: string[] | Record<string, any>; // can be an array of strings or complex JSON
  rating: number;
  ratingCount: number;
  isPopular: boolean;
}

// Cart related types
export interface CartItem {
  id: number;
  userId: number;
  storeItemId: number;
  quantity: number;
  addedAt: Date | string;
}

// User related types
export interface User {
  id: number;
  username: string;
  steamId?: string;
  email?: string;
  displayName?: string;
  avatarUrl?: string;
  createdAt: Date | string;
}

// Authentication types
export interface SteamAuthResponse {
  success: boolean;
  user: {
    id: number;
    username: string;
    displayName?: string;
    avatarUrl?: string;
  };
}

// Navigation types
export interface NavLink {
  href: string;
  label: string;
}

// Social media types
export interface SocialMediaLink {
  name: string;
  url: string;
  icon: string;
  color: string;
}
