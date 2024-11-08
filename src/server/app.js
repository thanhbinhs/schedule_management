// src/server/app.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database.js';


// Import models
import './models/Account.js';
import './models/Department.js';
import './models/Room.js';
import './models/Major.js';
import './models/Schedule.js';
import './models/ScheduleItem.js';
import './models/EducationProgram.js';
import './models/EducationProgramSubject.js';
import './models/Professor.js';
import './models/Subject.js';
import './models/SubjectClass.js';

// Thiết lập quan hệ
import './models/associations.js';

// Import routes
import accountRoutes from './routes/accountRoutes.js';
import departmentRoutes from './routes/departmentRoutes.js';
import roomRoutes from './routes/roomRoutes.js';
import majorRoutes from './routes/majorRoutes.js';
import scheduleRoutes from './routes/scheduleRoutes.js';
import educationProgramRoutes from './routes/educationProgramRoutes.js';
import professorRoutes from './routes/professorRoutes.js';
import subjectRoutes from './routes/subjectRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // URL frontend của bạn
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Kiểm tra kết nối cơ sở dữ liệu
sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
  })
  .catch(err => {
    console.log('Error: ' + err);
  });

// Đồng bộ hóa model với cơ sở dữ liệu
sequelize.sync()
  .then(() => {
    console.log('Database synced...');
  })
  .catch(err => {
    console.log('Error syncing database: ' + err);
  });

  // Routes
  app.use('/api/accounts', accountRoutes);
  app.use('/api/departments', departmentRoutes);
  app.use('/api/rooms', roomRoutes);
  app.use('/api/majors', majorRoutes);
  app.use('/api/schedules', scheduleRoutes);
  app.use('/api/education-programs', educationProgramRoutes);
  app.use('/api/professors', professorRoutes);
  app.use('/api/subjects', subjectRoutes);
  

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
