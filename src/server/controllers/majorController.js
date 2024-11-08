// src/server/controllers/majorController.js

import Major from '../models/Major.js';
import EducationProgram from '../models/EducationProgram.js';

export const getAllMajors = async (req, res) => {
  try {
    const majors = await Major.findAll({
      include: [
        { model: EducationProgram },
      ],
    });
    res.json(majors);
  } catch (error) {
    console.error('Error fetching majors:', error);
    res.status(500).json({ error: 'Lỗi server.' });
  }
};

// src/server/controllers/majorController.js

export const createMajor = async (req, res) => {
    try {
      const { MajorName, EducationProgramID, numberStudent, DepartmentID } = req.body;
  
      if (!MajorName) {
        return res.status(400).json({ error: 'MajorName là bắt buộc.' });
      }
  
      const major = await Major.create({
        MajorName,
        EducationProgramID,
        numberStudent,
        DepartmentID,
      });
  
      res.status(201).json(major);
    } catch (error) {
      console.error('Error creating major:', error);
      res.status(500).json({ error: 'Lỗi server.' });
    }
  };

  
export const getMajorById = async (req, res) => {
    try {
      const { majorId } = req.params;
      const major = await Major.findByPk(majorId, {
        include: [
          { model: EducationProgram },
        ],
      });
  
      if (!major) {
        return res.status(404).json({ error: 'Không tìm thấy major.' });
      }
  
      res.json(major);
    } catch (error) {
      console.error('Error fetching major:', error);
      res.status(500).json({ error: 'Lỗi server.' });
    }
  };

    export const updateMajor = async (req, res) => {
        try {
        const { majorId } = req.params;
        const [updated] = await Major.update(req.body, { where: { majorId } });
    
        if (updated) {
            res.json({ message: 'Major updated successfully' });
        } else {
            res.status(404).json({ error: 'Major not found' });
        }
        } catch (error) {
        console.error('Error updating major:', error);
        res.status(500).json({ error: 'Lỗi server.' });
        }
    };

    export const deleteMajor = async (req, res) => {
        try {
        const { majorId } = req.params;
        const deleted = await Major.destroy({ where: { majorId } });
    
        if (deleted) {
            res.json({ message: 'Major deleted successfully' });
        } else {
            res.status(404).json({ error: 'Major not found' });
        }
        } catch (error) {
        console.error('Error deleting major:', error);
        res.status(500).json({ error: 'Lỗi server.' });
        }
    };