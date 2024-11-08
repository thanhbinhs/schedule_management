// src/server/controllers/roomController.js

import Room from "../models/Room.js";
import { Op } from "sequelize";

export const getAllRooms = async (req, res) => {
  try {
    const { search } = req.query;

    const whereClause = {};

    if (search) {
      whereClause.building = { [Op.like]: `%${search}%` };
    }

    const rooms = await Room.findAll({ where: whereClause });
    res.json(rooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ error: "Lỗi server." });
  }
};

// src/server/controllers/roomController.js

export const createRoom = async (req, res) => {
  console.log("req.body", req.body);

  try {
    const room = await Room.create(req.body);
    res.status(201).json(room);
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).json({ error: "Lỗi server." });
  }
};

export const getRoomById = async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await Room.findByPk(roomId);

    if (!room) {
      return res.status(404).json({ error: "Không tìm thấy room." });
    }

    res.json(room);
  } catch (error) {
    console.error("Error fetching room:", error);
    res.status(500).json({ error: "Lỗi server." });
  }
};

export const updateRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { floor, building, function: roomFunction, scale, status } = req.body;

    const room = await Room.findByPk(roomId);
    if (!room) {
      return res.status(404).json({ error: "Không tìm thấy Room." });
    }

    // Cập nhật thông tin
    room.floor = floor !== undefined ? floor : room.floor;
    room.building = building || room.building;
    room.function = roomFunction || room.function;
    room.scale = scale !== undefined ? scale : room.scale;
    room.status = status || room.status;

    await room.save();

    res.json(room);
  } catch (error) {
    console.error("Error updating room:", error);
    res.status(500).json({ error: "Lỗi server." });
  }
};

export const deleteRoom = async (req, res) => {
  try {
    const { roomId } = req.params;

    const deleted = await Room.destroy({ where: { RoomID: roomId } });

    if (deleted) {
      res.json({ message: "Room đã được xóa." });
    } else {
      res.status(404).json({ error: "Không tìm thấy Room." });
    }
  } catch (error) {
    console.error("Error deleting room:", error);
    res.status(500).json({ error: "Lỗi server." });
  }
};
