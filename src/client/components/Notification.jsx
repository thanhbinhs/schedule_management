// src/client/components/Notification.jsx

import React from "react";
import styles from "../css/client.module.css"; // Create appropriate CSS

function Notification({ message, type, onClose }) {
  return (
    <div className={`${styles.notification} ${styles[type]}`} role="alert">
      <span>{message}</span>
      <button onClick={onClose} className={styles.closeButton} aria-label="Đóng thông báo">
        &times;
      </button>
    </div>
  );
}

export default Notification;
