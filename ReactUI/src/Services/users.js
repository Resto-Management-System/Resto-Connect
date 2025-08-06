import axios from "axios";
import { baseUrl } from "./apiconfig";


export async function userSignUp(formData, role) {
	let url = "";
	if (role === "Owner") {
		url = `${baseUrl}/users/signup/owner`;
	} else {
		url = `${baseUrl}/users/signup/user`;
	}	
	try {
		const resp = await axios.post(url, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		if (resp.status !== 200)
			throw new Error("Axios API call failed with status " + resp.status);

		const result = resp.data;

		if (result.status !== "success")
			throw new Error(result.message || "API returned an error");

		return result.data;
	} catch (err) {
		console.error("Sign-up error:", err);
		throw err;
	}
}

export async function userSignIn(email, passwd) {
	const url = `${baseUrl}/users/signin`;
	const reqbody = { email, passwd };
	const resp = await axios.post(url, reqbody);
	console.log(resp);
	if (resp.status !== 200)
		// check axios resp status (200 or else)
		throw new Error("Axios API call Error");
	// get axios resp data - result
	const result = resp.data;
	if (result.status !== "success")
		// if api status is not success ("error"), then get the message
		throw new Error(result.message);
	const data = result.data;
	return data;
}

// users.js
export async function uploadDocumentForOwner(formData, userId) {
	const url = `${baseUrl}/users/upload-document/${userId}`; 
	try {
		const resp = await axios.post(url, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		if (resp.status !== 200)
			throw new Error("Axios API call failed with status " + resp.status);

		const result = resp.data;

		if (result.status !== "success")
			throw new Error(result.message || "API returned an error");

		return result.data;
	} catch (err) {
		console.error("Document upload error:", err);
		throw err;
	}
}


export async function getOwnerDetails(userId) {
    const url = `${baseUrl}/users/userbyid/${userId}`; // Assuming this endpoint exists and returns full user details
    try {
        const resp = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}` // Include JWT token for authentication
            }
        });

        if (resp.status !== 200) {
            throw new Error("Axios API call failed with status " + resp.status);
        }

        const result = resp.data;

        if (result.status !== "success") {
            const errorMessage = typeof result.message === 'object' 
                ? JSON.stringify(result.message) 
                : (result.message || "API returned an error");
            throw new Error(errorMessage);
        }

        return result.data; // This should be the user/owner object
    } catch (err) {
        console.error("Error fetching owner details:", err);
        throw err;
    }
}


export async function updateOwnerProfile(userId, profileData) {
    const url = `${baseUrl}/users/updatebyid/${userId}`; // Assuming this endpoint exists and updates user details
    try {
        const resp = await axios.put(url, profileData, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`, // Include JWT token
                'Content-Type': 'application/json' // Ensure JSON content type for PUT
            }
        });

        if (resp.status !== 200) {
            throw new Error("Axios API call failed with status " + resp.status);
        }

        const result = resp.data;

        if (result.status !== "success") {
            const errorMessage = typeof result.message === 'object' 
                ? JSON.stringify(result.message) 
                : (result.message || "API returned an error");
            throw new Error(errorMessage);
        }

        return result.data; // Should be a success message
    } catch (err) {
        console.error("Error updating owner profile:", err);
        throw err;
    }
}