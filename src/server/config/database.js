// src/server/config/database.js

import { Sequelize } from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';

// Lấy đường dẫn tới thư mục hiện tại
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Đường dẫn tới tệp cơ sở dữ liệu SQLite
const dbPath = path.resolve(__dirname, '../../EducationManagement.db');

// Khởi tạo Sequelize với SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: false, // Tắt log SQL nếu không cần thiết
});

export default sequelize;
