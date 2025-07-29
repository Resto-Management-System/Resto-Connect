import axios from "axios";
import { baseUrl } from "./apiconfig";


export async function userSignUp(formData) {
	const url = `${baseUrl}/users/signup`; 
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

export async function uploadDocumentForOwner(formData) {
	
}