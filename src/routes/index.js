import { Router } from 'express';
import authRouter from './auth.routes.js';
import timeEntryRouter from './timeEntry.routes.js';

const router = Router();

router.use([authRouter, timeEntryRouter]);

export default router;
