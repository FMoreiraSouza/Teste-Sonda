import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { login } from "../api/authService";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/fleet");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await login(username, password);
      localStorage.setItem("token", data.token);
      navigate("/fleet");
    } catch (err) {
      setError(err.response?.data?.message || "Credenciais inválidas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.logoArea}>
          <h1>AeroControl</h1>
          <p>Mission Control & Fleet Operations</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={styles.loginButton}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
          {error && <div className={styles.error}>{error}</div>}
        </form>
        <div className={styles.registerLink}>
          <Link to="/register">Criar Conta</Link>
        </div>
        <div className={styles.footer}>
          <span>Engenharia em Movimento</span>
        </div>
      </div>
    </div>
  );
}
