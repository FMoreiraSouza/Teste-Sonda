import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";

export default function MainLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar onLogout={handleLogout} />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
}
