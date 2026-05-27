import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import MainLayout from "../components/layout/MainLayout";
import FleetPage from "../features/fleet/pages/FleetPage";
import ReportsPage from "../features/reports/pages/ReportsPage";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

export default function AppRoutes({ onToast }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/fleet"
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<FleetPage onToast={onToast} />} />
        </Route>
        <Route
          path="/reports"
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<ReportsPage onToast={onToast} />} />
        </Route>
        <Route path="/" element={<Navigate to="/fleet" />} />
      </Routes>
    </BrowserRouter>
  );
}
