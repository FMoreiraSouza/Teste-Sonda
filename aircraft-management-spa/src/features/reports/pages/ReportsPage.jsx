import { useState, useEffect } from "react";
import {
  getUnsoldCount,
  getDecadeDistribution,
  getManufacturerDistribution,
  getLastWeekAircrafts,
} from "../api/reportsService";
import UnsoldCountCard from "../components/UnsoldCountCard";
import DecadeDistribution from "../components/DecadeDistribution";
import ManufacturerDistribution from "../components/ManufacturerDistribution";
import LastWeekTable from "../components/LastWeekTable";
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

        <UnsoldCountCard count={unsoldCount} />

        <div className={styles.grid2cols}>
          <DecadeDistribution data={decadeData} />
          <ManufacturerDistribution data={manufacturerData} />
        </div>

        <LastWeekTable aircrafts={lastWeek} />
      </div>

      <div className={styles["app-footer"]}>
        <div>© 2026 AeroControl. Todos os direitos reservados.</div>
        <div className={styles["footer-links"]}>
          <span>Política de Privacidade</span>
          <span>Termos de Uso</span>
          <span>Conformidade Regulatória</span>
        </div>
      </div>
    </>
  );
}
