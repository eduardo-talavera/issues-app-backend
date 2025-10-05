import { Router } from 'express';
import { SeedController } from '../controllers/SeedController';

const router = Router();

router.post('/', SeedController.seedDatabase);

export default router;
