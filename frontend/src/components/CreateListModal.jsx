import React, { useState } from 'react';

const CreateListModal = ({ newListTitle, setNewListTitle, handleCreateList, setIsCreateListModalOpen, error, loading }) => {
  const [fieldErrors, setFieldErrors] = useState({});

  const validateFields = () => {
    const errors = {};
    const trimmedTitle = newListTitle.trim();

    if (!trimmedTitle) {
      errors.title = 'List title is required';
    } else if (trimmedTitle.length > 50) {
      errors.title = 'List title must be 50 characters or less';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateFields()) {
      handleCreateList();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-xl font-semibold text-teal-800 mb-6">Create New Shopping List</h2>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">List Title</label>
          <input
            type="text"
            value={newListTitle}
            onChange={(e) => setNewListTitle(e.target.value)}
            className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${
              fieldErrors.title ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-teal-500'
            }`}
          />
          {fieldErrors.title && <p className="text-red-500 text-sm mt-1">{fieldErrors.title}</p>}
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setIsCreateListModalOpen(false)}
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
            {loading ? 'Creating...' : 'Create List'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateListModal;