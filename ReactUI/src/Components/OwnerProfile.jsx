import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
// Assuming you'll add these service functions in ../Services/users.js
import { getOwnerDetails, updateOwnerProfile } from '../Services/users'; 
import '../CSS/owner-profile.css'; // New CSS file for this page

const OwnerProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    userId: '',
    name: '',
    email: '',
    phone: '',
    resto_name: '',
    location: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const storedUser = JSON.parse(sessionStorage.getItem('user'));
      const storedToken = sessionStorage.getItem('token');

      //debug
      console.log("OwnerProfile: storedUser from sessionStorage:", storedUser);
      console.log("OwnerProfile: storedToken from sessionStorage:", storedToken);
      if (storedUser) {
        console.log("OwnerProfile: storedUser.role:", storedUser.role);
      }

      //--------------------------------------------------//
      if (!storedUser || storedUser.role !== 'owner' || !storedToken) {
        toast.error("Unauthorized access. Please log in as an owner.");
        navigate('/login');
        return;
      }

      setProfile(prev => ({ ...prev, userId: storedUser.id, })); // Set userId from session

      try {
        setLoading(true);
        // Assuming getOwnerDetails takes userId and potentially token for auth
        const data = await getOwnerDetails(storedUser.id); 
        setProfile({
          userId: data.user_id, // Ensure these keys match your backend response
          name: data.name,
          email: data.email,
          phone: data.phone,
          resto_name: data.resto_name || '', // Restaurant name might be directly in user or separate
          location: data.location || '', // Location might be directly in user or separate
        });
        toast.success("Profile loaded successfully!");
      } catch (error) {
        console.error("Error fetching owner profile:", error);
        toast.error("Failed to load profile. " + (error.response?.data?.message || error.message));
        // Optionally redirect if profile cannot be loaded
        // navigate('/owner-dashboard'); 
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Assuming updateOwnerProfile takes userId and the updated profile data
      await updateOwnerProfile(profile.userId, profile); 
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating owner profile:", error);
      toast.error("Failed to update profile. " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="profile-container-new loading-state">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-container-new">
      <div className="profile-card-new">
        <h2 className="profile-title-new">Profile Settings</h2>
        <form onSubmit={handleSubmit} className="profile-form-new">
          {/* Personal Details */}
          <div className="form-section-new">
            <h3>Personal Information</h3>
            <div className="form-group-new">
              <label htmlFor="name">Full Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={profile.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group-new">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                required
                disabled // Email is often not directly editable
              />
            </div>
            <div className="form-group-new">
              <label htmlFor="phone">Phone:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Restaurant Details (only for owner role) */}
          {profile.role === 'owner' && ( // Added conditional rendering based on role from JWT
            <div className="form-section-new">
              <h3>Restaurant Information</h3>
              <div className="form-group-new">
                <label htmlFor="resto_name">Restaurant Name:</label>
                <input
                  type="text"
                  id="resto_name"
                  name="resto_name"
                  value={profile.resto_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group-new">
                <label htmlFor="location">Location:</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={profile.location}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}

          <div className="profile-actions-new">
            <button type="submit" className="save-btn-new">Save Changes</button>
            <button type="button" className="cancel-btn-new" onClick={() => navigate('/ownerdashboard')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OwnerProfile;
