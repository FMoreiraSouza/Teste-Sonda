import { useState } from "react";
import { useFleetData } from "../features/fleet/hooks/useFleetData";
import FleetStats from "../features/fleet/components/FleetStats";
import Fleet from "../features/fleet/components/Fleet";
import AircraftFormModal from "../features/fleet/components/AircraftFormModal";
import ViewAircraftModal from "../features/fleet/components/ViewAircraftModal";
import AdvancedFiltersModal from "../features/fleet/components/AdvancedFiltersModal";
import {
  createAircraft,
  updateAircraft,
  deleteAircraft,
} from "../features/fleet/api/aircraftService";
import styles from "./FleetPage.module.css";

export default function FleetPage({ onToast }) {
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
    performSearch,
    resetSearch,
    loading,
  } = useFleetData();

  const [modalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editingAircraft, setEditingAircraft] = useState(null);
  const [viewingAircraft, setViewingAircraft] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [filtersModalOpen, setFiltersModalOpen] = useState(false);

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

  const handleView = (aircraft) => {
    setViewingAircraft(aircraft);
    setViewModalOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    setSubmitting(true);
    try {
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
      if (editingAircraft) {
        await updateAircraft(editingAircraft.id, payload);
        onToast?.(`Aeronave "${formData.name}" atualizada com sucesso!`);
      } else {
        await createAircraft(payload);
        onToast?.(`Aeronave "${formData.name}" criada com sucesso!`);
      }
      await refresh();
      setModalOpen(false);
      setEditingAircraft(null);
    } catch (error) {
      console.error(error);
      onToast?.(error.response?.data?.message || "Erro ao salvar aeronave");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (aircraft) => {
    if (
      window.confirm(
        `Tem certeza que deseja excluir a aeronave ${aircraft.name}?`,
      )
    ) {
      try {
        await deleteAircraft(aircraft.id);
        onToast?.(`Aeronave ${aircraft.name} excluída com sucesso!`);
        await refresh();
      } catch (error) {
        console.error(error);
        onToast?.(error.response?.data?.message || "Erro ao excluir aeronave");
      }
    }
  };

  const handleApplyFilters = (filters) => {
    if (Object.keys(filters).length === 0) {
      resetSearch();
    } else {
      performSearch(filters);
    }
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
          onOpenFilters={() => setFiltersModalOpen(true)}
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

      <ViewAircraftModal
        isOpen={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false);
          setViewingAircraft(null);
        }}
        aircraft={viewingAircraft}
      />

      <AdvancedFiltersModal
        isOpen={filtersModalOpen}
        onClose={() => setFiltersModalOpen(false)}
        onApply={handleApplyFilters}
      />
    </>
  );
}
