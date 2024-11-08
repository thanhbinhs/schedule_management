// src/client/components/DepartmentDashboard.jsx

"use client";

import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "@/client/contexts/UserContext";
import HeaderPdt from "@/client/components/HeaderPdt";
import CreateProfessorForm from "@/client/components/CreateProfessorForm";
import EditProfessorForm from "@/client/components/EditProfessorForm";
import Notification from "@/client/components/Notification";
import styles from "@/client/css/client.module.css"; // Đảm bảo bạn có file CSS tương ứng
import SidebarDepartment from "@/client/components/SidebarDepartment";

export default function DepartmentDashboard() {
  const { user, professors, setProfessors, departments } = useContext(UserContext);
  
  // Kiểm tra xem user có tồn tại và có DepartmentID không
  const departmentID = user && user.DepartmentID ? user.DepartmentID : null;
  
  const [department, setDepartment] = useState(null); // Khởi tạo là null
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [pts, setPts] = useState([]);

  // States để quản lý form
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedProfessor, setSelectedProfessor] = useState(null);

  useEffect(() => {
    if (departments && departments.length > 0 && departmentID) {
      const dept = departments.find((dept) => dept.DepartmentID === departmentID);
      setDepartment(dept || null);
    }
  }, [departments, departmentID]);

  useEffect(() => {
    if (professors && professors.length > 0 && departmentID) {
      setPts(professors.filter((prof) => prof.DepartmentID === departmentID));
    }
  }, [professors, departmentID]);

  console.log("department", department);
  console.log("professors", professors);

  const handleCreateProfessor = async (formData) => {
    if (!department) {
      setNotification({
        message: "Không tìm thấy Khoa tương ứng.",
        type: "error",
      });
      return;
    }

    const token = localStorage.getItem("token");
    const { ProfessorName, DepartmentID, SDT, isDepartmentLeader } = formData;
    const id = removeVietnameseTones(ProfessorName)
      .toLowerCase()
      .replace(/\s+/g, "");
    const Email =
      removeVietnameseTones(ProfessorName).toLowerCase().replace(/\s+/g, "") +
      "@example.com";

    const data = {
      ProfessorID: id,
      ProfessorName: ProfessorName,
      DepartmentID: DepartmentID || department.DepartmentID, // Sử dụng DepartmentID từ form hoặc từ department
      Email: Email,
      SDT: SDT,
      isDepartmentLeader: isDepartmentLeader,
    };

    console.log("Creating Professor with data:", data);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/professors",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setProfessors([...professors, response.data]);
      setNotification({
        message: "Tạo Giảng Viên thành công.",
        type: "success",
      });
      setShowCreateForm(false);

      try {
        await axios.post(
          "http://localhost:5000/api/accounts/register",
          {
            ID: id,
            password: "123456",
            type: "professor",
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } catch (error) {
        console.error("Error creating account for professor:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setNotification({
            message: error.response.data.error,
            type: "error",
          });
        } else {
          setNotification({
            message: "Đã xảy ra lỗi khi tạo tài khoản cho Giảng Viên.",
            type: "error",
          });
        }
      }
    } catch (error) {
      console.error("Error creating professor:", error);
      if (error.response && error.response.data && error.response.data.error) {
        setNotification({ message: error.response.data.error, type: "error" });
      } else {
        setNotification({
          message: "Đã xảy ra lỗi khi tạo Giảng Viên.",
          type: "error",
        });
      }
    }
  };

  const handleEditProfessor = (professor) => {
    setSelectedProfessor(professor);
    setShowEditForm(true);
  };

  const handleUpdateProfessor = async (formData) => {
    const token = localStorage.getItem("token");
    const {
      ProfessorID,
      ProfessorName,
      DepartmentID,
      Email,
      SDT,
      isDepartmentLeader,
    } = formData;

    const data = {
      ProfessorID,
      ProfessorName,
      DepartmentID: DepartmentID || department.DepartmentID, // Sử dụng DepartmentID từ form hoặc từ department
      Email,
      SDT,
      isDepartmentLeader,
    };

    console.log("Updating Professor with data:", data);

    try {
      const response = await axios.put(
        `http://localhost:5000/api/professors/${ProfessorID}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setProfessors(
        professors.map((prof) =>
          prof.ProfessorID === ProfessorID ? response.data : prof
        )
      );
      setNotification({
        message: "Cập nhật Giảng Viên thành công.",
        type: "success",
      });
      setShowEditForm(false);
      setSelectedProfessor(null);
    } catch (error) {
      console.error("Error updating professor:", error);
      if (error.response && error.response.data && error.response.data.error) {
        setNotification({ message: error.response.data.error, type: "error" });
      } else {
        setNotification({
          message: "Đã xảy ra lỗi khi cập nhật Giảng Viên.",
          type: "error",
        });
      }
    }
  };

  const handleDeleteProfessor = async (ProfessorID) => {
    const token = localStorage.getItem("token");
    if (confirm("Bạn có chắc chắn muốn xóa Giảng Viên này không?")) {
      try {
        await axios.delete(
          `http://localhost:5000/api/professors/${ProfessorID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setProfessors(
          professors.filter((prof) => prof.ProfessorID !== ProfessorID)
        );
        setNotification({
          message: "Xóa Giảng Viên thành công.",
          type: "success",
        });
      } catch (error) {
        console.error("Error deleting professor:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setNotification({
            message: error.response.data.error,
            type: "error",
          });
        } else {
          setNotification({
            message: "Đã xảy ra lỗi khi xóa Giảng Viên.",
            type: "error",
          });
        }
      }
    }
  };

  // Hàm loại bỏ dấu tiếng Việt
  function removeVietnameseTones(str) {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  }

  const [itemMenu, setItemMenu] = useState("Trang chủ");

  return (
    <div className={styles.pdtPage}>
      <div className={styles.pageContent}>
        <SidebarDepartment setItem={setItemMenu} />
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
          {itemMenu === "Quản lý giảng viên" && (
            <section className={styles.facultySection}>
              {department ? (
                <>
                  <div className={styles.facultyHeader}>
                    <h2 className={styles.facultyTitle}>Danh sách Giảng Viên</h2>
                    <button
                      onClick={() => setShowCreateForm(true)}
                      className={styles.createButton}
                    >
                      Tạo mới Giảng Viên
                    </button>
                  </div>
                  {/* Danh sách Giảng Viên */}
                  <div className={styles.professorList}>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Tên</th>
                          <th>Mã Khoa</th>
                          <th>Email</th>
                          <th>SĐT</th>
                          <th>Trưởng Khoa</th>
                          <th>Hành Động</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pts.map((prof) => (
                          <tr key={prof.ProfessorID}>
                            <td>{prof.ProfessorID}</td>
                            <td>{prof.ProfessorName}</td>
                            <td>{prof.DepartmentID}</td>
                            <td>{prof.Email}</td>
                            <td>{prof.SDT}</td>
                            <td>{prof.isDepartmentLeader ? "Có" : "Không"}</td>
                            <td>
                              <button
                                onClick={() => handleEditProfessor(prof)}
                                className={styles.editButton}
                              >
                                Chỉnh sửa
                              </button>
                              <button
                                onClick={() =>
                                  handleDeleteProfessor(prof.ProfessorID)
                                }
                                className={styles.deleteButton}
                              >
                                Xóa
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Hiển thị form tạo mới Giảng Viên khi showCreateForm là true */}
                  {showCreateForm && (
                    <CreateProfessorForm
                      department={department}
                      onCreate={handleCreateProfessor}
                      onClose={() => setShowCreateForm(false)}
                    />
                  )}

                  {/* Hiển thị form chỉnh sửa Giảng Viên khi showEditForm là true */}
                  {showEditForm && selectedProfessor && (
                    <EditProfessorForm
                      professor={selectedProfessor}
                      department={department}
                      onUpdate={handleUpdateProfessor}
                      onClose={() => {
                        setShowEditForm(false);
                        setSelectedProfessor(null);
                      }}
                    />
                  )}
                </>
              ) : (
                <p>Đang tải thông tin Khoa...</p> // Hoặc hiển thị một spinner loading
              )}
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
