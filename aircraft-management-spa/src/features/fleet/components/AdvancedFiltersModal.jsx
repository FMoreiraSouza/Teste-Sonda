import { useState } from "react";
import styles from "./AdvancedFiltersModal.module.css";

export default function AdvancedFiltersModal({ isOpen, onClose, onApply }) {
  const [filters, setFilters] = useState({
    name: "",
    brand: "",
    year: "",
    decade: "",
    createdAfter: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v !== "" && v !== null),
    );
    onApply(cleanFilters);
    onClose();
  };

  const handleClear = () => {
    setFilters({ name: "", brand: "", year: "", decade: "", createdAfter: "" });
    onApply({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>Filtros Avançados</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Nome</label>
            <input
              type="text"
              name="name"
              placeholder="Ex: Boeing 737"
              value={filters.name}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Fabricante</label>
            <input
              type="text"
              name="brand"
              placeholder="Ex: Boeing"
              value={filters.brand}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Ano</label>
            <input
              type="number"
              name="year"
              placeholder="2020"
              value={filters.year}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Década</label>
            <input
              type="number"
              name="decade"
              placeholder="1990, 2000, 2010..."
              value={filters.decade}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Criado após (data)</label>
            <input
              type="date"
              name="createdAfter"
              value={filters.createdAfter}
              onChange={handleChange}
            />
          </div>
          <div className={styles.modalActions}>
            <button type="submit">Aplicar</button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
