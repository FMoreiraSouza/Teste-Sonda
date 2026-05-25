import { useState } from "react";
import FleetStats from "../../home/components/FleetStats";
import Fleet from "../../home/components/Fleet";
import AircraftFormModal from "../../home/components/AircraftFormModal";
import { useFleetData } from "../hooks/useFleetData";
import { createAircraft } from "../../../services/aircraftService";
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
    refresh,
  } = useFleetData();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingAircraft, setEditingAircraft] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    resetPage();
  };

  const handleCreate = () => {
    setEditingAircraft(null);
    setModalOpen(true);
  };

  const handleEdit = (aircraft) => {
    setEditingAircraft(aircraft);
    setModalOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    setSubmitting(true);
    try {
      if (editingAircraft) {
        onToast(
          `Edição da aeronave ${editingAircraft.prefix} (API ainda não implementada)`,
        );
      } else {
        const payload = {
          name: formData.name,
          brand: formData.brand,
          year: parseInt(formData.year),
          description: formData.description,
          sold: formData.sold,
          icaoCode: formData.icaoCode,
          fuelCapacity: parseFloat(formData.fuelCapacity),
          averageConsumption: parseFloat(formData.averageConsumption),
        };
        await createAircraft(payload);
        onToast(`Aeronave "${formData.name}" criada com sucesso!`);
        await refresh();
      }
      setModalOpen(false);
      setEditingAircraft(null);
    } catch (error) {
      console.error(error);
      onToast(error.response?.data?.message || "Erro ao salvar aeronave");
    } finally {
      setSubmitting(false);
    }
  };

  const handleView = (aircraft) => {
    onToast(`Visualizando ${aircraft.prefix} - ${aircraft.model}`);
  };

  const handleDelete = (aircraft) => {
    onToast(`Exclusão de ${aircraft.prefix} (API ainda não implementada)`);
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

      <AircraftFormModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingAircraft(null);
        }}
        onSubmit={handleFormSubmit}
        initialData={editingAircraft}
        isSubmitting={submitting}
      />
    </>
  );
};

export default Home;
