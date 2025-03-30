const Tips = () => {
    return (
        <div className="p-4 bg-background border-round-lg border-4 border-primary text-primary rounded shadow mt-4">
            <h2 className="text-lg font-bold">Tips to Reduce Wastage</h2>
            <ul className="list-disc pl-4">
                <li>Track expiry dates and use FIFO (First In, First Out) method.</li>
                <li>Donate near-expiry products to reduce waste.</li>
                <li>Store perishable items at optimal temperatures.</li>
                <li>Analyze past wastage trends to adjust ordering.</li>
            </ul>
        </div>
    );
};

export default Tips;
