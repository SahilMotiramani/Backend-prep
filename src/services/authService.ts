import jwt from 'jsonwebtoken';
import { User } from '../models/userModel';

const JWT_SECRET = '1234'; // Yadd this in an environment variable

export const registerUser = async (email: string, password: string, role:string, semesterName:string) => {
  const user = new User({ email, password, role, semesterName });
  return user.save();
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new Error('Invalid credentials');
  }
  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
  return { token };
};

export const authenticateToken = (token: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
};
