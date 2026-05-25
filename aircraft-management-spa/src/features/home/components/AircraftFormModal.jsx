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
        name: initialData.name || "",
        brand: initialData.brand || "",
        year: initialData.year || new Date().getFullYear(),
        description: initialData.description || "",
        sold: initialData.sold || false,
        icaoCode: initialData.icaoCode || "",
        fuelCapacity: initialData.fuelCapacity || "",
        averageConsumption: initialData.averageConsumption || "",
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
            <div>
              <label>Nome*</label>
              <input
                name="name"
                placeholder="Ex: Boeing 737-800"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Marca*</label>
              <input
                name="brand"
                placeholder="Ex: Boeing"
                value={form.brand}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Ano*</label>
              <input
                name="year"
                type="number"
                placeholder="Ano"
                value={form.year}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>ICAO Code (4 letras)</label>
              <input
                name="icaoCode"
                placeholder="Ex: B738"
                value={form.icaoCode}
                onChange={handleChange}
                maxLength={4}
              />
            </div>
            <div>
              <label>Capacidade (L)*</label>
              <input
                name="fuelCapacity"
                type="number"
                step="any"
                placeholder="Ex: 26000"
                value={form.fuelCapacity}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Consumo (km/L)*</label>
              <input
                name="averageConsumption"
                type="number"
                step="any"
                placeholder="Ex: 0.18"
                value={form.averageConsumption}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.fullWidth}>
              <label>Descrição</label>
              <textarea
                name="description"
                placeholder="Descrição da aeronave"
                value={form.description}
                onChange={handleChange}
                rows="2"
              />
            </div>
            <div className={styles.fullWidth}>
              <div className={styles.fullWidth}>
                <label className={styles.checkboxLabel}>
                  <span>Vendido</span>
                  <input
                    type="checkbox"
                    name="sold"
                    checked={form.sold}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className={styles.modalActions}>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AircraftFormModal;
