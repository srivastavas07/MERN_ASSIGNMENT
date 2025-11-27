const API_BASE = `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/items`;

const buildHeaders = () => ({
  'Content-Type': 'application/json',
});

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || 'Request failed');
  }
  return response.json();
};

export const fetchItems = async (params) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.append(key, value);
    }
  });
  const res = await fetch(`${API_BASE}?${query.toString()}`);
  return handleResponse(res);
};

export const createItem = async (payload) => {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: buildHeaders(),
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
};

export const updateItem = async (id, payload) => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: buildHeaders(),
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
};

export const deleteItem = async (id) => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(res);
};

