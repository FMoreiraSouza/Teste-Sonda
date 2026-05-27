import styles from "./ViewAircraftModal.module.css";

export default function ViewAircraftModal({ isOpen, onClose, aircraft }) {
  if (!isOpen || !aircraft) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>Detalhes da Aeronave</h2>
        <div className={styles.detailsGrid}>
          <div className={styles.detailItem}>
            <strong>Nome:</strong> {aircraft.name || "-"}
          </div>
          <div className={styles.detailItem}>
            <strong>Marca:</strong> {aircraft.brand || "-"}
          </div>
          <div className={styles.detailItem}>
            <strong>Ano:</strong> {aircraft.year || "-"}
          </div>
          <div className={styles.detailItem}>
            <strong>Código ICAO:</strong> {aircraft.icaoCode || "-"}
          </div>
          <div className={styles.detailItem}>
            <strong>Status:</strong> {aircraft.sold ? "Vendido" : "Ativo"}
          </div>
          <div className={styles.detailItem}>
            <strong>Capacidade (L):</strong> {aircraft.fuelCapacity ?? "-"}
          </div>
          <div className={styles.detailItem}>
            <strong>Consumo (km/L):</strong>{" "}
            {aircraft.averageConsumption ?? "-"}
          </div>
          <div className={styles.detailItem}>
            <strong>Autonomia (km):</strong> {aircraft.range ?? "-"}
          </div>
          <div className={styles.detailItem}>
            <strong>Categoria:</strong> {aircraft.rangeCategory || "-"}
          </div>
          <div className={styles.detailItem}>
            <strong>Descrição:</strong> {aircraft.description || "-"}
          </div>
          <div className={styles.detailItem}>
            <strong>Data de Criação:</strong>{" "}
            {aircraft.createdAt
              ? new Date(aircraft.createdAt).toLocaleString()
              : "-"}
          </div>
          <div className={styles.detailItem}>
            <strong>Imagem:</strong>
            {aircraft.imageUrl ? (
              <a
                href={aircraft.imageUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={aircraft.imageUrl}
                  alt={aircraft.name}
                  className={styles.thumbnail}
                />
              </a>
            ) : (
              " Nenhuma imagem"
            )}
          </div>
        </div>
        <div className={styles.modalActions}>
          <button onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
}
