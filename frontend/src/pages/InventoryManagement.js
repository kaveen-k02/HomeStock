import React, { useState } from 'react';
import InventoryList from '../components/InventoryList';
import InventoryForm from '../components/InventoryForm';

const InventoryManagement = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleSave = () => {
        setShowAddModal(false);
        setSelectedItem(null);
    };

    return (
        <div className="bg-primary min-h-screen w-full flex flex-col font-sans px-4 md:px-6 lg:px-10">
            <div className="container mx-auto py-6">
                {/* Inventory List Section */}
                <InventoryList
                    onEdit={(item) => {
                        setSelectedItem(item);
                        setShowAddModal(true);
                    }}
                />

                {/* Add/Edit Modal */}
                {showAddModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <InventoryForm
                            item={selectedItem}
                            onClose={() => {
                                setShowAddModal(false);
                                setSelectedItem(null);
                            }}
                            onSave={handleSave}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default InventoryManagement;