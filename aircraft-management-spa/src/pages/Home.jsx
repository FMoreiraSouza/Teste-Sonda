import { useFleetData } from "../features/fleet/hooks/useFleetData";
import FleetStats from "../features/fleet/components/FleetStats";
import Fleet from "../features/fleet/components/Fleet";

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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    resetPage();
  };

  const handleCreate = () => {
    onToast("Ação concluída com sucesso. (Simulação: nova aeronave)");
  };

  const handleView = (aircraft) => {
    onToast(`Visualizando ${aircraft.prefix} - ${aircraft.model}`);
  };

  const handleEdit = (aircraft) => {
    onToast(`Edição da aeronave ${aircraft.prefix} iniciada com sucesso.`);
  };

  return (
    <>
      <div className="top-header">
        <div className="breadcrumb">
          <span>FLEET MANAGEMENT</span>
        </div>
      </div>

      <div className="dashboard-wrapper">
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
        />
      </div>

      <div className="app-footer">
        <div>© 2026 AeroControl. All rights reserved.</div>
        <div className="footer-links">
          <span>Privacy Policy</span>
          <span>Terms of Use</span>
          <span>Regulatory Compliance</span>
        </div>
      </div>
    </>
  );
};

export default Home;
