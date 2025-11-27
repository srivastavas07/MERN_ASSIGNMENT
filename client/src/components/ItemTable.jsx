import PropTypes from 'prop-types';

const ItemTable = ({
  items,
  onEdit,
  onDelete,
  isProcessing,
  sort,
  onSortChange,
  search,
  onSearchChange,
}) => {

  return (
    <div className="card">
      <div className="table-header">
        <h2>Items</h2>
        <div className="table-controls">
          <input
            type="text"
            placeholder="Search by title or description..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
            aria-label="Search items"
          />
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            aria-label="Sort items"
            className="selection-dropdown"
          >
            <option value="createdAt:desc">Newest first</option>
            <option value="createdAt:asc">Oldest first</option>
            <option value="title:asc">Title A-Z</option>
            <option value="title:desc">Title Z-A</option>
          </select>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan="5" className="empty">
                No items yet. Add your first entry above.
              </td>
            </tr>
          ) : (
            items.map((item) => (
              <tr key={item._id}>
                <td>{item.title}</td>
                <td>{item.description || '—'}</td>
                <td>
                  <span className={`badge ${item.isActive ? 'success' : ''}`}>
                    {item.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                <td className="actions">
                  <button
                    className="secondary whiteText"
                    onClick={() => onEdit(item)}
                    disabled={isProcessing}
                  >
                    Edit
                  </button>
                  <button
                    className="danger whiteText"
                    onClick={() => onDelete(item)}
                    disabled={isProcessing}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

ItemTable.propTypes = {
  items: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isProcessing: PropTypes.bool,
  sort: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
  search: PropTypes.string,
  onSearchChange: PropTypes.func.isRequired,
};

export default ItemTable;

