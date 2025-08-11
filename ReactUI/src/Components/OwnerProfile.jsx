// // OwnerProfile.jsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router';
// import { toast } from 'react-toastify';
// import { getOwnerDetails, updateOwnerProfile } from '../Services/users'; 
// import '../CSS/owner-profile.css'; 

// const OwnerProfile = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [profile, setProfile] = useState({
//     userId: '',
//     name: '',
//     email: '',
//     phone: '',
//     role: '',
//     resto_name: '',
//     location: '',
//   });

//   // State for business metrics
//   const [metrics, setMetrics] = useState({
//     totalBookings: 0,
//     averageRating: 0,
//     numberOfTables: 0,
//   });

//   // State to track if the data is being saved
//   const [isSaving, setIsSaving] = useState(false);

//   useEffect(() => {
//     const fetchProfileAndMetrics = async () => {
//       const storedUser = JSON.parse(sessionStorage.getItem('user'));
//       const storedToken = sessionStorage.getItem('token');
      
//       // Basic authentication check
//       if (!storedUser || storedUser.role !== 'owner' || !storedToken) {
//         toast.error("Unauthorized access. Please log in as an owner.");
//         navigate('/login');
//         return;
//       }
      
//       try {
//         setLoading(true);
//         // Call the service function to get profile details
//         const profileData = await getOwnerDetails();
//         setProfile(profileData);
        
//         // Assuming there's a separate service function to get metrics
//         // We'll create a dummy one for now, but you would replace this with a real API call.
//         const metricsData = {
//           totalBookings: 45,
//           averageRating: 4.5,
//           numberOfTables: 12
//         };
//         setMetrics(metricsData);

//         toast.success("Profile and metrics loaded!", { autoClose: 1500 });
//       } catch (err) {
//         console.error("Error fetching profile or metrics:", err);
//         toast.error("Failed to load profile. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfileAndMetrics();
//   }, [navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfile(prevProfile => ({
//       ...prevProfile,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSaving(true);
//     try {
//       // Call the service function to update the profile
//       const response = await updateOwnerProfile(profile);
//       toast.success(response.message || "Profile updated successfully!");
//     } catch (err) {
//       console.error("Error updating profile:", err);
//       toast.error("Failed to update profile. " + err.message);
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   if (loading) {
//     return <div className="loading-message-new">Loading profile...</div>;
//   }

//   return (
//     <div className="profile-container-new">
//       <div className="profile-card-new">
//         <h2 className="profile-title-new">My Profile</h2>
//         <form className="profile-form-new" onSubmit={handleSubmit}>
//           {/* User Details Section */}
//           <div className="form-section-new">
//             <h3>Personal Information</h3>
//             <div className="form-group-new">
//               <label htmlFor="name">Name:</label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={profile.name}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="form-group-new">
//               <label htmlFor="email">Email:</label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={profile.email}
//                 disabled
//                 // Email is disabled because it is typically a primary key for authentication and shouldn't be changed easily.
//               />
//             </div>
//             <div className="form-group-new">
//               <label htmlFor="phone">Phone:</label>
//               <input
//                 type="tel"
//                 id="phone"
//                 name="phone"
//                 value={profile.phone}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>

//           {/* Restaurant Details (only for owner role) */}
//           {profile.role === 'owner' && (
//             <div className="form-section-new">
//               <h3>Restaurant Information</h3>
//               <div className="form-group-new">
//                 <label htmlFor="resto_name">Restaurant Name:</label>
//                 <input
//                   type="text"
//                   id="resto_name"
//                   name="resto_name"
//                   value={profile.resto_name}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="form-group-new">
//                 <label htmlFor="location">Location:</label>
//                 <input
//                   type="text"
//                   id="location"
//                   name="location"
//                   value={profile.location}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </div>
//           )}

//           <div className="profile-actions-new">
//             <button type="submit" className="save-btn-new" disabled={isSaving}>
//               {isSaving ? 'Saving...' : 'Save Changes'}
//             </button>
//             <button type="button" className="cancel-btn-new" onClick={() => navigate('/ownerdashboard')}>
//               Cancel
//             </button>
//           </div>
//         </form>

//         {/* Business Metrics Section */}
//         {profile.role === 'owner' && (
//             <div className="metrics-section-new">
//                 <h3>Business Metrics</h3>
//                 <ul className="metrics-list-new">
//                     <li>Total Bookings <span>{metrics.totalBookings}</span></li>
//                     <li>Average Rating <span>{metrics.averageRating} / 5</span></li>
//                     <li>Number of Tables <span>{metrics.numberOfTables}</span></li>
//                 </ul>
//             </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default OwnerProfile;
