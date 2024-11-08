// src/server/models/EducationProgramSubject.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const EducationProgramSubject = sequelize.define('EducationProgramSubject', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  EducationProgramID: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  SubjectID: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  yearToLearn: {
    type: DataTypes.DECIMAL(3, 1),
    allowNull: false,
  },
}, {
  tableName: 'EducationProgramSubject',
  timestamps: false,
});

export default EducationProgramSubject;
