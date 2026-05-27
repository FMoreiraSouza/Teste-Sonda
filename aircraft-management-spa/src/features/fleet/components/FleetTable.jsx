import { FiEye, FiEdit, FiTrash2, FiCamera } from "react-icons/fi";
import styles from "./FleetTable.module.css";

const StatusBadge = ({ status }) => {
  const statusClass =
    status === "Active"
      ? "active"
      : status === "Maintenance"
        ? "maintenance"
        : "grounded";
  return (
    <span className={styles["status-badge"]}>
      <span className={`${styles["status-dot"]} ${styles[statusClass]}`}></span>
      {status}
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
            <th>PREFIX (REGISTRATION)</th>
            <th>MODEL</th>
            <th>STATUS</th>
            <th>LAST INSPECTION</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {aircraft.map((ac) => (
            <tr key={ac.id}>
              <td data-label="PREFIX (REGISTRATION)">
                <strong>{ac.prefix}</strong>
              </td>
              <td data-label="MODEL">{ac.model}</td>
              <td data-label="STATUS">
                <StatusBadge status={ac.status} />
              </td>
              <td data-label="LAST INSPECTION">{ac.lastInspection}</td>
              <td data-label="ACTIONS">
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
