import { Router } from 'express';
import timeEntryController from '../controllers/timeEntry.controller.js';
import authenticate from '../middleware/authenticate.js';
import authorize from '../middleware/authorize.js';

const timeEntryRouter = Router();

timeEntryRouter
  .route('/log')
  .post(
    authenticate,
    authorize(['user', 'admin']),
    timeEntryController.logTimeEntry
  )
  .get(
    authenticate,
    authorize(['user', 'admin']),
    timeEntryController.viewTimeEntries
  );

export default timeEntryRouter;
