// src/server/models/Subject.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Subject = sequelize.define('Subject', {
  SubjectID: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  SubjectName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  credits: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  idPreviousSubject: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  labHours: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  theoryHours: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  DepartmentID: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'Department',
      key: 'DepartmentID',
    },
  },
  specialRoom: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'Subject',
  timestamps: false,
});

export default Subject;
