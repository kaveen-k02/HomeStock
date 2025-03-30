import React, { useState, useEffect, useMemo } from 'react';
import { format } from 'date-fns';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import {motion} from 'framer-motion';

import mockWastageData from '../data/mockWastageData';
import WastageChart from '../components/WastageChart';
import WastageForm from '../components/WastageForm';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import Tips from '../components/Tips';
import WastageSummary from '../components/WastageSummary';


const WastageTracker = () => {
    const [wastageData, setWastageData] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [showChart, setShowChart] = useState(false);
    const [openForm, setOpenForm] = useState(false);

    useEffect(() => {
        setWastageData(mockWastageData);
        const uniqueCategories = [...new Set(mockWastageData.map(item => item.category))];
        setCategories(uniqueCategories);
    }, []);

    const filteredWastage = useMemo(() => {
        return wastageData.filter(item => {
            const matchesSearch = search.trim() === '' ||
                item.product.toLowerCase().includes(search.toLowerCase()) ||
                item.category.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = category === '' || item.category === category;
            return matchesSearch && matchesCategory;
        });
    }, [wastageData, search, category]);

    const handleExport = () => {
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text('Wastage Report', 14, 15);
        doc.setFontSize(12);
        doc.text(`Generated on: ${format(new Date(), 'MMMM d, yyyy')}`, 14, 25);

        const tableData = filteredWastage.map(item => [
            item.product, item.category, item.wasted, item.unit, item.date
        ]);

        autoTable(doc, {
            startY: 35,
            head: [['Product', 'Category', 'Wasted Quantity', 'Unit', 'Date']],
            body: tableData,
            theme: 'striped',
            headStyles: { fillColor: [34, 197, 94] },
            styles: { fontSize: 10 }
        });

        doc.save(`wastage-report-${format(new Date(), 'yyyy-MM-dd')}.pdf`);
    };

    return (
        <div className="min-h-screen p-8 bg-gradient-to-br from-primary to-accent text-white">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-background rounded-2xl p-6 shadow-xl shadow-primary/50">
                <h1 className="text-5xl font-extrabold text-white drop-shadow-md">Wastage Tracker</h1>
                <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
    <button 
        onClick={() => setShowChart(!showChart)} 
        className={`px-6 py-2 rounded-lg text-lg font-semibold transition border-2 shadow-md 
            ${showChart ? 'bg-background border-primary text-white' : 'bg-white border-accent text-accent hover:bg-accent hover:text-white'}`}
    >
        {showChart ? 'View Table' : 'View Charts'}
    </button>
    <button 
        onClick={() => setOpenForm(true)} 
        className="px-6 py-2 rounded-lg text-lg font-semibold transition bg-primary text-background border-2 border-background shadow-md hover:bg-accent hover:text-white"
    >
        Add Wastage Item
    </button>
    <button 
        onClick={handleExport} 
        className="px-6 py-2 rounded-lg text-lg font-semibold transition bg-primary text-background border-2 border-background shadow-md hover:bg-accent hover:text-white"
    >
        Export PDF
    </button>
</div>

            </div>
            {showChart ? (
                <WastageChart filteredData={filteredWastage} />
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-background p-6"
                >
                    <table className="min-w-full divide-y divide-accent">
                        <thead className="bg-primary text-background">
                            <tr>
                                <th className="table-header">Product</th>
                                <th className="table-header">Category</th>
                                <th className="table-header">Wasted Quantity</th>
                                <th className="table-header">Unit</th>
                                <th className="table-header">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-primary divide-4 text-background text-bold text-center">
                            {filteredWastage.map((item) => (
                                <tr key={item.id} className="table-row">
                                    <td className="table-data">{item.product}</td>
                                    <td className="table-data">{item.category}</td>
                                    <td className="table-data">{item.wasted}</td>
                                    <td className="table-data">{item.unit}</td>
                                    <td className="table-data">{item.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>
            )}

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            >
                <WastageSummary data={filteredWastage} />
            </motion.div>

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
            >
                <Tips />
            </motion.div>

            <Dialog open={openForm} onClose={() => setOpenForm(false)}>
               
                    <WastageForm onAddWastage={(newWastage) => {
                        setWastageData(prevData => [...prevData, newWastage]);
                        setOpenForm(false);
                    }} />
               
            </Dialog>
        </div>
            
    );
};

export default WastageTracker;
