import { useState, useEffect } from "react";
import styles from "./AircraftFormModal.module.css";

const AircraftFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isSubmitting = false,
}) => {
  const [form, setForm] = useState({
    name: "",
    brand: "",
    year: new Date().getFullYear(),
    description: "",
    sold: false,
    icaoCode: "",
    fuelCapacity: "",
    averageConsumption: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.model || "",
        brand: "",
        year: new Date().getFullYear(),
        description: "",
        sold: false,
        icaoCode: "",
        fuelCapacity: "",
        averageConsumption: "",
      });
    } else {
      setForm({
        name: "",
        brand: "",
        year: new Date().getFullYear(),
        description: "",
        sold: false,
        icaoCode: "",
        fuelCapacity: "",
        averageConsumption: "",
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>{initialData ? "Editar Aeronave" : "Nova Aeronave"}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <input
              name="name"
              placeholder="Nome"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              name="brand"
              placeholder="Marca"
              value={form.brand}
              onChange={handleChange}
              required
            />
            <input
              name="year"
              type="number"
              placeholder="Ano"
              value={form.year}
              onChange={handleChange}
              required
            />
            <input
              name="icaoCode"
              placeholder="ICAO Code"
              value={form.icaoCode}
              onChange={handleChange}
              maxLength={4}
            />
            <input
              name="fuelCapacity"
              type="number"
              step="any"
              placeholder="Capacidade (L)"
              value={form.fuelCapacity}
              onChange={handleChange}
              required
            />
            <input
              name="averageConsumption"
              type="number"
              step="any"
              placeholder="Consumo (km/L)"
              value={form.averageConsumption}
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              placeholder="Descrição"
              value={form.description}
              onChange={handleChange}
              rows="2"
            />
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="sold"
                checked={form.sold}
                onChange={handleChange}
              />
              Vendido
            </label>
          </div>
          <div className={styles.modalActions}>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salvar"}
            </button>{" "}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AircraftFormModal;
