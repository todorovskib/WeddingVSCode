import { Request, Response } from 'express';
import * as WeddingModel from '../models/Wedding';
import * as WeddingFeatureModel from '../models/WeddingFeature';

interface AuthRequest extends Request {
  user?: {
    userId?: number;
  };
}

type FeatureKey =
  | 'checklist'
  | 'timeline'
  | 'budget'
  | 'faq'
  | 'gallery'
  | 'registry';

interface FeatureDefinition {
  responseKey: string;
  table: string;
  orderBy: string;
  allowedFields: string[];
  camelToSnake: Record<string, string>;
}

const featureDefinitions: Record<FeatureKey, FeatureDefinition> = {
  checklist: {
    responseKey: 'checklist',
    table: 'checklists',
    orderBy: 'created_at',
    allowedFields: ['item_name', 'category', 'is_completed', 'due_date', 'priority', 'assigned_to'],
    camelToSnake: {
      itemName: 'item_name',
      isCompleted: 'is_completed',
      dueDate: 'due_date',
      assignedTo: 'assigned_to',
    },
  },
  timeline: {
    responseKey: 'timeline',
    table: 'timeline_items',
    orderBy: 'start_time',
    allowedFields: ['title', 'description', 'start_time', 'end_time', 'location', 'category'],
    camelToSnake: {
      startTime: 'start_time',
      endTime: 'end_time',
    },
  },
  budget: {
    responseKey: 'budget',
    table: 'budget_items',
    orderBy: 'created_at',
    allowedFields: ['category', 'description', 'budgeted_amount', 'actual_amount', 'status'],
    camelToSnake: {
      budgetedAmount: 'budgeted_amount',
      actualAmount: 'actual_amount',
    },
  },
  faq: {
    responseKey: 'faq',
    table: 'faq',
    orderBy: 'order_index',
    allowedFields: ['question', 'answer', 'category', 'order_index'],
    camelToSnake: {
      orderIndex: 'order_index',
    },
  },
  gallery: {
    responseKey: 'gallery',
    table: 'gallery',
    orderBy: 'uploaded_at',
    allowedFields: ['image_url', 'caption', 'category'],
    camelToSnake: {
      imageUrl: 'image_url',
    },
  },
  registry: {
    responseKey: 'registry',
    table: 'gift_registry',
    orderBy: 'created_at',
    allowedFields: ['product_id', 'quantity_needed', 'quantity_received', 'gift_url', 'notes'],
    camelToSnake: {
      productId: 'product_id',
      quantityNeeded: 'quantity_needed',
      quantityReceived: 'quantity_received',
      giftUrl: 'gift_url',
    },
  },
};

const parseWeddingId = (req: Request) => Number.parseInt(req.params.id, 10);
const parseItemId = (req: Request) => Number.parseInt(req.params.itemId, 10);

const toDbFields = (
  payload: Record<string, unknown>,
  definition: FeatureDefinition
): Record<string, string | number | boolean | null> => {
  const result: Record<string, string | number | boolean | null> = {};

  for (const [rawKey, rawValue] of Object.entries(payload)) {
    if (rawKey === 'id' || rawKey === 'weddingId' || rawKey === 'wedding_id') {
      continue;
    }

    const mappedKey = definition.camelToSnake[rawKey] || rawKey;
    if (!definition.allowedFields.includes(mappedKey)) {
      continue;
    }

    if (
      rawValue === null ||
      typeof rawValue === 'string' ||
      typeof rawValue === 'number' ||
      typeof rawValue === 'boolean'
    ) {
      result[mappedKey] = rawValue;
    }
  }

  return result;
};

const ensureWeddingOwner = async (req: AuthRequest, res: Response): Promise<boolean> => {
  const weddingId = parseWeddingId(req);
  const userId = req.user?.userId;

  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' });
    return false;
  }

  if (!Number.isFinite(weddingId)) {
    res.status(400).json({ error: 'Invalid wedding id' });
    return false;
  }

  const wedding = await WeddingModel.getWeddingById(weddingId);
  if (!wedding) {
    res.status(404).json({ error: 'Wedding not found' });
    return false;
  }

  if (wedding.user_id !== userId) {
    res.status(403).json({ error: 'Forbidden' });
    return false;
  }

  return true;
};

const withFeature = async (
  req: Request,
  res: Response,
  handler: (definition: FeatureDefinition) => Promise<void>
) => {
  const feature = req.params.feature as FeatureKey;
  const definition = featureDefinitions[feature];

  if (!definition) {
    res.status(404).json({ error: 'Feature not found' });
    return;
  }

  try {
    await handler(definition);
  } catch (error) {
    console.error(`Wedding feature ${req.method} ${feature} error:`, error);
    res.status(500).json({ error: 'Failed to process feature request' });
  }
};

export const listFeatureItems = async (req: Request, res: Response) => {
  await withFeature(req, res, async (definition) => {
    const weddingId = parseWeddingId(req);
    if (!Number.isFinite(weddingId)) {
      res.status(400).json({ error: 'Invalid wedding id' });
      return;
    }

    const items = await WeddingFeatureModel.listWeddingFeatureItems(weddingId, {
      table: definition.table,
      orderBy: definition.orderBy,
    });

    res.json({ [definition.responseKey]: items });
  });
};

export const createFeatureItem = async (req: AuthRequest, res: Response) => {
  await withFeature(req, res, async (definition) => {
    const isOwner = await ensureWeddingOwner(req, res);
    if (!isOwner) return;

    const weddingId = parseWeddingId(req);
    const payload = toDbFields(req.body as Record<string, unknown>, definition);
    const item = await WeddingFeatureModel.createWeddingFeatureItem(
      { table: definition.table, orderBy: definition.orderBy },
      { wedding_id: weddingId, ...payload }
    );

    res.status(201).json({
      message: `${definition.responseKey} item created successfully`,
      item,
    });
  });
};

export const updateFeatureItem = async (req: AuthRequest, res: Response) => {
  await withFeature(req, res, async (definition) => {
    const isOwner = await ensureWeddingOwner(req, res);
    if (!isOwner) return;

    const weddingId = parseWeddingId(req);
    const itemId = parseItemId(req);
    if (!Number.isFinite(itemId)) {
      res.status(400).json({ error: 'Invalid item id' });
      return;
    }

    const updates = toDbFields(req.body as Record<string, unknown>, definition);
    const item = await WeddingFeatureModel.updateWeddingFeatureItem(
      { table: definition.table, orderBy: definition.orderBy },
      weddingId,
      itemId,
      updates
    );

    if (!item) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }

    res.json({
      message: `${definition.responseKey} item updated successfully`,
      item,
    });
  });
};

export const deleteFeatureItem = async (req: AuthRequest, res: Response) => {
  await withFeature(req, res, async (definition) => {
    const isOwner = await ensureWeddingOwner(req, res);
    if (!isOwner) return;

    const weddingId = parseWeddingId(req);
    const itemId = parseItemId(req);
    if (!Number.isFinite(itemId)) {
      res.status(400).json({ error: 'Invalid item id' });
      return;
    }

    const deleted = await WeddingFeatureModel.deleteWeddingFeatureItem(
      { table: definition.table, orderBy: definition.orderBy },
      weddingId,
      itemId
    );

    if (!deleted) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }

    res.json({ message: `${definition.responseKey} item deleted successfully` });
  });
};

