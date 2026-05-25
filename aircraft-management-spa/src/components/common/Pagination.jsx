const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  start,
  end,
  total,
}) => {
  return (
    <div className="pagination">
      <span>
        Mostrando {start}-{end} de {total} aeronaves
      </span>
      <div className="pagination-controls">
        <button
          className="page-btn"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Anterior
        </button>
        <button
          className="page-btn"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Próximo
        </button>
      </div>
    </div>
  );
};

export default Pagination;
