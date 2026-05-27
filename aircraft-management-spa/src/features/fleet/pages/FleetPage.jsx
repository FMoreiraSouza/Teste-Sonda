import { useState } from "react";
import { useFleetData } from "../hooks/useFleetData";
import FleetStats from "../components/FleetStats";
import Fleet from "../components/Fleet";
import AircraftFormModal from "../components/AircraftFormModal";
import ViewAircraftModal from "../components/ViewAircraftModal";
import AdvancedFiltersModal from "../components/AdvancedFiltersModal";
import {
  createAircraft,
  updateAircraft,
  deleteAircraft,
} from "../api/aircraftService";
import { uploadImage } from "../api/uploadService";
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
    error,
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

  const handleUpload = async (aircraft) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        await uploadImage(aircraft.id, file);
        onToast?.(`Imagem enviada com sucesso para ${aircraft.name}`);
        await refresh();
      } catch (err) {
        console.error(err);
        onToast?.(err.response?.data?.message || "Erro ao enviar imagem");
      }
    };
    input.click();
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
    } catch (err) {
      console.error(err);
      onToast?.(err.response?.data?.message || "Erro ao salvar aeronave");
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
      } catch (err) {
        console.error(err);
        onToast?.(err.response?.data?.message || "Erro ao excluir aeronave");
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

  const handleRetry = () => {
    resetSearch();
  };

  return (
    <>
      <div className={styles["top-header"]}>
        <div className={styles.breadcrumb}>
          <span>GERENCIAMENTO DE FROTA</span>
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
          onUpload={handleUpload}
          onOpenFilters={() => setFiltersModalOpen(true)}
          error={error}
          loading={loading}
          onRetry={handleRetry}
        />
      </div>

      <div className={styles["app-footer"]}>
        <div>© 2026 AeroControl. Todos os direitos reservados.</div>
        <div className={styles["footer-links"]}>
          <span>Política de Privacidade</span>
          <span>Termos de Uso</span>
          <span>Conformidade Regulatória</span>
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
