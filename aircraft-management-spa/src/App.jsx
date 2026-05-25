import { useState } from "react";
import "./App.css";
import Sidebar from "./components/layout/Sidebar";
import Home from "./pages/Home";
import Toast from "./components/common/Toast";

function App() {
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Home onToast={showToast} />
      </div>
      <Toast message={toastMessage} onClose={() => setToastMessage("")} />
    </div>
  );
}

export default App;
