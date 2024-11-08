// src/server/models/Account.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Account = sequelize.define('Account', {
  ID: {
    type: DataTypes.STRING, // Giả sử ID là username
    primaryKey: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('pdt', 'department', 'professor'),
    allowNull: false,
  },
}, {
  tableName: 'Account',
  timestamps: false,
});

export default Account;
