// // // // // import React, { useState, useEffect } from 'react';
// // // // // import axios from 'axios';
// // // // // import AddItemModal from './AddItemModal.jsx';
// // // // // import CreateListModal from './CreateListModal.jsx';
// // // // // import EditItemModal from './EditItemModal.jsx';
// // // // // import EditListModal from './EditListModal.jsx';

// // // // // const ShoppingListManager = () => {
// // // // //   const [shoppingLists, setShoppingLists] = useState([]);
// // // // //   const [selectedList, setSelectedList] = useState(null);
// // // // //   const [newListTitle, setNewListTitle] = useState('');
// // // // //   const [newItem, setNewItem] = useState({
// // // // //     itemName: '',
// // // // //     category: '',
// // // // //     quantity: 1,
// // // // //     unit: 'pieces',
// // // // //   });
// // // // //   const [editItem, setEditItem] = useState(null);
// // // // //   const [editListTitle, setEditListTitle] = useState('');
// // // // //   const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
// // // // //   const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false);
// // // // //   const [isCreateListModalOpen, setIsCreateListModalOpen] = useState(false);
// // // // //   const [isEditListModalOpen, setIsEditListModalOpen] = useState(false);
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const [error, setError] = useState('');

// // // // //   const API_BASE_URL = 'http://localhost:8070/ShoppingList';

// // // // //   useEffect(() => {
// // // // //     fetchShoppingLists();
// // // // //   }, []);

