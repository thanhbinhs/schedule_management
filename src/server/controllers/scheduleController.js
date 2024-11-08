// src/server/controllers/scheduleController.js

import Schedule from '../models/Schedule.js';
import ScheduleItem from '../models/ScheduleItem.js';

export const getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.findAll({
      include: [
        { model: ScheduleItem },
      ],
    });
    res.json(schedules);
  } catch (error) {
    console.error('Error fetching schedules:', error);
    res.status(500).json({ error: 'Lỗi server.' });
  }
};


export const createSchedule = async (req, res) => {
    try {
      const { startTime, finishTime, scheduleItems } = req.body;
  
      if (!startTime || !finishTime) {
        return res.status(400).json({ error: 'startTime và finishTime là bắt buộc.' });
      }
  
      const schedule = await Schedule.create({
        startTime,
        finishTime,
      });
  
      // Thêm các scheduleItems
      if (Array.isArray(scheduleItems) && scheduleItems.length > 0) {
        for (const item of scheduleItems) {
          await ScheduleItem.create({
            ...item,
            ScheduleID: schedule.ScheduleID,
          });
        }
      }
  
      res.status(201).json(schedule);
    } catch (error) {
      console.error('Error creating schedule:', error);
      res.status(500).json({ error: 'Lỗi server.' });
    }
  };


  