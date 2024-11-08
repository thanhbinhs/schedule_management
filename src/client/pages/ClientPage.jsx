// src/client/pages/ClientPage.jsx

"use client";

import React from "react";
import styles from "../css/client.module.css";
import { useRouter } from "next/navigation";
import { UserProvider } from "../contexts/UserContext";

const ClientPage = () => {
    const router = useRouter();
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/c369edd412a40d01822169c4edca17c4d2e2188ea5bcc35321886dcfa4d7143a?placeholderIfAbsent=true&apiKey=a732e21b3afa4acd8291ecb50549d348"
          alt="Phenikaa Schedule Logo"
          className={styles.logo}
        />
        <nav className={styles.navigation}>
          <ul className={styles.navList}>
            <li>
              <a href="#about" className={styles.navLink}>
                GIỚI THIỆU
              </a>
            </li>
            <li>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/63d64c4d6b23137ccebc78b2a1b92a7fb1530af77a89b87307f3e6dffcf411f6?placeholderIfAbsent=true&apiKey=a732e21b3afa4acd8291ecb50549d348"
                alt=""
                className={styles.navIcon}
              />
            </li>
            <li>
              <button 

              className={styles.accpetButton}
              onClick={() => router.push("/login")}
              >Đăng nhập</button>

             
            </li>
          </ul>
        </nav>
      </header>
      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          <section className={styles.textSection}>
            <h1 className={styles.title}>Phenikaa Schedule</h1>
            <p className={styles.description}>
              Ứng dụng xây dựng
              <br />
              thời khóa biểu toàn trường
            </p>
            <button className={styles.startButton}
             onClick={() => router.push("/login")}
            >BẮT ĐẦU</button>
          </section>
          <section className={styles.imageSection}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ed0e15ff021dc117abc07c95c73bbe6257dbbb6098a02819c762a49379e9b3d6?placeholderIfAbsent=true&apiKey=a732e21b3afa4acd8291ecb50549d348"
              alt="Phenikaa Schedule Interface"
              className={styles.scheduleImage}
            />
          </section>
        </div>
      </main>
    </div>
  );
};

export default ClientPage;
