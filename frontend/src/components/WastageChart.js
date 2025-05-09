import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import React from 'react';

const WastageChart = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className="p-4 text-background bg-primary rounded-3xl border-background border-4 shadow my-4">
                <h2 className="text-lg font-bold">Wastage Summary</h2>
                <p>No data to display.</p>
            </div>
        );
    }

    // Aggregate data by product name
    const aggregateData = (data) => {
        const aggregated = {};
        data.forEach(item => {
            if (aggregated[item.productName]) {
                aggregated[item.productName].wastedQuantity += Number(item.wastedQuantity);
            } else {
                aggregated[item.productName] = {
                    product: item.productName,
                    wastedQuantity: Number(item.wastedQuantity),
                };
            }
        });
        return Object.values(aggregated);
    };

    const chartData = aggregateData(data);

    return (
        <div className="bg border-background border-4 p-4 rounded shadow mt-4">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                    <XAxis dataKey="product" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="wastedQuantity" fill="#264653" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};


export default WastageChart;