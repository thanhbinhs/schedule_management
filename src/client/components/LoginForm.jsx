// src/client/components/LoginForm.jsx

"use client";

import React, { useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "../css/client.module.css";
import Notification from "./Notification"; // Đảm bảo component này tồn tại
import { UserContext } from "../contexts/UserContext"; // Đảm bảo UserContext được thiết lập đúng

function LoginForm() {
  const [isRegister, setIsRegister] = useState(false); // Chuyển giữa Đăng nhập và Đăng ký
  const [formData, setFormData] = useState({
    ID: "",
    password: "",
    confirmPassword: "",
    type: "pdt",
    rememberLogin: false,
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { user, setUser } = useContext(UserContext); // Đảm bảo UserProvider bao quanh component này
  const router = useRouter();

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Hàm validate dữ liệu form
  const validate = () => {
    const newErrors = {};

    // Kiểm tra các trường bắt buộc
    if (!formData.ID.trim()) {
      newErrors.ID = "Tên đăng nhập là bắt buộc.";
    }

    if (!formData.password) {
      newErrors.password = "Mật khẩu là bắt buộc.";
    } else if (isRegister && formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự.";
    }

    if (isRegister) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Xác nhận mật khẩu là bắt buộc.";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Mật khẩu không khớp.";
      }

      if (!formData.type) {
        newErrors.type = "Loại tài khoản là bắt buộc.";
      } else if (!["pdt", "department"].includes(formData.type)) { // Loại bỏ 'professor'
        newErrors.type = "Loại tài khoản không hợp lệ.";
      }
    }

    setErrors(newErrors);

    // Trả về true nếu không có lỗi
    return Object.keys(newErrors).length === 0;
  };

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setErrors({});

    if (!validate()) {
      return;
    }

    if (isRegister) {
      await handleRegister();
    } else {
      await handleLogin();
    }
  };

  // Xử lý đăng nhập
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/accounts/login`,
        {
          ID: formData.ID,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { token } = response.data;

      // Giải mã token để lấy thông tin người dùng (giả sử token chứa ID và type)
      const payload = JSON.parse(atob(token.split(".")[1]));
      const { ID, type } = payload;

      // Lưu token và thông tin người dùng dựa trên checkbox 'Nhớ đăng nhập'
      if (formData.rememberLogin) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }
      localStorage.setItem("type", type);
      localStorage.setItem("username", ID);

      // Cập nhật context người dùng
      setUser({ ID, type });

      // Chuyển hướng dựa trên loại người dùng
      redirectUser(type);
    } catch (err) {
      console.error("Login error:", err);
      if (err.response) {
        if (err.response.status === 403) {
          setErrors({ general: "Bạn không có quyền đăng nhập." });
        } else if (err.response.data && err.response.data.error) {
          setErrors({ general: err.response.data.error });
        } else {
          setErrors({ general: "Đã xảy ra lỗi không mong muốn. Vui lòng thử lại." });
        }
      } else {
        setErrors({ general: "Đã xảy ra lỗi không mong muốn. Vui lòng thử lại." });
      }
    }
  };

  // Xử lý đăng ký
  const handleRegister = async () => {
    console.log("Registering...", process.env.NEXT_PUBLIC_API_BASE_URL);
    
    try {
      // Chuẩn bị dữ liệu đăng ký
      const registrationData = {
        ID: formData.ID,
        password: formData.password,
        type: formData.type,
      };

      // **Không lấy token từ storage vì đăng ký công khai**
      // const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      // console.log("Token:", token);
      
      // **Chuẩn bị headers mà không có Authorization**
      const headers = {
        "Content-Type": "application/json",
      };

      // Kiểm tra xem Authorization header đã được thêm hay chưa
      console.log("Headers:", headers);

      // Gọi API đăng ký mà không có Authorization header
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/accounts/register`,
        registrationData,
        {
          headers,
        }
      );

      setSuccess("Đăng ký thành công! Vui lòng đăng nhập.");
      toggleForm(); // Chuyển sang form đăng nhập
      setFormData({
        ID: "",
        password: "",
        confirmPassword: "",
        type: "pdt",
        rememberLogin: false,
      });
    } catch (err) {
      console.error("Register error:", err);
      if (err.response) {
        if (err.response.status === 401) {
          setErrors({ general: "Không được phép đăng ký tài khoản mới." });
        } else if (err.response.data && err.response.data.error) {
          setErrors({ general: err.response.data.error });
        } else {
          setErrors({ general: "Đã xảy ra lỗi không mong muốn. Vui lòng thử lại." });
        }
      } else {
        setErrors({ general: "Đã xảy ra lỗi không mong muốn. Vui lòng thử lại." });
      }
    }
  };

  // Chuyển hướng dựa trên loại người dùng
  const redirectUser = (type) => {
    switch (type) {
      case "pdt":
        router.push("/pdt");
        break;
      case "department":
        router.push("/department");
        break;
      default:
        router.push("/");
    }
  };

  // Chuyển đổi giữa Đăng nhập và Đăng ký
  const toggleForm = () => {
    setIsRegister(!isRegister);
    setErrors({});
    setSuccess("");
    setFormData({
      ID: "",
      password: "",
      confirmPassword: "",
      type: "pdt",
      rememberLogin: false,
    });
  };

  return (
    <main className={styles.loginPage}>
      {(errors.general || success) && (
        <Notification
          message={errors.general || success}
          type={errors.general ? "error" : "success"}
          onClose={() => {
            setErrors((prev) => ({ ...prev, general: "" }));
            setSuccess("");
          }}
        />
      )}
      <div className={styles.container}>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1df84fe6fe73ac0294e467b7a4417f807df980fc48c7b728104587c9be37d719?placeholderIfAbsent=true&apiKey=a732e21b3afa4acd8291ecb50549d348"
          className={styles.backgroundImage}
          alt="Background"
        />
        <section className={styles.loginForm}>
          <div className={styles.formContent}>
            <form className={styles.formInput} onSubmit={handleSubmit}>
              <h2 className={styles.formTitle}>{isRegister ? "Đăng Ký" : "Đăng Nhập"}</h2>

              {/* Username Field */}
              <label htmlFor="ID" className={styles.inputLabel}>
                Tên đăng nhập:
              </label>
              <input
                type="text"
                id="ID"
                name="ID"
                className={styles.inputField}
                placeholder="Nhập tên đăng nhập"
                aria-label="Nhập tên đăng nhập"
                value={formData.ID}
                onChange={handleChange}
              />
              {errors.ID && <p className={styles.error}>{errors.ID}</p>}

              {/* Password Field */}
              <label htmlFor="password" className={styles.inputLabel}>
                Mật khẩu:
              </label>
              <div className={styles.passwordContainer}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className={styles.passwordInput}
                  placeholder="Nhập mật khẩu"
                  aria-label="Nhập mật khẩu"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className={styles.visibilityToggle}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showPassword ? (
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/c58a786a05ea30c9c075d43dba0ac61cf559a2065fea9130e59a905935445863?placeholderIfAbsent=true&apiKey=a732e21b3afa4acd8291ecb50549d348"
                      alt="Ẩn mật khẩu"
                      className={styles.visibilityIcon}
                    />
                  ) : (
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/c58a786a05ea30c9c075d43dba0ac61cf559a2065fea9130e59a905935445863?placeholderIfAbsent=true&apiKey=a732e21b3afa4acd8291ecb50549d348"
                      alt="Hiện mật khẩu"
                      className={styles.visibilityIcon}
                    />
                  )}
                </button>
              </div>
              {errors.password && <p className={styles.error}>{errors.password}</p>}

              {/* Registration Fields */}
              {isRegister && (
                <>
                  {/* Confirm Password */}
                  <label htmlFor="confirmPassword" className={styles.inputLabel}>
                    Xác nhận mật khẩu:
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className={styles.inputField}
                    placeholder="Xác nhận mật khẩu"
                    aria-label="Xác nhận mật khẩu"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword}</p>}

                  {/* Account Type */}
                  <label htmlFor="type" className={styles.inputLabel}>
                    Loại tài khoản:
                  </label>
                  <select
                    id="type"
                    name="type"
                    className={styles.inputField}
                    value={formData.type}
                    onChange={handleChange}
                  >
                    <option value="pdt">Phòng Đào Tạo (pdt)</option>
                    <option value="department">Khoa/Phòng Ban (department)</option>
                  </select>
                  {errors.type && <p className={styles.error}>{errors.type}</p>}
                </>
              )}

              {/* Remember Me Checkbox for Login */}
              {!isRegister && (
                <div className={styles.rememberLogin}>
                  <input
                    type="checkbox"
                    id="rememberLogin"
                    name="rememberLogin"
                    checked={formData.rememberLogin}
                    onChange={handleChange}
                  />
                  <label htmlFor="rememberLogin" className={styles.rememberText}>
                    Nhớ đăng nhập ?
                  </label>
                </div>
              )}

              {/* Submit Button */}
              <button type="submit" className={styles.loginButton}>
                {isRegister ? "Đăng Ký" : "Đăng Nhập"}
              </button>
            </form>

            {/* Toggle Between Login and Register */}
            <div className={styles.toggleLink}>
              {isRegister ? (
                <p>
                  Bạn đã có tài khoản?{" "}
                  <button onClick={toggleForm} className={styles.toggleButton}>
                    Đăng nhập
                  </button>
                </p>
              ) : (
                <p>
                  Bạn chưa có tài khoản?{" "}
                  <button onClick={toggleForm} className={styles.toggleButton}>
                    Đăng Ký
                  </button>
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default LoginForm;
