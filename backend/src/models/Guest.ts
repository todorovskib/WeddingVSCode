import { query } from '../config/database';

interface GuestData {
  weddingId: number;
  name: string;
  email?: string;
  phone?: string;
  relationship?: string;
  dietaryRequirements?: string;
  address?: string;
  rsvpCount?: number;
  notes?: string;
}

export const addGuest = async (data: GuestData) => {
  const result = await query(
    `INSERT INTO guests 
    (wedding_id, name, email, phone, relationship, dietary_requirements, address, rsvp_count, notes) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
    RETURNING *`,
    [data.weddingId, data.name, data.email, data.phone, data.relationship, 
     data.dietaryRequirements, data.address, data.rsvpCount || 1, data.notes]
  );

  return result.rows[0];
};

export const getWeddingGuests = async (weddingId: number) => {
  const result = await query(
    'SELECT * FROM guests WHERE wedding_id = $1 ORDER BY created_at DESC',
    [weddingId]
  );
  return result.rows;
};

export const updateGuest = async (id: number, updates: any) => {
  const fields = Object.keys(updates).map((key, i) => `${key} = $${i + 1}`).join(', ');
  const values = Object.values(updates);
  
  const result = await query(
    `UPDATE guests SET ${fields}, updated_at = CURRENT_TIMESTAMP WHERE id = $${values.length + 1} RETURNING *`,
    [...values, id]
  );

  return result.rows[0];
};

export const updateRsvp = async (guestId: number, status: string, count: number) => {
  const result = await query(
    'UPDATE guests SET rsvp_status = $1, rsvp_count = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
    [status, count, guestId]
  );

  return result.rows[0];
};

export const deleteGuest = async (id: number) => {
  await query('DELETE FROM guests WHERE id = $1', [id]);
};

export const getGuestStats = async (weddingId: number) => {
  const result = await query(
    `SELECT 
      COUNT(*) as total_guests,
      COALESCE(SUM(CASE WHEN rsvp_status = 'confirmed' THEN rsvp_count ELSE 0 END), 0) as confirmed_count,
      COALESCE(SUM(CASE WHEN rsvp_status = 'declined' THEN 1 ELSE 0 END), 0) as declined_count,
      COUNT(*) FILTER (WHERE rsvp_status = 'pending') as pending_count
     FROM guests WHERE wedding_id = $1`,
    [weddingId]
  );

  return result.rows[0];
};
