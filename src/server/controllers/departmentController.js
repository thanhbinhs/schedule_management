// src/server/controllers/DepartmentController.js

import Department from '../models/Department.js';
import Professor from '../models/Professor.js';

export const getAllDepartments = async (req, res) => {
  try {
    console.log("Fetching all departments..."); // Log để kiểm tra
    const departments = await Department.findAll({
      include: [{ model: Professor, as: 'Leader' }],
    });
    res.json(departments);
  } catch (error) {
    console.error("Error fetching departments:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getDepartmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const department = await Department.findByPk(id, {
      include: [{ model: Professor, as: 'Leader' }],
    });
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }
    res.json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const createDepartment = async (req, res) => {
  try {
    console.log("Received body:", req.body); // Kiểm tra dữ liệu gửi lên
    const department = await Department.create(req.body);
    res.status(201).json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateDepartment = async (req, res) => {
  const { type } = req.user;
  const {DepartmentID} = req.params;

  console.log("Received body:",DepartmentID); // Kiểm tra dữ liệu gửi lên
  
  // Only 'pdt' and department leader can update department
  if (type !== 'pdt' && type !== 'department') {
    return res.status(403).json({ error: 'Access denied.' });
  }

  try {
    const department = await Department.findByPk(DepartmentID);
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }
    await department.update(req.body);
    res.json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteDepartment = async (req, res) => {
  const { DepartmentID } = req.params;
  try {
    const department = await Department.findByPk(DepartmentID);
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }
    await department.destroy();
    res.json({ message: 'Department deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
