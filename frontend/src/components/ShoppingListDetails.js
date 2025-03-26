import React, { useState } from "react";
import { Typography } from "@mui/material";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import ShoppingListForm from "./ShoppingListForm";

const ShoppingListDetails = ({ item, onDelete, onEdit }) => {
  const [showEditModal, setShowEditModal] = useState(false);
   
  //Function to handle item deletion
  const handleDelete = async () => {
    const response = await fetch(`/api/shopping-list/${item._id}`, { method: "DELETE" });

    if (response.ok) {
      onDelete(item._id);
    } else {
      console.error("Failed to delete item");
    }
  };

  return (
    //Container div for individual shopping list item
    <div className="bg-primary flex justify-between items-center p-4 rounded-lg my-4">
      {/*Display the item name*/}
      <Typography variant="h6">{item.name}</Typography>

      {/*Display the quantity and unit of the item*/}
      <Typography>{item.quantity} {item.unit}</Typography>

      <Typography>{formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}</Typography>
      
      {/*Buttons: edit and delete an item*/}
      <div className="flex gap-2">
        {/*edit button*/}
        <button 
          onClick={() => setShowEditModal(true)} 
          className="bg-accent text-white px-4 py-2 rounded"
        >
          Edit

        {/*delete button*/}  
        </button>
        <button 
          onClick={handleDelete} 
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>

      {/*Edit modal*/} 
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-background bg-opacity-80">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-background font-bold">Edit Item</h2>

            {/*ShoppingListForm component for editing item*/}
            <ShoppingListForm existingItem={item} onClose={() => setShowEditModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingListDetails;
