// src/server/models/SubjectClass.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const SubjectClass = sequelize.define('SubjectClass', {
  SubjectClassID: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  SubjectID: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Subject',
      key: 'SubjectID',
    },
  },
  ProfessorID: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'Professor',
      key: 'ProfessorID',
    },
  },
}, {
  tableName: 'SubjectClass',
  timestamps: false,
});

export default SubjectClass;
