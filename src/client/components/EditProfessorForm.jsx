// src/client/components/EditProfessorForm.jsx

import React, { useState } from 'react';
import styles from '@/client/css/client.module.css'; // Đảm bảo bạn có file CSS tương ứng

export default function EditProfessorForm({ professor, department, onUpdate, onClose }) {
  const [ProfessorName, setProfessorName] = useState(professor.ProfessorName);
  const [DepartmentID, setDepartmentID] = useState(professor.DepartmentID);
  const [Email, setEmail] = useState(professor.Email);
  const [SDT, setSDT] = useState(professor.SDT);
  const [isDepartmentLeader, setIsDepartmentLeader] = useState(professor.isDepartmentLeader);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra các trường bắt buộc
    if (!ProfessorName || !DepartmentID || !Email || !SDT) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    // Tạo object dữ liệu
    const formData = {
      ProfessorID: professor.ProfessorID, // ID không thể thay đổi
      ProfessorName,
      DepartmentID,
      Email,
      SDT,
      isDepartmentLeader,
    };

    onUpdate(formData);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Chỉnh Sửa Giảng Viên</h2>
        {error && <p className={styles.errorText}>{error}</p>}
        <form onSubmit={handleSubmit} className={styles.formInput}>
          <label htmlFor="ProfessorID" className={styles.inputLabel}>ID Giảng Viên:</label>
          <input
            type="text"
            id="ProfessorID"
            className={styles.inputField}
            value={professor.ProfessorID}
            disabled
          />

          <label htmlFor="ProfessorName" className={styles.inputLabel}>Tên Giảng Viên:</label>
          <input
            type="text"
            id="ProfessorName"
            className={styles.inputField}
            value={ProfessorName}
            onChange={(e) => setProfessorName(e.target.value)}
            required
          />

          <label htmlFor="DepartmentID" className={styles.inputLabel}>Khoa:</label>
          <select
            id="DepartmentID"
            className={styles.inputField}
            value={DepartmentID}
            onChange={(e) => setDepartmentID(e.target.value)}
            required
          >
            <option value="">-- Chọn Khoa --</option>
              <option key={department.DepartmentID} value={department.DepartmentID}>
                {department.DepartmentName}
              </option>
          </select>

          <label htmlFor="Email" className={styles.inputLabel}>Email:</label>
          <input
            type="email"
            id="Email"
            className={styles.inputField}
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="SDT" className={styles.inputLabel}>Số Điện Thoại:</label>
          <input
            type="text"
            id="SDT"
            className={styles.inputField}
            value={SDT}
            onChange={(e) => setSDT(e.target.value)}
            required
          />

          <label htmlFor="isDepartmentLeader" className={styles.inputLabel}>
            <input
              type="checkbox"
              id="isDepartmentLeader"
              checked={isDepartmentLeader}
              onChange={(e) => setIsDepartmentLeader(e.target.checked)}
            />
            Trưởng Khoa
          </label>

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.submitButton}>Cập Nhật Giảng Viên</button>
            <button type="button" className={styles.cancelButton} onClick={onClose}>Hủy</button>
          </div>
        </form>
      </div>
    </div>
  );
}
