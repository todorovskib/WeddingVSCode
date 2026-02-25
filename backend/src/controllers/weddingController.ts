import { Request, Response } from 'express';
import * as WeddingModel from '../models/Wedding';
import * as GuestModel from '../models/Guest';

interface AuthRequest extends Request {
  user?: any;
}

export const createWedding = async (req: AuthRequest, res: Response) => {
  try {
    const { title, groomName, brideName, weddingDate, weddingTime, location, password, tierId, theme, description } = req.body;
    const userId = req.user.userId;

    const wedding = await WeddingModel.createWedding({
      userId,
      title,
      groomName,
      brideName,
      weddingDate,
      weddingTime,
      location,
      password,
      tierId,
      theme,
      description
    });

    res.status(201).json({
      message: 'Wedding created successfully',
      wedding
    });
  } catch (error) {
    console.error('Create wedding error:', error);
    res.status(500).json({ error: 'Failed to create wedding' });
  }
};

export const getMyWeddings = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.userId;
    const weddings = await WeddingModel.getWeddingsByUser(userId);
    res.json({ weddings });
  } catch (error) {
    console.error('Get weddings error:', error);
    res.status(500).json({ error: 'Failed to fetch weddings' });
  }
};

export const getWeddingById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const wedding = await WeddingModel.getWeddingById(parseInt(id));

    if (!wedding) {
      return res.status(404).json({ error: 'Wedding not found' });
    }

    res.json({ wedding });
  } catch (error) {
    console.error('Get wedding error:', error);
    res.status(500).json({ error: 'Failed to fetch wedding' });
  }
};

export const updateWedding = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const wedding = await WeddingModel.updateWedding(parseInt(id), req.body);

    res.json({
      message: 'Wedding updated successfully',
      wedding
    });
  } catch (error) {
    console.error('Update wedding error:', error);
    res.status(500).json({ error: 'Failed to update wedding' });
  }
};

export const publishWedding = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const wedding = await WeddingModel.publishWedding(parseInt(id));

    res.json({
      message: 'Wedding published successfully',
      wedding
    });
  } catch (error) {
    console.error('Publish wedding error:', error);
    res.status(500).json({ error: 'Failed to publish wedding' });
  }
};

export const deleteWedding = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await WeddingModel.deleteWedding(parseInt(id));

    res.json({ message: 'Wedding deleted successfully' });
  } catch (error) {
    console.error('Delete wedding error:', error);
    res.status(500).json({ error: 'Failed to delete wedding' });
  }
};

export const getWeddingStats = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const stats = await GuestModel.getGuestStats(parseInt(id));

    res.json({ stats });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};
