import { Router } from 'express';
import { aiRoutes } from './ai.routes';

const router = Router();

router.use('/ai', aiRoutes);

export default router;
