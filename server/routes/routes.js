import express from 'express';
import { handleNotify, getSubscribers, contact } from '../controllers/controller.js';

const router = express.Router();

router.post('/notify', handleNotify);
router.get('/subscribers', getSubscribers);
router.post('/contact', contact);

export default router;
