import { FiEye, FiEdit, FiTrash2, FiCamera } from "react-icons/fi";
import styles from "./FleetTable.module.css";

const StatusBadge = ({ status }) => {
  const statusClass =
    status === "Active"
      ? "active"
      : status === "Maintenance"
        ? "maintenance"
        : "grounded";
  let statusText = "";
  if (status === "Active") statusText = "Ativo";
  else if (status === "Maintenance") statusText = "Manutenção";
  else if (status === "Sold") statusText = "Vendido";
  else statusText = status;
  return (
    <span className={styles["status-badge"]}>
      <span className={`${styles["status-dot"]} ${styles[statusClass]}`}></span>
      {statusText}
    </span>
  );
};

const FleetTable = ({ aircraft = [], onView, onEdit, onUpload, onDelete }) => {
  if (!aircraft || aircraft.length === 0) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        Nenhuma aeronave encontrada
      </div>
    );
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles["fleet-table"]}>
        <thead>
          <tr>
            <th>PREFIXO (REGISTRO)</th>
            <th>MODELO</th>
            <th>STATUS</th>
            <th>ÚLTIMA INSPEÇÃO</th>
            <th>AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          {aircraft.map((ac) => (
            <tr key={ac.id}>
              <td data-label="PREFIXO (REGISTRO)">
                <strong>{ac.prefix}</strong>
              </td>
              <td data-label="MODELO">{ac.model}</td>
              <td data-label="STATUS">
                <StatusBadge status={ac.status} />
              </td>
              <td data-label="ÚLTIMA INSPEÇÃO">{ac.lastInspection}</td>
              <td data-label="AÇÕES">
                <div className={styles["action-icons"]}>
                  <FiEye onClick={() => onView(ac)} title="Visualizar" />
                  <FiEdit onClick={() => onEdit(ac)} title="Editar" />
                  <FiCamera
                    onClick={() => onUpload(ac)}
                    title="Enviar imagem"
                  />
                  <FiTrash2 onClick={() => onDelete(ac)} title="Excluir" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FleetTable;
