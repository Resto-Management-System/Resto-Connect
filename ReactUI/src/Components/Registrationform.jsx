import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { userSignUp } from "../Services/users";

const RegistrationForm = () => {
  const [info, setInfo] = useState({
    name: "",
    email: "",
    passwd: "",
    phone:"",
    role: "",
    resto_name: "",
    document: null,
    location: "",
  });

  const navigate = useNavigate();

  const handleInputFieldChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };


  const handleSignUpClick = async (e) => {
    e.preventDefault();

    if (!info.role) {
      toast.error("Please select a role before submitting.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", info.name);
      formData.append("email", info.email);
      formData.append("passwd", info.passwd);
      formData.append("phone", info.phone);
      formData.append("role", info.role);

      if (info.role === "Owner") {
        formData.append("resto_name", info.resto_name);
        formData.append("location", info.location);
       
      }

      const user = await userSignUp(formData, info.role);

      if (info.role === "Owner") {
        localStorage.setItem("userId", user.user_id); // updated: use user_id from backend
        toast.success("Restaurant registered successfully!");
        navigate("/upload-documents");
      } else {
        toast.success("User registered successfully!");
        navigate("/login");
      }
    } catch (err) {
      toast.error("Registration failed! " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 border rounded shadow p-4 bg-light">
          <h2 className="mb-4 text-center text-primary">Registration Form</h2>
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
                type="phone"
                name="phone"
                value={info.phone}
                onChange={handleInputFieldChange}
                className="form-control"
                placeholder="Enter your mobile number"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Select Role</label>
              <select
                className="form-select"
                name="role"
                value={info.role}
                onChange={handleInputFieldChange}
                required
              >
                <option value="">-- Select --</option>
                <option value="Owner">Restaurant Owner</option>
                <option value="admin">Super Admin</option>
              </select>
            </div>

            {info.role === "Owner" && (
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
                    placeholder="City or Area"
                    required
                  />
                </div>
              </div>
            )}

            <div className="d-flex justify-content-between mt-4">
              <button type="submit" className="btn btn-primary px-4">
                Sign Up
              </button>

              <Link to="/login" className="btn btn-primary px-4">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
