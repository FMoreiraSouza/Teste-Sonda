const FleetStats = ({ stats }) => {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-title">TOTAL FLEET</div>
        <div className="stat-number">{stats.total}</div>
        <div className="stat-sub">Frota registrada</div>
      </div>
      <div className="stat-card">
        <div className="stat-title">ACTIVE</div>
        <div className="stat-number">{stats.active}</div>
        <div className="stat-sub">Operacional</div>
      </div>
      <div className="stat-card">
        <div className="stat-title">MAINTENANCE</div>
        <div className="stat-number">{stats.maintenance}</div>
        <div className="stat-sub">Em manutenção</div>
      </div>
    </div>
  );
};

export default FleetStats;
