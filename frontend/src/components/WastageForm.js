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

    const units = ["pieces", "l (liters)", "kg (kilograms)"];
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
    
        const formattedWastage = {
            id: Date.now(),
            productName: formData.product,
            category: formData.category,
            wastedQuantity: formData.wasted,
            unit: formData.unit,
            expiredDate: formData.date,
        };
    
        onAddWastage(formattedWastage);
    
        setFormData({
            product: "",
            category: "",
            wasted: "",
            unit: "",
            date: new Date().toISOString().split("T")[0],
        });
    };
    

    return (
        <div className="bg-white p-6 max-w-md mx-auto border-4 border-accent rounded-lg shadow-xl animate-fadeIn">
            <h2 className="text-xl font-bold text-accent mb-6 text-center">Add Wastage Record</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Product Name */}
                <div>
                    <label className="block text-accent font-medium mb-2">Product Name</label>
                    <input
                        type="text"
                        name="product"
                        value={formData.product}
                        onChange={handleChange}
                        className="w-full p-3 border-2 border-accent rounded-lg focus:outline-none focus:border-primary"
                        placeholder="Enter product name"
                    />
                    {errors.product && <p className="text-red-500 text-sm mt-1">{errors.product}</p>}
                </div>

                {/* Category Dropdown */}
                <div>
                    <label className="block text-accent font-medium mb-2">Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full p-3 border-2 border-accent rounded-lg focus:outline-none focus:border-primary"
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                    {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                </div>

                {/* Wasted Quantity and Unit */}
                <div className="flex gap-6">
                    <div className="flex-1">
                        <label className="block text-accent font-medium mb-2">Wasted Quantity</label>
                        <input
                            type="number"
                            name="wasted"
                            value={formData.wasted}
                            onChange={handleChange}
                            className="w-full p-3 border-2 border-accent rounded-lg focus:outline-none focus:border-primary"
                            placeholder="Enter amount"
                        />
                        {errors.wasted && <p className="text-red-500 text-sm mt-1">{errors.wasted}</p>}
                    </div>
                    <div className="flex-1">
                        <label className="block text-accent font-medium mb-2">Unit</label>
                        <select
                            name="unit"
                            value={formData.unit}
                            onChange={handleChange}
                            className="w-full p-3 border-2 border-accent rounded-lg focus:outline-none focus:border-primary"
                        >
                            {units.map((unit) => (
                                <option key={unit} value={unit}>
                                    {unit}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Date Picker */}
                <div>
                    <label className="block text-accent font-medium mb-2">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full p-3 border-2 border-accent rounded-lg focus:outline-none focus:border-primary"
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" className="px-6 py-3 mt-6 rounded-lg text-lg font-semibold transition bg-accent text-white border-2 border-accent shadow-md hover:bg-primary hover:text-background">
                    Add Wastage
                </button>
            </form>
        </div>
    );
};

export default WastageForm;
