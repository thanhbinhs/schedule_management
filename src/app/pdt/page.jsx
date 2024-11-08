"use client";

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from "@/client/css/client.module.css";
import Sidebar from '@/client/components/Sidebar';
import HeaderPdt from '@/client/components/HeaderPdt';
import Notification from '@/client/components/Notification';
import CreateDepartmentForm from '@/client/components/CreateDepartmentForm';
import EditDepartmentForm from '@/client/components/EditDepartmentForm';
import CreateRoomForm from '@/client/components/CreateRoomForm';
import EditRoomForm from '@/client/components/EditRoomForm'; // Thêm import EditRoomForm

export default function PDTDashboard(){
  const [departments, setDepartments] = useState([]);
  const [itemMenu, setItemMenu] = useState("Trang chủ");
  
  // State để quản lý thông báo
  const [notification, setNotification] = useState({ message: "", type: "" });
  
  // States để quản lý form tạo và chỉnh sửa Khoa
  const [showCreateDptForm, setShowCreateDptForm] = useState(false);
  const [showEditDptForm, setShowEditDptForm] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);

  // States để quản lý form tạo và chỉnh sửa Phòng học
  const [showCreateRoomForm, setShowCreateRoomForm] = useState(false);
  const [showEditRoomForm, setShowEditRoomForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try{
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        const response = await axios.get(
          "http://localhost:5000/api/departments",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        setDepartments(response.data);

      } catch (error) { // Thêm error parameter
        console.error("Error getting departments:", error);
        if (error.response && error.response.data && error.response.data.error) {
          setNotification({ message: error.response.data.error, type: "error" });
        }
      }
    }

    const fetchRooms = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "http://localhost:5000/api/rooms",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setRooms(response.data);
      } catch (error) { // Thêm error parameter
        console.error("Error fetching rooms:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          console.error(error.response.data.error);
        }
      }
    }

    fetchRooms();
    fetchDepartments();
  }, []);

  console.log("departments", departments);  
  console.log("rooms", rooms);

  // Hàm để thêm Khoa mới vào danh sách
  const handleCreateDepartment = (newDept) => {
    setDepartments([...departments, newDept]);
    setNotification({
      message: "Thêm Khoa thành công.",
      type: "success",
    });
    setShowCreateDptForm(false);
  };

  // Hàm để mở form chỉnh sửa Khoa
  const handleEdit = (dept) => {
    setEditingDepartment(dept);
    setShowEditDptForm(true);
  };

  // Hàm để đóng form chỉnh sửa Khoa
  const handleCloseEditDptForm = () => {
    setShowEditDptForm(false);
    setEditingDepartment(null);
  };

  // Hàm để cập nhật Khoa trong danh sách
  const handleUpdateDepartment = (updatedDept) => {
    setDepartments(departments.map(dept => dept.DepartmentID === updatedDept.DepartmentID ? updatedDept : dept));
    setNotification({
      message: "Cập nhật Khoa thành công.",
      type: "success",
    });
  };

  // Hàm để xóa Khoa
  const handleDelete = async (DepartmentID) => {
    const token = localStorage.getItem("token");
    if (confirm("Bạn có chắc chắn muốn xóa Khoa này không?")) {
      try {
        await axios.delete(`http://localhost:5000/api/departments/${DepartmentID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setDepartments(departments.filter(dept => dept.DepartmentID !== DepartmentID));
        setNotification({
          message: "Xóa Khoa thành công.",
          type: "success",
        });
      }
      catch (error) { // Thêm error parameter
        console.error("Error deleting department:", error);
        if (error.response && error.response.data && error.response.data.error) {
          setNotification({ message: error.response.data.error, type: "error" });
        } else {
          setNotification({
            message: "Đã xảy ra lỗi khi xóa Khoa.",
            type: "error",
          });
        }
      }
    }
  };

  // Hàm để mở form chỉnh sửa phòng học
  const handleEditRoom = (room) => {
    setEditingRoom(room);
    setShowEditRoomForm(true);
  };

  // Hàm để cập nhật phòng học sau khi chỉnh sửa
  const handleUpdateRoom = (updatedRoom) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.RoomID === updatedRoom.RoomID ? updatedRoom : room
      )
    );
    setNotification({
      message: "Cập nhật Phòng học thành công.",
      type: "success",
    });
  };

  // Hàm để xóa Phòng học (chưa được cài đặt)
  const handleDeleteRoom = async (RoomID) => {
    const token = localStorage.getItem("token");
    if (confirm("Bạn có chắc chắn muốn xóa Phòng học này không?")) {
      try {
        await axios.delete(`http://localhost:5000/api/rooms/${RoomID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setRooms(rooms.filter(room => room.RoomID !== RoomID));
        setNotification({
          message: "Xóa Phòng học thành công.",
          type: "success",
        });
      }
      catch (error) { // Thêm error parameter
        console.error("Error deleting room:", error);
        if (error.response && error.response.data && error.response.data.error) {
          setNotification({ message: error.response.data.error, type: "error" });
        } else {
          setNotification({
            message: "Đã xảy ra lỗi khi xóa Phòng học.",
            type: "error",
          });
        }
      }
    }
  };

  return (
    <div className={styles.pdtPage}>
      <div className={styles.pageContent}>
        <Sidebar setItem={setItemMenu} />
        <main className={styles.mainContentHome}>
          <HeaderPdt item={itemMenu} />
          {/* Hiển thị thông báo nếu có */}
          {notification.message && (
            <Notification
              message={notification.message}
              type={notification.type}
              onClose={() => setNotification({ message: "", type: "" })}
            />
          )}
          {itemMenu === "Trang chủ" && (
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/dea35c71f80b3aa9681f4b315717dcf00e573f555dd77455adbfc0ae1ce1ff3c?placeholderIfAbsent=true&apiKey=a732e21b3afa4acd8291ecb50549d348"
              alt="Main content illustration"
              className={styles.mainImage}
            />
          )}
          {itemMenu === "Quản lý khoa" && (
            <section className={styles.facultySection}>
              <div className={styles.facultyHeader}>
                <h2 className={styles.facultyTitle}>Danh sách Khoa</h2>
                <button
                  className={styles.createButton}
                  onClick={() => setShowCreateDptForm(true)} // Sửa lại onClick
                >
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/4ca0d9989e7a6746f5cf28b0576c553ad0fd4eab6bc39954ffd00e3914a2e4d4?placeholderIfAbsent=true&apiKey=a732e21b3afa4acd8291ecb50549d348"
                    alt="Create Icon"
                    className={styles.createIcon}
                  />
                  Thêm Khoa
                </button>
              </div>
              {/* Danh sách khoa hiển thị với departments.map */}
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Mã Khoa</th>
                    <th>Tên Khoa</th>
                    <th>Địa Điểm</th>
                    <th>Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map((dept) => (
                    <tr key={dept.DepartmentID}>
                      <td>{dept.DepartmentID}</td>
                      <td>{dept.DepartmentName}</td>
                      <td>{dept.DepartmentAddress}</td>
                      <td>
                        <button onClick={() => handleEdit(dept)} className={styles.editButton}>
                          Chỉnh sửa
                        </button>
                        <button onClick={() => handleDelete(dept.DepartmentID)} className={styles.deleteButton}>
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Hiển thị form tạo mới Khoa khi showCreateDptForm là true */}
              {showCreateDptForm && (
                <CreateDepartmentForm
                  handleCloseCreateDptForm={() => setShowCreateDptForm(false)}
                  setDepartment={handleCreateDepartment}
                  setNotification={setNotification}
                />
              )}

              {/* Hiển thị form chỉnh sửa Khoa khi showEditDptForm là true */}
              {showEditDptForm && editingDepartment && (
                <EditDepartmentForm
                  department={editingDepartment}
                  handleCloseEditDptForm={handleCloseEditDptForm}
                  handleUpdateDepartment={handleUpdateDepartment}
                  setNotification={setNotification}
                />
              )}
            </section>
          )}
          {/* Quản lý phòng học */}
          {itemMenu === "Quản lý phòng học" && (
            <section className={styles.facultySection}>
              <div className={styles.facultyHeader}>
                <h2 className={styles.facultyTitle}>Danh sách Phòng học</h2>
                <button
                  onClick={() => setShowCreateRoomForm(true)} // Sửa lại onClick
                  className={styles.createButton}
                >
                  Tạo mới Phòng học
                </button>
              </div>
              {/* Hiển thị danh sách phòng học */}
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Mã Phòng</th>
                    <th>Tầng</th>
                    <th>Tòa nhà</th>
                    <th>Chức năng</th>
                    <th>Quy mô</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((room) => (
                    <tr key={room.RoomID}>
                      <td>{room.RoomID}</td>
                      <td>{room.floor}</td>
                      <td>{room.building}</td>
                      <td>{room.function}</td>
                      <td>{room.scale}</td>
                      <td>{room.status}</td>
                      <td>
                        <button
                          className={styles.editButton}
                          onClick={() => handleEditRoom(room)}
                        >
                          Chỉnh sửa
                        </button>
                        <button
                          className={styles.deleteButton}
                          onClick={() => handleDeleteRoom(room.RoomID)}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Hiển thị form tạo phòng học nếu cần */}
              {showCreateRoomForm && (
                <CreateRoomForm
                  handleClose={() => setShowCreateRoomForm(false)}
                  setRooms={setRooms}
                  setNotification={setNotification}
                />
              )}

              {/* Hiển thị form chỉnh sửa phòng học nếu cần */}
              {showEditRoomForm && editingRoom && (
                <EditRoomForm
                  room={editingRoom}
                  handleClose={() => {
                    setShowEditRoomForm(false);
                    setEditingRoom(null);
                  }}
                  setRooms={setRooms}
                  setNotification={setNotification}
                />
              )}
            </section>
          )}
        </main>
      </div>
    </div>
  )
}
