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
  error,
  loading,
  onRetry, // nova prop
}) => {
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, filteredCount);

  if (loading) {
    return (
      <div
        className={styles["table-container"]}
        style={{ textAlign: "center" }}
      >
        Carregando dados da frota...
      </div>
    );
  }

  return (
    <>
      <div className={styles["fleet-header"]}>
        <div className={styles["fleet-title"]}>
          <h2>CONTROLE DE FROTA</h2>
          <p>
            Gerenciamento do ciclo de vida e status em tempo real da sua frota
            ativa.
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
        {error ? (
          <div className={styles.errorContainer}>
            <p className={styles.errorMessage}>⚠️ {error}</p>
            <button onClick={onRetry} className={styles.retryButton}>
              Tentar novamente
            </button>
          </div>
        ) : (
          <>
            <FleetTable
              aircraft={paginatedData}
              error={error}
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
          </>
        )}
      </div>
    </>
  );
};

export default Fleet;
