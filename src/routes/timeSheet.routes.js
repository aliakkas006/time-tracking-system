import { Router } from 'express';
import timeSheetController from '../controllers/timeSheet.controller.js';
import authenticate from '../middleware/authenticate.js';

const timeSheetRouter = Router();

timeSheetRouter.get(
  '/weekly-timesheet',
  authenticate,
  timeSheetController.getWeeklyTimesheet
);

export default timeSheetRouter;
