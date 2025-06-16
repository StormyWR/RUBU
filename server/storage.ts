import { 
  users, type User, type InsertUser,
  servers, type Server, type InsertServer,
  wipeSchedules, type WipeSchedule, type InsertWipeSchedule,
  storeItems, type StoreItem, type InsertStoreItem,
  cartItems, type CartItem, type InsertCartItem
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserBySteamId(steamId: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Server operations
  getAllServers(): Promise<Server[]>;
  getServer(id: number): Promise<Server | undefined>;
  createServer(server: InsertServer): Promise<Server>;
  updateServerStatus(id: number, status: string, currentPlayers: number): Promise<Server | undefined>;
  
  // Wipe schedule operations
  getAllWipeSchedules(): Promise<WipeSchedule[]>;
  getWipeSchedulesForServer(serverId: number): Promise<WipeSchedule[]>;
  getNextWipe(serverId?: number): Promise<WipeSchedule | undefined>;
  createWipeSchedule(wipeSchedule: InsertWipeSchedule): Promise<WipeSchedule>;
  
  // Store item operations
  getStoreItems(category?: string): Promise<StoreItem[]>;
  getStoreItem(id: number): Promise<StoreItem | undefined>;
  createStoreItem(storeItem: InsertStoreItem): Promise<StoreItem>;
  
  // Cart operations
  getCartItems(userId: number): Promise<CartItem[]>;
  addToCart(userId: number, storeItemId: number, quantity: number): Promise<CartItem>;
  removeFromCart(id: number): Promise<void>;
  clearCart(userId: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private servers: Map<number, Server>;
  private wipeSchedules: Map<number, WipeSchedule>;
  private storeItems: Map<number, StoreItem>;
  private cartItems: Map<number, CartItem>;
  
  // IDs for auto-increment
  private userId: number;
  private serverId: number;
  private wipeScheduleId: number;
  private storeItemId: number;
  private cartItemId: number;

  constructor() {
    this.users = new Map();
    this.servers = new Map();
    this.wipeSchedules = new Map();
    this.storeItems = new Map();
    this.cartItems = new Map();
    
    this.userId = 1;
    this.serverId = 1;
    this.wipeScheduleId = 1;
    this.storeItemId = 1;
    this.cartItemId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  
  async getUserBySteamId(steamId: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.steamId === steamId
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const now = new Date();
    const user: User = { ...insertUser, id, createdAt: now };
    this.users.set(id, user);
    return user;
  }

  // Server methods
  async getAllServers(): Promise<Server[]> {
    return Array.from(this.servers.values());
  }

  async getServer(id: number): Promise<Server | undefined> {
    return this.servers.get(id);
  }

  async createServer(insertServer: InsertServer): Promise<Server> {
    const id = this.serverId++;
    const server: Server = { ...insertServer, id };
    this.servers.set(id, server);
    return server;
  }

  async updateServerStatus(id: number, status: string, currentPlayers: number): Promise<Server | undefined> {
    const server = this.servers.get(id);
    if (!server) return undefined;
    
    const updatedServer = { ...server, status, currentPlayers };
    this.servers.set(id, updatedServer);
    return updatedServer;
  }

  // Wipe schedule methods
  async getAllWipeSchedules(): Promise<WipeSchedule[]> {
    return Array.from(this.wipeSchedules.values());
  }

  async getWipeSchedulesForServer(serverId: number): Promise<WipeSchedule[]> {
    return Array.from(this.wipeSchedules.values()).filter(
      (wipeSchedule) => wipeSchedule.serverId === serverId
    );
  }

  async getNextWipe(serverId?: number): Promise<WipeSchedule | undefined> {
    const now = new Date();
    let schedules = Array.from(this.wipeSchedules.values());
    
    if (serverId) {
      schedules = schedules.filter(schedule => schedule.serverId === serverId);
    }
    
    return schedules
      .filter(schedule => schedule.wipeDate > now)
      .sort((a, b) => a.wipeDate.getTime() - b.wipeDate.getTime())[0];
  }

  async createWipeSchedule(insertWipeSchedule: InsertWipeSchedule): Promise<WipeSchedule> {
    const id = this.wipeScheduleId++;
    const wipeSchedule: WipeSchedule = { ...insertWipeSchedule, id };
    this.wipeSchedules.set(id, wipeSchedule);
    return wipeSchedule;
  }

  // Store item methods
  async getStoreItems(category?: string): Promise<StoreItem[]> {
    let items = Array.from(this.storeItems.values());
    
    if (category) {
      items = items.filter(item => item.category === category);
    }
    
    return items;
  }

  async getStoreItem(id: number): Promise<StoreItem | undefined> {
    return this.storeItems.get(id);
  }

  async createStoreItem(insertStoreItem: InsertStoreItem): Promise<StoreItem> {
    const id = this.storeItemId++;
    const storeItem: StoreItem = { 
      ...insertStoreItem, 
      id, 
      rating: 0, 
      ratingCount: 0 
    };
    this.storeItems.set(id, storeItem);
    return storeItem;
  }

  // Cart methods
  async getCartItems(userId: number): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(
      (cartItem) => cartItem.userId === userId
    );
  }

  async addToCart(userId: number, storeItemId: number, quantity: number): Promise<CartItem> {
    // Check if this user already has this item in cart
    const existingCartItem = Array.from(this.cartItems.values()).find(
      (item) => item.userId === userId && item.storeItemId === storeItemId
    );
    
    if (existingCartItem) {
      // Update quantity
      const updatedCartItem = { 
        ...existingCartItem, 
        quantity: existingCartItem.quantity + quantity 
      };
      this.cartItems.set(existingCartItem.id, updatedCartItem);
      return updatedCartItem;
    }
    
    // Create new cart item
    const id = this.cartItemId++;
    const now = new Date();
    const cartItem: CartItem = { 
      id, 
      userId, 
      storeItemId, 
      quantity, 
      addedAt: now 
    };
    
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async removeFromCart(id: number): Promise<void> {
    this.cartItems.delete(id);
  }

  async clearCart(userId: number): Promise<void> {
    Array.from(this.cartItems.values())
      .filter((item) => item.userId === userId)
      .forEach((item) => this.cartItems.delete(item.id));
  }

  // Initialize with sample data
  private initializeData() {
    // Sample servers
    const vanillaServer: InsertServer = {
      name: "RustBunnies Vanilla",
      description: "Pure Rust experience with minimal plugins, weekly wipes, and active admins.",
      ipAddress: "play.rustbunnies.com",
      port: 28015,
      status: "online",
      currentPlayers: 128,
      maxPlayers: 150,
      mapSize: 4500,
      lastWipe: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&h=400"
    };
    
    const moddedServer: InsertServer = {
      name: "RustBunnies 2x",
      description: "Modded server with 2x gather rates, custom plugins, and biweekly wipes.",
      ipAddress: "2x.rustbunnies.com",
      port: 28015,
      status: "online",
      currentPlayers: 95,
      maxPlayers: 150,
      mapSize: 3500,
      lastWipe: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      imageUrl: "https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?auto=format&fit=crop&w=600&h=300"
    };
    
    const pveServer: InsertServer = {
      name: "RustBunnies PvE",
      description: "PvE focused server with custom events, zombies, and monthly wipes.",
      ipAddress: "pve.rustbunnies.com",
      port: 28015,
      status: "maintenance",
      currentPlayers: 0,
      maxPlayers: 100,
      mapSize: 3000,
      lastWipe: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), // 12 days ago
      imageUrl: "https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=600&h=300"
    };
    
    const server1 = this.createServer(vanillaServer);
    const server2 = this.createServer(moddedServer);
    const server3 = this.createServer(pveServer);
    
    // Sample wipe schedules
    // Next vanilla wipe - 3 days, 18 hours from now
    const nextThursday = new Date();
    nextThursday.setDate(nextThursday.getDate() + ((4 + 7 - nextThursday.getDay()) % 7)); // Next Thursday
    nextThursday.setHours(15, 0, 0, 0); // 3:00 PM EST
    
    this.createWipeSchedule({
      serverId: 1,
      wipeDate: nextThursday,
      isBlueprintWipe: false,
      description: "Weekly map wipe for Vanilla server",
      frequency: "weekly"
    });
    
    // 2x server - biweekly
    const biweeklyWipe = new Date(nextThursday);
    biweeklyWipe.setDate(biweeklyWipe.getDate() + (nextThursday.getDate() % 2 === 0 ? 14 : 7));
    biweeklyWipe.setHours(17, 0, 0, 0); // 5:00 PM EST
    
    this.createWipeSchedule({
      serverId: 2,
      wipeDate: biweeklyWipe,
      isBlueprintWipe: false,
      description: "Biweekly map wipe for 2x server",
      frequency: "biweekly"
    });
    
    // PvE server - monthly
    const monthlyWipe = new Date();
    monthlyWipe.setDate(1); // First day of next month
    monthlyWipe.setMonth(monthlyWipe.getMonth() + 1);
    monthlyWipe.setHours(19, 0, 0, 0); // 7:00 PM EST
    
    this.createWipeSchedule({
      serverId: 3,
      wipeDate: monthlyWipe,
      isBlueprintWipe: true,
      description: "Monthly map and blueprint wipe for PvE server",
      frequency: "monthly"
    });
    
    // Sample store items
    this.createStoreItem({
      name: "Starter Kit",
      description: "A basic kit with essential items to get you started after a wipe.",
      price: 499, // $4.99
      imageUrl: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&w=600&h=300",
      category: "kits",
      contents: [
        "Stone Tools Set",
        "Basic Building Materials",
        "Sleeping Bag",
        "Food and Water"
      ],
      isPopular: true
    });
    
    this.createStoreItem({
      name: "Warrior Kit",
      description: "Combat-focused kit with weapons and armor for PvP encounters.",
      price: 999, // $9.99
      imageUrl: "https://images.unsplash.com/photo-1626108668052-fb7585fb9720?auto=format&fit=crop&w=600&h=300",
      category: "kits",
      contents: [
        "Semi-Automatic Rifle",
        "Road Sign Armor Set",
        "Medical Supplies",
        "Ammunition"
      ],
      isPopular: false
    });
    
    this.createStoreItem({
      name: "Builder Kit",
      description: "Everything you need to establish a secure base quickly.",
      price: 799, // $7.99
      imageUrl: "https://images.unsplash.com/photo-1633613286991-611fe299c4be?auto=format&fit=crop&w=600&h=300",
      category: "kits",
      contents: [
        "Metal Building Materials",
        "Tool Cupboard",
        "Code Locks",
        "Storage Containers"
      ],
      isPopular: false
    });
    
    // VIP Tiers
    this.createStoreItem({
      name: "Bronze VIP",
      description: "Basic VIP benefits including priority queue access and exclusive kit.",
      price: 1000, // $10/month
      imageUrl: "",
      category: "vip",
      contents: [
        "Priority queue access",
        "Access to /kit vip command",
        "VIP tag in chat and Discord",
        "10% discount in store"
      ],
      isPopular: false
    });
    
    this.createStoreItem({
      name: "Gold VIP",
      description: "Premium VIP benefits with exclusive features and increased perks.",
      price: 2500, // $25/month
      imageUrl: "",
      category: "vip",
      contents: [
        "All Bronze benefits",
        "Access to /kit vipplus command",
        "/remove tool functionality",
        "25% discount in store",
        "Exclusive monthly skin"
      ],
      isPopular: true
    });
  }
}

export const storage = new MemStorage();
