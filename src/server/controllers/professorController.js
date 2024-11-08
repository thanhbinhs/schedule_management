// src/server/controllers/ProfessorController.js

import Professor from '../models/Professor.js';
import Account from '../models/Account.js';
import Department from '../models/Department.js';

export const getAllProfessors = async (req, res) => {
  try {
    const professors = await Professor.findAll({
      include: [
        { model: Account, as: 'Account' },
        { model: Department },
      ],
    });
    res.json(professors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProfessorById = async (req, res) => {
  const { ProfessorID } = req.params;
  try {
    const professor = await Professor.findByPk(ProfessorID, {
      include: [
        { model: Account, as: 'Account' },
        { model: Department },
      ],
    });
    if (!professor) {
      return res.status(404).json({ error: 'Professor not found' });
    }
    res.json(professor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createProfessor = async (req, res) => {
  const { ProfessorID, ProfessorName, DepartmentID, Email, SDT, isDepartmentLeader } = req.body;
  try {

    // Create Professor
    const professor = await Professor.create({
      ProfessorID,
      ProfessorName,
      DepartmentID,
      Email,
      SDT,
      isDepartmentLeader,
    });

    res.status(201).json(professor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProfessor = async (req, res) => {
  const { ProfessorID } = req.params;

  try {
    const professor = await Professor.findByPk(ProfessorID);
    if (!professor) {
      return res.status(404).json({ error: 'Professor not found' });
    }
    await professor.update(req.body);
    res.json(professor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProfessor = async (req, res) => {
  const { ProfessorID } = req.params;
  try {
    const professor = await Professor.findByPk(ProfessorID);
    if (!professor) {
      return res.status(404).json({ error: 'Professor not found' });
    }
    await professor.destroy();
    // Delete associated Account
    await Account.destroy({ where: { ID: id } });
    res.json({ message: 'Professor deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
