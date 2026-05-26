import FleetTable from "./FleetTable";
import Pagination from "../../../components/common/Pagination";
import { FiPlus, FiFilter } from "react-icons/fi";
import styles from "./Fleet.module.css";

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
  onUpload,
  onDelete,
  onOpenFilters,
}) => {
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, filteredCount);

  return (
    <>
      <div className={styles["fleet-header"]}>
        <div className={styles["fleet-title"]}>
          <h2>FLEET CONTROL</h2>
          <p>
            Real-time status and operational lifecycle management for your
            active fleet.
          </p>
        </div>
        <div className={styles["filter-area"]}>
          <input
            type="text"
            className={styles["filter-input"]}
            placeholder="Filtrar por prefixo ou modelo..."
            value={searchTerm}
            onChange={onSearchChange}
          />
          <button className={styles["filter-btn"]} onClick={onOpenFilters}>
            <FiFilter /> Filtros
          </button>
          <button className={styles["btn-primary"]} onClick={onCreate}>
            <FiPlus /> CRIAR NOVA AERONAVE
          </button>
        </div>
      </div>

      <div className={styles["table-container"]}>
        <FleetTable
          aircraft={paginatedData}
          onView={onView}
          onEdit={onEdit}
          onUpload={onUpload}
          onDelete={onDelete}
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
    </>
  );
};

export default Fleet;
