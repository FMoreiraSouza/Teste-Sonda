import { useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import Home from "./features/home/pages/Home";
import Toast from "./components/common/Toast";
import styles from "./App.module.css";

function App() {
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
  };

  return (
    <div className={styles["app-container"]}>
      <Sidebar />
      <div className={styles["main-content"]}>
        <Home onToast={showToast} />
      </div>
      <Toast message={toastMessage} onClose={() => setToastMessage("")} />
    </div>
  );
}

export default App;
