// src/server/models/Department.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Professor from './Professor.js';

const Department = sequelize.define('Department', {
  DepartmentID: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false, // Thêm điều kiện này
  },
  DepartmentName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  DepartmentAddress: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  DepartmentLeader: {
    type: DataTypes.STRING, // Hoặc UUID nếu tham chiếu đến Professor
    allowNull: true,
  },
}, {
  tableName: 'Department',
  timestamps: false,
});



export default Department;
