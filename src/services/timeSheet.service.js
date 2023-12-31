import { startOfWeek, endOfWeek } from 'date-fns';
import TimeEntry from '../models/TimeEntry.js';
import { Op } from 'sequelize';

class TimeSheetService {
  /**
   * ---- Service for retrieving weekly timesheet information. -----
   * @param {number} userId - The ID of the user.
   * @returns {Promise<Object[]>} A Promise that resolves to an array of formatted weekly timesheet entries.
   */
  static async getWeeklyTimesheet(userId) {
    const today = new Date();

    const weeklyTimeEntries = await TimeEntry.findAll({
      where: {
        UserId: userId,
        date: {
          [Op.between]: [startOfWeek(today), endOfWeek(today)],
        },
      },
    });

    const formattedWeeklyTimesheet = weeklyTimeEntries.map((entry) => ({
      id: entry.id,
      date: entry.date,
      startTime: entry.startTime,
      endTime: entry.endTime,
      notes: entry.notes,
    }));

    return formattedWeeklyTimesheet;
  }
}

export default TimeSheetService;
