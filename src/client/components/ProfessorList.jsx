// src/client/components/ProfessorList.jsx

import React from 'react';
import styles from '../css/client.module.css';

function ProfessorList({ professors, onEdit, onDelete }) {
  return (
    <div className={styles.professorList}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên Giảng Viên</th>
            <th>Email</th>
            <th>Số Điện Thoại (SDT)</th>
            <th>Trưởng Khoa</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {professors.length > 0 ? (
            professors.map((prof) => (
              <tr key={prof.ProfessorID}>
                <td>{prof.ProfessorID}</td>
                <td>{prof.ProfessorName}</td>
                <td>{prof.Email}</td>
                <td>{prof.SDT}</td>
                <td>{prof.isDepartmentLeader ? 'Có' : 'Không'}</td>
                <td>
                  <button
                    className={styles.editButton}
                    onClick={() => onEdit(prof)}
                  >
                    Chỉnh sửa
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => onDelete(prof.ProfessorID)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Không có dữ liệu.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProfessorList;
