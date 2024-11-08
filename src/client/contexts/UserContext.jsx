// src/client/contexts/UserContext.js

"use client";
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [professors, setProfessors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Tạo các Promise cho từng yêu cầu API
        const userPromise = axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/accounts/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const departmentsPromise = axios.get(
          "http://localhost:5000/api/departments",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const roomsPromise = axios.get(
          "http://localhost:5000/api/rooms",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        // Chờ tất cả các Promise hoàn thành
        const [userResponse, departmentsResponse, roomsResponse] = await Promise.all([
          userPromise,
          departmentsPromise,
          roomsPromise,
        ]);

        // Cập nhật trạng thái với dữ liệu nhận được
        setUser(userResponse.data);
        setDepartments(departmentsResponse.data);
        setRooms(roomsResponse.data);

        // Sau khi có user và departments, gọi professors dựa trên vai trò
        if (userResponse.data.role === "department") {
          const professorsResponse = await axios.get(
            "http://localhost:5000/api/professors",
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          setProfessors(professorsResponse.data);
        } 
      } catch (error) {
        console.error("Error fetching data:", error);
        // Xử lý lỗi nếu cần thiết
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          console.error(error.response.data.error);
        }
        // Xóa thông tin người dùng nếu có lỗi trong quá trình lấy dữ liệu
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        departments,
        setDepartments,
        professors,
        setProfessors,
        rooms,
        setRooms,
      }}
    >
      {!loading && children}
    </UserContext.Provider>
  );
};
