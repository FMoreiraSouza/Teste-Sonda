import styles from "./LastWeekTable.module.css";

export default function LastWeekTable({ aircrafts }) {
  return (
    <div className={styles.card}>
      <h3>Aeronaves cadastradas na última semana</h3>
      {aircrafts.length === 0 ? (
        <p>Nenhuma aeronave cadastrada na última semana.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Marca</th>
              <th>Data de criação</th>
            </tr>
          </thead>
          <tbody>
            {aircrafts.map((ac) => (
              <tr key={ac.id}>
                <td>{ac.name}</td>
                <td>{ac.brand}</td>
                <td>{new Date(ac.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
