import PropTypes from 'prop-types';

const Pagination = ({ page, totalPages, onChange, limit, onLimitChange }) => {
  return (
    <div className="pagination">
      <div className="page-controls">
        <button 
          className="classy-button"
          onClick={() => onChange(page - 1)} 
          disabled={page <= 1}
        >
          Previous
        </button>
        <sup>
          Page {page} of {totalPages}
        </sup>
        <button
          className="classy-button"
          onClick={() => onChange(page + 1)}
          disabled={page >= totalPages}
        >
          Next
        </button>
      </div>
      <label className='flex'>
        <sup>Items per page</sup>
        <select
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
        >
          {[5, 10, 20].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  limit: PropTypes.number.isRequired,
  onLimitChange: PropTypes.func.isRequired,
};

export default Pagination;

