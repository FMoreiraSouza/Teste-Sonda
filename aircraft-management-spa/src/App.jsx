import { useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import Toast from "./components/common/Toast";
import "./index.css";

function App() {
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => setToastMessage(msg);
  const closeToast = () => setToastMessage("");

  return (
    <>
      <AppRoutes onToast={showToast} />
      <Toast message={toastMessage} onClose={closeToast} />
    </>
  );
}

export default App;
