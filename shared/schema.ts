import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User Schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  steamId: text("steam_id").unique(),
  email: text("email"),
  displayName: text("display_name"),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  steamId: true,
  email: true,
  displayName: true,
  avatarUrl: true,
});

// Server Schema
export const servers = pgTable("servers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  ipAddress: text("ip_address").notNull(),
  port: integer("port").notNull(),
  status: text("status").notNull(), // "online", "offline", "maintenance"
  currentPlayers: integer("current_players").default(0),
  maxPlayers: integer("max_players").notNull(),
  mapSize: integer("map_size"),
  lastWipe: timestamp("last_wipe"),
  imageUrl: text("image_url"),
});

export const insertServerSchema = createInsertSchema(servers).pick({
  name: true,
  description: true,
  ipAddress: true,
  port: true,
  status: true,
  currentPlayers: true,
  maxPlayers: true,
  mapSize: true,
  lastWipe: true,
  imageUrl: true,
});

// Wipe Schedule Schema
export const wipeSchedules = pgTable("wipe_schedules", {
  id: serial("id").primaryKey(),
  serverId: integer("server_id").notNull(),
  wipeDate: timestamp("wipe_date").notNull(),
  isBlueprintWipe: boolean("is_blueprint_wipe").default(false),
  description: text("description"),
  frequency: text("frequency").notNull(), // "weekly", "biweekly", "monthly"
});

export const insertWipeScheduleSchema = createInsertSchema(wipeSchedules).pick({
  serverId: true,
  wipeDate: true,
  isBlueprintWipe: true,
  description: true,
  frequency: true,
});

// Store Item Schema
export const storeItems = pgTable("store_items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(), // stored in cents
  imageUrl: text("image_url"),
  category: text("category").notNull(), // "kits", "vip", "bundles", "donations"
  contents: json("contents").notNull(),
  rating: integer("rating").default(0),
  ratingCount: integer("rating_count").default(0),
  isPopular: boolean("is_popular").default(false),
});

export const insertStoreItemSchema = createInsertSchema(storeItems).pick({
  name: true,
  description: true,
  price: true,
  imageUrl: true,
  category: true,
  contents: true,
  isPopular: true,
});

// Cart Item Schema
export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  storeItemId: integer("store_item_id").notNull(),
  quantity: integer("quantity").default(1).notNull(),
  addedAt: timestamp("added_at").defaultNow().notNull(),
});

export const insertCartItemSchema = createInsertSchema(cartItems).pick({
  userId: true,
  storeItemId: true,
  quantity: true,
});

// Export Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Server = typeof servers.$inferSelect;
export type InsertServer = z.infer<typeof insertServerSchema>;

export type WipeSchedule = typeof wipeSchedules.$inferSelect;
export type InsertWipeSchedule = z.infer<typeof insertWipeScheduleSchema>;

export type StoreItem = typeof storeItems.$inferSelect;
export type InsertStoreItem = z.infer<typeof insertStoreItemSchema>;

export type CartItem = typeof cartItems.$inferSelect;
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;
