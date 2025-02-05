import { Request, Response, NextFunction } from 'express';
import { authenticateToken } from '../services/authService';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = req.cookies.token; 
  console.log(token)
  
  if (token == null) return res.sendStatus(401);
  
  try {
    const user = await authenticateToken(token);
    (req as any).user = user; // Attach user to request
    console.log(user)
    next();
  } catch (error) {
    res.sendStatus(403);
  }
};

// Middleware to authorize admin users
export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user; // Retrieve user from request

  // Check if the user role is 'admin'
  if (user && user.role === 'admin') {
    next(); // Proceed if user is admin
  } else {
    res.sendStatus(403); // Forbidden
  }
};
