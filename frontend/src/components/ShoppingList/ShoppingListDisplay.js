import React, { useState, useEffect } from "react";
import ShoppingListDetails from "./ShoppingListDetails";
import ShoppingListForm from "./ShoppingListForm";

const ShoppingListDisplay = () => {
  const [shoppingList, setShoppingList] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const fetchShoppingList = async () => {

      //Fetch data from the server API  
      const response = await fetch("/api/shopping-list");
      if (response.ok) {
        const data = await response.json();
        setShoppingList(data); //Set the fetched data to the shoppingList state
      } else {
        console.error("Failed to fetch shopping list"); // Log an error if the fetch request fails
      }
    };

    fetchShoppingList(); //Call the function to fetch the shopping list
  }, []);

  //Function to handle when a new item is added or updated in the shopping list
  const handleItemAdded = (newItem) => {
    setShoppingList((prevList) =>
      prevList.some((item) => item._id === newItem._id) //Check if the item already exists
        ? prevList.map((item) => (item._id === newItem._id ? newItem : item))
        : [newItem, ...prevList] //If it's a new item, add it to the list

    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-background mb-4">Shopping List</h1> {/*Title of the shopping list*/}
      <button 
        onClick={() => setShowAddModal(true)} 
        className="bg-accent text-white px-4 py-2 rounded"
      >
        Add Item
      </button>

      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-background bg-opacity-80">
          <div className="bg-primary p-6 rounded shadow-lg">

            {/*ShoppingListForm component to handle item addition*/}
            <ShoppingListForm onClose={() => setShowAddModal(false)} onItemAdded={handleItemAdded} />
          </div>
        </div>
      )}

      {/*Display the shopping list items*/}
      <div className="mt-4">
        {shoppingList.map((item) => (
          <ShoppingListDetails key={item._id} item={item} onDelete={handleItemAdded} />
        ))}
      </div>
    </div>
  );
};

export default ShoppingListDisplay;
