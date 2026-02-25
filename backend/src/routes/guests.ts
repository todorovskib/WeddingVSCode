import express from 'express';
import * as guestController from '../controllers/guestController';

const router = express.Router();

router.post('/', guestController.addGuest);
router.get('/wedding/:weddingId', guestController.getWeddingGuests);
router.put('/:id', guestController.updateGuest);
router.patch('/:id/rsvp', guestController.updateRsvp);
router.delete('/:id', guestController.deleteGuest);

export default router;
