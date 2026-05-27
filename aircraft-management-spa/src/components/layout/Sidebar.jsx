import { NavLink } from "react-router-dom";
import { MdFlightTakeoff, MdBarChart, MdLogout } from "react-icons/md";
import styles from "./Sidebar.module.css";

const Sidebar = ({ onLogout }) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles["logo-area"]}>
        <div className={styles.logo}>AeroControl</div>
        <div className={styles["logo-sub"]}>Operações de Frota</div>
      </div>
      <div className={styles["nav-menu"]}>
        <NavLink
          to="/fleet"
          className={({ isActive }) =>
            `${styles["nav-item"]} ${isActive ? styles.active : ""}`
          }
        >
          <MdFlightTakeoff /> Gestão de Frota
        </NavLink>
        <NavLink
          to="/reports"
          className={({ isActive }) =>
            `${styles["nav-item"]} ${isActive ? styles.active : ""}`
          }
        >
          <MdBarChart /> Relatórios
        </NavLink>
      </div>
      <div className={styles["sidebar-footer"]}>
        <div className={styles["sidebar-footer-item"]} onClick={onLogout}>
          <MdLogout /> Sair
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
