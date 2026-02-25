import { query } from '../config/database';

interface FeatureConfig {
  table: string;
  orderBy?: string;
}

type Primitive = string | number | boolean | null;
type RowData = Record<string, Primitive>;

const ensureSafeIdentifier = (value: string) => {
  if (!/^[a-z_]+$/i.test(value)) {
    throw new Error(`Unsafe SQL identifier: ${value}`);
  }
  return value;
};

export const listWeddingFeatureItems = async (
  weddingId: number,
  config: FeatureConfig
) => {
  const table = ensureSafeIdentifier(config.table);
  const orderBy = config.orderBy ? ` ORDER BY ${ensureSafeIdentifier(config.orderBy)}` : '';

  const result = await query(
    `SELECT * FROM ${table} WHERE wedding_id = $1${orderBy}`,
    [weddingId]
  );

  return result.rows;
};

export const createWeddingFeatureItem = async (
  config: FeatureConfig,
  data: RowData
) => {
  const table = ensureSafeIdentifier(config.table);
  const entries = Object.entries(data).filter(([, value]) => value !== undefined);

  const columns = entries.map(([key]) => ensureSafeIdentifier(key));
  const values = entries.map(([, value]) => value);
  const placeholders = columns.map((_, index) => `$${index + 1}`).join(', ');

  const result = await query(
    `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders}) RETURNING *`,
    values
  );

  return result.rows[0];
};

export const updateWeddingFeatureItem = async (
  config: FeatureConfig,
  weddingId: number,
  itemId: number,
  updates: RowData
) => {
  const table = ensureSafeIdentifier(config.table);
  const entries = Object.entries(updates).filter(([, value]) => value !== undefined);

  if (entries.length === 0) {
    const current = await query(
      `SELECT * FROM ${table} WHERE id = $1 AND wedding_id = $2`,
      [itemId, weddingId]
    );
    return current.rows[0] || null;
  }

  const setSql = entries
    .map(([key], index) => `${ensureSafeIdentifier(key)} = $${index + 1}`)
    .join(', ');
  const values = entries.map(([, value]) => value);
  const hasUpdatedAt = await query(
    `SELECT 1
     FROM information_schema.columns
     WHERE table_name = $1 AND column_name = 'updated_at'
     LIMIT 1`,
    [table]
  );
  const updatedAtSql = hasUpdatedAt.rowCount ? ', updated_at = CURRENT_TIMESTAMP' : '';

  const result = await query(
    `UPDATE ${table}
     SET ${setSql}${updatedAtSql}
     WHERE id = $${values.length + 1} AND wedding_id = $${values.length + 2}
     RETURNING *`,
    [...values, itemId, weddingId]
  );

  return result.rows[0] || null;
};

export const deleteWeddingFeatureItem = async (
  config: FeatureConfig,
  weddingId: number,
  itemId: number
) => {
  const table = ensureSafeIdentifier(config.table);
  const result = await query(
    `DELETE FROM ${table} WHERE id = $1 AND wedding_id = $2 RETURNING id`,
    [itemId, weddingId]
  );
  return Boolean(result.rowCount);
};

