import React, { useState } from "react";

const WastageForm = ({ onAddWastage }) => {
    const [formData, setFormData] = useState({
        product: "",
        category: "",
        wasted: "",
        unit: "pieces",
        date: new Date().toISOString().split("T")[0], 
    });

    const [errors, setErrors] = useState({});

    const units = ["pieces", "liters", "kilograms"];
    const categories = ["Fruits", "Vegetables", "Dairy", "Meat", "Bakery"]; 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.product.trim()) newErrors.product = "Product name is required";
        if (!formData.category.trim()) newErrors.category = "Category is required";
        if (!formData.wasted.trim() || isNaN(formData.wasted) || formData.wasted <= 0)
            newErrors.wasted = "Enter a valid quantity";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        onAddWastage({ ...formData, id: Date.now() });
        setFormData({
            product: "",
            category: "",
            wasted: "",
            unit: "pieces",
            date: new Date().toISOString().split("T")[0],
        });
    };

    return (
        <div className="bg-background p-8  border-4 border-accent rounded shadow-lg animate-fadeIn">
            <h2 className="text-xl font-bold text-primary mb-4">Add Wastage Record</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Product Name */}
                <div>
                    <label className="block text-white font-medium">Product Name</label>
                    <input
                        type="text"
                        name="product"
                        value={formData.product}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Enter product name"
                    />
                    {errors.product && <p className="text-red-400 text-sm">{errors.product}</p>}
                </div>

                {/* Category Dropdown */}
                <div>
                    <label className="block text-white font-medium">Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="input-field"
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                    {errors.category && <p className="text-red-400 text-sm">{errors.category}</p>}
                </div>

                {/* Wasted Quantity */}
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-white font-medium">Wasted Quantity</label>
                        <input
                            type="number"
                            name="wasted"
                            value={formData.wasted}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="Enter amount"
                        />
                        {errors.wasted && <p className="text-red-400 text-sm">{errors.wasted}</p>}
                    </div>
                    
                    {/* Unit Dropdown */}
                    <div>
                        <label className="block text-white font-medium">Unit</label>
                        <select
                            name="unit"
                            value={formData.unit}
                            onChange={handleChange}
                            className="input-field"
                        >
                            {units.map((unit) => (
                                <option key={unit} value={unit}>
                                    {unit}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Date */}
                <div>
                    <label className="block text-white font-medium">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="input-field"
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" className="px-6 py-2 rounded-lg text-lg font-semibold transition bg-primary text-background border-2 border-background shadow-md hover:bg-accent hover:text-white">
                    Add Wastage
                </button>
            </form>
        </div>
    );
};

export default WastageForm;
