import timeEntryService from '../services/timeEntry.service.js';
import userService from '../services/user.service.js';

class TimeEntryController {
  static async logTimeEntry(req, res, next) {
    const { date, startTime, endTime, notes } = req.body;

    try {
      const currentUser = await userService.getUserById(req.user?.id);

      const timeEntry = await timeEntryService.logTimeEntry(
        date,
        startTime,
        endTime,
        notes,
        currentUser.id
      );

      res.status(201).json(timeEntry);
    } catch (err) {
      next(err);
    }
  }

  static async viewTimeEntries(req, res, next) {
    try {
      const currentUser = await userService.getUserById(req.user.id);

      const timeEntries = await timeEntryService.getTimeEntriesByUserId(
        currentUser.id
      );

      res.status(200).json(timeEntries);
    } catch (err) {
      next(err);
    }
  }
}

export default TimeEntryController;
