// src/server/models/EducationProgram.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const EducationProgram = sequelize.define('EducationProgram', {
  EducationProgramID: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  EducationProgramName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  yearFinish: {
    type: DataTypes.DECIMAL(3, 1),
    allowNull: true,
  },
}, {
  tableName: 'EducationProgram',
  timestamps: false,
});

export default EducationProgram;
