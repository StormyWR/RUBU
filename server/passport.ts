import passport from 'passport';
// @ts-ignore
import { Strategy as SteamStrategy } from 'passport-steam';
import { storage } from './storage';

// Set up Passport
export function configurePassport() {
  // You need to get your own Steam API key from https://steamcommunity.com/dev/apikey
  // For now, using a placeholder key for development (this won't work with real Steam login)
  if (!process.env.STEAM_API_KEY) throw new Error("Missing STEAM_API_KEY");
  const STEAM_API_KEY = process.env.STEAM_API_KEY;
  
  // Define the full URL for authentication
  const HOSTNAME = process.env.NODE_ENV === 'production'
      ? 'https://rustbunnies.com'
      : 'http://localhost:5000';
  // Configure Steam strategy for passport
  passport.use(new SteamStrategy({
    returnURL: `${HOSTNAME}/auth/steam/return`,
    realm: HOSTNAME,
    apiKey: STEAM_API_KEY
  }, async (identifier: string, profile: any, done: any) => {
    try {
      // Log the profile data for debugging
      console.log('Steam auth callback received:');
      console.log('Identifier:', identifier);
      console.log('Profile:', JSON.stringify(profile, null, 2));

      // Extract steamId from the identifier URL
      // The identifier is in format: https://steamcommunity.com/openid/id/76561198XXXXXXXXX
      const steamId = identifier.split('/').pop() || '';
      
      // Safety check - if profile data is missing, handle it gracefully
      if (!profile || !profile._json) {
        console.error('Missing profile data from Steam');
        // Create minimal profile data for testing
        const displayName = 'Steam User';
        const avatarUrl = '';
        
        // Check if user already exists
        let user = await storage.getUserBySteamId(steamId);
        
        if (!user) {
          // Create a new user with minimal data
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
        
        return done(null, user);
      }
      
      // Extract useful data from Steam profile
      const displayName = profile._json.personaname || 'Steam User';
      const avatarUrl = profile._json.avatarmedium || '';
      
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
      } else {
        // Update user with latest Steam data
        // In a real app, you might want to update the user data here
        console.log('User already exists:', user);
      }
      
      return done(null, user);
    } catch (error) {
      console.error('Error in Steam authentication:', error);
      return done(error);
    }
  }));

  // Serialize user for session
  passport.serializeUser((user: any, done) => {
    console.log('Serializing user:', user.id);
    done(null, user.id);
  });

  // Deserialize user from session
  passport.deserializeUser(async (id: number, done) => {
    try {
      console.log('Deserializing user ID:', id);
      const user = await storage.getUser(id);
      if (!user) {
        console.log('User not found during deserialization');
        return done(null, false);
      }
      done(null, user);
    } catch (error) {
      console.error('Error deserializing user:', error);
      done(error);
    }
  });
}
