import { DataTypes } from 'sequelize';
import sequelize from '../config/config.js';

const TimeEntry = sequelize.define('TimeEntry', {
  startTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  notes: {
    type: DataTypes.STRING,
  },
});

export default TimeEntry;
