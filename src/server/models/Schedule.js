// src/server/models/Schedule.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Schedule = sequelize.define('Schedule', {
  ScheduleID: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  finishTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'Schedule',
  timestamps: false,
});

export default Schedule;
