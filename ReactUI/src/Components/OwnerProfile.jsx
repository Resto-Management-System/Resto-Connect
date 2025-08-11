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
//     const fetchProfile = async () => {
//       // Get user and token directly from session storage.
//       const storedUser = JSON.parse(sessionStorage.getItem('user'));
//       const storedToken = sessionStorage.getItem('token');
      
//       // ✅ CRITICAL FIX: Extract the userId from the storedUser object
//       const userId = storedUser?.userId;

//       // Basic authentication check
//       if (!storedUser || storedUser.role !== 'owner' || !storedToken || !userId) {
//         toast.error("Unauthorized access. Please log in as an owner.");
//         navigate('/login');
//         return;
//       }

//       setProfile(prev => ({ 
//         ...prev, 
//         role: storedUser.role, 
//         userId: userId,
//       }));

//       try {
//         setLoading(true);
//         // ✅ Pass the userId to the service function
//         const data = await getOwnerDetails(userId, storedToken);
//         setProfile(prev => ({
//           ...prev,
//           name: data.name,
//           email: data.email,
//           phone: data.phone,
//           resto_name: data.resto_name,
//           location: data.location,
//         }));
//         setMetrics({
//           totalBookings: data.totalBookings,
//           averageRating: data.averageRating,
//           numberOfTables: data.numberOfTables
//         });
//         toast.success("Profile loaded successfully!", { autoClose: 1500 });
//       } catch (err) {
//         console.error("Error fetching owner profile:", err);
//         toast.error("Failed to fetch profile details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfile(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSaving(true);
//     const storedToken = sessionStorage.getItem('token');
    
//     try {
//       await updateOwnerProfile(profile.userId, profile, storedToken);
//       toast.success("Profile updated successfully!");
//     } catch (err) {
//       console.error("Error updating profile:", err);
//       toast.error("Failed to update profile.");
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
//         <form onSubmit={handleSubmit} className="profile-form-new">
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
//                 readOnly
//                 disabled
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
