const WastageSummary = ({ data }) => {
    const totalWastage = data.reduce((sum, item) => sum + item.wasted, 0);
    const mostWasted = data.reduce((max, item) => (item.wasted > max.wasted ? item : max), { wasted: 0 });

    return (
        <div className="p-4  text-background bg-primary  rounded-3xl border-background border-4 shadow my-4">
            <h2 className="text-lg font-bold">Wastage Summary</h2>
            <p>Total Wasted: <span className="font-semibold">{totalWastage} units</span></p>
            {mostWasted.wasted > 0 && (
                <p>Most Wasted Product: <span className="font-semibold">{mostWasted.product} ({mostWasted.wasted} units)</span></p>
            )}
        </div>
    );
};

export default WastageSummary;
