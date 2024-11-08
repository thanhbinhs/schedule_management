// src/server/models/Professor.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Professor = sequelize.define('Professor', {
  ProfessorID: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false, // Thêm điều kiện này
  },
  ProfessorName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isDepartmentLeader: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  DepartmentID: {
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: 'Department', // Đảm bảo rằng 'Departments' là tên bảng đúng
      key: 'DepartmentID',
    },
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  SDT: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'Professors',
  timestamps: false,
});

export default Professor;
