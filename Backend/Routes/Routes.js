import { Router } from 'express';
import { createOrder, verifyPayment } from '../Controller/Controller.js';


const router = Router();

router.post('/createOrder', createOrder);
router.post('/verify',verifyPayment);
export default router;