// src/server/models/Major.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Major = sequelize.define('Major', {
  MajorID: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  MajorName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  EducationProgramID: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  numberStudent: {
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
}, {
  tableName: 'Major',
  timestamps: false,
});

export default Major;
