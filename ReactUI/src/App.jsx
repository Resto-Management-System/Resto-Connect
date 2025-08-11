import { Routes, Route } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { createContext, useState } from "react";
import SplashScreen from "./Components/SplashScreen"
import UploadDocument from "./Components/UploadDocuments";
import LoginForm from "./Components/LoginForm";
import OwnerDashboard from "./components/OwnerDashboard";
import Home from "./Components/Home";
import RegistrationForm from "./Components/Registrationform";
//import OwnerProfile from "./Components/OwnerProfile";
import RestaurantManager from "./Components/RestaurantManager";
import OwnerBookings from "./Components/OwnerBookings";
import OwnerTable from "./Components/OwnerTable";
import AdminDashboard from "./Components/AdminDashboard";
import ReviewList from "./Components/ReviewList";



export const AuthContext = createContext();

function getUserFromSessionStorage() {
const userJson = sessionStorage.getItem("user");
	const user = JSON.parse(userJson);
	return user;
}

function App() {
	const [user, setUser] = useState(getUserFromSessionStorage());
    const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  
}

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
					{/* <Route path="/owner/profile" element={<OwnerProfile />} />
					 */}
					<Route path="/owner/bookings" element={<OwnerBookings />} />
					<Route path="/owner/tables" element={<OwnerTable />} />
					
					{/* Admin routes */}

					<Route path ="admin" element={<AdminDashboard/>} />
					<Route path="/admin/restaurants" element={<RestaurantManager />} />
					<Route path="/admin/reviews" element={<ReviewList />} />
					
				</Routes>
			</AuthContext.Provider>
		</div>
	);
}

export default App;
