import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { userSignUp } from "../Services/users";

const RegistrationForm = () => {
  const [info, setInfo] = useState({
    name: "",
    email: "",
    passwd: "",
    phone: "",
    role: "Owner", // fixed as Owner
    resto_name: "",
    location: "",
  });

  const navigate = useNavigate();

  const handleInputFieldChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSignUpClick = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (info.phone.length < 10) {
      toast.error("Phone number must be at least 10 digits.");
      return;
    }

    if (info.passwd.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", info.name);
      formData.append("email", info.email);
      formData.append("passwd", info.passwd);
      formData.append("phone", info.phone);
      formData.append("role", info.role);
      formData.append("resto_name", info.resto_name);
      formData.append("location", info.location);

      const user = await userSignUp(formData, info.role);

      // Save userId for document upload step
      localStorage.setItem("userId", user.user_id);
      toast.success("Restaurant registered successfully!");
      navigate("/upload-documents");
    } catch (err) {
      toast.error("Registration failed! " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 border rounded shadow p-4 bg-light">
          <h2 className="mb-4 text-center text-primary">Restaurant Owner Registration</h2>

          <form onSubmit={handleSignUpClick} encType="multipart/form-data">
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                value={info.name}
                onChange={handleInputFieldChange}
                className="form-control"
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                name="email"
                value={info.email}
                onChange={handleInputFieldChange}
                className="form-control"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="passwd"
                value={info.passwd}
                onChange={handleInputFieldChange}
                className="form-control"
                placeholder="Choose a strong password"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                type="tel"
                name="phone"
                value={info.phone}
                onChange={handleInputFieldChange}
                className="form-control"
                placeholder="Enter your mobile number"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Role</label>
              <input
                className="form-control"
                name="role"
                value="Restaurant Owner"
                disabled
                readOnly
              />
            </div>

            <div className="border p-3 rounded bg-white mb-3">
              <h5 className="text-secondary mb-3">Restaurant Details</h5>

              <div className="mb-3">
                <label className="form-label">Restaurant Name</label>
                <input
                  type="text"
                  name="resto_name"
                  value={info.resto_name}
                  onChange={handleInputFieldChange}
                  className="form-control"
                  placeholder="e.g. Food Fusion Café"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  name="location"
                  value={info.location}
                  onChange={handleInputFieldChange}
                  className="form-control"
                  placeholder="e.g. Koregaon Park, Pune"
                  required
                />
              </div>
            </div>

            <div className="d-flex justify-content-between gap-3 mt-4">
              <button type="submit" className="btn btn-primary px-4">
                Sign Up
              </button>
              <Link to="/login" className="btn btn-primary px-4">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
