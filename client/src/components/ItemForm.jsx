import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const defaultForm = {
  title: '',
  description: '',
  isActive: true,
};

const ItemForm = ({ onSubmit, selectedItem, onCancel, isLoading }) => {
  const [formData, setFormData] = useState(defaultForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedItem) {
      setFormData({
        title: selectedItem.title || '',
        description: selectedItem.description || '',
        isActive: Boolean(selectedItem.isActive),
      });
    } else {
      setFormData(defaultForm);
    }
  }, [selectedItem]);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    const wasEditing = Boolean(selectedItem);
    onSubmit(formData)
      .then(() => {
        if (!wasEditing) {
          setFormData(defaultForm);
        }
      })
      .catch(() => {
        // parent component already surfaces the error message
      });
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>{selectedItem ? 'Edit item' : 'Add new item'}</h2>

      <label>
        Title*
        <input
          type="text"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder="Enter title"
        />
        {errors.title && <p className="error-text">{errors.title}</p>}
      </label>

      <label>
        Description
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          placeholder="Optional description"
          rows={3}
        />
      </label>

      <label className="checkbox">
        <input
          type="checkbox"
          checked={formData.isActive}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, isActive: e.target.checked }))
          }
        />
        Active
      </label>

      <div className="form-actions">
        {selectedItem && (
          <button
            type="button"
            className="classy-button createButton"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
        )}
        <button type="submit" disabled={isLoading} className="classy-button createButton">
          {isLoading ? 'Saving...' : selectedItem ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};

ItemForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  selectedItem: PropTypes.object,
  onCancel: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default ItemForm;

