import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WastageSummary = () => {
    const [wastageData, setWastageData] = useState([]); // Consolidated state
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch data from the API
        axios.get('http://localhost:8070/Wastage')
            .then(response => {
                const { expiredItems, savedItems } = response.data;
                setWastageData([...expiredItems, ...savedItems]);  // Combine both expired and saved items
                setLoading(false);
            })
            .catch((error) => {
                setError("Error fetching data");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="p-4 text-background bg-primary rounded-3xl border-background border-4 shadow my-4">
                <h2 className="text-lg font-bold">Wastage Summary</h2>
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 text-background bg-primary rounded-3xl border-background border-4 shadow my-4">
                <h2 className="text-lg font-bold">Wastage Summary</h2>
                <p>{error}</p>
            </div>
        );
    }

    if (wastageData.length === 0) {
        return (
            <div className="p-4 text-background bg-primary rounded-3xl border-background border-4 shadow my-4">
                <h2 className="text-lg font-bold">Wastage Summary</h2>
                <p>No expired or saved wastage data found.</p>
            </div>
        );
    }

    // Calculate total wastage
    const totalWastage = wastageData.reduce((sum, item) => sum + item.wastedQuantity, 0);
    const unit = wastageData.length > 0 ? wastageData[0].unit : 'unit';

    // Find the most wasted product
    const mostWasted = wastageData.reduce(
        (max, item) => (item.wastedQuantity > max.wastedQuantity ? item : max),
        { wastedQuantity: 0 }
    );

    return (
        <div className="p-4 text-background bg-primary rounded-3xl border-background border-4 shadow my-4">
            <h2 className="text-lg font-bold">Wastage Summary</h2>
            <p>Total Wasted: <span className="font-semibold">{totalWastage} {unit}</span></p>
            {mostWasted.wastedQuantity > 0 && (
                <p>Most Wasted Product: <span className="font-semibold">{mostWasted.productName} ({mostWasted.wastedQuantity} {unit})</span></p>
            )}
        </div>
    );
};

export default WastageSummary;
