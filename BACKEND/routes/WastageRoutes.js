
import express from 'express';
import { getExpiredProducts, saveExpiredToWastage } from '../controllers/WastageController.js';

const router = express.Router();

router.get('/', getExpiredProducts);

router.post('/save-expired-to-wastage', saveExpiredToWastage);


export default router;
