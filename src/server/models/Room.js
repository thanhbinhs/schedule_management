// src/server/models/Room.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Room = sequelize.define('Room', {
  RoomID: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  floor: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  building: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  function: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  scale: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'Room',
  timestamps: false,
});

export default Room;
