import { User } from '@shared/schema';
import { Request } from 'express';

// Extend Express Request type to include user property
declare global {
  namespace Express {
    interface User extends User {}
    
    interface Request {
      // Add isAuthenticated method
      isAuthenticated(): boolean;
      // Add logout method
      logout(callback: (err: any) => void): void;
    }
  }
}
