import React, { useState } from 'react';

const EditItemModal = ({ editItem, setEditItem, handleUpdateItem, setIsEditItemModalOpen, error, loading }) => {
  const [fieldErrors, setFieldErrors] = useState({});

  const validateFields = () => {
    const errors = {};
    const trimmedItemName = editItem.itemName.trim();
    const trimmedCategory = editItem.category.trim();

    if (!trimmedItemName) {
      errors.itemName = 'Item name is required';
    } else if (trimmedItemName.length > 50) {
      errors.itemName = 'Item name must be 50 characters or less';
    }

    if (!trimmedCategory) {
      errors.category = 'Category is required';
    } else if (trimmedCategory.length > 50) {
      errors.category = 'Category must be 50 characters or less';
    }

    if (editItem.quantity < 1) {
      errors.quantity = 'Quantity must be at least 1';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateFields()) {
      handleUpdateItem();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-xl font-semibold text-teal-800 mb-6">Edit Item</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Item Name</label>
          <input
            type="text"
            value={editItem.itemName}
            onChange={(e) => setEditItem({ ...editItem, itemName: e.target.value })}
            className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${
              fieldErrors.itemName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-teal-500'
            }`}
          />
          {fieldErrors.itemName && <p className="text-red-500 text-sm mt-1">{fieldErrors.itemName}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Category</label>
          <input
            type="text"
            value={editItem.category}
            onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}
            className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${
              fieldErrors.category ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-teal-500'
            }`}
          />
          {fieldErrors.category && <p className="text-red-500 text-sm mt-1">{fieldErrors.category}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Quantity</label>
          <input
            type="number"
            value={editItem.quantity}
            onChange={(e) => setEditItem({ ...editItem, quantity: parseInt(e.target.value) || 1 })}
            className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${
              fieldErrors.quantity ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-teal-500'
            }`}
            min="1"
          />
          {fieldErrors.quantity && <p className="text-red-500 text-sm mt-1">{fieldErrors.quantity}</p>}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">Unit</label>
          <select
            value={editItem.unit}
            onChange={(e) => setEditItem({ ...editItem, unit: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="pieces">Pieces</option>
            <option value="kilograms">Kilograms</option>
            <option value="liters">Liters</option>
            <option value="packs">Packs</option>
          </select>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setIsEditItemModalOpen(false)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Item'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditItemModal;