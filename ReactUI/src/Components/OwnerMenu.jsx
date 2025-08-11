import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import '../CSS/owner-menu.css';

// A constant array of dummy menu item data for demonstration.
// This will be replaced with real data from your backend.
const DUMMY_MENU_ITEMS = [
    {
        menu_item_id: 201,
        resto_id: 1,
        name: 'Gourmet Burger',
        description: 'A classic beef patty with melted cheddar, lettuce, tomato, and our signature sauce.',
        price: 70.00,
        category: 'Main Course'
    },
    {
        menu_item_id: 202,
        resto_id: 1,
        name: 'Truffle Pasta',
        description: 'Fettuccine pasta in a creamy truffle sauce with fresh parmesan cheese.',
        price: 200.00,
        category: 'Main Course'
    },
    {
        menu_item_id: 203,
        resto_id: 1,
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with a molten center, served with vanilla ice cream.',
        price: 60.00,
        category: 'Dessert'
    },
    {
        menu_item_id: 204,
        resto_id: 1,
        name: 'Fresh Garden Salad',
        description: 'Mixed greens, cucumber, cherry tomatoes, and a light vinaigrette dressing.',
        price: 400.00,
        category: 'Appetizer'
    },
];

// Mock API service functions for CRUD operations.
// These should be replaced with actual axios calls to your backend.
const getMyRestaurantMenu = async () => {
    console.log("Fetching menu items...");
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return DUMMY_MENU_ITEMS;
};

const addMenuItem = async (newItem) => {
    console.log("Adding new menu item:", newItem);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    // In a real app, the backend would return the new item with an ID.
    const newId = Math.max(...DUMMY_MENU_ITEMS.map(item => item.menu_item_id)) + 1;
    return { ...newItem, menu_item_id: newId };
};

const updateMenuItem = async (updatedItem) => {
    console.log("Updating menu item:", updatedItem);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return updatedItem;
};

const deleteMenuItem = async (itemId) => {
    console.log("Deleting menu item with ID:", itemId);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return true; // Return a success indicator
};

const OwnerMenu = () => {
    const navigate = useNavigate();
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [currentMenuItem, setCurrentMenuItem] = useState(null);

    useEffect(() => {
        const fetchMenu = async () => {
            const storedToken = sessionStorage.getItem('token');

            if (!storedToken) {
                toast.error("Unauthorized access. Please log in.");
                navigate('/login');
                return;
            }

            try {
                // You might need to get the restaurant ID from the decoded token
                // const decodedToken = jwtDecode(storedToken);
                // const restoId = decodedToken.resto_id;

                const data = await getMyRestaurantMenu(); // This would be the real API call
                setMenuItems(data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch menu items:", err);
                setError("Failed to load menu items. Please try again.");
                setLoading(false);
            }
        };

        fetchMenu();
    }, [navigate]);

    // Handles form input changes for adding/editing.
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setCurrentMenuItem(prev => ({ ...prev, [name]: value }));
    };

    // Handles the form submission for adding or updating a menu item.
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentMenuItem.menu_item_id) {
                // Update existing item
                const updatedItem = await updateMenuItem(currentMenuItem);
                setMenuItems(menuItems.map(item => 
                    item.menu_item_id === updatedItem.menu_item_id ? updatedItem : item
                ));
                toast.success("Menu item updated successfully!");
            } else {
                // Add new item
                const newItem = await addMenuItem(currentMenuItem);
                setMenuItems([...menuItems, newItem]);
                toast.success("New menu item added!");
            }
            setIsFormVisible(false);
            setCurrentMenuItem(null);
        } catch (err) {
            toast.error("Failed to save menu item.");
        }
    };

    // Pre-populates the form for editing.
    const handleEditClick = (item) => {
        setCurrentMenuItem(item);
        setIsFormVisible(true);
    };

    // Deletes a menu item.
    const handleDeleteClick = async (itemId) => {
        if (window.confirm("Are you sure you want to delete this menu item?")) {
            try {
                await deleteMenuItem(itemId);
                setMenuItems(menuItems.filter(item => item.menu_item_id !== itemId));
                toast.success("Menu item deleted successfully!");
            } catch (err) {
                toast.error("Failed to delete menu item.");
            }
        }
    };

    const handleCancel = () => {
        setIsFormVisible(false);
        setCurrentMenuItem(null);
    };

    if (loading) {
        return (
            <div className="menu-container-new">
                <p className="loading-message">Loading menu items...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="menu-container-new">
                <p className="error-message">{error}</p>
            </div>
        );
    }

    return (
        <div className="menu-container-new">
            <h1 className="menu-title-new">Manage Menu</h1>
            
            <button 
                className="add-item-btn-new" 
                onClick={() => {
                    setCurrentMenuItem({ name: '', description: '', price: '', category: '' });
                    setIsFormVisible(true);
                }}
            >
                Add New Menu Item
            </button>

            {isFormVisible && (
                <div className="menu-form-container-new">
                    <form className="menu-form-new" onSubmit={handleFormSubmit}>
                        <h3>{currentMenuItem.menu_item_id ? 'Edit Menu Item' : 'Add New Menu Item'}</h3>
                        <div className="form-group-new">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={currentMenuItem.name}
                                onChange={handleFormChange}
                                required
                            />
                        </div>
                        <div className="form-group-new">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={currentMenuItem.description}
                                onChange={handleFormChange}
                                required
                            />
                        </div>
                        <div className="form-group-new">
                            <label htmlFor="price">Price</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={currentMenuItem.price}
                                onChange={handleFormChange}
                                required
                                step="0.01"
                            />
                        </div>
                        <div className="form-group-new">
                            <label htmlFor="category">Category</label>
                            <input
                                type="text"
                                id="category"
                                name="category"
                                value={currentMenuItem.category}
                                onChange={handleFormChange}
                                required
                            />
                        </div>
                        <div className="form-actions-new">
                            <button type="submit" className="save-btn-new">Save Item</button>
                            <button type="button" className="cancel-btn-new" onClick={handleCancel}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            {menuItems.length === 0 ? (
                <p className="no-items-message">No menu items found. Add some to get started!</p>
            ) : (
                <div className="menu-list-new">
                    {menuItems.map((item) => (
                        <div key={item.menu_item_id} className="menu-item-card-new">
                            <div className="item-details-new">
                                <h3>{item.name}</h3>
                                <p><strong>Category:</strong> {item.category}</p>
                                <p><strong>Price:</strong> ₹{item.price.toFixed(2)}</p>
                                <p><strong>Description:</strong> {item.description}</p>
                            </div>
                            <div className="item-actions-new">
                                <button className="edit-btn-new" onClick={() => handleEditClick(item)}>Edit</button>
                                <button className="delete-btn-new" onClick={() => handleDeleteClick(item.menu_item_id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OwnerMenu;
