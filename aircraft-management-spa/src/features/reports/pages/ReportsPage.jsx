import { useState, useEffect } from "react";
import {
  getUnsoldCount,
  getDecadeDistribution,
  getManufacturerDistribution,
  getLastWeekAircrafts,
} from "../api/reportsService";
import styles from "./ReportsPage.module.css";

export default function ReportsPage({ onToast }) {
  const [unsoldCount, setUnsoldCount] = useState(null);
  const [decadeData, setDecadeData] = useState({});
  const [manufacturerData, setManufacturerData] = useState({});
  const [lastWeek, setLastWeek] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const [unsold, decade, manufacturer, lastWeekData] = await Promise.all([
          getUnsoldCount(),
          getDecadeDistribution(),
          getManufacturerDistribution(),
          getLastWeekAircrafts(),
        ]);
        setUnsoldCount(unsold);
        setDecadeData(decade);
        setManufacturerData(manufacturer);
        setLastWeek(lastWeekData);
      } catch (error) {
        console.error("Erro ao carregar relatórios:", error);
        onToast?.("Erro ao carregar dados dos relatórios");
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, [onToast]);

  if (loading) {
    return (
      <div
        className={styles["dashboard-wrapper"]}
        style={{ textAlign: "center", padding: "2rem" }}
      >
        Carregando relatórios...
      </div>
    );
  }

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
          <div className={styles.unsoldNumber}>{unsoldCount ?? "-"}</div>
        </div>

        <div className={styles.grid2cols}>
          <div className={styles.card}>
            <h3>Distribuição por década</h3>
            <div className={styles.barList}>
              {Object.entries(decadeData).map(([decade, count]) => (
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
              {Object.entries(manufacturerData).map(([name, count]) => (
                <div key={name} className={styles.manufacturerRow}>
                  <span>{name}</span>
                  <span className={styles.badge}>{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <h3>Aeronaves cadastradas na última semana</h3>
          {lastWeek.length === 0 ? (
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
                {lastWeek.map((ac) => (
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
