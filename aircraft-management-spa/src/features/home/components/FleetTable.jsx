import { FiEye, FiEdit } from "react-icons/fi";

const StatusBadge = ({ status }) => {
  const statusClass =
    status === "Active"
      ? "active"
      : status === "Maintenance"
        ? "maintenance"
        : "grounded";
  return (
    <span className="status-badge">
      <span className={`status-dot ${statusClass}`}></span>
      {status}
    </span>
  );
};

const FleetTable = ({ aircraft, onView, onEdit }) => {
  if (aircraft.length === 0) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        Nenhuma aeronave encontrada
      </div>
    );
  }

  return (
    <table className="fleet-table">
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
            <td>
              <strong>{ac.prefix}</strong>
            </td>
            <td>{ac.model}</td>
            <td>
              <StatusBadge status={ac.status} />
            </td>
            <td>{ac.lastInspection}</td>
            <td>
              <div className="action-icons">
                <FiEye
                  className="action-icon"
                  onClick={() => onView(ac)}
                  title="Visualizar"
                />
                <FiEdit
                  className="action-icon"
                  onClick={() => onEdit(ac)}
                  title="Editar"
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FleetTable;
