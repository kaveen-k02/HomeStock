import React, { useState, useEffect } from 'react';

const InventoryForm = ({ item = null, onClose, onSave }) => {
    const unitOptions = {
        'Weight Units': ['kg (kilograms)', 'g (grams)', 'lbs (pounds)', 'oz (ounces)'],
        'Volume Units': ['L (liters)', 'ml (milliliters)', 'gal (gallons)', 'fl oz (fluid ounces)'],
        'Count Units': ['pcs (pieces)', 'boxes', 'packets', 'units']
    };

    const [formData, setFormData] = useState({
        userName: '',
        productName: '',
        category: '',
        unit: '',
        purchasePrice: '',
        stock: [{ quantity: '', expiryDate: '' }]
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (item) {
            setFormData({
                ...item,
                stock: item.stock.length > 0 ? item.stock : [{ quantity: '', expiryDate: '' }]
            });
        }
    }, [item]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleStockChange = (index, field, value) => {
        const newStock = [...formData.stock];
        newStock[index] = {
            ...newStock[index],
            [field]: value
        };
        setFormData(prev => ({
            ...prev,
            stock: newStock
        }));
    };

    const addStockEntry = () => {
        setFormData(prev => ({
            ...prev,
            stock: [...prev.stock, { quantity: '', expiryDate: '' }]
        }));
    };

    const removeStockEntry = (index) => {
        if (formData.stock.length > 1) {
            setFormData(prev => ({
                ...prev,
                stock: prev.stock.filter((_, i) => i !== index)
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.userName) newErrors.userName = 'Username is required';
        if (!formData.productName) newErrors.productName = 'Product name is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.unit) newErrors.unit = 'Unit is required';
        if (!formData.purchasePrice) newErrors.purchasePrice = 'Purchase price is required';
        
        const stockErrors = formData.stock.some(entry => 
            !entry.quantity || !entry.expiryDate || entry.quantity <= 0
        );
        if (stockErrors) newErrors.stock = 'All stock entries must have valid quantity and expiry date';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const url = item 
                ? `http://localhost:8070/api/inventory/${item._id}` 
                : 'http://localhost:8070/api/inventory';
            const method = item ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const savedItem = await response.json();
            onSave(savedItem);
            onClose();
        } catch (error) {
            console.error('Error saving item:', error);
            setErrors({ submit: error.message || 'Failed to save item' });
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 pb-2 border-b-2 border-accent">
                <h2 className="text-2xl font-bold text-background">
                    {item ? 'Edit Inventory Item' : 'Add New Inventory Item'}
                </h2>
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-red-500 text-xl font-bold"
                >
                    ×
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-background mb-1">Username</label>
                        <input
                            type="text"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            className="w-full p-2 border-2 border-accent rounded-full focus:outline-none focus:border-background text-sm"
                        />
                        {errors.userName && <p className="text-red-500 text-xs mt-1">{errors.userName}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-background mb-1">Product Name</label>
                        <input
                            type="text"
                            name="productName"
                            value={formData.productName}
                            onChange={handleChange}
                            className="w-full p-2 border-2 border-accent rounded-full focus:outline-none focus:border-background text-sm"
                        />
                        {errors.productName && <p className="text-red-500 text-xs mt-1">{errors.productName}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-background mb-1">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full p-2 border-2 border-accent rounded-full focus:outline-none focus:border-background text-sm"
                        />
                        {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-background mb-1">Unit</label>
                        <select
                            name="unit"
                            value={formData.unit}
                            onChange={handleChange}
                            className="w-full p-2 border-2 border-accent rounded-full focus:outline-none focus:border-background text-sm"
                        >
                            <option value="">Select a unit</option>
                            {Object.entries(unitOptions).map(([category, units]) => (
                                <optgroup key={category} label={category}>
                                    {units.map(unit => (
                                        <option key={unit} value={unit}>
                                            {unit}
                                        </option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>
                        {errors.unit && <p className="text-red-500 text-xs mt-1">{errors.unit}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-background mb-1">Purchase Price</label>
                        <input
                            type="number"
                            name="purchasePrice"
                            value={formData.purchasePrice}
                            onChange={handleChange}
                            step="0.01"
                            min="0"
                            className="w-full p-2 border-2 border-accent rounded-full focus:outline-none focus:border-background text-sm"
                        />
                        {errors.purchasePrice && <p className="text-red-500 text-xs mt-1">{errors.purchasePrice}</p>}
                    </div>
                </div>

                <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-bold text-background">Stock Entries</label>
                        <button
                            type="button"
                            onClick={addStockEntry}
                            className="bg-accent text-white font-bold px-3 py-1 rounded-full hover:bg-teal-700 transition shadow-md text-sm"
                        >
                            Add Entry
                        </button>
                    </div>
                    
                    <div className="space-y-3">
                        {formData.stock.map((entry, index) => (
                            <div key={index} className="flex gap-3 items-center p-3 bg-gray-50 rounded-lg border border-accent">
                                <div className="flex-1">
                                    <label className="block text-xs font-medium text-background mb-1">Quantity</label>
                                    <input
                                        type="number"
                                        value={entry.quantity}
                                        onChange={(e) => handleStockChange(index, 'quantity', e.target.value)}
                                        min="1"
                                        className="w-full p-2 border-2 border-accent rounded-full focus:outline-none focus:border-background text-sm"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-xs font-medium text-background mb-1">Expiry Date</label>
                                    <input
                                        type="date"
                                        value={entry.expiryDate.split('T')[0]}
                                        onChange={(e) => handleStockChange(index, 'expiryDate', e.target.value)}
                                        className="w-full p-2 border-2 border-accent rounded-full focus:outline-none focus:border-background text-sm"
                                    />
                                </div>
                                {formData.stock.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeStockEntry(index)}
                                        className="bg-red-500 text-white font-bold p-2 rounded-full hover:bg-red-600 transition shadow-md text-sm mt-5"
                                    >
                                        ×
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock}</p>}
                </div>

                {errors.submit && <p className="text-red-500 text-xs mt-2">{errors.submit}</p>}

                <div className="flex justify-end gap-3 mt-4 pt-2 border-t border-gray-200">
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-white text-accent font-bold border-2 border-accent px-4 py-2 rounded-full hover:bg-gray-100 transition shadow-md text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-accent text-white font-bold px-4 py-2 rounded-full hover:bg-teal-700 transition shadow-md text-sm"
                    >
                        {item ? 'Update' : 'Add'} Item
                    </button>
                </div>
            </form>
        </div>
    );
};

export default InventoryForm;