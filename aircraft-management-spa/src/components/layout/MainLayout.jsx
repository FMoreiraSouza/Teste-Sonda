import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import Sidebar from "../layout/Sidebar";
import styles from "./MainLayout.module.css";

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className={styles.appContainer}>
      <button
        className={styles.hamburger}
        onClick={toggleSidebar}
        aria-label="Menu"
      >
        {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {isSidebarOpen && (
        <div className={styles.overlay} onClick={closeSidebar} />
      )}

      <div
        className={`${styles.sidebarWrapper} ${isSidebarOpen ? styles.sidebarOpen : ""}`}
      >
        <Sidebar onLogout={handleLogout} />
      </div>

      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
}
