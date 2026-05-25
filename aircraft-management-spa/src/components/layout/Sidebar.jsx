import { useNavigate } from "react-router-dom";
import { MdFlightTakeoff, MdBarChart, MdLogout } from "react-icons/md";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles["logo-area"]}>
        <div className={styles.logo}>AeroControl</div>
        <div className={styles["logo-sub"]}>Fleet Operations</div>
      </div>
      <div className={styles["nav-menu"]}>
        <div className={`${styles["nav-item"]} ${styles.active}`}>
          <MdFlightTakeoff /> Fleet Management
        </div>
        <div className={styles["nav-item"]}>
          <MdBarChart /> Reports
        </div>
      </div>
      <div className={styles["sidebar-footer"]}>
        <div className={styles["sidebar-footer-item"]} onClick={handleLogout}>
          <MdLogout /> Sign Out
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
