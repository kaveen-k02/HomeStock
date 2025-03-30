const Filter = ({ onFilterChange }) => {
    return (
        <div className="mb-4">
            <label className="font-semibold mr-2">Filter by Month:</label>
            <input
                type="month"
                onChange={(e) => onFilterChange(e.target.value)}
                className="border p-2 rounded"
            />
        </div>
    );
};

export default Filter;
