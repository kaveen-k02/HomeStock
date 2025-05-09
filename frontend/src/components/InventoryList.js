import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { format } from 'date-fns'; // Use the format from date-fns directly
import { jsPDF } from "jspdf";  
import 'jspdf-autotable';  
import InventoryForm from './InventoryForm';

const InventoryList = ({ onEdit }) => {
    const [inventory, setInventory] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [totalValue, setTotalValue] = useState(0);
    const [showAddModal, setShowAddModal] = useState(false);
    
    const fetchInventory = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:8070/inventory');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setInventory(data);
            
            // Extract unique categories
            const uniqueCategories = [...new Set(data.map(item => item.category))];
            setCategories(uniqueCategories);
        } catch (error) {
            console.error('Error fetching inventory:', error);
            setInventory([]);
        }
    }, []);

    useEffect(() => {
        fetchInventory();
    }, [fetchInventory]);

    // Filter inventory items based on search and category
    const filteredInventory = useMemo(() => {
        return inventory.filter(item => {
            const matchesSearch = search.trim() === '' ||
                item.productName.toLowerCase().includes(search.toLowerCase()) ||
                item.category.toLowerCase().includes(search.toLowerCase());
                
            const matchesCategory = category === '' || item.category === category;

            return matchesSearch && matchesCategory;
        });
    }, [inventory, search, category]);

    // Calculate total value of filtered items
    useEffect(() => {
        const total = filteredInventory.reduce((sum, item) => sum + item.totalValue, 0);
        setTotalValue(total);
    }, [filteredInventory]);

    const handleExport = async () => {
        try {
            const doc = new jsPDF();
            
            // Add title
            doc.setFontSize(20);
            doc.text('Inventory Report', 14, 15);
            doc.setFontSize(12);
            doc.text(`Generated on: ${format(new Date(), 'MMMM d, yyyy')}`, 14, 25);
            doc.text(`Total Value: $${totalValue.toFixed(2)}`, 14, 35);

            // Prepare table data
            const tableData = filteredInventory.map(item => [
                item.productName,
                item.category,
                item.expiryDate ? format(new Date(item.expiryDate), 'MMMM d, yyyy') : 'N/A',
                item.totalQuantity.toString(),
                item.unit,
                `$${item.totalValue.toFixed(2)}`
            ]);

            // Add table
            doc.autoTable({
                startY: 45,
                head: [['Product Name', 'Category','Expired Date', 'Total Quantity', 'Unit', 'Value']],
                body: tableData,
                theme: 'striped',
                headStyles: { fillColor: [0, 128, 128] },
                styles: { fontSize: 10 }
            });

            // Save PDF
            doc.save(`inventory-report-${format(new Date(), 'yyyy-MM-dd')}.pdf`);
        } catch (error) {
            console.error('Error exporting inventory:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                const response = await fetch(`http://localhost:8070/inventory/${id}`, { 
                    method: 'DELETE'
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                await fetchInventory();
            } catch (error) {
                console.error('Error deleting item:', error);
            }
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A'; 
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'short', 
            year: 'numeric',  
            month: 'long',    
            day: 'numeric'    
        });
    };

    const handleSave = async (savedItem) => {
        await fetchInventory();
        setShowAddModal(false);
    };

    return (
        <div className="bg-primary min-h-screen p-6">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-8 bg-background rounded-lg p-6 shadow-lg">
                <h1 className="text-3xl font-bold text-white">Inventory Management</h1>
                <div className="flex gap-4">
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="bg-accent text-white font-bold px-5 py-3 rounded-full hover:bg-teal-700 transition shadow-lg text-lg"
                    >
                        Add New Item
                    </button>
                    <button
                        onClick={handleExport}
                        className="bg-white text-accent font-bold border-4 border-accent px-5 py-3 rounded-full hover:bg-gray-100 transition shadow-lg text-lg"
                    >
                        Export PDF
                    </button>
                </div>
            </div>

            {/* Search and Filter Section */}
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8 border-4 border-accent">
                <div className="flex flex-col md:flex-row gap-4">
                    <input
                        type="text"
                        placeholder="Search by product name or category..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 p-3 border-2 border-accent rounded-full focus:outline-none focus:border-background"
                    />
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="md:w-1/4 p-3 border-2 border-accent rounded-full focus:outline-none focus:border-background"
                    >
                        <option value="">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Total Value Display */}
            <div className="bg-background text-white p-6 rounded-lg shadow-lg mb-8">
                <span className="text-2xl font-bold">Total Inventory Value: </span>
                <span className="text-2xl">${totalValue.toFixed(2)}</span>
            </div>

            {/* Inventory Table */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border-4 border-accent">
                <table className="min-w-full divide-y divide-accent">
                    <thead className="bg-background">
                        <tr>
                            <th className="px-6 py-4 text-left text-lg font-bold text-white">Product Name</th>
                            <th className="px-6 py-4 text-left text-lg font-bold text-white">Category</th>
                            <th className="px-6 py-4 text-left text-lg font-bold text-white whitespace-nowrap">Expired Date</th>
                            <th className="px-6 py-4 text-left text-lg font-bold text-white">Total Quantity</th>
                            <th className="px-6 py-4 text-left text-lg font-bold text-white">Unit</th>
                            <th className="px-6 py-4 text-left text-lg font-bold text-white">Value</th>
                            <th className="px-6 py-4 text-left text-lg font-bold text-white">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-accent">
                        {filteredInventory.map((item) => (
                            <tr 
                                key={item._id} 
                                className="hover:bg-gray-50 transition-colors duration-200"
                            >
                                <td className="px-6 py-4 text-accent font-semibold">{item.productName}</td>
                                <td className="px-6 py-4 text-accent">{item.category}</td>
                                <td className="px-6 py-4 text-accent whitespace-nowrap">{item.stock[0]?.expiryDate ? formatDate(item.stock[0].expiryDate) : 'N/A'}</td>
                                <td className="px-6 py-4 text-accent">{item.totalQuantity}</td>
                                <td className="px-6 py-4 text-accent">{item.unit}</td>
                                <td className="px-6 py-4 text-accent">${item.totalValue.toFixed(2)}</td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => onEdit(item)}
                                            className="bg-accent text-white font-bold px-3 py-2 rounded-full hover:bg-teal-700 transition shadow-md"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="bg-red-500 text-white font-bold px-3 py-2 rounded-full hover:bg-red-600 transition shadow-md"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <InventoryForm 
                        onClose={() => setShowAddModal(false)}
                        onSave={handleSave}
                    />
                </div>
            )}
        </div>
    );
};

export default InventoryList;
