import FleetTable from "./FleetTable";
import Pagination from "../../../components/common/Pagination";
import { FiPlus } from "react-icons/fi";

const Fleet = ({
  paginatedData,
  filteredCount,
  currentPage,
  totalPages,
  pageSize,
  searchTerm,
  onSearchChange,
  onPageChange,
  onView,
  onEdit,
  onCreate,
}) => {
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, filteredCount);

  return (
    <>
      <div className="fleet-header">
        <div className="fleet-title">
          <h2>FLEET CONTROL</h2>
          <p>
            Real-time status and operational lifecycle management for your
            active fleet.
          </p>
        </div>
        <div className="filter-area">
          <input
            type="text"
            className="filter-input"
            placeholder="Filtrar por prefixo ou modelo..."
            value={searchTerm}
            onChange={onSearchChange}
          />
          <button className="btn-primary" onClick={onCreate}>
            <FiPlus /> CRIAR NOVA AERONAVE
          </button>
        </div>
      </div>

      <div className="two-columns">
        <div className="table-container">
          <FleetTable
            aircraft={paginatedData}
            onView={onView}
            onEdit={onEdit}
          />
          {filteredCount > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
              start={start}
              end={end}
              total={filteredCount}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Fleet;
