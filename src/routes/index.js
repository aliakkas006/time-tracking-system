import { Router } from 'express';
import authRouter from './auth.routes.js';
import timeEntryRouter from './timeEntry.routes.js';
import timeSheetRouter from './timeSheet.routes.js';

const router = Router();

router.use([authRouter, timeEntryRouter, timeSheetRouter]);

export default router;
