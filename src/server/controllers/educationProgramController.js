// src/server/controllers/educationProgramController.js

import EducationProgram from '../models/EducationProgram.js';
import EducationProgramSubject from '../models/EducationProgramSubject.js';
import Subject from '../models/Subject.js';

export const getAllEducationPrograms = async (req, res) => {
  try {
    const programs = await EducationProgram.findAll({
      include: [
        {
          model: Subject,
          through: {
            attributes: ['yearToLearn'],
          },
        },
      ],
    });
    res.json(programs);
  } catch (error) {
    console.error('Error fetching education programs:', error);
    res.status(500).json({ error: 'Lỗi server.' });
  }
};


export const createEducationProgram = async (req, res) => {
  try {
    const { EducationProgramName, yearFinish, listSubject } = req.body;

    if (!EducationProgramName) {
      return res.status(400).json({ error: 'EducationProgramName là bắt buộc.' });
    }

    const program = await EducationProgram.create({
      EducationProgramName,
      yearFinish,
    });

    // Thêm các môn học vào chương trình đào tạo
    if (Array.isArray(listSubject) && listSubject.length > 0) {
      for (const subject of listSubject) {
        await EducationProgramSubject.create({
          EducationProgramID: program.EducationProgramID,
          SubjectID: subject.SubjectID,
          yearToLearn: subject.yearToLearn,
        });
      }
    }

    res.status(201).json(program);
  } catch (error) {
    console.error('Error creating education program:', error);
    res.status(500).json({ error: 'Lỗi server.' });
  }
};

export const getEducationProgramById = async (req, res) => {
  try {
    const { programId } = req.params;
    const program = await EducationProgram.findByPk(programId, {
      include: [
        {
          model: Subject,
          through: {
            attributes: ['yearToLearn'],
          },
        },
      ],
    });

    if (!program) {
      return res.status(404).json({ error: 'Không tìm thấy chương trình đào tạo.' });
    }

    res.json(program);
  } catch (error) {
    console.error('Error fetching education program:', error);
    res.status(500).json({ error: 'Lỗi server.' });
  }
}

export const updateEducationProgram = async (req, res) => {
  try {
    const { programId } = req.params;
    const { EducationProgramName, yearFinish, listSubject } = req.body;

    const program = await EducationProgram.findByPk(programId);
    if (!program) {
      return res.status(404).json({ error: 'Không tìm thấy chương trình đào tạo.' });
    }

    await program.update({
      EducationProgramName,
      yearFinish,
    });

    // Cập nhật các môn học
    if (Array.isArray(listSubject) && listSubject.length > 0) {
      await EducationProgramSubject.destroy({ where: { EducationProgramID: programId } });
      for (const subject of listSubject) {
        await EducationProgramSubject.create({
          EducationProgramID: programId,
          SubjectID: subject.SubjectID,
          yearToLearn: subject.yearToLearn,
        });
      }
    }

    res.json({ message: 'Chương trình đào tạo đã được cập nhật thành công.' });
  } catch (error) {
    console.error('Error updating education program:', error);
    res.status(500).json({ error: 'Lỗi server.' });
  }
}


export const deleteEducationProgram = async (req, res) => {
  try {
    const { programId } = req.params;
    const deleted = await EducationProgram.destroy({ where: { EducationProgramID: programId } });

    if (deleted) {
      res.json({ message: 'Chương trình đào tạo đã được xóa thành công.' });
    } else {
      res.status(404).json({ error: 'Không tìm thấy chương trình đào tạo.' });
    }
  } catch (error) {
    console.error('Error deleting education program:', error);
    res.status(500).json({ error: 'Lỗi server.' });
  }
};

