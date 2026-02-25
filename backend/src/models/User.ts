import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../config/database';

export const createUser = async (email: string, password: string, firstName: string, lastName: string) => {
  const hashedPassword = await bcryptjs.hash(password, 10);
  
  const result = await query(
    'INSERT INTO users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *',
    [email, hashedPassword, firstName, lastName]
  );
  
  return result.rows[0];
};

export const getUserByEmail = async (email: string) => {
  const result = await query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

export const verifyPassword = async (password: string, hashedPassword: string) => {
  return bcryptjs.compare(password, hashedPassword);
};

export const generateToken = (userId: number, email: string) => {
  return jwt.sign(
    { userId, email, role: 'user' },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '7d' }
  );
};
