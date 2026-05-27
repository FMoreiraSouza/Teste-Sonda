import styles from "./ManufacturerDistribution.module.css";

export default function ManufacturerDistribution({ data }) {
  return (
    <div className={styles.card}>
      <h3>Distribuição por fabricante</h3>
      <div className={styles.manufacturerList}>
        {Object.entries(data).map(([name, count]) => (
          <div key={name} className={styles.manufacturerRow}>
            <span>{name}</span>
            <span className={styles.badge}>{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
