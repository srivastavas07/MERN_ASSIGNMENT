import { useCallback, useEffect, useState } from 'react';
import './App.css';
import ItemForm from './components/ItemForm';
import ItemTable from './components/ItemTable';
import Pagination from './components/Pagination';
import { createItem, deleteItem, fetchItems, updateItem } from './services/itemService';

function App() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [sort, setSort] = useState('createdAt:desc');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState(null);

  // Debounce search input - wait 500ms after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset to page 1 when search changes
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const loadItems = useCallback(async () => {
    setLoading(true);
    setMessage(null);
    try {
      const params = { page, limit, sort };
      if (debouncedSearch.trim()) {
        params.search = debouncedSearch.trim();
      }
      const data = await fetchItems(params);
      setItems(data.data);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  }, [page, limit, sort, debouncedSearch]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const handleSave = async (formData) => {
    setProcessing(true);
    try {
      if (selectedItem) {
        await updateItem(selectedItem._id, formData);
        setMessage({ type: 'success', text: 'Item updated successfully' });
      } else {
        await createItem(formData);
        setMessage({ type: 'success', text: 'Item created successfully' });
      }
      setSelectedItem(null);
      await loadItems();
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setProcessing(false);
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete "${item.title}"?`)) {
      return;
    }
    setProcessing(true);
    try {
      await deleteItem(item._id);
      setMessage({ type: 'success', text: 'Item deleted' });
      if (items.length === 1 && page > 1) {
        setPage((prev) => prev - 1);
      } else {
        await loadItems();
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setProcessing(false);
    }
  };

  const handlePageChange = (nextPage) => {
    if (nextPage < 1 || nextPage > totalPages) return;
    setPage(nextPage);
  };

  const handleLimitChange = (value) => {
    setLimit(value);
    setPage(1);
  };

  const handleSortChange = (value) => {
    setSort(value);
    setPage(1);
  };

  const handleSearchChange = (value) => {
    setSearch(value);
    // Page reset is handled in the debounce effect
  };

  return (
    <div className="app">
      <header>
        <div>
          <h1>MERN CRUD Items</h1>
          <p>Quick demo with pagination, limit and sorting.</p>
        </div>
        <div className='bodyDiv'>
          <section class="page">
            <div class="styled-button">
              <button class="button" id="kunal" ><span class="text">Kunal here!</span></button>
              <span class="border" id="kajal">Kunal here!</span>

            </div>
          </section>
        </div>
        <div className='bodyDiv'>
          <section class="page">
            <div class="styled-button">
              <button class="button" id="kunal" ><span class="text">Kunal here!</span></button>
              <span class="border" id="kajal">Kunal here!</span>

            </div>
          </section>
        </div>

      </header>

      {message && (
        <div className={`alert ${message.type === 'error' ? 'danger' : 'success'}`}>
          {message.text}
        </div>
      )}

      <div className="layout">
        <ItemForm
          onSubmit={handleSave}
          selectedItem={selectedItem}
          onCancel={() => setSelectedItem(null)}
          isLoading={processing}
        />

        <div className="list-section">
          {loading ? (
            <div className="card">Loading items...</div>
          ) : (
            <>
              <ItemTable
                items={items}
                onEdit={(item) => setSelectedItem(item)}
                onDelete={handleDelete}
                isProcessing={processing}
                sort={sort}
                onSortChange={handleSortChange}
                search={search}
                onSearchChange={handleSearchChange}
              />
              <Pagination
                page={page}
                totalPages={totalPages}
                onChange={handlePageChange}
                limit={limit}
                onLimitChange={handleLimitChange}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
