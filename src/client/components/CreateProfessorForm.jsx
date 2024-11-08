// src/client/components/CreateProfessorForm.jsx

import React, { useState } from "react";
import axios from 'axios'; // Đảm bảo import axios
import styles from "@/client/css/client.module.css"; // Đảm bảo bạn có file CSS tương ứng

export default function CreateProfessorForm({
  department, // Đảm bảo department được truyền vào và không null
  onCreate,
  onClose,
}) {
  const [ProfessorName, setProfessorName] = useState("");
  const [SDT, setSDT] = useState("");
  const [isDepartmentLeader, setIsDepartmentLeader] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!department) {
      setError("Không tìm thấy Khoa. Vui lòng thử lại.");
      return;
    }

    const formData = {
      ProfessorName,
      DepartmentID: department.DepartmentID, // Đảm bảo department có DepartmentID
      SDT,
      isDepartmentLeader,
    };

    onCreate(formData);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Tạo Mới Giảng Viên</h2>
        {error && <p className={styles.errorText}>{error}</p>}
        <form onSubmit={handleSubmit} className={styles.formInput}>
          <label htmlFor="ProfessorName" className={styles.inputLabel}>
            Tên Giảng Viên:
          </label>
          <input
            type="text"
            id="ProfessorName"
            className={styles.inputField}
            value={ProfessorName}
            onChange={(e) => setProfessorName(e.target.value)}
            required
          />

          <label htmlFor="SDT" className={styles.inputLabel}>
            SĐT:
          </label>
          <input
            type="text"
            id="SDT"
            className={styles.inputField}
            value={SDT}
            onChange={(e) => setSDT(e.target.value)}
            required
          />

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.submitButton}>
              Tạo Giảng Viên
            </button>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
