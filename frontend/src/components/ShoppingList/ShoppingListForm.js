import React, { useState } from "react";

const ShoppingListForm = ({ existingItem = null, onClose, onItemAdded }) => {

  //State to manage input fields
  const [name, setName] = useState(existingItem ? existingItem.name : "");
  const [quantity, setQuantity] = useState(existingItem ? existingItem.quantity : "");
  const [unit, setUnit] = useState(existingItem ? existingItem.unit : "pcs");

  //Function to handle form submission (add or update an item)
  const handleSubmit = async (e) => {
    e.preventDefault();

    //Prepare the item data for submission
    const itemData = { name, quantity, unit };

    const url = existingItem ? `/api/shopping-list/${existingItem._id}` : "/api/shopping-list";
    const method = existingItem ? "PATCH" : "POST";

    //Send request to the backend
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(itemData),
    });

    //If request is successful, update UI and close the form
    if (response.ok) {
      const updatedItem = await response.json();
      onItemAdded(updatedItem);
      onClose();
    } else {
      console.error("Failed to save item"); //If not displays error message 
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
      </select>

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
