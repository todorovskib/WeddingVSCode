import { query } from '../config/database';
import crypto from 'crypto';

interface WeddingData {
  userId: number;
  title: string;
  groomName: string;
  brideName: string;
  weddingDate: string;
  weddingTime?: string;
  location: string;
  password?: string;
  tierId?: number;
  theme?: string;
  description?: string;
}

export const createWedding = async (data: WeddingData) => {
  const slug = crypto.randomBytes(4).toString('hex');
  const hashedPassword = data.password ? 
    require('bcryptjs').hashSync(data.password, 10) : null;

  const result = await query(
    `INSERT INTO wedding_events 
    (user_id, title, groom_name, bride_name, wedding_date, wedding_time, location, password, slug, tier_id, theme, description) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) 
    RETURNING *`,
    [data.userId, data.title, data.groomName, data.brideName, data.weddingDate, 
     data.weddingTime, data.location, hashedPassword, slug, data.tierId, data.theme, data.description]
  );

  return result.rows[0];
};

export const getWeddingById = async (id: number) => {
  const result = await query('SELECT * FROM wedding_events WHERE id = $1', [id]);
  return result.rows[0];
};

export const getWeddingsByUser = async (userId: number) => {
  const result = await query(
    'SELECT * FROM wedding_events WHERE user_id = $1 ORDER BY wedding_date DESC',
    [userId]
  );
  return result.rows;
};

export const updateWedding = async (id: number, updates: any) => {
  const fields = Object.keys(updates).map((key, i) => `${key} = $${i + 1}`).join(', ');
  const values = Object.values(updates);
  
  const result = await query(
    `UPDATE wedding_events SET ${fields}, updated_at = CURRENT_TIMESTAMP WHERE id = $${values.length + 1} RETURNING *`,
    [...values, id]
  );

  return result.rows[0];
};

export const deleteWedding = async (id: number) => {
  await query('DELETE FROM wedding_events WHERE id = $1', [id]);
};

export const publishWedding = async (id: number) => {
  const result = await query(
    'UPDATE wedding_events SET is_published = TRUE, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
};
