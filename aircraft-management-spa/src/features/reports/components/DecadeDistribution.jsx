import styles from "./DecadeDistribution.module.css";

export default function DecadeDistribution({ data }) {
  return (
    <div className={styles.card}>
      <h3>Distribuição por década</h3>
      <div className={styles.barList}>
        {Object.entries(data).map(([decade, count]) => (
          <div key={decade} className={styles.barItem}>
            <span className={styles.barLabel}>{decade}s</span>
            <div className={styles.barWrapper}>
              <div
                className={styles.bar}
                style={{ width: `${(count / 20) * 100}%` }}
              ></div>
              <span className={styles.barValue}>{count}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
