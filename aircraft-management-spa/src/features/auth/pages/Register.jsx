import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../../services/authService";
import styles from "./Register.module.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await register(username, password);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao registrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerCard}>
        <h1>Criar Conta</h1>
        <p>Preencha os dados para se registrar</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirmar Senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Registrando..." : "Registrar"}
          </button>
          {error && <div className={styles.error}>{error}</div>}
          {success && (
            <div className={styles.success}>
              Conta criada! Redirecionando...
            </div>
          )}
        </form>
        <div className={styles.loginLink}>
          <Link to="/login">Já tem conta? Faça login</Link>
        </div>
      </div>
    </div>
  );
}
