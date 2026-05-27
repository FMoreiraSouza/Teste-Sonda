import styles from "./UnsoldCountCard.module.css";

export default function UnsoldCountCard({ count }) {
  return (
    <div className={styles.unsoldCard}>
      <h3>Quantidade de aeronaves não vendidas</h3>
      <div className={styles.unsoldNumber}>{count ?? "-"}</div>
    </div>
  );
}
