import { Router } from 'express';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

router.get('/profile', authenticate, (req, res) => {
  res.json({ message: 'This is a protected route', user: (req as any).user });
});

export default router;
