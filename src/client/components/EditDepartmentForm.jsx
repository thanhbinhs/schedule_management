// src/client/components/EditDepartmentForm.jsx

"use client";

import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import styles from "@/client/css/client.module.css"; // Đảm bảo bạn có file CSS tương ứng
import { UserContext } from "../contexts/UserContext";

export default function EditDepartmentForm({
  department,
  handleCloseEditDptForm,
  handleUpdateDepartment,
  setNotification,
}) {
  const [DepartmentName, setDepartmentName] = useState(
    department.DepartmentName
  );
  const [DepartmentAddress, setDepartmentAddress] = useState(
    department.DepartmentAddress
  );
  const [DepartmentLeader, setDepartmentLeader] = useState(
    department.DepartmentLeader
  );
  const [error, setError] = useState("");
  const { professors } = useContext(UserContext);
  const [pfs, setPfs] = useState(professors);

useEffect(()=>{
  setPfs(professors.filter((prof) => prof.DepartmentID === department.DepartmentID));
},[professors]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra các trường bắt buộc
    if (!DepartmentName) {
      setError("Vui lòng nhập tên Khoa.");
      return;
    }

    const token = localStorage.getItem("token");
    if (
      department.DepartmentLeader !== DepartmentLeader &&
      DepartmentLeader !== ""
    ) {
      try {
        await axios.put(
          `http://localhost:5000/api/professors/${department.DepartmentLeader}`,
          { isDepartmentLeader: false },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      } catch (error) {
        console.error("Error updating professor:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setError(error.response.data.error);
          setNotification({
            message: error.response.data.error,
            type: "error",
          });
        } else {
          setError("Đã xảy ra lỗi khi cập nhật Giảng Viên.");
          setNotification({
            message: "Đã xảy ra lỗi khi cập nhật Giảng Viên.",
            type: "error",
          });
        }
      }
    }
    const data = {
      DepartmentID: department.DepartmentID, // ID không thể thay đổi
      DepartmentName: DepartmentName,
      DepartmentAddress: DepartmentAddress,
      DepartmentLeader: DepartmentLeader,
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/api/departments/${department.DepartmentID}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      handleUpdateDepartment(response.data);
      setNotification({
        message: "Cập nhật Khoa thành công.",
        type: "success",
      });
      handleCloseEditDptForm();
      try {
        await axios.put(
          `http://localhost:5000/api/professors/${DepartmentLeader}`,
          { isDepartmentLeader: true },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      } catch (error) {
        console.error("Error updating professor:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setError(error.response.data.error);
          setNotification({
            message: error.response.data.error,
            type: "error",
          });
        } else {
          setError("Đã xảy ra lỗi khi cập nhật Giảng Viên.");
          setNotification({
            message: "Đã xảy ra lỗi khi cập nhật Giảng Viên.",
            type: "error",
          });
        }
      }
    } catch (error) {
      console.error("Error updating department:", error);
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
        setNotification({
          message: error.response.data.error,
          type: "error",
        });
      } else {
        setError("Đã xảy ra lỗi khi cập nhật Khoa.");
        setNotification({
          message: "Đã xảy ra lỗi khi cập nhật Khoa.",
          type: "error",
        });
      }
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Chỉnh Sửa Khoa</h2>
        {error && <p className={styles.errorText}>{error}</p>}
        <form onSubmit={handleSubmit} className={styles.formInput}>
          <label htmlFor="DepartmentID" className={styles.inputLabel}>
            Mã Khoa:
          </label>
          <input
            type="text"
            id="DepartmentID"
            className={styles.inputField}
            value={department.DepartmentID}
            disabled
          />

          <label htmlFor="DepartmentName" className={styles.inputLabel}>
            Tên Khoa:
          </label>
          <input
            type="text"
            id="DepartmentName"
            className={styles.inputField}
            value={DepartmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            required
          />

          <label htmlFor="DepartmentAddress" className={styles.inputLabel}>
            Địa Điểm:
          </label>
          <input
            type="text"
            id="DepartmentAddress"
            className={styles.inputField}
            value={DepartmentAddress}
            onChange={(e) => setDepartmentAddress(e.target.value)}
          />

          <label htmlFor="DepartmentLeader" className={styles.inputLabel}>
            Trưởng Khoa:
          </label>

          <select
            id="DepartmentLeader"
            className={styles.inputField}
            value={DepartmentLeader}
            onChange={(e) => setDepartmentLeader(e.target.value)}
          >
            <option value="">-- Chọn Trưởng Khoa --</option>
            {pfs.map((professor) => (
              <option key={professor.ProfessorID} value={professor.ProfessorID}>
                {professor.ProfessorName}
              </option>
            ))}
          </select>

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.submitButton}>
              Cập Nhật Khoa
            </button>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={handleCloseEditDptForm}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
