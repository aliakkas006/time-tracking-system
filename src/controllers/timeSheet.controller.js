import userService from '../services/user.service.js';
import timeSheetService from '../services/timeSheet.service.js';

class TimesheetController {
  static async getWeeklyTimesheet(req, res, next) {
    const { id } = req.user;
    try {
      const currentUser = await userService.getUserById(id);

      const weeklyTimesheet = await timeSheetService.getWeeklyTimesheet(
        currentUser.id
      );

      const response = {
        code: 200,
        message: 'Weekly Timesheet Fetched Successfully',
        data: weeklyTimesheet,
      };

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
}

export default TimesheetController;