// // // // //   const fetchShoppingLists = async () => {
// // // // //     setLoading(true);
// // // // //     try {
// // // // //       const response = await axios.get(`${API_BASE_URL}/all`);
// // // // //       setShoppingLists(response.data);
// // // // //       setError('');
// // // // //     } catch (err) {
// // // // //       setError('Failed to fetch shopping lists');
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const handleCreateList = async () => {
// // // // //     console.log('handleCreateList triggered with title:', newListTitle);
// // // // //     if (!newListTitle.trim()) {
// // // // //       setError('List title is required');
// // // // //       return;
// // // // //     }
// // // // //     setLoading(true);
// // // // //     try {
// // // // //       const response = await axios.post(`${API_BASE_URL}/add`, { title: newListTitle, items: [] });
// // // // //       setShoppingLists((prevLists) => [...prevLists, response.data.shoppingList]);
// // // // //       setNewListTitle('');
// // // // //       setIsCreateListModalOpen(false);
// // // // //       setError('');
// // // // //     } catch (err) {
// // // // //       setError('Failed to create shopping list');
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const handleAddItem = async () => {
// // // // //     console.log('handleAddItem triggered with item:', newItem);
// // // // //     if (!newItem.itemName || !newItem.category) {
// // // // //       setError('Item name and category are required');
// // // // //       return;
// // // // //     }
// // // // //     setLoading(true);
// // // // //     try {
// // // // //       const response = await axios.post(`${API_BASE_URL}/addItem/${selectedList._id}`, newItem);
// // // // //       setShoppingLists((prevLists) =>
// // // // //         prevLists.map((list) =>
// // // // //           list._id === selectedList._id ? response.data.shoppingList : list
// // // // //         )
// // // // //       );
// // // // //       setNewItem({ itemName: '', category: '', quantity: 1, unit: 'pieces' });
// // // // //       setIsAddItemModalOpen(false);
// // // // //       setError('');
// // // // //     } catch (err) {
// // // // //       setError('Failed to add item');
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const handleUpdateList = async () => {
// // // // //     console.log('handleUpdateList triggered with title:', editListTitle);
// // // // //     if (!editListTitle.trim()) {
// // // // //       setError('List title is required');
// // // // //       return;
// // // // //     }
// // // // //     setLoading(true);
// // // // //     try {
// // // // //       const response = await axios.put(`${API_BASE_URL}/update/${selectedList._id}`, {
// // // // //         title: editListTitle,
// // // // //       });
// // // // //       setShoppingLists((prevLists) =>
// // // // //         prevLists.map((list) =>
// // // // //           list._id === selectedList._id ? response.data.shoppingList : list
// // // // //         )
// // // // //       );
// // // // //       setIsEditListModalOpen(false);
// // // // //       alert('Shopping list updated successfully!');
// // // // //       setError('');
// // // // //     } catch (err) {
// // // // //       setError('Failed to update shopping list');
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const handleUpdateItem = async () => {
// // // // //     console.log('handleUpdateItem triggered with item:', editItem);
// // // // //     if (!editItem.itemName || !editItem.category) {
// // // // //       setError('Item name and category are required');
// // // // //       return;
// // // // //     }
// // // // //     setLoading(true);
// // // // //     try {
// // // // //       const response = await axios.put(
// // // // //         `${API_BASE_URL}/updateItem/${selectedList._id}/${editItem._id}`,
// // // // //         editItem
// // // // //       );
// // // // //       console.log('Update Item Response:', response.data);
// // // // //       setShoppingLists((prevLists) =>
// // // // //         prevLists.map((list) =>
// // // // //           list._id === selectedList._id ? response.data.shoppingList : list
// // // // //         )
// // // // //       );
// // // // //       setIsEditItemModalOpen(false);
// // // // //       alert('Item updated successfully!');
// // // // //       setEditItem(null);
// // // // //       setError('');
// // // // //     } catch (err) {
// // // // //       setError('Failed to update item');
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const handleDeleteItem = async (listId, itemId) => {
// // // // //     console.log('handleDeleteItem triggered with listId:', listId, 'itemId:', itemId);
// // // // //     if (!window.confirm('Are you sure you want to delete this item?')) {
// // // // //       return;
// // // // //     }
// // // // //     setLoading(true);
// // // // //     try {
// // // // //       const response = await axios.delete(`${API_BASE_URL}/deleteItem/${listId}/${itemId}`);
// // // // //       console.log('Delete Item Response:', response.data);
// // // // //       setShoppingLists((prevLists) =>
// // // // //         prevLists.map((list) => (list._id === listId ? response.data.shoppingList : list))
// // // // //       );
// // // // //       setError('');
// // // // //     } catch (err) {
// // // // //       setError('Failed to delete item');
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const handleDeleteList = async (listId) => {
// // // // //     console.log('handleDeleteList triggered with listId:', listId);
// // // // //     if (!window.confirm('Are you sure you want to delete this shopping list?')) {
// // // // //       return;
// // // // //     }
// // // // //     setLoading(true);
// // // // //     try {
// // // // //       await axios.delete(`${API_BASE_URL}/delete/${listId}`);
// // // // //       setShoppingLists((prevLists) => prevLists.filter((list) => list._id !== listId));
// // // // //       if (selectedList && selectedList._id === listId) setSelectedList(null);
// // // // //       setError('');
// // // // //     } catch (err) {
// // // // //       setError('Failed to delete shopping list');
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <>
// // // // //       <div className="min-h-screen p-6" style={{ backgroundColor: 'rgb(244 241 222 / var(--tw-bg-opacity, 1))' }}>
// // // // //         <div className="bg-[rgb(38_70_83/var(--tw-bg-opacity,_1))] text-white p-4 rounded-t-lg flex justify-between items-center mb-4" style={{ '--tw-bg-opacity': '1' }}>
// // // // //           <h1 className="text-3xl font-bold">Shopping List Manager</h1>
// // // // //           <div>
// // // // //             <button
// // // // //               onClick={() => setIsCreateListModalOpen(true)}
// // // // //               className="mr-2 px-4 py-2 bg-[rgb(42_157_143/var(--tw-bg-opacity,_1))] text-white rounded hover:bg-[rgb(45_83_99/var(--tw-bg-opacity,_1))]"
// // // // //               style={{ '--tw-bg-opacity': '1' }}
// // // // //             >
// // // // //               Add New List
// // // // //             </button>
// // // // //             <button
// // // // //               onClick={() => alert('Export functionality not implemented yet')}
// // // // //               className="px-4 py-2 bg-[rgb(42_157_143/var(--tw-bg-opacity,_1))] text-white rounded hover:bg-[rgb(45_83_99/var(--tw-bg-opacity,_1))]"
// // // // //               style={{ '--tw-bg-opacity': '1' }}
// // // // //             >
// // // // //               Export PDF
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>

// // // // //         <div className="bg-white p-4 rounded-b-lg shadow mb-4 flex justify-between items-center border-teal-500 border-2">
// // // // //           <input
// // // // //             type="text"
// // // // //             placeholder="Search by list name or category..."
// // // // //             className="p-2 border-teal-500 border rounded w-2/3"
// // // // //           />
// // // // //           <select className="p-2 border-teal-500 border rounded w-1/3">
// // // // //             <option>All Categories</option>
// // // // //           </select>
// // // // //         </div>

// // // // //         <div className="bg-[rgb(38_70_83/var(--tw-bg-opacity,_1))] text-white p-2 rounded mb-4" style={{ '--tw-bg-opacity': '1' }}>
// // // // //           <p>Total Lists: {shoppingLists.length}</p>
// // // // //         </div>

// // // // //         <div className="bg-[rgb(38_70_83/var(--tw-bg-opacity,_1))] text-white p-2 rounded mb-4 flex justify-between" style={{ '--tw-bg-opacity': '1' }}>
// // // // //           <div className="w-1/2">
// // // // //             <h2 className="text-xl font-semibold">Your Shopping Lists</h2>
// // // // //           </div>
// // // // //           {selectedList && (
// // // // //             <div className="w-1/2">
// // // // //               <h2 className="text-xl font-semibold">{selectedList.title}</h2>
// // // // //             </div>
// // // // //           )}
// // // // //         </div>

// // // // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // // //           <div>
// // // // //             {shoppingLists.length === 0 ? (
// // // // //               <p>No shopping lists available.</p>
// // // // //             ) : (
// // // // //               <ul className="space-y-4">
// // // // //                 {shoppingLists.map((list) => (
// // // // //                   <li
// // // // //                     key={list._id}
// // // // //                     className={`p-4 rounded-lg shadow ${
// // // // //                       selectedList && selectedList._id === list._id ? 'bg-teal-100' : 'bg-white'
// // // // //                     }`}
// // // // //                   >
// // // // //                     <div className="flex justify-between items-center">
// // // // //                       <h3
// // // // //                         className="text-lg font-medium cursor-pointer"
// // // // //                         onClick={() => setSelectedList(list)}
// // // // //                       >
// // // // //                         {list.title}
// // // // //                       </h3>
// // // // //                       <div className="flex gap-2">
// // // // //                         <button
// // // // //                           onClick={() => {
// // // // //                             setEditListTitle(list.title);
// // // // //                             setIsEditListModalOpen(true);
// // // // //                             setSelectedList(list);
// // // // //                           }}
// // // // //                           className="text-[rgb(38_70_83/var(--tw-bg-opacity,_1))] hover:text-[rgb(45_83_99/var(--tw-bg-opacity,_1))]"
// // // // //                           style={{ '--tw-bg-opacity': '1' }}
// // // // //                         >
// // // // //                           Edit
// // // // //                         </button>
// // // // //                         <button
// // // // //                           onClick={() => handleDeleteList(list._id)}
// // // // //                           className="text-red-500 hover:text-red-700"
// // // // //                         >
// // // // //                           Delete
// // // // //                         </button>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   </li>
// // // // //                 ))}
// // // // //               </ul>
// // // // //             )}
// // // // //           </div>

// // // // //           <div>
// // // // //             {selectedList ? (
// // // // //               <>
// // // // //                 <button
// // // // //                   onClick={() => setIsAddItemModalOpen(true)}
// // // // //                   className="mb-4 px-4 py-2 bg-[rgb(38_70_83/var(--tw-bg-opacity,_1))] text-white rounded hover:bg-[rgb(45_83_99/var(--tw-bg-opacity,_1))]"
// // // // //                   style={{ '--tw-bg-opacity': '1' }}
// // // // //                 >
// // // // //                   Add Item
// // // // //                 </button>
// // // // //                 {selectedList.items.length === 0 ? (
// // // // //                   <p>No items in this list.</p>
// // // // //                 ) : (
// // // // //                   <>
// // // // //                     <div className="bg-teal-800 text-white p-2 rounded-t mb-2 bg-[rgb(38_70_83/var(--tw-bg-opacity,_1))]">
// // // // //                       <div className="flex justify-between">
// // // // //                         <span>Product Name</span>
// // // // //                         <span>Category</span>
// // // // //                         <span>Total Quantity</span>
// // // // //                         <span>Unit</span>
// // // // //                         <span>Value</span>
// // // // //                         <span>Actions</span>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                     <ul className="space-y-4">
// // // // //                       {selectedList.items.map((item) => (
// // // // //                         <li
// // // // //                           key={item._id}
// // // // //                           className="p-4 bg-white rounded-b-lg shadow flex justify-between"
// // // // //                         >
// // // // //                           <div>{item.itemName}</div>
// // // // //                           <div>{item.category}</div>
// // // // //                           <div>{item.quantity}</div>
// // // // //                           <div>{item.unit}</div>
// // // // //                           <div>$0.00</div>
// // // // //                           <div className="flex gap-2">
// // // // //                             <button
// // // // //                               onClick={() => {
// // // // //                                 setEditItem({
// // // // //                                   _id: item._id,
// // // // //                                   itemName: item.itemName,
// // // // //                                   category: item.category,
// // // // //                                   quantity: item.quantity,
// // // // //                                   unit: item.unit,
// // // // //                                 });
// // // // //                                 setIsEditItemModalOpen(true);
// // // // //                               }}
// // // // //                               className="text-[rgb(38_70_83/var(--tw-bg-opacity,_1))] hover:text-[rgb(45_83_99/var(--tw-bg-opacity,_1))]"
// // // // //                               style={{ '--tw-bg-opacity': '1' }}
// // // // //                             >
// // // // //                               Edit
// // // // //                             </button>
// // // // //                             <button
// // // // //                               onClick={() => handleDeleteItem(selectedList._id, item._id)}
// // // // //                               className="text-red-500 hover:text-red-700"
// // // // //                             >
// // // // //                               Delete
// // // // //                             </button>
// // // // //                           </div>
// // // // //                         </li>
// // // // //                       ))}
// // // // //                     </ul>
// // // // //                   </>
// // // // //                 )}
// // // // //               </>
// // // // //             ) : (
// // // // //               <p>Select a shopping list to view details.</p>
// // // // //             )}
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //       {error && <div className="bg-red-100 text-red-700 p-4 rounded mt-4">{error}</div>}
// // // // //       {loading && <p className="text-center text-teal-800 mt-4">Loading...</p>}
// // // // //       {isCreateListModalOpen && (
// // // // //         <CreateListModal
// // // // //           newListTitle={newListTitle}
// // // // //           setNewListTitle={setNewListTitle}
// // // // //           handleCreateList={handleCreateList}
// // // // //           setIsCreateListModalOpen={setIsCreateListModalOpen}
// // // // //           error={error}
// // // // //           loading={loading}
// // // // //         />
// // // // //       )}
// // // // //       {isAddItemModalOpen && (
// // // // //         <AddItemModal
// // // // //           newItem={newItem}
// // // // //           setNewItem={setNewItem}
// // // // //           handleAddItem={handleAddItem}
// // // // //           setIsAddItemModalOpen={setIsAddItemModalOpen}
// // // // //           error={error}
// // // // //           loading={loading}
// // // // //         />
// // // // //       )}
// // // // //       {isEditItemModalOpen && (
// // // // //         <EditItemModal
// // // // //           editItem={editItem}
// // // // //           setEditItem={setEditItem}
// // // // //           handleUpdateItem={handleUpdateItem}
// // // // //           setIsEditItemModalOpen={setIsEditItemModalOpen}
// // // // //           error={error}
// // // // //           loading={loading}
// // // // //         />
// // // // //       )}
// // // // //       {isEditListModalOpen && (
// // // // //         <EditListModal
// // // // //           editListTitle={editListTitle}
// // // // //           setEditListTitle={setEditListTitle}
// // // // //           handleUpdateList={handleUpdateList}
// // // // //           setIsEditListModalOpen={setIsEditListModalOpen}
// // // // //           error={error}
// // // // //           loading={loading}
// // // // //         />
// // // // //       )}
// // // // //     </>
// // // // //   );
// // // // // };

// // // // // export default ShoppingListManager;

// // // // import React, { useState, useEffect } from 'react';
// // // // import axios from 'axios';
// // // // import AddItemModal from './AddItemModal.jsx';
// // // // import CreateListModal from './CreateListModal.jsx';
// // // // import EditItemModal from './EditItemModal.jsx';
// // // // import EditListModal from './EditListModal.jsx';

// // // // const ShoppingListManager = () => {
// // // //   const [shoppingLists, setShoppingLists] = useState([]);
// // // //   const [selectedList, setSelectedList] = useState(null);
// // // //   const [newListTitle, setNewListTitle] = useState('');
// // // //   const [newItem, setNewItem] = useState({
// // // //     itemName: '',
// // // //     category: '',
// // // //     quantity: 1,
// // // //     unit: 'pieces',
// // // //   });
// // // //   const [editItem, setEditItem] = useState(null);
// // // //   const [editListTitle, setEditListTitle] = useState('');
// // // //   const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
// // // //   const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false);
// // // //   const [isCreateListModalOpen, setIsCreateListModalOpen] = useState(false);
// // // //   const [isEditListModalOpen, setIsEditListModalOpen] = useState(false);
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [error, setError] = useState('');

// // // //   const API_BASE_URL = 'http://localhost:8070/ShoppingList';

// // // //   useEffect(() => {
// // // //     fetchShoppingLists();
// // // //   }, []);

// // // //   const fetchShoppingLists = async () => {
// // // //     setLoading(true);
// // // //     try {
// // // //       const response = await axios.get(`${API_BASE_URL}/all`);
// // // //       setShoppingLists(response.data);
// // // //       setError('');
// // // //     } catch (err) {
// // // //       setError('Failed to fetch shopping lists');
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const handleCreateList = async () => {
// // // //     console.log('handleCreateList triggered with title:', newListTitle);
// // // //     if (!newListTitle.trim()) {
// // // //       setError('List title is required');
// // // //       return;
// // // //     }
// // // //     setLoading(true);
// // // //     try {
// // // //       const response = await axios.post(`${API_BASE_URL}/add`, { title: newListTitle, items: [] });
// // // //       setShoppingLists((prevLists) => [...prevLists, response.data.shoppingList]);
// // // //       setNewListTitle('');
// // // //       setIsCreateListModalOpen(false);
// // // //       setError('');
// // // //     } catch (err) {
// // // //       setError('Failed to create shopping list');
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const handleAddItem = async () => {
// // // //     console.log('handleAddItem triggered with item:', newItem);
// // // //     if (!newItem.itemName || !newItem.category) {
// // // //       setError('Item name and category are required');
// // // //       return;
// // // //     }
// // // //     setLoading(true);
// // // //     try {
// // // //       const response = await axios.post(`${API_BASE_URL}/addItem/${selectedList._id}`, newItem);
// // // //       setShoppingLists((prevLists) =>
// // // //         prevLists.map((list) =>
// // // //           list._id === selectedList._id ? response.data.shoppingList : list
// // // //         )
// // // //       );
// // // //       setNewItem({ itemName: '', category: '', quantity: 1, unit: 'pieces' });
// // // //       setIsAddItemModalOpen(false);
// // // //       setError('');
// // // //     } catch (err) {
// // // //       setError('Failed to add item');
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const handleUpdateList = async () => {
// // // //     console.log('handleUpdateList triggered with title:', editListTitle);
// // // //     if (!editListTitle.trim()) {
// // // //       setError('List title is required');
// // // //       return;
// // // //     }
// // // //     setLoading(true);
// // // //     try {
// // // //       const response = await axios.put(`${API_BASE_URL}/update/${selectedList._id}`, {
// // // //         title: editListTitle,
// // // //       });
// // // //       setShoppingLists((prevLists) =>
// // // //         prevLists.map((list) =>
// // // //           list._id === selectedList._id ? response.data.shoppingList : list
// // // //         )
// // // //       );
// // // //       setIsEditListModalOpen(false);
// // // //       alert('Shopping list updated successfully!');
// // // //       setError('');
// // // //     } catch (err) {
// // // //       setError('Failed to update shopping list');
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const handleUpdateItem = async () => {
// // // //     console.log('handleUpdateItem triggered with item:', editItem);
// // // //     if (!editItem.itemName || !editItem.category) {
// // // //       setError('Item name and category are required');
// // // //       return;
// // // //     }
// // // //     setLoading(true);
// // // //     try {
// // // //       const response = await axios.put(
// // // //         `${API_BASE_URL}/updateItem/${selectedList._id}/${editItem._id}`,
// // // //         editItem
// // // //       );
// // // //       console.log('Update Item Response:', response.data);
// // // //       setShoppingLists((prevLists) =>
// // // //         prevLists.map((list) =>
// // // //           list._id === selectedList._id ? response.data.shoppingList : list
// // // //         )
// // // //       );
// // // //       setIsEditItemModalOpen(false);
// // // //       alert('Item updated successfully!');
// // // //       setEditItem(null);
// // // //       setError('');
// // // //     } catch (err) {
// // // //       setError('Failed to update item');
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const handleDeleteItem = async (listId, itemId) => {
// // // //     console.log('handleDeleteItem triggered with listId:', listId, 'itemId:', itemId);
// // // //     if (!window.confirm('Are you sure you want to delete this item?')) {
// // // //       return;
// // // //     }
// // // //     setLoading(true);
// // // //     try {
// // // //       const response = await axios.delete(`${API_BASE_URL}/deleteItem/${listId}/${itemId}`);
// // // //       console.log('Delete Item Response:', response.data);
// // // //       setShoppingLists((prevLists) =>
// // // //         prevLists.map((list) => (list._id === listId ? response.data.shoppingList : list))
// // // //       );
// // // //       setError('');
// // // //     } catch (err) {
// // // //       setError('Failed to delete item');
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const handleDeleteList = async (listId) => {
// // // //     console.log('handleDeleteList triggered with listId:', listId);
// // // //     if (!window.confirm('Are you sure you want to delete this shopping list?')) {
// // // //       return;
// // // //     }
// // // //     setLoading(true);
// // // //     try {
// // // //       await axios.delete(`${API_BASE_URL}/delete/${listId}`);
// // // //       setShoppingLists((prevLists) => prevLists.filter((list) => list._id !== listId));
// // // //       if (selectedList && selectedList._id === listId) setSelectedList(null);
// // // //       setError('');
// // // //     } catch (err) {
// // // //       setError('Failed to delete shopping list');
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const handleExportPDF = () => {
// // // //     const { jsPDF } = window.jspdf;
// // // //     const doc = new jsPDF();

// // // //     doc.setFontSize(18);
// // // //     doc.text('Shopping Lists', 14, 22);

// // // //     let yPosition = 30;
// // // //     shoppingLists.forEach((list, index) => {
// // // //       // List title
// // // //       doc.setFontSize(14);
// // // //       doc.text(`List ${index + 1}: ${list.title}`, 14, yPosition);
// // // //       yPosition += 10;

// // // //       if (list.items.length > 0) {
// // // //         // Table headers
// // // //         doc.setFontSize(10);
// // // //         doc.text('Product Name', 14, yPosition);
// // // //         doc.text('Category', 50, yPosition);
// // // //         doc.text('Quantity', 90, yPosition);
// // // //         doc.text('Unit', 120, yPosition);
// // // //         yPosition += 5;

// // // //         // Table rows
// // // //         list.items.forEach((item) => {
// // // //           doc.text(item.itemName, 14, yPosition);
// // // //           doc.text(item.category, 50, yPosition);
// // // //           doc.text(String(item.quantity), 90, yPosition);
// // // //           doc.text(item.unit, 120, yPosition);
// // // //           yPosition += 8;
// // // //         });
// // // //       } else {
// // // //         doc.setFontSize(10);
// // // //         doc.text('No items in this list.', 14, yPosition);
// // // //         yPosition += 8;
// // // //       }

// // // //       yPosition += 5; // Space between lists

// // // //       // Check for page break
// // // //       if (yPosition > 270) {
// // // //         doc.addPage();
// // // //         yPosition = 20;
// // // //       }
// // // //     });

// // // //     doc.save('shopping-lists.pdf');
// // // //   };

// // // //   return (
// // // //     <>
// // // //       <div className="min-h-screen p-6" style={{ backgroundColor: 'rgb(244 241 222 / var(--tw-bg-opacity, 1))' }}>
// // // //         <div className="bg-[rgb(38_70_83/var(--tw-bg-opacity,_1))] text-white p-4 rounded-t-lg flex justify-between items-center mb-4" style={{ '--tw-bg-opacity': '1' }}>
// // // //           <h1 className="text-3xl font-bold">Shopping List Manager</h1>
// // // //           <div>
// // // //             <button
// // // //               onClick={() => setIsCreateListModalOpen(true)}
// // // //               className="mr-2 px-4 py-2 bg-[rgb(42_157_143/var(--tw-bg-opacity,_1))] text-white rounded hover:bg-[rgb(45_83_99/var(--tw-bg-opacity,_1))]"
// // // //               style={{ '--tw-bg-opacity': '1' }}
// // // //             >
// // // //               Add New List
// // // //             </button>
// // // //             <button
// // // //               onClick={handleExportPDF}
// // // //               className="px-4 py-2 bg-[rgb(42_157_143/var(--tw-bg-opacity,_1))] text-white rounded hover:bg-[rgb(45_83_99/var(--tw-bg-opacity,_1))]"
// // // //               style={{ '--tw-bg-opacity': '1' }}
// // // //             >
// // // //               Export PDF
// // // //             </button>
// // // //           </div>
// // // //         </div>

// // // //         <div className="bg-white p-4 rounded-b-lg shadow mb-4 flex justify-between items-center border-teal-500 border-2">
// // // //           <input
// // // //             type="text"
// // // //             placeholder="Search by list name or category..."
// // // //             className="p-2 border-teal-500 border rounded w-2/3"
// // // //           />
// // // //           <select className="p-2 border-teal-500 border rounded w-1/3">
// // // //             <option>All Categories</option>
// // // //           </select>
// // // //         </div>

// // // //         <div className="bg-[rgb(38_70_83/var(--tw-bg-opacity,_1))] text-white p-2 rounded mb-4" style={{ '--tw-bg-opacity': '1' }}>
// // // //           <p>Total Lists: {shoppingLists.length}</p>
// // // //         </div>

// // // //         <div className="bg-[rgb(38_70_83/var(--tw-bg-opacity,_1))] text-white p-2 rounded mb-4 flex justify-between" style={{ '--tw-bg-opacity': '1' }}>
// // // //           <div className="w-1/2">
// // // //             <h2 className="text-xl font-semibold">Your Shopping Lists</h2>
// // // //           </div>
// // // //           {selectedList && (
// // // //             <div className="w-1/2">
// // // //               <h2 className="text-xl font-semibold">{selectedList.title}</h2>
// // // //             </div>
// // // //           )}
// // // //         </div>

// // // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // //           <div>
// // // //             {shoppingLists.length === 0 ? (
// // // //               <p>No shopping lists available.</p>
// // // //             ) : (
// // // //               <ul className="space-y-4">
// // // //                 {shoppingLists.map((list) => (
// // // //                   <li
// // // //                     key={list._id}
// // // //                     className={`p-4 rounded-lg shadow ${
// // // //                       selectedList && selectedList._id === list._id ? 'bg-teal-100' : 'bg-white'
// // // //                     }`}
// // // //                   >
// // // //                     <div className="flex justify-between items-center">
// // // //                       <h3
// // // //                         className="text-lg font-medium cursor-pointer"
// // // //                         onClick={() => setSelectedList(list)}
// // // //                       >
// // // //                         {list.title}
// // // //                       </h3>
// // // //                       <div className="flex gap-2">
// // // //                         <button
// // // //                           onClick={() => {
// // // //                             setEditListTitle(list.title);
// // // //                             setIsEditListModalOpen(true);
// // // //                             setSelectedList(list);
// // // //                           }}
// // // //                           className="text-[rgb(38_70_83/var(--tw-bg-opacity,_1))] hover:text-[rgb(45_83_99/var(--tw-bg-opacity,_1))]"
// // // //                           style={{ '--tw-bg-opacity': '1' }}
// // // //                         >
// // // //                           Edit
// // // //                         </button>
// // // //                         <button
// // // //                           onClick={() => handleDeleteList(list._id)}
// // // //                           className="text-red-500 hover:text-red-700"
// // // //                         >
// // // //                           Delete
// // // //                         </button>
// // // //                       </div>
// // // //                     </div>
// // // //                   </li>
// // // //                 ))}
// // // //               </ul>
// // // //             )}
// // // //           </div>

// // // //           <div>
// // // //             {selectedList ? (
// // // //               <>
// // // //                 <button
// // // //                   onClick={() => setIsAddItemModalOpen(true)}
// // // //                   className="mb-4 px-4 py-2 bg-[rgb(38_70_83/var(--tw-bg-opacity,_1))] text-white rounded hover:bg-[rgb(45_83_99/var(--tw-bg-opacity,_1))]"
// // // //                   style={{ '--tw-bg-opacity': '1' }}
// // // //                 >
// // // //                   Add Item
// // // //                 </button>
// // // //                 {selectedList.items.length === 0 ? (
// // // //                   <p>No items in this list.</p>
// // // //                 ) : (
// // // //                   <>
// // // //                     <div className="bg-[rgb(38_70_83/var(--tw-bg-opacity,_1))] text-white p-2 rounded-t mb-2" style={{ '--tw-bg-opacity': '1' }}>
// // // //                       <div className="flex justify-between">
// // // //                         <span>Product Name</span>
// // // //                         <span>Category</span>
// // // //                         <span>Total Quantity</span>
// // // //                         <span>Unit</span>
// // // //                         <span>Value</span>
// // // //                         <span>Actions</span>
// // // //                       </div>
// // // //                     </div>
// // // //                     <ul className="space-y-4">
// // // //                       {selectedList.items.map((item) => (
// // // //                         <li
// // // //                           key={item._id}
// // // //                           className="p-4 bg-white rounded-b-lg shadow flex justify-between"
// // // //                         >
// // // //                           <div>{item.itemName}</div>
// // // //                           <div>{item.category}</div>
// // // //                           <div>{item.quantity}</div>
// // // //                           <div>{item.unit}</div>
// // // //                           <div>$0.00</div>
// // // //                           <div className="flex gap-2">
// // // //                             <button
// // // //                               onClick={() => {
// // // //                                 setEditItem({
// // // //                                   _id: item._id,
// // // //                                   itemName: item.itemName,
// // // //                                   category: item.category,
// // // //                                   quantity: item.quantity,
// // // //                                   unit: item.unit,
// // // //                                 });
// // // //                                 setIsEditItemModalOpen(true);
// // // //                               }}
// // // //                               className="text-[rgb(38_70_83/var(--tw-bg-opacity,_1))] hover:text-[rgb(45_83_99/var(--tw-bg-opacity,_1))]"
// // // //                               style={{ '--tw-bg-opacity': '1' }}
// // // //                             >
// // // //                               Edit
// // // //                             </button>
// // // //                             <button
// // // //                               onClick={() => handleDeleteItem(selectedList._id, item._id)}
// // // //                               className="text-red-500 hover:text-red-700"
// // // //                             >
// // // //                               Delete
// // // //                             </button>
// // // //                           </div>
// // // //                         </li>
// // // //                       ))}
// // // //                     </ul>
// // // //                   </>
// // // //                 )}
// // // //               </>
// // // //             ) : (
// // // //               <p>Select a shopping list to view details.</p>
// // // //             )}
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //       {error && <div className="bg-red-100 text-red-700 p-4 rounded mt-4">{error}</div>}
// // // //       {loading && <p className="text-center text-teal-800 mt-4">Loading...</p>}
// // // //       {isCreateListModalOpen && (
// // // //         <CreateListModal
// // // //           newListTitle={newListTitle}
// // // //           setNewListTitle={setNewListTitle}
// // // //           handleCreateList={handleCreateList}
// // // //           setIsCreateListModalOpen={setIsCreateListModalOpen}
// // // //           error={error}
// // // //           loading={loading}
// // // //         />
// // // //       )}
// // // //       {isAddItemModalOpen && (
// // // //         <AddItemModal
// // // //           newItem={newItem}
// // // //           setNewItem={setNewItem}
// // // //           handleAddItem={handleAddItem}
// // // //           setIsAddItemModalOpen={setIsAddItemModalOpen}
// // // //           error={error}
// // // //           loading={loading}
// // // //         />
// // // //       )}
// // // //       {isEditItemModalOpen && (
// // // //         <EditItemModal
// // // //           editItem={editItem}
// // // //           setEditItem={setEditItem}
// // // //           handleUpdateItem={handleUpdateItem}
// // // //           setIsEditItemModalOpen={setIsEditItemModalOpen}
// // // //           error={error}
// // // //           loading={loading}
// // // //         />
// // // //       )}
// // // //       {isEditListModalOpen && (
// // // //         <EditListModal
// // // //           editListTitle={editListTitle}
// // // //           setEditListTitle={setEditListTitle}
// // // //           handleUpdateList={handleUpdateList}
// // // //           setIsEditListModalOpen={setIsEditListModalOpen}
// // // //           error={error}
// // // //           loading={loading}
// // // //         />
// // // //       )}
// // // //     </>
// // // //   );
// // // // };

// // // // export default ShoppingListManager;

// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';
// // // import AddItemModal from './AddItemModal.jsx';
// // // import CreateListModal from './CreateListModal.jsx';
// // // import EditItemModal from './EditItemModal.jsx';
// // // import EditListModal from './EditListModal.jsx';

// // // const ShoppingListManager = () => {
// // //   const [shoppingLists, setShoppingLists] = useState([]);
// // //   const [selectedList, setSelectedList] = useState(null);
// // //   const [newListTitle, setNewListTitle] = useState('');
// // //   const [newItem, setNewItem] = useState({
// // //     itemName: '',
// // //     category: '',
// // //     quantity: 1,
// // //     unit: 'pieces',
// // //   });
// // //   const [editItem, setEditItem] = useState(null);
// // //   const [editListTitle, setEditListTitle] = useState('');
// // //   const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
// // //   const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false);
// // //   const [isCreateListModalOpen, setIsCreateListModalOpen] = useState(false);
// // //   const [isEditListModalOpen, setIsEditListModalOpen] = useState(false);
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState('');
// // //   const [searchQuery, setSearchQuery] = useState('');
// // //   const [selectedCategory, setSelectedCategory] = useState('All Categories');

// // //   const API_BASE_URL = 'http://localhost:8070/ShoppingList';

// // //   useEffect(() => {
// // //     fetchShoppingLists();
// // //   }, []);

// // //   const fetchShoppingLists = async () => {
// // //     setLoading(true);
// // //     try {
// // //       const response = await axios.get(`${API_BASE_URL}/all`);
// // //       setShoppingLists(response.data);
// // //       setError('');
// // //     } catch (err) {
// // //       setError('Failed to fetch shopping lists');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleCreateList = async () => {
// // //     console.log('handleCreateList triggered with title:', newListTitle);
// // //     if (!newListTitle.trim()) {
// // //       setError('List title is required');
// // //       return;
// // //     }
// // //     setLoading(true);
// // //     try {
// // //       const response = await axios.post(`${API_BASE_URL}/add`, { title: newListTitle, items: [] });
// // //       setShoppingLists((prevLists) => [...prevLists, response.data.shoppingList]);
// // //       setNewListTitle('');
// // //       setIsCreateListModalOpen(false);
// // //       setError('');
// // //     } catch (err) {
// // //       setError('Failed to create shopping list');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleAddItem = async () => {
// // //     console.log('handleAddItem triggered with item:', newItem);
// // //     if (!newItem.itemName || !newItem.category) {
// // //       setError('Item name and category are required');
// // //       return;
// // //     }
// // //     setLoading(true);
// // //     try {
// // //       const response = await axios.post(`${API_BASE_URL}/addItem/${selectedList._id}`, newItem);
// // //       setShoppingLists((prevLists) =>
// // //         prevLists.map((list) =>
// // //           list._id === selectedList._id ? response.data.shoppingList : list
// // //         )
// // //       );
// // //       setNewItem({ itemName: '', category: '', quantity: 1, unit: 'pieces' });
// // //       setIsAddItemModalOpen(false);
// // //       setError('');
// // //     } catch (err) {
// // //       setError('Failed to add item');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleUpdateList = async () => {
// // //     console.log('handleUpdateList triggered with title:', editListTitle);
// // //     if (!editListTitle.trim()) {
// // //       setError('List title is required');
// // //       return;
// // //     }
// // //     setLoading(true);
// // //     try {
// // //       const response = await axios.put(`${API_BASE_URL}/update/${selectedList._id}`, {
// // //         title: editListTitle,
// // //       });
// // //       setShoppingLists((prevLists) =>
// // //         prevLists.map((list) =>
// // //           list._id === selectedList._id ? response.data.shoppingList : list
// // //         )
// // //       );
// // //       setIsEditListModalOpen(false);
// // //       alert('Shopping list updated successfully!');
// // //       setError('');
// // //     } catch (err) {
// // //       setError('Failed to update shopping list');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleUpdateItem = async () => {
// // //     console.log('handleUpdateItem triggered with item:', editItem);
// // //     if (!editItem.itemName || !editItem.category) {
// // //       setError('Item name and category are required');
// // //       return;
// // //     }
// // //     setLoading(true);
// // //     try {
// // //       const response = await axios.put(
// // //         `${API_BASE_URL}/updateItem/${selectedList._id}/${editItem._id}`,
// // //         editItem
// // //       );
// // //       console.log('Update Item Response:', response.data);
// // //       setShoppingLists((prevLists) =>
// // //         prevLists.map((list) =>
// // //           list._id === selectedList._id ? response.data.shoppingList : list
// // //         )
// // //       );
// // //       setIsEditItemModalOpen(false);
// // //       alert('Item updated successfully!');
// // //       setEditItem(null);
// // //       setError('');
// // //     } catch (err) {
// // //       setError('Failed to update item');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleDeleteItem = async (listId, itemId) => {
// // //     console.log('handleDeleteItem triggered with listId:', listId, 'itemId:', itemId);
// // //     if (!window.confirm('Are you sure you want to delete this item?')) {
// // //       return;
// // //     }
// // //     setLoading(true);
// // //     try {
// // //       const response = await axios.delete(`${API_BASE_URL}/deleteItem/${listId}/${itemId}`);
// // //       console.log('Delete Item Response:', response.data);
// // //       setShoppingLists((prevLists) =>
// // //         prevLists.map((list) => (list._id === listId ? response.data.shoppingList : list))
// // //       );
// // //       setError('');
// // //     } catch (err) {
// // //       setError('Failed to delete item');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleDeleteList = async (listId) => {
// // //     console.log('handleDeleteList triggered with listId:', listId);
// // //     if (!window.confirm('Are you sure you want to delete this shopping list?')) {
// // //       return;
// // //     }
// // //     setLoading(true);
// // //     try {
// // //       await axios.delete(`${API_BASE_URL}/delete/${listId}`);
// // //       setShoppingLists((prevLists) => prevLists.filter((list) => list._id !== listId));
// // //       if (selectedList && selectedList._id === listId) setSelectedList(null);
// // //       setError('');
// // //     } catch (err) {
// // //       setError('Failed to delete shopping list');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleExportPDF = () => {
// // //     const { jsPDF } = window.jspdf;
// // //     const doc = new jsPDF();

// // //     doc.setFontSize(18);
// // //     doc.text('Shopping Lists', 14, 22);

// // //     let yPosition = 30;
// // //     shoppingLists.forEach((list, index) => {
// // //       doc.setFontSize(14);
// // //       doc.text(`List ${index + 1}: ${list.title}`, 14, yPosition);
// // //       yPosition += 10;

// // //       if (list.items.length > 0) {
// // //         doc.setFontSize(10);
// // //         doc.text('Product Name', 14, yPosition);
// // //         doc.text('Category', 50, yPosition);
// // //         doc.text('Quantity', 90, yPosition);
// // //         doc.text('Unit', 120, yPosition);
// // //         yPosition += 5;

// // //         list.items.forEach((item) => {
// // //           doc.text(item.itemName, 14, yPosition);
// // //           doc.text(item.category, 50, yPosition);
// // //           doc.text(String(item.quantity), 90, yPosition);
// // //           doc.text(item.unit, 120, yPosition);
// // //           yPosition += 8;
// // //         });
// // //       } else {
// // //         doc.setFontSize(10);
// // //         doc.text('No items in this list.', 14, yPosition);
// // //         yPosition += 8;
// // //       }

// // //       yPosition += 5;

// // //       if (yPosition > 270) {
// // //         doc.addPage();
// // //         yPosition = 20;
// // //       }
// // //     });

// // //     doc.save('shopping-lists.pdf');
// // //   };

// // //   // Get unique categories from all items across all lists
// // //   const allCategories = [
// // //     'All Categories',
// // //     ...new Set(
// // //       shoppingLists
// // //         .flatMap((list) => list.items.map((item) => item.category))
// // //         .filter((category) => category)
// // //     ),
// // //   ];

// // //   // Filter shopping lists based on search query
// // //   const filteredLists = shoppingLists.filter((list) =>
// // //     list.title.toLowerCase().includes(searchQuery.toLowerCase())
// // //   );

// // //   // Filter items in the selected list based on selected category
// // //   const filteredItems = selectedList
// // //     ? selectedCategory === 'All Categories'
// // //       ? selectedList.items
// // //       : selectedList.items.filter((item) => item.category === selectedCategory)
// // //     : [];

// // //   return (
// // //     <>
// // //       <div className="min-h-screen p-6" style={{ backgroundColor: 'rgb(244 241 222 / var(--tw-bg-opacity, 1))' }}>
// // //         <div className="bg-[rgb(38_70_83/var(--tw-bg-opacity,_1))] text-white p-4 rounded-t-lg flex justify-between items-center mb-4" style={{ '--tw-bg-opacity': '1' }}>
// // //           <h1 className="text-3xl font-bold">Shopping List Manager</h1>
// // //           <div>
// // //             <button
// // //               onClick={() => setIsCreateListModalOpen(true)}
// // //               className="mr-2 px-4 py-2 bg-[rgb(42_157_143/var(--tw-bg-opacity,_1))] text-white rounded hover:bg-[rgb(45_83_99/var(--tw-bg-opacity,_1))]"
// // //               style={{ '--tw-bg-opacity': '1' }}
// // //             >
// // //               Add New List
// // //             </button>
// // //             <button
// // //               onClick={handleExportPDF}
// // //               className="px-4 py-2 bg-[rgb(42_157_143/var(--tw-bg-opacity,_1))] text-white rounded hover:bg-[rgb(45_83_99/var(--tw-bg-opacity,_1))]"
// // //               style={{ '--tw-bg-opacity': '1' }}
// // //             >
// // //               Export PDF
// // //             </button>
// // //           </div>
// // //         </div>

// // //         <div className="bg-white p-4 rounded-b-lg shadow mb-4 flex justify-between items-center border-teal-500 border-2">
// // //           <input
// // //             type="text"
// // //             placeholder="Search by list name or category..."
// // //             value={searchQuery}
// // //             onChange={(e) => setSearchQuery(e.target.value)}
// // //             className="p-2 border-teal-500 border rounded w-2/3"
// // //           />
// // //           <select
// // //             value={selectedCategory}
// // //             onChange={(e) => setSelectedCategory(e.target.value)}
// // //             className="p-2 border-teal-500 border rounded w-1/3"
// // //           >
// // //             {allCategories.map((category) => (
// // //               <option key={category} value={category}>
// // //                 {category}
// // //               </option>
// // //             ))}
// // //           </select>
// // //         </div>

// // //         <div className="bg-[rgb(38_70_83/var(--tw-bg-opacity,_1))] text-white p-2 rounded mb-4" style={{ '--tw-bg-opacity': '1' }}>
// // //           <p>Total Lists: {filteredLists.length}</p>
// // //         </div>

// // //         <div className="bg-[rgb(38_70_83/var(--tw-bg-opacity,_1))] text-white p-2 rounded mb-4 flex justify-between" style={{ '--tw-bg-opacity': '1' }}>
// // //           <div className="w-1/2">
// // //             <h2 className="text-xl font-semibold">Your Shopping Lists</h2>
// // //           </div>
// // //           {selectedList && (
// // //             <div className="w-1/2">
// // //               <h2 className="text-xl font-semibold">{selectedList.title}</h2>
// // //             </div>
// // //           )}
// // //         </div>

// // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //           <div>
// // //             {filteredLists.length === 0 ? (
// // //               <p>No shopping lists match your search.</p>
// // //             ) : (
// // //               <ul className="space-y-4">
// // //                 {filteredLists.map((list) => (
// // //                   <li
// // //                     key={list._id}
// // //                     className={`p-4 rounded-lg shadow ${
// // //                       selectedList && selectedList._id === list._id ? 'bg-teal-100' : 'bg-white'
// // //                     }`}
// // //                   >
// // //                     <div className="flex justify-between items-center">
// // //                       <h3
// // //                         className="text-lg font-medium cursor-pointer"
// // //                         onClick={() => setSelectedList(list)}
// // //                       >
// // //                         {list.title}
// // //                       </h3>
// // //                       <div className="flex gap-2">
// // //                         <button
// // //                           onClick={() => {
// // //                             setEditListTitle(list.title);
// // //                             setIsEditListModalOpen(true);
// // //                             setSelectedList(list);
// // //                           }}
// // //                           className="text-[rgb(38_70_83/var(--tw-bg-opacity,_1))] hover:text-[rgb(45_83_99/var(--tw-bg-opacity,_1))]"
// // //                           style={{ '--tw-bg-opacity': '1' }}
// // //                         >
// // //                           Edit
// // //                         </button>
// // //                         <button
// // //                           onClick={() => handleDeleteList(list._id)}
// // //                           className="text-red-500 hover:text-red-700"
// // //                         >
// // //                           Delete
// // //                         </button>
// // //                       </div>
// // //                     </div>
// // //                   </li>
// // //                 ))}
// // //               </ul>
// // //             )}
// // //           </div>

// // //           <div>
// // //             {selectedList ? (
// // //               <>
// // //                 <button
// // //                   onClick={() => setIsAddItemModalOpen(true)}
// // //                   className="mb-4 px-4 py-2 bg-[rgb(38_70_83/var(--tw-bg-opacity,_1))] text-white rounded hover:bg-[rgb(45_83_99/var(--tw-bg-opacity,_1))]"
// // //                   style={{ '--tw-bg-opacity': '1' }}
// // //                 >
// // //                   Add Item
// // //                 </button>
// // //                 {filteredItems.length === 0 ? (
// // //                   <p>No items match the selected category.</p>
// // //                 ) : (
// // //                   <>
// // //                     <div className="bg-[rgb(38_70_83/var(--tw-bg-opacity,_1))] text-white p-2 rounded-t mb-2" style={{ '--tw-bg-opacity': '1' }}>
// // //                       <div className="flex justify-between">
// // //                         <span>Product Name</span>
// // //                         <span>Category</span>
// // //                         <span>Total Quantity</span>
// // //                         <span>Unit</span>
// // //                         <span>Value</span>
// // //                         <span>Actions</span>
// // //                       </div>
// // //                     </div>
// // //                     <ul className="space-y-4">
// // //                       {filteredItems.map((item) => (
// // //                         <li
// // //                           key={item._id}
// // //                           className="p-4 bg-white rounded-b-lg shadow flex justify-between"
// // //                         >
// // //                           <div>{item.itemName}</div>
// // //                           <div>{item.category}</div>
// // //                           <div>{item.quantity}</div>
// // //                           <div>{item.unit}</div>
// // //                           <div>$0.00</div>
// // //                           <div className="flex gap-2">
// // //                             <button
// // //                               onClick={() => {
// // //                                 setEditItem({
// // //                                   _id: item._id,
// // //                                   itemName: item.itemName,
// // //                                   category: item.category,
// // //                                   quantity: item.quantity,
// // //                                   unit: item.unit,
// // //                                 });
// // //                                 setIsEditItemModalOpen(true);
// // //                               }}
// // //                               className="text-[rgb(38_70_83/var(--tw-bg-opacity,_1))] hover:text-[rgb(45_83_99/var(--tw-bg-opacity,_1))]"
// // //                               style={{ '--tw-bg-opacity': '1' }}
// // //                             >
// // //                               Edit
// // //                             </button>
// // //                             <button
// // //                               onClick={() => handleDeleteItem(selectedList._id, item._id)}
// // //                               className="text-red-500 hover:text-red-700"
// // //                             >
// // //                               Delete
// // //                             </button>
// // //                           </div>
// // //                         </li>
// // //                       ))}
// // //                     </ul>
// // //                   </>
// // //                 )}
// // //               </>
// // //             ) : (
// // //               <p>Select a shopping list to view details.</p>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </div>
// // //       {error && <div className="bg-red-100 text-red-700 p-4 rounded mt-4">{error}</div>}
// // //       {loading && <p className="text-center text-teal-800 mt-4">Loading...</p>}
// // //       {isCreateListModalOpen && (
// // //         <CreateListModal
// // //           newListTitle={newListTitle}
// // //           setNewListTitle={setNewListTitle}
// // //           handleCreateList={handleCreateList}
// // //           setIsCreateListModalOpen={setIsCreateListModalOpen}
// // //           error={error}
// // //           loading={loading}
// // //         />
// // //       )}
// // //       {isAddItemModalOpen && (
// // //         <AddItemModal
// // //           newItem={newItem}
// // //           setNewItem={setNewItem}
// // //           handleAddItem={handleAddItem}
// // //           setIsAddItemModalOpen={setIsAddItemModalOpen}
// // //           error={error}
// // //           loading={loading}
// // //         />
// // //       )}
// // //       {isEditItemModalOpen && (
// // //         <EditItemModal
// // //           editItem={editItem}
// // //           setEditItem={setEditItem}
// // //           handleUpdateItem={handleUpdateItem}
// // //           setIsEditItemModalOpen={setIsEditItemModalOpen}
// // //           error={error}
// // //           loading={loading}
// // //         />
// // //       )}
// // //       {isEditListModalOpen && (
// // //         <EditListModal
// // //           editListTitle={editListTitle}
// // //           setEditListTitle={setEditListTitle}
// // //           handleUpdateList={handleUpdateList}
// // //           setIsEditListModalOpen={setIsEditListModalOpen}
// // //           error={error}
// // //           loading={loading}
// // //         />
// // //       )}
// // //     </>
// // //   );
// // // };

// // // export default ShoppingListManager;

// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import AddItemModal from './AddItemModal.jsx';
// // import CreateListModal from './CreateListModal.jsx';
// // import EditItemModal from './EditItemModal.jsx';
// // import EditListModal from './EditListModal.jsx';

// // const ShoppingListManager = () => {
// //   const [shoppingLists, setShoppingLists] = useState([]);
// //   const [selectedList, setSelectedList] = useState(null);
// //   const [newListTitle, setNewListTitle] = useState('');
// //   const [newItem, setNewItem] = useState({
// //     itemName: '',
// //     category: '',
// //     quantity: 1,
// //     unit: 'pieces',
// //   });
// //   const [editItem, setEditItem] = useState(null);
// //   const [editListTitle, setEditListTitle] = useState('');
// //   const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
// //   const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false);
// //   const [isCreateListModalOpen, setIsCreateListModalOpen] = useState(false);
// //   const [isEditListModalOpen, setIsEditListModalOpen] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState('');
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [selectedCategory, setSelectedCategory] = useState('All Categories');

// //   const API_BASE_URL = 'http://localhost:8070/ShoppingList';

// //   useEffect(() => {
// //     fetchShoppingLists();
// //   }, []);

// //   const fetchShoppingLists = async () => {
// //     setLoading(true);
// //     try {
// //       const response = await axios.get(`${API_BASE_URL}/all`);
// //       setShoppingLists(response.data);
// //       setError('');
// //     } catch (err) {
// //       setError('Failed to fetch shopping lists');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleCreateList = async () => {
// //     console.log('handleCreateList triggered with title:', newListTitle);
// //     if (!newListTitle.trim()) {
// //       setError('List title is required');
// //       return;
// //     }
// //     setLoading(true);
// //     try {
// //       const response = await axios.post(`${API_BASE_URL}/add`, { title: newListTitle, items: [] });
// //       setShoppingLists((prevLists) => [...prevLists, response.data.shoppingList]);
// //       setNewListTitle('');
// //       setIsCreateListModalOpen(false);
// //       setError('');
// //     } catch (err) {
// //       setError('Failed to create shopping list');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleAddItem = async () => {
// //     console.log('handleAddItem triggered with item:', newItem);
// //     if (!newItem.itemName || !newItem.category) {
// //       setError('Item name and category are required');
// //       return;
// //     }
// //     setLoading(true);
// //     try {
// //       const response = await axios.post(`${API_BASE_URL}/addItem/${selectedList._id}`, newItem);
// //       setShoppingLists((prevLists) =>
// //         prevLists.map((list) =>
// //           list._id === selectedList._id ? response.data.shoppingList : list
// //         )
// //       );
// //       setNewItem({ itemName: '', category: '', quantity: 1, unit: 'pieces' });
// //       setIsAddItemModalOpen(false);
// //       setError('');
// //     } catch (err) {
// //       setError('Failed to add item');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleUpdateList = async () => {
// //     console.log('handleUpdateList triggered with title:', editListTitle);
// //     if (!editListTitle.trim()) {
// //       setError('List title is required');
// //       return;
// //     }
// //     setLoading(true);
// //     try {
// //       const response = await axios.put(`${API_BASE_URL}/update/${selectedList._id}`, {
// //         title: editListTitle,
// //       });
// //       setShoppingLists((prevLists) =>
// //         prevLists.map((list) =>
// //           list._id === selectedList._id ? response.data.shoppingList : list
// //         )
// //       );
// //       setIsEditListModalOpen(false);
// //       alert('Shopping list updated successfully!');
// //       setError('');
// //     } catch (err) {
// //       setError('Failed to update shopping list');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleUpdateItem = async () => {
// //     console.log('handleUpdateItem triggered with item:', editItem);
// //     if (!editItem.itemName || !editItem.category) {
// //       setError('Item name and category are required');
// //       return;
// //     }
// //     setLoading(true);
// //     try {
// //       const response = await axios.put(
// //         `${API_BASE_URL}/updateItem/${selectedList._id}/${editItem._id}`,
// //         editItem
// //       );
// //       console.log('Update Item Response:', response.data);
// //       setShoppingLists((prevLists) =>
// //         prevLists.map((list) =>
// //           list._id === selectedList._id ? response.data.shoppingList : list
// //         )
// //       );
// //       setIsEditItemModalOpen(false);
// //       alert('Item updated successfully!');
// //       setEditItem(null);
// //       setError('');
// //     } catch (err) {
// //       setError('Failed to update item');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleDeleteItem = async (listId, itemId) => {
// //     console.log('handleDeleteItem triggered with listId:', listId, 'itemId:', itemId);
// //     if (!window.confirm('Are you sure you want to delete this item?')) {
// //       return;
// //     }
// //     setLoading(true);
// //     try {
// //       const response = await axios.delete(`${API_BASE_URL}/deleteItem/${listId}/${itemId}`);
// //       console.log('Delete Item Response:', response.data);
// //       setShoppingLists((prevLists) =>
// //         prevLists.map((list) => (list._id === listId ? response.data.shoppingList : list))
// //       );
// //       setError('');
// //     } catch (err) {
// //       setError('Failed to delete item');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleDeleteList = async (listId) => {
// //     console.log('handleDeleteList triggered with listId:', listId);
// //     if (!window.confirm('Are you sure you want to delete this shopping list?')) {
// //       return;
// //     }
// //     setLoading(true);
// //     try {
// //       await axios.delete(`${API_BASE_URL}/delete/${listId}`);
// //       setShoppingLists((prevLists) => prevLists.filter((list) => list._id !== listId));
// //       if (selectedList && selectedList._id === listId) setSelectedList(null);
// //       setError('');
// //     } catch (err) {
// //       setError('Failed to delete shopping list');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleExportPDF = () => {
// //     const { jsPDF } = window.jspdf;
// //     const doc = new jsPDF();

// //     doc.setFontSize(18);
// //     doc.text('Shopping Lists', 14, 22);

// //     let yPosition = 30;
// //     shoppingLists.forEach((list, index) => {
// //       doc.setFontSize(14);
// //       doc.text(`List ${index + 1}: ${list.title}`, 14, yPosition);
// //       yPosition += 10;

// //       if (list.items.length > 0) {
// //         doc.setFontSize(10);
// //         doc.text('Product Name', 14, yPosition);
// //         doc.text('Category', 50, yPosition);
// //         doc.text('Quantity', 90, yPosition);
// //         doc.text('Unit', 120, yPosition);
// //         yPosition += 5;

// //         list.items.forEach((item) => {
// //           doc.text(item.itemName, 14, yPosition);
// //           doc.text(item.category, 50, yPosition);
// //           doc.text(String(item.quantity), 90, yPosition);
// //           doc.text(item.unit, 120, yPosition);
// //           yPosition += 8;
// //         });
// //       } else {
// //         doc.setFontSize(10);
// //         doc.text('No items in this list.', 14, yPosition);
// //         yPosition += 8;
// //       }

// //       yPosition += 5;

// //       if (yPosition > 270) {
// //         doc.addPage();
// //         yPosition = 20;
// //       }
// //     });

// //     doc.save('shopping-lists.pdf');
// //   };

// //   const allCategories = [
// //     'All Categories',
// //     ...new Set(
// //       shoppingLists
// //         .flatMap((list) => list.items.map((item) => item.category))
// //         .filter((category) => category)
// //     ),
// //   ];

// //   const filteredLists = shoppingLists.filter((list) =>
// //     list.title.toLowerCase().includes(searchQuery.toLowerCase())
// //   );

// //   const filteredItems = selectedList
// //     ? selectedCategory === 'All Categories'
// //       ? selectedList.items
// //       : selectedList.items.filter((item) => item.category === selectedCategory)
// //     : [];

// //   return (
// //     <>
// //       <div className="min-h-screen p-6" style={{ backgroundColor: 'rgb(244 241 222 / var(--tw-bg-opacity, 1))' }}>
// //         <div className="bg-[rgb(38_70_83/var(--tw-bg-opacity,_1))] text-white p-4 rounded-t-lg flex justify-between items-center mb-4" style={{ '--tw-bg-opacity': '1' }}>
// //           <h1 className="text-3xl font-bold">Shopping List Manager</h1>
// //           <div>
// //             <button
// //               onClick={() => setIsCreateListModalOpen(true)}
// //               className="mr-2 px-4 py-2 bg-[rgb(42_157_143/var(--tw-bg-opacity,_1))] text-white rounded hover:bg-[rgb(45_83_99/var(--tw-bg-opacity,_1))]"
// //               style={{ '--tw-bg-opacity': '1' }}
// //             >
// //               Add New List
// //             </button>
// //             <button
// //               onClick={handleExportPDF}
// //               className="px-4 py-2 bg-[rgb(42_157_143/var(--tw-bg-opacity,_1))] text-white rounded hover:bg-[rgb(45_83_99/var(--tw-bg-opacity,_1))]"
// //               style={{ '--tw-bg-opacity': '1' }}
// //             >
// //               Export PDF
// //             </button>
// //           </div>
// //         </div>

// //         <div className="bg-white p-4 rounded-b-lg shadow mb-4 flex justify-between items-center border-teal-500 border-2">
// //           <input
// //             type="text"
// //             placeholder="Search by list name or category..."
// //             value={searchQuery}
// //             onChange={(e) => setSearchQuery(e.target.value)}
// //             className="p-2 border-teal-500 border rounded w-2/3"
// //           />
// //           <select
// //             value={selectedCategory}
// //             onChange={(e) => setSelectedCategory(e.target.value)}
// //             className="p-2 border-teal-500 border rounded w-1/3"
// //           >
// //             {allCategories.map((category) => (
// //               <option key={category} value={category}>
// //                 {category}
// //               </option>
// //             ))}
// //           </select>
// //         </div>

// //         <div className="bg-[rgb(38_70_83/var(--tw-bg-opacity,_1))] text-white p-2 rounded mb-4" style={{ '--tw-bg-opacity': '1' }}>
// //           <p>Total Lists: {filteredLists.length}</p>
// //         </div>

// //         <div className="bg-[rgb(38_70_83/var(--tw-bg-opacity,_1))] text-white p-2 rounded mb-4 flex justify-between" style={{ '--tw-bg-opacity': '1' }}>
// //           <div className="w-1/2">
// //             <h2 className="text-xl font-semibold">Your Shopping Lists</h2>
// //           </div>
// //           {selectedList && (
// //             <div className="w-1/2">
// //               <h2 className="text-xl font-semibold">{selectedList.title}</h2>
// //             </div>
// //           )}
// //         </div>

// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //           <div>
// //             {filteredLists.length === 0 ? (
// //               <p>No shopping lists match your search.</p>
// //             ) : (
// //               <ul className="space-y-4">
// //                 {filteredLists.map((list) => (
// //                   <li
// //                     key={list._id}
// //                     className={`p-4 rounded-lg shadow ${
// //                       selectedList && selectedList._id === list._id ? 'bg-teal-100' : 'bg-white'
// //                     }`}
// //                   >
// //                     <div className="flex justify-between items-center">
// //                       <h3
// //                         className="text-lg font-medium cursor-pointer"
// //                         onClick={() => setSelectedList(list)}
// //                       >
// //                         {list.title}
// //                       </h3>
// //                       <div className="flex gap-2">
// //                         <button
// //                           onClick={() => {
// //                             setEditListTitle(list.title);
// //                             setIsEditListModalOpen(true);
// //                             setSelectedList(list);
// //                           }}
// //                           className="text-[rgb(38_70_83/var(--tw-bg-opacity,_1))] hover:text-[rgb(45_83_99/var(--tw-bg-opacity,_1))]"
// //                           style={{ '--tw-bg-opacity': '1' }}
// //                         >
// //                           Edit
// //                         </button>
// //                         <button
// //                           onClick={() => handleDeleteList(list._id)}
// //                           className="text-red-500 hover:text-red-700"
// //                         >
// //                           Delete
// //                         </button>
// //                       </div>
// //                     </div>
// //                   </li>
// //                 ))}
// //               </ul>
// //             )}
// //           </div>

// //           <div>
// //             {selectedList ? (
// //               <>
// //                 <button
// //                   onClick={() => setIsAddItemModalOpen(true)}
// //                   className="mb-4 px-4 py-2 bg-[rgb(38_70_83/var(--tw-bg-opacity,_1))] text-white rounded hover:bg-[rgb(45_83_99/var(--tw-bg-opacity,_1))]"
// //                   style={{ '--tw-bg-opacity': '1' }}
// //                 >
// //                   Add Item
// //                 </button>
// //                 {filteredItems.length === 0 ? (
// //                   <p>No items match the selected category.</p>
// //                 ) : (
// //                   <>
// //                     <div className="bg-[rgb(38_70_83/var(--tw-bg-opacity,_1))] text-white p-2 rounded-t mb-2" style={{ '--tw-bg-opacity': '1' }}>
// //                       <div className="flex justify-between">
// //                         <span>Product Name</span>
// //                         <span>Category</span>
// //                         <span>Total Quantity</span>
// //                         <span>Unit</span>
// //                         <span>Actions</span>
// //                       </div>
// //                     </div>
// //                     <ul className="space-y-4">
// //                       {filteredItems.map((item) => (
// //                         <li
// //                           key={item._id}
// //                           className="p-4 bg-white rounded-b-lg shadow flex justify-between"
// //                         >
// //                           <div>{item.itemName}</div>
// //                           <div>{item.category}</div>
// //                           <div>{item.quantity}</div>
// //                           <div>{item.unit}</div>
// //                           <div className="flex gap-2">
// //                             <button
// //                               onClick={() => {
// //                                 setEditItem({
// //                                   _id: item._id,
// //                                   itemName: item.itemName,
// //                                   category: item.category,
// //                                   quantity: item.quantity,
// //                                   unit: item.unit,
// //                                 });
// //                                 setIsEditItemModalOpen(true);
// //                               }}
// //                               className="text-[rgb(38_70_83/var(--tw-bg-opacity,_1))] hover:text-[rgb(45_83_99/var(--tw-bg-opacity,_1))]"
// //                               style={{ '--tw-bg-opacity': '1' }}
// //                             >
// //                               Edit
// //                             </button>
// //                             <button
// //                               onClick={() => handleDeleteItem(selectedList._id, item._id)}
// //                               className="text-red-500 hover:text-red-700"
// //                             >
// //                               Delete
// //                             </button>
// //                           </div>
// //                         </li>
// //                       ))}
// //                     </ul>
// //                   </>
// //                 )}
// //               </>
// //             ) : (
// //               <p>Select a shopping list to view details.</p>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //       {error && <div className="bg-red-100 text-red-700 p-4 rounded mt-4">{error}</div>}
// //       {loading && <p className="text-center text-teal-800 mt-4">Loading...</p>}
// //       {isCreateListModalOpen && (
// //         <CreateListModal
// //           newListTitle={newListTitle}
// //           setNewListTitle={setNewListTitle}
// //           handleCreateList={handleCreateList}
// //           setIsCreateListModalOpen={setIsCreateListModalOpen}
// //           error={error}
// //           loading={loading}
// //         />
// //       )}
// //       {isAddItemModalOpen && (
// //         <AddItemModal
// //           newItem={newItem}
// //           setNewItem={setNewItem}
// //           handleAddItem={handleAddItem}
// //           setIsAddItemModalOpen={setIsAddItemModalOpen}
// //           error={error}
// //           loading={loading}
// //         />
// //       )}
// //       {isEditItemModalOpen && (
// //         <EditItemModal
// //           editItem={editItem}
// //           setEditItem={setEditItem}
// //           handleUpdateItem={handleUpdateItem}
// //           setIsEditItemModalOpen={setIsEditItemModalOpen}
// //           error={error}
// //           loading={loading}
// //         />
// //       )}
// //       {isEditListModalOpen && (
// //         <EditListModal
// //           editListTitle={editListTitle}
// //           setEditListTitle={setEditListTitle}
// //           handleUpdateList={handleUpdateList}
// //           setIsEditListModalOpen={setIsEditListModalOpen}
// //           error={error}
// //           loading={loading}
// //         />
// //       )}
// //     </>
// //   );
// // };

// // export default ShoppingListManager;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import AddItemModal from './AddItemModal.jsx';
// import CreateListModal from './CreateListModal.jsx';
// import EditItemModal from './EditItemModal.jsx';
// import EditListModal from './EditListModal.jsx';

// const ShoppingListManager = () => {
//   const [shoppingLists, setShoppingLists] = useState([]);
//   const [selectedList, setSelectedList] = useState(null);
//   const [newListTitle, setNewListTitle] = useState('');
//   const [newItem, setNewItem] = useState({
//     itemName: '',
//     category: '',
//     quantity: 1,
//     unit: 'pieces',
//   });
//   const [editItem, setEditItem] = useState(null);
//   const [editListTitle, setEditListTitle] = useState('');
//   const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
//   const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false);
//   const [isCreateListModalOpen, setIsCreateListModalOpen] = useState(false);
//   const [isEditListModalOpen, setIsEditListModalOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('All Categories');
//   const [listSortBy, setListSortBy] = useState('title'); // Default sort by title
//   const [listSortOrder, setListSortOrder] = useState('asc'); // Default ascending
//   const [itemSortBy, setItemSortBy] = useState('itemName'); // Default sort by item name
//   const [itemSortOrder, setItemSortOrder] = useState('asc'); // Default ascending

//   const API_BASE_URL = 'http://localhost:8070/ShoppingList';

//   useEffect(() => {
//     fetchShoppingLists();
//   }, []);

//   const fetchShoppingLists = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${API_BASE_URL}/all`);
//       setShoppingLists(response.data);
//       setError('');
//     } catch (err) {
//       setError('Failed to fetch shopping lists');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCreateList = async () => {
//     console.log('handleCreateList triggered with title:', newListTitle);
//     if (!newListTitle.trim()) {
//       setError('List title is required');
//       return;
//     }
//     setLoading(true);
//     try {
//       const response = await axios.post(`${API_BASE_URL}/add`, { title: newListTitle, items: [] });
//       setShoppingLists((prevLists) => [...prevLists, response.data.shoppingList]);
//       setNewListTitle('');
//       setIsCreateListModalOpen(false);
//       setError('');
//     } catch (err) {
//       setError('Failed to create shopping list');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddItem = async () => {
//     console.log('handleAddItem triggered with item:', newItem);
//     if (!newItem.itemName || !newItem.category) {
//       setError('Item name and category are required');
//       return;
//     }
//     setLoading(true);
//     try {
//       const response = await axios.post(`${API_BASE_URL}/addItem/${selectedList._id}`, newItem);
//       setShoppingLists((prevLists) =>
//         prevLists.map((list) =>
//           list._id === selectedList._id ? response.data.shoppingList : list
//         )
//       );
//       setNewItem({ itemName: '', category: '', quantity: 1, unit: 'pieces' });
//       setIsAddItemModalOpen(false);
//       setError('');
//     } catch (err) {
//       setError('Failed to add item');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpdateList = async () => {
//     console.log('handleUpdateList triggered with title:', editListTitle);
//     if (!editListTitle.trim()) {
//       setError('List title is required');
//       return;
//     }
//     setLoading(true);
//     try {
//       const response = await axios.put(`${API_BASE_URL}/update/${selectedList._id}`, {
//         title: editListTitle,
//       });
//       setShoppingLists((prevLists) =>
//         prevLists.map((list) =>
//           list._id === selectedList._id ? response.data.shoppingList : list
//         )
//       );
//       setIsEditListModalOpen(false);
//       alert('Shopping list updated successfully!');
//       setError('');
//     } catch (err) {
//       setError('Failed to update shopping list');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpdateItem = async () => {
//     console.log('handleUpdateItem triggered with item:', editItem);
//     if (!editItem.itemName || !editItem.category) {
//       setError('Item name and category are required');
//       return;
//     }
//     setLoading(true);
//     try {
//       const response = await axios.put(
//         `${API_BASE_URL}/updateItem/${selectedList._id}/${editItem._id}`,
//         editItem
//       );
//       console.log('Update Item Response:', response.data);
//       setShoppingLists((prevLists) =>
//         prevLists.map((list) =>
//           list._id === selectedList._id ? response.data.shoppingList : list
//         )
//       );
//       setIsEditItemModalOpen(false);
//       alert('Item updated successfully!');
//       setEditItem(null);
//       setError('');
//     } catch (err) {
//       setError('Failed to update item');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteItem = async (listId, itemId) => {
//     console.log('handleDeleteItem triggered with listId:', listId, 'itemId:', itemId);
//     if (!window.confirm('Are you sure you want to delete this item?')) {
//       return;
//     }
//     setLoading(true);
//     try {
//       const response = await axios.delete(`${API_BASE_URL}/deleteItem/${listId}/${itemId}`);
//       console.log('Delete Item Response:', response.data);
//       setShoppingLists((prevLists) =>
//         prevLists.map((list) => (list._id === listId ? response.data.shoppingList : list))
//       );
//       setError('');
//     } catch (err) {
//       setError('Failed to delete item');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteList = async (listId) => {
//     console.log('handleDeleteList triggered with listId:', listId);
//     if (!window.confirm('Are you sure you want to delete this shopping list?')) {
//       return;
//     }
//     setLoading(true);
//     try {
//       await axios.delete(`${API_BASE_URL}/delete/${listId}`);
//       setShoppingLists((prevLists) => prevLists.filter((list) => list._id !== listId));
//       if (selectedList && selectedList._id === listId) setSelectedList(null);
//       setError('');
//     } catch (err) {
//       setError('Failed to delete shopping list');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleExportPDF = () => {
//     const { jsPDF } = window.jspdf;
//     const doc = new jsPDF();

//     doc.setFontSize(18);
//     doc.text('Shopping Lists', 14, 22);

//     let yPosition = 30;
//     shoppingLists.forEach((list, index) => {
//       doc.setFontSize(14);
//       doc.text(`List ${index + 1}: ${list.title}`, 14, yPosition);
//       yPosition += 10;

//       if (list.items.length > 0) {
//         doc.setFontSize(10);
//         doc.text('Product Name', 14, yPosition);
//         doc.text('Category', 50, yPosition);
//         doc.text('Quantity', 90, yPosition);
//         doc.text('Unit', 120, yPosition);
//         yPosition += 5;

//         list.items.forEach((item) => {
//           doc.text(item.itemName, 14, yPosition);
//           doc.text(item.category, 50, yPosition);
//           doc.text(String(item.quantity), 90, yPosition);
//           doc.text(item.unit, 120, yPosition);
//           yPosition += 8;
//         });
//       } else {
//         doc.setFontSize(10);
//         doc.text('No items in this list.', 14, yPosition);
//         yPosition += 8;
//       }

//       yPosition += 5;

//       if (yPosition > 270) {
//         doc.addPage();
//         yPosition = 20;
//       }
//     });

//     doc.save('shopping-lists.pdf');
//   };

//   const allCategories = [
//     'All Categories',
//     ...new Set(
//       shoppingLists
//         .flatMap((list) => list.items.map((item) => item.category))
//         .filter((category) => category)
//     ),
//   ];

//   const filteredLists = shoppingLists.filter((list) =>
//     list.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const sortedLists = [...filteredLists].sort((a, b) => {
//     const valueA = a[listSortBy].toLowerCase();
//     const valueB = b[listSortBy].toLowerCase();
//     if (listSortOrder === 'asc') {
//       return valueA < valueB ? -1 : 1;
//     } else {
//       return valueA > valueB ? -1 : 1;
//     }
//   });

//   const filteredItems = selectedList
//     ? selectedCategory === 'All Categories'
//       ? selectedList.items
//       : selectedList.items.filter((item) => item.category === selectedCategory)
//     : [];

//   const sortedItems = [...filteredItems].sort((a, b) => {
//     const valueA = itemSortBy === 'quantity' ? a[itemSortBy] : a[itemSortBy].toLowerCase();
//     const valueB = itemSortBy === 'quantity' ? b[itemSortBy] : b[itemSortBy].toLowerCase();
//     if (itemSortOrder === 'asc') {
//       return valueA < valueB ? -1 : 1;
//     } else {
//       return valueA > valueB ? -1 : 1;
//     }
//   });

//   return (
//     <>
//       <div className="min-h-screen p-6" style={{ backgroundColor: 'rgb(244 241 222 / var(--tw-bg-opacity, 1))' }}>
//         <div className="bg-[rgb(38_70_83/var(--tw-bg-opacity,_1))] text-white p-4 rounded-t-lg flex justify-between items-center mb-4" style={{ '--tw-bg-opacity': '1' }}>
//           <h1 className="text-3xl font-bold">Shopping List Manager</h1>
//           <div>
//             <button
//               onClick={() => setIsCreateListModalOpen(true)}
//               className="mr-2 px-4 py-2 bg-[rgb(42_157_143/var(--tw-bg-opacity,_1))] text-white rounded hover:bg-[rgb(45_83_99/var(--tw-bg-opacity,_1))]"
//               style={{ '--tw-bg-opacity': '1' }}
//             >
//               Add New List
//             </button>
//             <button
//               onClick={handleExportPDF}
//               className="px-4 py-2 bg-[rgb(42_157_143/var(--tw-bg-opacity,_1))] text-white rounded hover:bg-[rgb(45_83_99/var(--tw-bg-opacity,_1))]"
//               style={{ '--tw-bg-opacity': '1' }}
//             >
//               Export PDF
//             </button>
//           </div>
//         </div>

//         <div className="bg-white p-4 rounded-b-lg shadow mb-4 flex justify-between items-center border-teal-500 border-2">
//           <input
//             type="text"
//             placeholder="Search by list name or category..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="p-2 border-teal-500 border rounded w-2/3"
//           />
//           <select
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//             className="p-2 border-teal-500 border rounded w-1/3"
//           >
//             {allCategories.map((category) => (
//               <option key={category} value={category}>
//                 {category}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="bg-[rgb(38_70_83/var(--tw-bg-opacity,_1))] text-white p-2 rounded mb-4" style={{ '--tw-bg-opacity': '1' }}>
//           <p>Total Lists: {sortedLists.length}</p>
//         </div>

//         <div className="flex justify-between items-center mb-4">
//           <div className="bg-[rgb(38_70_83/var(--tw-bg-opacity,_1))] text-white p-2 rounded flex-1" style={{ '--tw-bg-opacity': '1' }}>
//             <h2 className="text-xl font-semibold">Your Shopping Lists</h2>
//           </div>
//           <div className="ml-4 flex items-center">
//             <label className="mr-2 text-teal-800">Sort by:</label>
//             <select
//               value={`${listSortBy}-${listSortOrder}`}
//               onChange={(e) => {
//                 const [sortBy, sortOrder] = e.target.value.split('-');
//                 setListSortBy(sortBy);
//                 setListSortOrder(sortOrder);
//               }}
//               className="p-2 border-teal-500 border rounded"
//             >
//               <option value="title-asc">Title (A-Z)</option>
//               <option value="title-desc">Title (Z-A)</option>
//             </select>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             {sortedLists.length === 0 ? (
//               <p>No shopping lists match your search.</p>
//             ) : (
//               <ul className="space-y-4">
//                 {sortedLists.map((list) => (
//                   <li
//                     key={list._id}
//                     className={`p-4 rounded-lg shadow ${
//                       selectedList && selectedList._id === list._id ? 'bg-teal-100' : 'bg-white'
//                     }`}
//                   >
//                     <div className="flex justify-between items-center">
//                       <h3
//                         className="text-lg font-medium cursor-pointer"
//                         onClick={() => setSelectedList(list)}
//                       >
//                         {list.title}
//                       </h3>
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => {
//                             setEditListTitle(list.title);
//                             setIsEditListModalOpen(true);
//                             setSelectedList(list);
//                           }}
//                           className="text-[rgb(38_70_83/var(--tw-bg-opacity,_1))] hover:text-[rgb(45_83_99/var(--tw-bg-opacity,_1))]"
//                           style={{ '--tw-bg-opacity': '1' }}
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDeleteList(list._id)}
//                           className="text-red-500 hover:text-red-700"
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>

//           <div>
//             {selectedList ? (
//               <>
//                 <div className="flex justify-between items-center mb-4">
//                   <div className="bg-[rgb(38_70_83/var(--tw-bg-opacity,_1))] text-white p-2 rounded flex-1" style={{ '--tw-bg-opacity': '1' }}>
//                     <h2 className="text-xl font-semibold">{selectedList.title}</h2>
//                   </div>
//                   <div className="ml-4 flex items-center">
//                     <label className="mr-2 text-teal-800">Sort by:</label>
//                     <select
//                       value={`${itemSortBy}-${itemSortOrder}`}
//                       onChange={(e) => {
//                         const [sortBy, sortOrder] = e.target.value.split('-');
//                         setItemSortBy(sortBy);
//                         setItemSortOrder(sortOrder);
//                       }}
//                       className="p-2 border-teal-500 border rounded"
//                     >
//                       <option value="itemName-asc">Name (A-Z)</option>
//                       <option value="itemName-desc">Name (Z-A)</option>
//                       <option value="category-asc">Category (A-Z)</option>
//                       <option value="category-desc">Category (Z-A)</option>
//                       <option value="quantity-asc">Quantity (Low to High)</option>
//                       <option value="quantity-desc">Quantity (High to Low)</option>
//                     </select>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => setIsAddItemModalOpen(true)}
//                   className="mb-4 px-4 py-2 bg-[rgb(38_70_83/var(--tw-bg-opacity,_1))] text-white rounded hover:bg-[rgb(45_83_99/var(--tw-bg-opacity,_1))]"
//                   style={{ '--tw-bg-opacity': '1' }}
//                 >
//                   Add Item
//                 </button>
//                 {sortedItems.length === 0 ? (
//                   <p>No items match the selected category.</p>
//                 ) : (
//                   <>
//                     <div className="bg-[rgb(38_70_83/var(--tw-bg-opacity,_1))] text-white p-2 rounded-t mb-2" style={{ '--tw-bg-opacity': '1' }}>
//                       <div className="flex justify-between">
//                         <span>Product Name</span>
//                         <span>Category</span>
//                         <span>Total Quantity</span>
//                         <span>Unit</span>
//                         <span>Actions</span>
//                       </div>
//                     </div>
//                     <ul className="space-y-4">
//                       {sortedItems.map((item) => (
//                         <li
//                           key={item._id}
//                           className="p-4 bg-white rounded-b-lg shadow flex justify-between"
//                         >
//                           <div>{item.itemName}</div>
//                           <div>{item.category}</div>
//                           <div>{item.quantity}</div>
//                           <div>{item.unit}</div>
//                           <div className="flex gap-2">
//                             <button
//                               onClick={() => {
//                                 setEditItem({
//                                   _id: item._id,
//                                   itemName: item.itemName,
//                                   category: item.category,
//                                   quantity: item.quantity,
//                                   unit: item.unit,
//                                 });
//                                 setIsEditItemModalOpen(true);
//                               }}
//                               className="text-[rgb(38_70_83/var(--tw-bg-opacity,_1))] hover:text-[rgb(45_83_99/var(--tw-bg-opacity,_1))]"
//                               style={{ '--tw-bg-opacity': '1' }}
//                             >
//                               Edit
//                             </button>
//                             <button
//                               onClick={() => handleDeleteItem(selectedList._id, item._id)}
//                               className="text-red-500 hover:text-red-700"
//                             >
//                               Delete
//                             </button>
//                           </div>
//                         </li>
//                       ))}
//                     </ul>
//                   </>
//                 )}
//               </>
//             ) : (
//               <p>Select a shopping list to view details.</p>
//             )}
//           </div>
//         </div>
//       </div>
//       {error && <div className="bg-red-100 text-red-700 p-4 rounded mt-4">{error}</div>}
//       {loading && <p className="text-center text-teal-800 mt-4">Loading...</p>}
//       {isCreateListModalOpen && (
//         <CreateListModal
//           newListTitle={newListTitle}
//           setNewListTitle={setNewListTitle}
//           handleCreateList={handleCreateList}
//           setIsCreateListModalOpen={setIsCreateListModalOpen}
//           error={error}
//           loading={loading}
//         />
//       )}
//       {isAddItemModalOpen && (
//         <AddItemModal
//           newItem={newItem}
//           setNewItem={setNewItem}
//           handleAddItem={handleAddItem}
//           setIsAddItemModalOpen={setIsAddItemModalOpen}
//           error={error}
//           loading={loading}
//         />
//       )}
//       {isEditItemModalOpen && (
//         <EditItemModal
//           editItem={editItem}
//           setEditItem={setEditItem}
//           handleUpdateItem={handleUpdateItem}
//           setIsEditItemModalOpen={setIsEditItemModalOpen}
//           error={error}
//           loading={loading}
//         />
//       )}
//       {isEditListModalOpen && (
//         <EditListModal
//           editListTitle={editListTitle}
//           setEditListTitle={setEditListTitle}
//           handleUpdateList={handleUpdateList}
//           setIsEditListModalOpen={setIsEditListModalOpen}
//           error={error}
//           loading={loading}
//         />
//       )}
//     </>
//   );
// };

// export default ShoppingListManager;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddItemModal from './AddItemModal.jsx';
import CreateListModal from './CreateListModal.jsx';
import EditItemModal from './EditItemModal.jsx';
import EditListModal from './EditListModal.jsx';

const ShoppingListManager = () => {
  const [shoppingLists, setShoppingLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const [newListTitle, setNewListTitle] = useState('');
  const [newItem, setNewItem] = useState({
    itemName: '',
    category: '',
    quantity: 1,
    unit: 'pieces',
  });
  const [editItem, setEditItem] = useState(null);
  const [editListTitle, setEditListTitle] = useState('');
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false);
  const [isCreateListModalOpen, setIsCreateListModalOpen] = useState(false);
  const [isEditListModalOpen, setIsEditListModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [listSortBy, setListSortBy] = useState('title');
  const [listSortOrder, setListSortOrder] = useState('asc');
  const [itemSortBy, setItemSortBy] = useState('itemName');
  const [itemSortOrder, setItemSortOrder] = useState('asc');

  const API_BASE_URL = 'http://localhost:8070/ShoppingList';

  useEffect(() => {
    fetchShoppingLists();
  }, []);

  const fetchShoppingLists = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/all`);
      setShoppingLists(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch shopping lists');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateList = async () => {
    console.log('handleCreateList triggered with title:', newListTitle);
    const trimmedTitle = newListTitle.trim();
    if (!trimmedTitle) {
      setError('List title is required');
      return;
    }
    if (trimmedTitle.length > 50) {
      setError('List title must be 50 characters or less');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/add`, { title: trimmedTitle, items: [] });
      setShoppingLists((prevLists) => [...prevLists, response.data.shoppingList]);
      setNewListTitle('');
      setIsCreateListModalOpen(false);
      setError('');
    } catch (err) {
      setError('Failed to create shopping list');
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async () => {
    console.log('handleAddItem triggered with item:', newItem);
    const trimmedItemName = newItem.itemName.trim();
    const trimmedCategory = newItem.category.trim();

    if (!trimmedItemName || !trimmedCategory) {
      setError('Item name and category are required');
      return;
    }
    if (trimmedItemName.length > 50) {
      setError('Item name must be 50 characters or less');
      return;
    }
    if (trimmedCategory.length > 50) {
      setError('Category must be 50 characters or less');
      return;
    }
    if (newItem.quantity < 1) {
      setError('Quantity must be at least 1');
      return;
    }

    const validatedItem = {
      ...newItem,
      itemName: trimmedItemName,
      category: trimmedCategory,
    };

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/addItem/${selectedList._id}`, validatedItem);
      setShoppingLists((prevLists) =>
        prevLists.map((list) =>
          list._id === selectedList._id ? response.data.shoppingList : list
        )
      );
      setNewItem({ itemName: '', category: '', quantity: 1, unit: 'pieces' });
      setIsAddItemModalOpen(false);
      setError('');
    } catch (err) {
      setError('Failed to add item');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateList = async () => {
    console.log('handleUpdateList triggered with title:', editListTitle);
    const trimmedTitle = editListTitle.trim();
    if (!trimmedTitle) {
      setError('List title is required');
      return;
    }
    if (trimmedTitle.length > 50) {
      setError('List title must be 50 characters or less');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.put(`${API_BASE_URL}/update/${selectedList._id}`, {
        title: trimmedTitle,
      });
      setShoppingLists((prevLists) =>
        prevLists.map((list) =>
          list._id === selectedList._id ? response.data.shoppingList : list
        )
      );
      setIsEditListModalOpen(false);
      alert('Shopping list updated successfully!');
      setError('');
    } catch (err) {
      setError('Failed to update shopping list');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateItem = async () => {
    console.log('handleUpdateItem triggered with item:', editItem);
    const trimmedItemName = editItem.itemName.trim();
    const trimmedCategory = editItem.category.trim();

    if (!trimmedItemName || !trimmedCategory) {
      setError('Item name and category are required');
      return;
    }
    if (trimmedItemName.length > 50) {
      setError('Item name must be 50 characters or less');
      return;
    }
    if (trimmedCategory.length > 50) {
      setError('Category must be 50 characters or less');
      return;
    }
    if (editItem.quantity < 1) {
      setError('Quantity must be at least 1');
      return;
    }

    const validatedItem = {
      ...editItem,
      itemName: trimmedItemName,
      category: trimmedCategory,
    };

    setLoading(true);
    try {
      const response = await axios.put(
        `${API_BASE_URL}/updateItem/${selectedList._id}/${editItem._id}`,
        validatedItem
      );
      console.log('Update Item Response:', response.data);
      setShoppingLists((prevLists) =>
        prevLists.map((list) =>
          list._id === selectedList._id ? response.data.shoppingList : list
        )
      );
      setIsEditItemModalOpen(false);
      alert('Item updated successfully!');
      setEditItem(null);
      setError('');
    } catch (err) {
      setError('Failed to update item');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (listId, itemId) => {
    console.log('handleDeleteItem triggered with listId:', listId, 'itemId:', itemId);
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }
    setLoading(true);
    try {
      const response = await axios.delete(`${API_BASE_URL}/deleteItem/${listId}/${itemId}`);
      console.log('Delete Item Response:', response.data);
      setShoppingLists((prevLists) =>
        prevLists.map((list) => (list._id === listId ? response.data.shoppingList : list))
      );
      setError('');
    } catch (err) {
      setError('Failed to delete item');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteList = async (listId) => {
    console.log('handleDeleteList triggered with listId:', listId);
    if (!window.confirm('Are you sure you want to delete this shopping list?')) {
      return;
    }
    setLoading(true);
    try {
      await axios.delete(`${API_BASE_URL}/delete/${listId}`);
      setShoppingLists((prevLists) => prevLists.filter((list) => list._id !== listId));
      if (selectedList && selectedList._id === listId) setSelectedList(null);
      setError('');
    } catch (err) {
      setError('Failed to delete shopping list');
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let yPosition = 20;

    shoppingLists.forEach((list, index) => {
      doc.setFontSize(14);
      doc.text(`List ${index + 1}: ${list.title}`, 10, yPosition);
      yPosition += 10;

      if (list.items.length > 0) {
        doc.setFontSize(10);
        list.items.forEach((item, itemIndex) => {
          doc.text(
            `${itemIndex + 1}. ${item.itemName} - ${item.category} - ${item.quantity} ${item.unit}`,
            10,
            yPosition
          );
          yPosition += 10;
        });
      } else {
        doc.setFontSize(10);
        doc.text('No items in this list.', 10, yPosition);
        yPosition += 10;
      }

      yPosition += 5;
      if (yPosition > 270 && index < shoppingLists.length - 1) {
        doc.addPage();
        yPosition = 20;
      }
    });

    doc.save('shopping-lists.pdf');
  };

  const allCategories = [
    'All Categories',
    ...new Set(
      shoppingLists
        .flatMap((list) => list.items.map((item) => item.category))
        .filter((category) => category)
    ),
  ];

  const filteredLists = shoppingLists.filter((list) =>
    list.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedLists = [...filteredLists].sort((a, b) => {
    const valueA = a[listSortBy].toLowerCase();
    const valueB = b[listSortBy].toLowerCase();
    if (listSortOrder === 'asc') {
      return valueA < valueB ? -1 : 1;
    } else {
      return valueA > valueB ? -1 : 1;
    }
  });

  const filteredItems = selectedList
    ? selectedCategory === 'All Categories'
      ? selectedList.items
      : selectedList.items.filter((item) => item.category === selectedCategory)
    : [];

  const sortedItems = [...filteredItems].sort((a, b) => {
    const valueA = itemSortBy === 'quantity' ? a[itemSortBy] : a[itemSortBy].toLowerCase();
    const valueB = itemSortBy === 'quantity' ? b[itemSortBy] : b[itemSortBy].toLowerCase();
    if (itemSortOrder === 'asc') {
      return valueA < valueB ? -1 : 1;
    } else {
      return valueA > valueB ? -1 : 1;
    }
  });

  return (
    <>
      <div className="min-h-screen p-4 sm:p-6 bg-gray-100">
        <div className="bg-teal-800 text-white p-4 rounded-lg shadow-lg flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">Shopping List Manager</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setIsCreateListModalOpen(true)}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Add New List
            </button>
            <button
              onClick={handleExportPDF}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Export PDF
            </button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col sm:flex-row gap-4 border border-teal-300">
          <input
            type="text"
            placeholder="Search by list name or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border border-teal-300 rounded-lg w-full sm:w-2/3 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border border-teal-300 rounded-lg w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            {allCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-teal-800 text-white p-3 rounded-lg shadow-md mb-6">
          <p className="text-sm sm:text-base">Total Lists: {sortedLists.length}</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div className="bg-teal-800 text-white p-3 rounded-lg shadow-md w-full sm:w-auto mb-4 sm:mb-0">
            <h2 className="text-lg sm:text-xl font-semibold">Your Shopping Lists</h2>
          </div>
          <div className="flex items-center w-full sm:w-auto">
            <label className="mr-2 text-teal-800 text-sm sm:text-base">Sort by:</label>
            <select
              value={`${listSortBy}-${listSortOrder}`}
              onChange={(e) => {
                const [sortBy, sortOrder] = e.target.value.split('-');
                setListSortBy(sortBy);
                setListSortOrder(sortOrder);
              }}
              className="p-2 border border-teal-300 rounded-lg w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="title-asc">Title (A-Z)</option>
              <option value="title-desc">Title (Z-A)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            {sortedLists.length === 0 ? (
              <p className="text-gray-600">No shopping lists match your search.</p>
            ) : (
              <ul className="space-y-4">
                {sortedLists.map((list) => (
                  <li
                    key={list._id}
                    className={`p-4 rounded-lg shadow-md transition-colors ${
                      selectedList && selectedList._id === list._id ? 'bg-teal-50' : 'bg-white'
                    } hover:bg-teal-100 border border-teal-200`}
                  >
                    <div className="flex justify-between items-center">
                      <h3
                        className="text-lg font-medium cursor-pointer text-teal-800 hover:text-teal-600"
                        onClick={() => setSelectedList(list)}
                      >
                        {list.title}
                      </h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditListTitle(list.title);
                            setIsEditListModalOpen(true);
                            setSelectedList(list);
                          }}
                          className="text-teal-600 hover:text-teal-800 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteList(list._id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            {selectedList ? (
              <>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                  <div className="bg-teal-800 text-white p-3 rounded-lg shadow-md w-full sm:w-auto mb-4 sm:mb-0">
                    <h2 className="text-lg sm:text-xl font-semibold">{selectedList.title}</h2>
                  </div>
                  <div className="flex items-center w-full sm:w-auto">
                    <label className="mr-2 text-teal-800 text-sm sm:text-base">Sort by:</label>
                    <select
                      value={`${itemSortBy}-${itemSortOrder}`}
                      onChange={(e) => {
                        const [sortBy, sortOrder] = e.target.value.split('-');
                        setItemSortBy(sortBy);
                        setItemSortOrder(sortOrder);
                      }}
                      className="p-2 border border-teal-300 rounded-lg w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="itemName-asc">Name (A-Z)</option>
                      <option value="itemName-desc">Name (Z-A)</option>
                      <option value="category-asc">Category (A-Z)</option>
                      <option value="category-desc">Category (Z-A)</option>
                      <option value="quantity-asc">Quantity (Low to High)</option>
                      <option value="quantity-desc">Quantity (High to Low)</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={() => setIsAddItemModalOpen(true)}
                  className="mb-6 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Add Item
                </button>
                {sortedItems.length === 0 ? (
                  <p className="text-gray-600">No items match the selected category.</p>
                ) : (
                  <>
                    <div className="bg-teal-800 text-white p-3 rounded-t-lg shadow-md mb-1">
                      <div className="grid grid-cols-5 gap-2 text-sm sm:text-base">
                        <span>Product Name</span>
                        <span>Category</span>
                        <span>Total Quantity</span>
                        <span>Unit</span>
                        <span>Actions</span>
                      </div>
                    </div>
                    <ul className="space-y-3">
                      {sortedItems.map((item) => (
                        <li
                          key={item._id}
                          className="p-4 bg-white rounded-b-lg shadow-md grid grid-cols-5 gap-2 items-center border border-teal-200 hover:bg-teal-50 transition-colors"
                        >
                          <div className="text-gray-800">{item.itemName}</div>
                          <div className="text-gray-800">{item.category}</div>
                          <div className="text-gray-800">{item.quantity}</div>
                          <div className="text-gray-800">
                            {item.unit.charAt(0).toUpperCase() + item.unit.slice(1)}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setEditItem({
                                  _id: item._id,
                                  itemName: item.itemName,
                                  category: item.category,
                                  quantity: item.quantity,
                                  unit: item.unit,
                                });
                                setIsEditItemModalOpen(true);
                              }}
                              className="text-teal-600 hover:text-teal-800 transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteItem(selectedList._id, item._id)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </>
            ) : (
              <p className="text-gray-600">Select a shopping list to view details.</p>
            )}
          </div>
        </div>
      </div>
      {error && <div className="bg-red-100 text-red-700 p-4 rounded-lg mt-6 mx-4 sm:mx-6">{error}</div>}
      {loading && <p className="text-center text-teal-800 mt-6">Loading...</p>}
      {isCreateListModalOpen && (
        <CreateListModal
          newListTitle={newListTitle}
          setNewListTitle={setNewListTitle}
          handleCreateList={handleCreateList}
          setIsCreateListModalOpen={setIsCreateListModalOpen}
          error={error}
          loading={loading}
        />
      )}
      {isAddItemModalOpen && (
        <AddItemModal
          newItem={newItem}
          setNewItem={setNewItem}
          handleAddItem={handleAddItem}
          setIsAddItemModalOpen={setIsAddItemModalOpen}
          error={error}
          loading={loading}
        />
      )}
      {isEditItemModalOpen && (
        <EditItemModal
          editItem={editItem}
          setEditItem={setEditItem}
          handleUpdateItem={handleUpdateItem}
          setIsEditItemModalOpen={setIsEditItemModalOpen}
          error={error}
          loading={loading}
        />
      )}
      {isEditListModalOpen && (
        <EditListModal
          editListTitle={editListTitle}
          setEditListTitle={setEditListTitle}
          handleUpdateList={handleUpdateList}
          setIsEditListModalOpen={setIsEditListModalOpen}
          error={error}
          loading={loading}
        />
      )}
    </>
  );
};

export default ShoppingListManager;