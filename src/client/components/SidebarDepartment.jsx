import React, { useState } from "react";
import styles from "../css/client.module.css";

const menuItems = [
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/3b42801a8d14f4758c0e319fd70980ef287a8d3bfb6f23ef2cd39bb7cee84631?placeholderIfAbsent=true&apiKey=a732e21b3afa4acd8291ecb50549d348", text: "Trang chủ" },
  { 
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/bce184dfb30c6292b9bdc8db284d4b6374d459b6aa85e92f39e5dac2a8cf6929?placeholderIfAbsent=true&apiKey=a732e21b3afa4acd8291ecb50549d348", 
    text: "Quản lý thời khóa biểu", 
    hasDropdown: true,
    subItems: [
        {text: "Quản lý giảng viên"},
      { text: "Thêm thời khóa biểu" },
      { text: "Chỉnh sửa thời khóa biểu" },
      { text: "Xóa thời khóa biểu" }
    ]
  },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/a21dee5d2e141240671081a49ad865218be001da36eba80dd31c3c52fc597d23?placeholderIfAbsent=true&apiKey=a732e21b3afa4acd8291ecb50549d348", text: "Thống kê" }
];

function SidebarDepartment({ setItem }) {
  const [expandedItem, setExpandedItem] = useState(null);

  const handleItemClick = (item) => {
    if (item.hasDropdown) {
      setExpandedItem(expandedItem === item.text ? null : item.text);
    } else {
      setItem(item.text);
      setExpandedItem(null);
    }
  };

  return (
    <nav className={styles.sidebar}>
      <img 
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/cdc3153458e15547136bc7b7a34143c80c40f1b2a272e68b7c213cee496d6663?placeholderIfAbsent=true&apiKey=a732e21b3afa4acd8291ecb50549d348" 
        alt="Logo" 
        className={styles.logo} 
      />
      <hr className={styles.divider} />
      <ul className={styles.menuList}>
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            <li 
              className={styles.menuItem} 
              onClick={() => handleItemClick(item)}
            >
              <img src={item.icon} alt="" className={styles.menuIcon} />
              <span>{item.text}</span>
              {item.hasDropdown && (
                <img 
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/b64306f82ee2842f9624f5f6f839921a6d0068f95ac75b8973d89c96749ca4d6?placeholderIfAbsent=true&apiKey=a732e21b3afa4acd8291ecb50549d348" 
                  alt="Dropdown indicator" 
                  className={styles.dropdownIcon} 
                />
              )}
            </li>
            {item.hasDropdown && expandedItem === item.text && (
              <ul className={styles.subMenuList}>
                {item.subItems.map((subItem, subIndex) => (
                  <li 
                    key={subIndex} 
                    className={styles.subMenuItem} 
                    onClick={() => setItem(subItem.text)}
                  >
                    {subItem.text}
                  </li>
                ))}
              </ul>
            )}
          </React.Fragment>
        ))}
      </ul>
    </nav>
  );
}

export default SidebarDepartment;
