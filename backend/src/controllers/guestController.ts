import { Request, Response } from 'express';
import * as GuestModel from '../models/Guest';

export const addGuest = async (req: Request, res: Response) => {
  try {
    const { weddingId, name, email, phone, relationship, dietaryRequirements, address, notes } = req.body;

    const guest = await GuestModel.addGuest({
      weddingId,
      name,
      email,
      phone,
      relationship,
      dietaryRequirements,
      address,
      notes
    });

    res.status(201).json({
      message: 'Guest added successfully',
      guest
    });
  } catch (error) {
    console.error('Add guest error:', error);
    res.status(500).json({ error: 'Failed to add guest' });
  }
};

export const getWeddingGuests = async (req: Request, res: Response) => {
  try {
    const { weddingId } = req.params;
    const guests = await GuestModel.getWeddingGuests(parseInt(weddingId));

    res.json({ guests });
  } catch (error) {
    console.error('Get guests error:', error);
    res.status(500).json({ error: 'Failed to fetch guests' });
  }
};

export const updateGuest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const guest = await GuestModel.updateGuest(parseInt(id), req.body);

    res.json({
      message: 'Guest updated successfully',
      guest
    });
  } catch (error) {
    console.error('Update guest error:', error);
    res.status(500).json({ error: 'Failed to update guest' });
  }
};

export const updateRsvp = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { rsvpStatus, rsvpCount } = req.body;

    const guest = await GuestModel.updateRsvp(parseInt(id), rsvpStatus, rsvpCount);

    res.json({
      message: 'RSVP updated successfully',
      guest
    });
  } catch (error) {
    console.error('Update RSVP error:', error);
    res.status(500).json({ error: 'Failed to update RSVP' });
  }
};

export const deleteGuest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await GuestModel.deleteGuest(parseInt(id));

    res.json({ message: 'Guest deleted successfully' });
  } catch (error) {
    console.error('Delete guest error:', error);
    res.status(500).json({ error: 'Failed to delete guest' });
  }
};
