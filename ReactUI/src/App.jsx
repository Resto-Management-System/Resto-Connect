import { Routes, Route } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { createContext, useState } from "react";

import UploadDocument from "./Components/UploadDocuments";
import LoginForm from "./Components/LoginForm";
import OwnerDashboard from "./components/OwnerDashboard";
import Home from "./Components/Home";
import RegistrationForm from "./Components/RegistrationForm";

import AdminDashboard from "./Components/AdminDashboard";



export const AuthContext = createContext();

function getUserFromSessionStorage() {
const userJson = sessionStorage.getItem("user");
	const user = JSON.parse(userJson);
	return user;
}

function App() {
	const [user, setUser] = useState(getUserFromSessionStorage());

	return (
		<div className="container">
			<AuthContext.Provider value={{ user, setUser }}>
				<Routes>
					{/* /url */}
					<Route index="true" element={<Home/>} />
					<Route path="/register" element={<RegistrationForm />} />
					<Route path="/upload-documents" element={<UploadDocument />} />
					{/* /user/url */}
					<Route path="/login" element={<LoginForm />} />
					
					{/* Route after login */}
					<Route path="/ownerdashboard" element={<OwnerDashboard/>} />

					<Route path ="admin-dashboard" element={<AdminDashboard/>} />
				</Routes>
			</AuthContext.Provider>
		</div>
	);
}

export default App;
