// src/server/models/ScheduleItem.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Schedule from './Schedule.js';

const ScheduleItem = sequelize.define('ScheduleItem', {
  ScheduleItemID: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  SubjectClassID: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  RoomID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  datetime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  ProfessorID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  DepartmentID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ScheduleID: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Schedule',
      key: 'ScheduleID',
    },
  },
}, {
  tableName: 'ScheduleItem',
  timestamps: false,
});

export default ScheduleItem;
