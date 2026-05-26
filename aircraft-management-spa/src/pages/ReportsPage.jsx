import styles from "./ReportsPage.module.css";

const mockUnsoldCount = 12;
const mockDecadeDistribution = {
  1990: 5,
  2000: 8,
  2010: 15,
  2020: 10,
};
const mockManufacturerDistribution = {
  Boeing: 12,
  Airbus: 10,
  Embraer: 8,
  Cessna: 4,
};
const mockLastWeekAircrafts = [
  { id: 1, name: "Boeing 737-800", brand: "Boeing", createdAt: "2026-05-20" },
  { id: 2, name: "Airbus A320", brand: "Airbus", createdAt: "2026-05-21" },
  { id: 3, name: "Embraer E195-E2", brand: "Embraer", createdAt: "2026-05-22" },
];

export default function ReportsPage() {
  return (
    <>
      <div className={styles["top-header"]}>
        <div className={styles.breadcrumb}>
          <span>RELATÓRIOS DE FROTA</span>
        </div>
      </div>

      <div className={styles["dashboard-wrapper"]}>
        <div className={styles.header}>
          <h1>Dashboards & Indicadores</h1>
          <p>Performance analítica detalhada dos ativos aéreos globais.</p>
        </div>

        <div className={styles.unsoldCard}>
          <h3>Quantidade de aeronaves não vendidas</h3>
          <div className={styles.unsoldNumber}>{mockUnsoldCount}</div>
        </div>

        <div className={styles.grid2cols}>
          <div className={styles.card}>
            <h3>Distribuição por década</h3>
            <div className={styles.barList}>
              {Object.entries(mockDecadeDistribution).map(([decade, count]) => (
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

          <div className={styles.card}>
            <h3>Distribuição por fabricante</h3>
            <div className={styles.manufacturerList}>
              {Object.entries(mockManufacturerDistribution).map(
                ([name, count]) => (
                  <div key={name} className={styles.manufacturerRow}>
                    <span>{name}</span>
                    <span className={styles.badge}>{count}</span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <h3>Aeronaves cadastradas na última semana</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Marca</th>
                <th>Data de criação</th>
              </tr>
            </thead>
            <tbody>
              {mockLastWeekAircrafts.map((ac) => (
                <tr key={ac.id}>
                  <td>{ac.name}</td>
                  <td>{ac.brand}</td>
                  <td>{ac.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles["app-footer"]}>
        <div>© 2026 AeroControl. All rights reserved.</div>
        <div className={styles["footer-links"]}>
          <span>Privacy Policy</span>
          <span>Terms of Use</span>
          <span>Regulatory Compliance</span>
        </div>
      </div>
    </>
  );
}
