// components/HeaderPdt.jsx

import React, { useState, useEffect } from 'react';
import styles from '../css/client.module.css';
import { useRouter } from 'next/navigation';

function HeaderPdt({ item }) {
    const [isShowLogout, setIsShowLogout] = useState(false);
    const [username, setUsername] = useState("Admin"); // Mặc định là "Admin"
    const router = useRouter();
    

    useEffect(() => {
        setUsername(localStorage.getItem("username"));
    }, []);

    const handleSignout = () => {
        // Xóa token và role khỏi localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("username");
        // Đóng dropdown logout và chuyển hướng về trang đăng nhập
        setIsShowLogout(false);
        router.push("/login");
    }

    return (
        <header className={styles.headerPdt}>
            <div className={styles.titleWrapper}>
                <img 
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/9660ef9dfc1975bb3a6b62750ed774f32d8f74a3ed2969c5806f8a78722d4274?placeholderIfAbsent=true&apiKey=a732e21b3afa4acd8291ecb50549d348" 
                    alt="Logo" 
                    className={styles.titleIcon} 
                />
                {/* item được viết in hoa */}
                <h1 className={styles.titleHome}>
                    {item.toUpperCase()}
                </h1>
            </div>
            <button 
                className={styles.userSection}
                onClick={() => setIsShowLogout(!isShowLogout)}
            >
                <p className={styles.greeting}>Xin chào, {username}</p>
                <hr className={styles.userDivider} />
            </button>
            {isShowLogout && (
                <div className={styles.logoutContainer}>
                    <button 
                        className={styles.logoutButton}
                        onClick={handleSignout}
                    >
                        Đăng xuất
                    </button>
                </div>
            )}
        </header>
    );
}

export default HeaderPdt;
