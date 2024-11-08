// components/CreateDepartmentForm.jsx

import React, { useState } from 'react';
import axios from 'axios';
import styles from '../css/client.module.css';
import Notification from './Notification';

function CreateDepartmentForm({ handleCloseCreateDptForm, setDepartment }) {
  const [deptName, setDeptName] = useState("");
  const [deptAddress, setDeptAddress] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });

   // Hàm loại bỏ dấu tiếng Việt
function removeVietnameseTones(str) {
  return str
    .normalize("NFD") // Chuyển đổi ký tự có dấu thành ký tự kết hợp
    .replace(/[\u0300-\u036f]/g, "") // Loại bỏ các ký tự kết hợp
    .replace(/đ/g, "d").replace(/Đ/g, "D"); // Thay thế ký tự đặc biệt 'đ'
}


  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification({ message: "", type: "" });

    // Kiểm tra các trường bắt buộc
    if (!deptName) {
      setNotification({ message: "Vui lòng nhập tên khoa.", type: "error" });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      console.log("token", token);
      // DepartmentID la DepartmentName viet thuong lien va khong co dau 
      const data = {
        DepartmentID: removeVietnameseTones(deptName).toLowerCase().replace(/\s+/g, ""),
        DepartmentName: deptName,
        DepartmentAddress: deptAddress,
      };
      const response = await axios.post(
        "http://localhost:5000/api/departments",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("response", response.data);
      setDepartment(response.data);
      const accountData = {
        ID: response.data.DepartmentID,
        password: "123456",
        type: "department",
      };

      try {
        await axios.post(
          "http://localhost:5000/api/accounts/register",
          accountData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } catch (error) {
        console.error("Error creating account:", error);
        if (error.response && error.response.data && error.response.data.error) {
          console.error(error.response)
        }
      }

    } catch (error) {
      console.error("Error creating department:", error);
      if (error.response && error.response.data && error.response.data.error) {
        console.error(error.response.data.error);
      }
    }

   
   
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Tạo Mới Khoa</h2>
        {notification.message && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification({ message: "", type: "" })}
          />
        )}
        <form onSubmit={handleSubmit} className={styles.formInput}>
          <label htmlFor="deptName" className={styles.inputLabel}>
            Tên Khoa:
          </label>
          <input
            type="text"
            id="deptName"
            className={styles.inputField}
            value={deptName}
            onChange={(e) => setDeptName(e.target.value)}
            required
          />

          <label htmlFor="deptAddress" className={styles.inputLabel}>
            Địa Điểm Khoa:
          </label>
          <input
            type="text"
            id="deptAddress"
            className={styles.inputField}
            value={deptAddress}
            onChange={(e) => setDeptAddress(e.target.value)}
            required
          />

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.submitButton}>
              Tạo Khoa
            </button>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={handleCloseCreateDptForm}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


export default CreateDepartmentForm;
