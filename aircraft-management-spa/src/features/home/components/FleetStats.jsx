import styles from "./FleetStats.module.css";

const FleetStats = ({ stats }) => {
  return (
    <div className={styles["stats-grid"]}>
      <div className={styles["stat-card"]}>
        <div className={styles["stat-title"]}>TOTAL FLEET</div>
        <div className={styles["stat-number"]}>{stats.total}</div>
        <div className={styles["stat-sub"]}>Frota registrada</div>
      </div>
      <div className={styles["stat-card"]}>
        <div className={styles["stat-title"]}>ACTIVE</div>
        <div className={styles["stat-number"]}>{stats.active}</div>
        <div className={styles["stat-sub"]}>Operacional</div>
      </div>
      <div className={styles["stat-card"]}>
        <div className={styles["stat-title"]}>MAINTENANCE</div>
        <div className={styles["stat-number"]}>{stats.maintenance}</div>
        <div className={styles["stat-sub"]}>Em manutenção</div>
      </div>
    </div>
  );
};

export default FleetStats;
