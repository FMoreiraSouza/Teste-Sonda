import { useState } from "react";
import FleetStats from "../../home/components/FleetStats";
import Fleet from "../../home/components/Fleet";
import AircraftFormModal from "../../home/components/AircraftFormModal";
import { useFleetData } from "../hooks/useFleetData";
import styles from "./Home.module.css";

const Home = ({ onToast }) => {
  const {
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    paginatedData,
    totalPages,
    filteredCount,
    stats,
    resetPage,
    pageSize,
  } = useFleetData();

  // Estado do modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAircraft, setEditingAircraft] = useState(null);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    resetPage();
  };

  // Abrir modal para criar nova aeronave
  const handleCreate = () => {
    setEditingAircraft(null);
    setModalOpen(true);
  };

  // Abrir modal para editar aeronave
  const handleEdit = (aircraft) => {
    setEditingAircraft(aircraft);
    setModalOpen(true);
  };

  // Simular salvamento (sem API)
  const handleFormSubmit = (formData) => {
    const message = editingAircraft
      ? `Aeronave ${editingAircraft.prefix} atualizada com sucesso (simulação)`
      : `Nova aeronave "${formData.name}" criada com sucesso (simulação)`;
    onToast(message);
    setModalOpen(false);
    setEditingAircraft(null);
  };

  const handleView = (aircraft) => {
    onToast(`Visualizando ${aircraft.prefix} - ${aircraft.model}`);
  };

  const handleDelete = (aircraft) => {
    onToast(`Aeronave ${aircraft.prefix} excluída (simulação).`);
  };

  return (
    <>
      <div className={styles["top-header"]}>
        <div className={styles.breadcrumb}>
          <span>FLEET MANAGEMENT</span>
        </div>
      </div>

      <div className={styles["dashboard-wrapper"]}>
        <FleetStats stats={stats} />

        <Fleet
          paginatedData={paginatedData}
          filteredCount={filteredCount}
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          searchTerm={searchTerm}
          onSearchChange={handleSearch}
          onPageChange={setCurrentPage}
          onView={handleView}
          onEdit={handleEdit}
          onCreate={handleCreate}
          onDelete={handleDelete}
        />
      </div>

      <div className={styles["app-footer"]}>
        <div>© 2026 AeroControl. All rights reserved.</div>
        <div className={styles["footer-links"]}>
          <span>Privacy Policy</span>
          <span>Terms of Use</span>
          <span>Regulatory Compliance</span>
        </div>
      </div>

      {/* Modal do formulário */}
      <AircraftFormModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingAircraft(null);
        }}
        onSubmit={handleFormSubmit}
        initialData={editingAircraft}
      />
    </>
  );
};

export default Home;
