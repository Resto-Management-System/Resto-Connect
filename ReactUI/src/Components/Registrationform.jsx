import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { userSignUp } from "../Services/users";

const RegistrationForm = () => {
	const [info, setInfo] = useState({
		name: "",
		email: "",
		password: "",
		role: "",
		resto_name: "",
		document: null,
		location: "",
	});

	const navigate = useNavigate();
	
	const handleInputFieldChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setInfo({ ...info, document: e.target.files[0] });
  };

  const handleSignUpClick = async (e) => {
    e.preventDefault();

    try {
      // Prepare form data
      const formData = new FormData();
      formData.append("name", info.name);
      formData.append("email", info.email);
      formData.append("password", info.password);
      formData.append("role", info.role);

      //restaurant specific fields
      if (info.role === "Owner") {
        formData.append("resto_name", info.resto_name);
        formData.append("location", info.location); 
        // if (info.documents) {
        //   formData.append("documents", info.document);
        // }
      }
      const user = await userSignUp(formData);
      if (info.role === "Owner") {
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
                name="password"
                value={info.password}
                onChange={handleInputFieldChange}
                className="form-control"
                placeholder="Choose a strong password"
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
                <option value="customer">Customer</option>
                <option value="Owner">Restaurant Owner</option>
                <option value="superAdmin">Super Admin</option>
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

                {/* <div className="mb-3">
                  <label className="form-label">Upload Documents</label>
                  <input
                    type="file"
                    name="document"
                    onChange={handleFileChange}
                    className="form-control"
                    required
                  />
                </div> */}
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

export default RegistrationForm