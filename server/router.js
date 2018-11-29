import { Router } from 'express';
import sensorRouter from './routes/sensor';
import subscribeRouter from './routes/subscribe';

/**
 * Contains all API routes for the application.
 */
const router = Router();

router.use('/sensors', sensorRouter);
router.use('/subscribe', subscribeRouter);

export default router;
