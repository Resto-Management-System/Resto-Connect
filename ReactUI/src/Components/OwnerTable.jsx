import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
// Import the new `addTable` function
import { getOwnerTables, deleteTable, addTable } from '../Services/tables';
import '../CSS/owner-table.css';

const OwnerTable = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [tables, setTables] = useState([]);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [newTableData, setNewTableData] = useState({
        capacity: '',
        charge: '',
        category: 'Standard', // Default category
    });

    useEffect(() => {
        const fetchTables = async () => {
            try {
                // Here, you should ideally get the restoId from the owner's profile,
                // but for now, we'll fetch all owner tables.
                const fetchedTables = await getOwnerTables();
                setTables(fetchedTables);
            } catch (err) {
                setError(err.message);
                toast.error(`Error fetching tables: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchTables();
    }, []);

    const handleDeleteTable = async (tableId) => {
        if (window.confirm("Are you sure you want to delete this table?")) {
            try {
                await deleteTable(tableId);
                // After successful deletion, update the table list
                setTables(tables.filter(table => table.table_id !== tableId));
            } catch (err) {
                setError(err.message);
                toast.error(`Error deleting table: ${err.message}`);
            }
        }
    };
    
    const handleAddTable = async (e) => {
        e.preventDefault();
        try {
            await addTable(newTableData);
            // Refresh the table list after adding a new table
            const updatedTables = await getOwnerTables();
            setTables(updatedTables);
            setShowModal(false);
            setNewTableData({ capacity: '', charge: '', category: 'Standard' });
        } catch (err) {
            toast.error(`Failed to add table: ${err.message}`);
        }
    };

    const handleNewTableChange = (e) => {
        const { name, value } = e.target;
        setNewTableData(prev => ({ ...prev, [name]: value }));
    };

    if (loading) {
        return <div className="loading-message">Loading tables...</div>;
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    return (
        <div className="owner-table-container-new">
            <h1 className="owner-table-title-new">Manage Restaurant Tables</h1>
            
            <button className="add-table-btn-new" onClick={() => setShowModal(true)}>
                Add New Table
            </button>
            
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Add New Table</h3>
                        <form onSubmit={handleAddTable}>
                            <div className="form-group">
                                <label htmlFor="capacity">Capacity:</label>
                                <input
                                    type="number"
                                    name="capacity"
                                    id="capacity"
                                    value={newTableData.capacity}
                                    onChange={handleNewTableChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="charge">Charge:</label>
                                <input
                                    type="number"
                                    name="charge"
                                    id="charge"
                                    value={newTableData.charge}
                                    onChange={handleNewTableChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="category">Category:</label>
                                <select
                                    name="category"
                                    id="category"
                                    value={newTableData.category}
                                    onChange={handleNewTableChange}
                                    required
                                >
                                    <option value="Standard">Standard</option>
                                    <option value="Couples">Couples</option>
                                    <option value="Large Group">Large Group</option>
                                    <option value="Gold">Gold</option>
                                </select>
                            </div>
                            <div className="modal-actions">
                                <button type="submit" className="save-btn-new">Add Table</button>
                                <button type="button" className="cancel-btn-new" onClick={() => setShowModal(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {tables.length === 0 ? (
                <div className="no-tables-message">No tables found for your restaurant.</div>
            ) : (
                <div className="tables-list-new">
                    {tables.map(table => (
                        <div key={table.table_id} className="table-card-new">
                            <div className="table-details-new">
                                <p><strong>Table ID:</strong> {table.table_id}</p>
                                <p><strong>Capacity:</strong> {table.capacity} guests</p>
                                <p><strong>Charge:</strong> ₹{table.charge}</p>
                                <p><strong>Category:</strong> {table.category}</p>
                            </div>
                            <div className="table-actions-new">
                                <button className="edit-btn-new">Edit</button>
                                <button className="delete-btn-new" onClick={() => handleDeleteTable(table.table_id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OwnerTable;
