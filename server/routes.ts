import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { json } from "zod-validation-error";
import session from "express-session";
import passport from "passport";
import { configurePassport } from "./passport";

export async function registerRoutes(app: Express): Promise<Server> {
  // Configure session middleware
  app.use(session({
    secret: process.env.SESSION_SECRET || 'fallback-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true in production with HTTPS
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  }));

  // Configure passport
  configurePassport();
  app.use(passport.initialize());
  app.use(passport.session());

  // Steam auth routes
  app.get('/auth/steam', passport.authenticate('steam'));

  app.get('/auth/steam/return',
    passport.authenticate('steam', { failureRedirect: '/' }),
    (req, res) => {
      res.redirect('/');
    }
  );

  app.get('/auth/logout', (req, res) => {
    req.logout(() => {
      res.redirect('/');
    });
  });

  app.get('/api/user', (req, res) => {
    if (req.isAuthenticated()) {
      res.json(req.user);
    } else {
      res.status(401).json({ message: 'Not authenticated' });
    }
  });
  // Server info routes
  app.get("/api/servers", async (req, res) => {
    try {
      const servers = await storage.getAllServers();
      res.json(servers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch servers" });
    }
  });

  app.get("/api/servers/:id", async (req, res) => {
    try {
      const serverId = parseInt(req.params.id);
      const server = await storage.getServer(serverId);
      
      if (!server) {
        return res.status(404).json({ message: "Server not found" });
      }
      
      res.json(server);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch server information" });
    }
  });

  // Wipe schedule routes
  app.get("/api/wipe-schedules", async (req, res) => {
    try {
      const wipeSchedules = await storage.getAllWipeSchedules();
      res.json(wipeSchedules);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch wipe schedules" });
    }
  });
  
  app.get("/api/next-wipe", async (req, res) => {
    try {
      const serverId = req.query.serverId ? parseInt(req.query.serverId as string) : undefined;
      const nextWipe = await storage.getNextWipe(serverId);
      
      if (!nextWipe) {
        return res.status(404).json({ message: "No upcoming wipe found" });
      }
      
      res.json(nextWipe);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch next wipe information" });
    }
  });

  // Store item routes
  app.get("/api/store-items", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      const storeItems = await storage.getStoreItems(category);
      res.json(storeItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch store items" });
    }
  });
  
  app.get("/api/store-items/:id", async (req, res) => {
    try {
      const itemId = parseInt(req.params.id);
      const item = await storage.getStoreItem(itemId);
      
      if (!item) {
        return res.status(404).json({ message: "Store item not found" });
      }
      
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch store item" });
    }
  });

  // User routes
  app.post("/api/users/steam-auth", async (req, res) => {
    try {
      // This would normally handle Steam OpenID authentication
      // For this MVP, we're just simulating a successful auth
      const { steamId, displayName, avatarUrl } = req.body;
      
      // Check if user already exists
      let user = await storage.getUserBySteamId(steamId);
      
      if (!user) {
        // Create a new user
        const username = `steam_${steamId}`;
        const password = `password_${Math.random().toString(36).substring(2, 15)}`;
        
        user = await storage.createUser({
          username,
          password,
          steamId,
          displayName,
          avatarUrl,
        });
      }
      
      res.json({ 
        success: true, 
        user: {
          id: user.id,
          username: user.username,
          displayName: user.displayName,
          avatarUrl: user.avatarUrl
        }
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to authenticate with Steam" });
    }
  });

  // Cart routes
  app.post("/api/cart/add", async (req, res) => {
    try {
      const { userId, storeItemId, quantity } = req.body;
      const cartItem = await storage.addToCart(userId, storeItemId, quantity);
      res.json(cartItem);
    } catch (error) {
      res.status(500).json({ message: "Failed to add item to cart" });
    }
  });

  app.get("/api/cart/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const cartItems = await storage.getCartItems(userId);
      res.json(cartItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cart items" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
