import React, { useState } from "react";

const ShoppingListForm = ({ existingItem = null, onClose, onItemAdded }) => {
  //State to manage input fields
  const [name, setName] = useState(existingItem ? existingItem.name : "");
  const [quantity, setQuantity] = useState(existingItem ? existingItem.quantity : "");
  const [unit, setUnit] = useState(existingItem ? existingItem.unit : "pcs");
  const [customUnit, setCustomUnit] = useState(existingItem && !["pcs", "kg", "liters"].includes(existingItem.unit) ? existingItem.unit : "");
  const [error, setError] = useState(""); //Error state for validation messages

  //Function to handle form submission (add or update an item)
  const handleSubmit = async (e) => {
    e.preventDefault();

    //Validation for quantity (must be ≥ 1)
    if (quantity <= 0) {
      setError("Quantity must be at least 1.");
      return;
    }
    
    //Validation for custom unit (if "Other" is selected)
    if (unit === "other" && !customUnit.trim()) {
      setError("Please specify a custom unit.");
      return;
    }

    setError(""); //Clear previous errors if validation passes

    //Prepare the item data for submission
    const itemData = { 
      name, 
      quantity, 
      unit: unit === "other" ? customUnit : unit //Use customUnit if "Other" is selected
    };

    try {
      const url = existingItem ? `/api/shopping-list/${existingItem._id}` : "/api/shopping-list";
      const method = existingItem ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemData),
      });

      if (response.ok) {
        const updatedItem = await response.json();
        onItemAdded(updatedItem);
        onClose();
      } else {
        setError("Failed to save item. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please check your connection.");
    }
  };

  return (
    <form className="bg-primary p-4 rounded-lg shadow-md font-sans" onSubmit={handleSubmit}>
      <h2 className="text-lg font-bold text-background">{existingItem ? "Edit Item" : "Add Item"}</h2>

      {/*Input field for Item Name*/}
      <label className="block mt-2">Item Name:</label>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        required 
        className="border p-2 w-full rounded"
      />

      {/*Input field for Quantity*/}
      <label className="block mt-2">Quantity:</label>
      <input 
        type="number" 
        value={quantity} 
        onChange={(e) => setQuantity(e.target.value)} 
        required 
        className="border p-2 w-full rounded"
      />

      {/*Dropdown selection for Unit*/}
      <label className="block mt-2">Unit:</label>
      <select 
        value={unit} 
        onChange={(e) => setUnit(e.target.value)} 
        className="border p-2 w-full rounded"
      >
        <option value="pcs">Pieces</option>
        <option value="kg">Kilograms</option>
        <option value="liters">Liters</option>
        <option value="other">Other</option>
      </select>

      {/*If "Other" is selected, shows additional input for custom unit*/}
      {unit === "other" && (
        <div>
          <label className="block mt-2">Specify Unit:</label>
          <input 
            type="text" 
            value={customUnit} 
            onChange={(e) => setCustomUnit(e.target.value)} 
            required 
            className="border p-2 w-full rounded"
          />
        </div>
      )}

      {/*Display error messages if validation fails*/}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/*Buttons: Submit (Add/Update) and Cancel*/}
      <div className="flex justify-between mt-4">
        <button type="submit" className="bg-accent text-white px-4 py-2 rounded">
          {existingItem ? "Update" : "Add"}
        </button>

        {/*Cancel button: Closes the form without saving*/}
        <button type="button" onClick={onClose} className="bg-background text-white px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ShoppingListForm;
