import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import mockShoppingData from '../data/mockShoppingData';

const ShoppingInsights = () => {
    const [shoppingData, setShoppingData] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('');
    
    useEffect(() => {
        setShoppingData(mockShoppingData);
    }, []);

    const filteredData = selectedMonth 
        ? shoppingData.filter(item => item.month === selectedMonth) 
        : shoppingData;
    
    return (
        <div className="min-h-screen p-8 bg-gradient-to-br from-primary to-accent text-white">
            <h1 className="text-5xl font-extrabold text-white drop-shadow-md mb-6">Shopping Insights</h1>
            
            <div className="mb-6">
                <label className="text-lg mr-2">Filter by Month:</label>
                <select 
                    className="p-2 rounded bg-white text-background" 
                    onChange={(e) => setSelectedMonth(e.target.value)}
                >
                    <option value="">All</option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                </select>
            </div>
            
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-background p-6">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={filteredData}>
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="amount" fill="#2A9D8F" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ShoppingInsights;
