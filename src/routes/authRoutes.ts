import { Router } from 'express';
import { Request, Response } from 'express';
import { register, login } from '../controllers/authController';
import { authenticate,authorizeAdmin } from '../middlewares/authMiddleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);

  
router.get('/user', authenticate, (req: Request, res: Response) => {
    res.send('Welcome, user!');
  });

export default router;
