// src/server/controllers/subjectController.js

import Subject from '../models/Subject.js';
import SubjectClass from '../models/SubjectClass.js';

export const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.findAll({
      include: [
        {
          model: SubjectClass,
          include: ['Professor'],
        },
        {
          model: Subject,
          as: 'PreviousSubject',
        },
      ],
    });
    res.json(subjects);
  } catch (error) {
    console.error('Error fetching subjects:', error);
    res.status(500).json({ error: 'Lỗi server.' });
  }
};

// src/server/controllers/subjectController.js

export const createSubject = async (req, res) => {
  try {
    const { SubjectName, credits, idPreviousSubject, labHours, theoryHours, DepartmentID, specialRoom } = req.body;

    if (!SubjectName || !credits) {
      return res.status(400).json({ error: 'SubjectName và credits là bắt buộc.' });
    }

    const subject = await Subject.create({
      SubjectName,
      credits,
      idPreviousSubject,
      labHours,
      theoryHours,
      DepartmentID,
      specialRoom,
    });

    res.status(201).json(subject);
  } catch (error) {
    console.error('Error creating subject:', error);
    res.status(500).json({ error: 'Lỗi server.' });
  }
};


export const getSubjectById = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const subject = await Subject.findByPk(subjectId, {
      include: [
        {
          model: SubjectClass,
          include: ['Professor'],
        },
        {
          model: Subject,
          as: 'PreviousSubject',
        },
      ],
    });

    if (!subject) {
      return res.status(404).json({ error: 'Không tìm thấy subject.' });
    }

    res.json(subject);
  } catch (error) {
    console.error('Error fetching subject:', error);
    res.status(500).json({ error: 'Lỗi server.' });
  }
};

export const updateSubject = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const { SubjectName, credits, idPreviousSubject, labHours, theoryHours, DepartmentID, specialRoom } = req.body;

    const subject = await Subject.findByPk(subjectId);
    if (!subject) {
      return res.status(404).json({ error: 'Không tìm thấy subject.' });
    }

    await subject.update({
      SubjectName,
      credits,
      idPreviousSubject,
      labHours,
      theoryHours,
      DepartmentID,
      specialRoom,
    });

    res.json(subject);
  } catch (error) {
    console.error('Error updating subject:', error);
    res.status(500).json({ error: 'Lỗi server.' });
  }
};

export const deleteSubject = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const deleted = await Subject.destroy({ where: { subjectId } });

    if (deleted) {
      res.json({ message: 'Subject deleted successfully' });
    } else {
      res.status(404).json({ error: 'Subject not found' });
    }
  } catch (error) {
    console.error('Error deleting subject:', error);
    res.status(500).json({ error: 'Lỗi server.' });
  }
};