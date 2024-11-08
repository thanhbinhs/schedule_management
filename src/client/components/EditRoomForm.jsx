// src/client/components/EditRoomForm.jsx

import React, { useState } from "react";
import axios from 'axios';
import styles from "@/client/css/client.module.css"; // Đảm bảo bạn có file CSS tương ứng

export default function EditRoomForm({
  room, // Phòng học được chọn để chỉnh sửa
  handleClose, // Hàm để đóng form
  setRooms, // Hàm để cập nhật danh sách phòng học trong trạng thái cha
  setNotification, // Hàm để hiển thị thông báo
}) {
  const [error, setError] = useState("");
  const [RoomID, setRoomID] = useState(room.RoomID);
  const [floor, setFloor] = useState(room.floor);
  const [building, setBuilding] = useState(room.building);
  const [functions, setFunctions] = useState(room.function);
  const [scale, setScale] = useState(room.scale);
  const [status, setStatus] = useState(room.status);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      RoomID: RoomID,
      floor: floor,
      building: building,
      function: functions,
      scale: parseInt(scale),
      status: status,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/api/rooms/${room.RoomID}`, // Giả sử API của bạn sử dụng phương thức PUT với RoomID
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Cập nhật danh sách phòng học trong trạng thái cha
      setRooms((prevRooms) =>
        prevRooms.map((r) =>
          r.RoomID === room.RoomID ? response.data : r
        )
      );

      // Hiển thị thông báo thành công
      setNotification({
        message: "Cập nhật Phòng học thành công.",
        type: "success",
      });

      // Đóng form
      handleClose();
    } catch (error) {
      console.error("Error updating room:", error);
      if (error.response && error.response.data && error.response.data.error) {
        setNotification({ message: error.response.data.error, type: "error" });
      } else {
        setNotification({
          message: "Đã xảy ra lỗi khi cập nhật Phòng học.",
          type: "error",
        });
      }
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Cập nhật Phòng học</h2>
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
            disabled // Giả sử RoomID không thể thay đổi
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
            type="number" // Sử dụng type number để dễ nhập số
            id="scale"
            className={styles.inputField}
            value={scale}
            onChange={(e) => setScale(e.target.value)}
            required
          />

          <label htmlFor="status" className={styles.inputLabel}>
            Trạng thái:
          </label>
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
              Cập nhật Phòng
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
