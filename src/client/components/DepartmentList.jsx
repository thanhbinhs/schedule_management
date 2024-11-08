// components/DepartmentList.jsx

import React from 'react';
import styles from '../css/client.module.css';

function DepartmentList({ departments, onEdit, onDelete,deptSearch, setDeptSearch }) {
  return (
    <div>
      {/* Thanh tìm kiếm */}
      <input
        type="text"
        placeholder="Tìm kiếm Khoa..."
        value={deptSearch}
        onChange={(e) => setDeptSearch(e.target.value)}
        className={styles.searchInput}
      />

      {/* Danh sách Khoa */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Mã Khoa</th>
            <th>Tên Khoa</th>
            <th>Địa Điểm</th>
            <th>Trưởng Khoa</th> {/* Loại bỏ cột Trưởng Khoa */}
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept) => (
            <tr key={dept.DepartmentID}>
              <td>{dept.DepartmentID}</td>
              <td>{dept.DepartmentName}</td>
              <td>{dept.DepartmentAddress}</td>
              <td>{dept.DepartmentLeaderName}</td> {/* Loại bỏ trường Trưởng Khoa */}
              <td>
                <button onClick={() => onEdit(dept)} className={styles.editButton}>
                  Chỉnh sửa
                </button>
                <button onClick={() => onDelete(dept.DepartmentID)} className={styles.deleteButton}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DepartmentList;
