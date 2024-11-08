// src/client/components/CreateProfessorForm.jsx

import React, { useState, useEffect } from "react";
import styles from "@/client/css/client.module.css"; // Đảm bảo bạn có file CSS tương ứng
import axios from 'axios';

export default function CreateRoomForm({
  handleClose,
  setRooms,
  setNotification,
}) {
  const [error, setError] = useState("");
  const [RoomID, setRoomID] = useState("");
  const [floor, setFloor] = useState("");
  const [building, setBuilding] = useState("");
  const [functions, setFunctions] = useState("");
  const [scale, setScale] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      RoomID: RoomID,
      floor: floor,
      building: building,
      function: functions,
      //   chuyển scale từ string sang interger
      scale: parseInt(scale),
      status: status,
    };
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/rooms",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setNotification({
        message: "Tạo Phòng học thành công.",
        type: "success",
      });
      console.log("response", response);
      setRooms((rooms) => [...rooms, response.data]);
      handleClose();
    } catch(error) {
      console.error("Error creating room:", error);
      if (error.response && error.response.data && error.response.data.error) {
        setNotification({ message: error.response.data.error, type: "error" });
      } else {
        setNotification({
          message: "Đã xảy ra lỗi khi tạo Phòng học.",
          type: "error",
        });
      }
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Tạo Mới Phòng học</h2>
        {error && <p className={styles.errorText}>{error}</p>}
        <form onSubmit={handleSubmit} className={styles.formInput}>
          <label htmlFor="RoomID" className={styles.inputLabel}>
          Mã Phòng:
          </label>
          <input
            type="text"
            id="RoomID"
            className={styles.inputField}
            value={RoomID}
            onChange={(e) => setRoomID(e.target.value)}
            required
          />

          <label htmlFor="floor" className={styles.inputLabel}>
            Tầng:
          </label>
          <input
            type="text"
            id="floor"
            className={styles.inputField}
            value={floor}
            onChange={(e) => setFloor(e.target.value)}
            required
          />

          <label htmlFor="building" className={styles.inputLabel}>
            Tòa nhà:
          </label>
          <input
            type="text"
            id="building"
            className={styles.inputField}
            value={building}
            onChange={(e) => setBuilding(e.target.value)}
            required
          />

          <label htmlFor="functions" className={styles.inputLabel}>
            Chức năng:
          </label>
          <input
            type="text"
            id="functions"
            className={styles.inputField}
            value={functions}
            onChange={(e) => setFunctions(e.target.value)}
            required
          />

          <label htmlFor="scale" className={styles.inputLabel}>
            Quy mô:
          </label>
          <input
            type="text"
            id="scale"
            className={styles.inputField}
            value={scale}
            onChange={(e) => setScale(e.target.value)}
            required
          />

          <label htmlFor="status" className={styles.inputLabel}>
            Trạng thái:
          </label>
          {/* Gồm 4 Trạng thái:  “Có sẵn”, “Đang sử dụng”, “Bảo trì”, hoặc “Đóng cửa” */}
          <select
            id="status"
            className={styles.inputField}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="">-- Chọn Trạng thái --</option>
            <option value="Có sẵn">Có sẵn</option>
            <option value="Đang sử dụng">Đang sử dụng</option>
            <option value="Bảo trì">Bảo trì</option>
            <option value="Đóng cửa">Đóng cửa</option>
          </select>

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.submitButton}>
              Tạo Phòng
            </button>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={handleClose}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
