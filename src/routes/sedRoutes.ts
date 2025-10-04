import { Router } from 'express';
import { seedDatabase } from '../controllers/SeedController';

const router = Router();

router.post('/', seedDatabase);

export default router;
