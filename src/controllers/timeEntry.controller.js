import timeEntryService from '../services/timeEntry.service.js';
import userService from '../services/user.service.js';

class TimeEntryController {
  /**
   * ---- Log Time Entry Controller ----
   */
  static async logTimeEntry(req, res, next) {
    const { date, startTime, endTime, notes } = req.body;
    const { id } = req.user;

    try {
      const currentUser = await userService.getUserById(id);

      const timeEntry = await timeEntryService.logTimeEntry(
        date,
        startTime,
        endTime,
        notes,
        currentUser.id
      );

      const response = {
        code: 201,
        message: 'Time Entry Logged Successful!',
        data: timeEntry,
      };

      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  }

  /**
   * ---- View Time Entries Controller ----
   */
  static async viewTimeEntries(req, res, next) {
    const { id } = req.user;
    try {
      const currentUser = await userService.getUserById(id);
      const timeEntries = await timeEntryService.getTimeEntriesByUserId(currentUser.id);

      const response = {
        code: 200,
        message: 'View time entries successful!',
        data: timeEntries,
      };

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
}

export default TimeEntryController;
