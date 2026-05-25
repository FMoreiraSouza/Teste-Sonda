import {
  MdDashboard,
  MdFlightTakeoff,
  MdBarChart,
  MdSettings,
  MdSupportAgent,
  MdLogout,
} from "react-icons/md";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo-area">
        <div className="logo">AeroControl</div>
        <div className="logo-sub">Fleet Operations</div>
      </div>
      <div className="nav-menu">
        <div className="nav-item active">
          <MdFlightTakeoff /> Fleet Management
        </div>
        <div className="nav-item">
          <MdBarChart /> Reports
        </div>
      </div>
      <div className="sidebar-footer">
        <div className="sidebar-footer-item">
          <MdLogout /> Sign Out
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
