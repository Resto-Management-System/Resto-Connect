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

///--------------------profile update--------------------///
// Service function to get owner details by ID
export async function getOwnerDetails(userId, token) {
    const url = `${baseUrl}/users/profilebyid/${userId}`;
    try {
        const resp = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (resp.status !== 200) {
            throw new Error(`API call failed with status ${resp.status}`);
        }
        const result = resp.data;
        if (result.status !== 'success') {
            const errorMessage = typeof result.message === 'object' ? JSON.stringify(result.message) : (result.message || 'API returned an error');
            throw new Error(errorMessage);
        }
        return result.data;
    } catch (err) {
        console.error("Error fetching owner details:", err);
        throw err;
    }
}

// Service function to update owner profile
export async function updateOwnerProfile(userId, profileData, token) {
    const url = `${baseUrl}/users/updatebyid/${userId}`;
    try {
        const resp = await axios.put(url, profileData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (resp.status !== 200) {
            throw new Error(`API call failed with status ${resp.status}`);
        }
        const result = resp.data;
        if (result.status !== 'success') {
            const errorMessage = typeof result.message === 'object' ? JSON.stringify(result.message) : (result.message || 'API returned an error');
            throw new Error(errorMessage);
        }
        return result.data;
    } catch (err) {
        console.error("Error updating owner profile:", err);
        throw err;
    }
}
