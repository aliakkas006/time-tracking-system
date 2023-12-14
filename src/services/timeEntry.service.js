import { badRequest } from '../utils/error.js';
import TimeEntry from '../models/TimeEntry.js';

/**
 * @class TimeEntryService
 * @classdesc Service for managing time entries.
 */
class TimeEntryService {
  /**
   * ---- Logs a time entry for a user. -----
   */
  static async logTimeEntry(date, startTime, endTime, notes = '', userId) {
    if (!date || !startTime || !endTime)
      throw badRequest('Must provide date, start time and end time');

    return TimeEntry.create({
      date,
      startTime,
      endTime,
      notes,
      UserId: userId,
    });
  }

  /**
   * ---- Retrieves time entries for a user based on their user ID. -----
   * @param {number} userId - The ID of the user.
   * @returns {Promise<TimeEntry[]>} A Promise that resolves to an array of TimeEntry instances.
   * @static
   */
  static async getTimeEntriesByUserId(userId) {
    return TimeEntry.findAll({
      where: { UserId: userId },
    });
  }
}

export default TimeEntryService;
