// tables.js
import axios from "axios";
import { baseUrl } from "./apiconfig";
import { toast } from 'react-toastify';


// Mock service function to get all tables for the logged-in owner.
// In a real application, you would replace this with an actual API call.
export async function getOwnerTables() {
    const url = `${baseUrl}/resto/table`;
    try {
        const token = sessionStorage.getItem('token');
        if (!token) {
            throw new Error("Authentication token not found.");
        }
        
        // Use axios.get with auth headers
        const resp = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
        
        console.log("API Call: Fetching owner's tables...");
        // Assuming a successful response structure
        if (resp.data.status === "success" && resp.data.data) {
            return resp.data.data;
        } else {
            throw new Error("Failed to fetch tables.");
        }
    } catch (err) {
        console.error("Error fetching tables:", err);
        // Display a toast message for the user
        toast.error("Failed to fetch tables.");
        throw err;
    }
}

/**
 * Service function to add a new table for the logged-in owner.
 * First, it fetches the owner's resto_id, then sends a POST request to add the table.
 * @param {object} tableData - The table data (capacity, charge, category).
 */
export async function addTable(tableData) {
    const token = sessionStorage.getItem('token');
    if (!token) {
        throw new Error("Authentication token not found.");
    }
    
    // Step 1: Get the resto_id for the current owner
    const restoUrl = `${baseUrl}/table/owner-resto`;
    let restoId;
    try {
        const restoResp = await axios.get(restoUrl, { headers: { Authorization: `Bearer ${token}` } });
        if (restoResp.data.status === "success" && restoResp.data.data && restoResp.data.data.resto_id) {
            restoId = restoResp.data.data.resto_id;
        } else {
            throw new Error("Could not retrieve restaurant ID.");
        }
    } catch (err) {
        console.error("Error fetching resto_id:", err);
        toast.error("Failed to get restaurant details.");
        throw err;
    }

    // Step 2: Add the resto_id to the table data
    const newTableData = { ...tableData, resto_id: restoId };

    // Step 3: Send the POST request to add the new table
    const addTableUrl = `${baseUrl}/table`;
    try {
        const resp = await axios.post(addTableUrl, newTableData, { headers: { Authorization: `Bearer ${token}` } });
        console.log("API Call: Adding new table...", resp.data);
        if (resp.data.status === "success") {
            toast.success("Table added successfully!");
        }
        return resp.data.data;
    } catch (err) {
        console.error("Error adding table:", err);
        toast.error("Failed to add table.");
        throw err;
    }
}


// Mock service function to delete a table.
// In a real application, you would replace this with an actual API call.
export async function deleteTable(tableId) {
    const url = `${baseUrl}/table/${tableId}`;
    try {
        const token = sessionStorage.getItem('token');
        if (!token) {
            throw new Error("Authentication token not found.");
        }
        
        // Use axios.delete with auth headers
        const resp = await axios.delete(url, { headers: { Authorization: `Bearer ${token}` } });

        console.log(`API Call: Deleting table with ID ${tableId}...`);
        if (resp.data.status === "success") {
             toast.success("Table deleted successfully!");
        }
        return resp.data;
    } catch (err) {
        console.error("Error deleting table:", err);
        toast.error("Failed to delete table.");
        throw err;
    }
}
