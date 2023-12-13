import { badRequest } from '../utils/error.js';
import TimeEntry from '../models/TimeEntry.js';

class TimeEntryService {
  static async logTimeEntry(date, startTime, endTime, notes = '', userId) {
    if (!date || !startTime || !endTime) throw badRequest('Must provide date, start time and end time');

    return TimeEntry.create({
      date,
      startTime,
      endTime,
      notes,
      UserId: userId,
    });
  }

  static async getTimeEntriesByUserId(userId) {
    return TimeEntry.findAll({
      where: { UserId: userId },
    });
  }
}

export default TimeEntryService;
