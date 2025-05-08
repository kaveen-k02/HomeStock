import express from 'express';
import { getNearbyStores } from '../controllers/PlacesController.js';

const router = express.Router();

router.get('/get', getNearbyStores);

export default router;
