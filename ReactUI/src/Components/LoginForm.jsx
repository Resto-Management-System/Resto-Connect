import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Correct: react-router-dom
import { toast } from "react-toastify";
import { userSignIn } from "../Services/users";
import { AuthContext } from "../App"; // Ensure this path and export are correct
import bgImage from '../assets/bg-images/loginbg.jpg'; // Ensure this path is correct
import "../CSS/login.css"; 
import { jwtDecode } from 'jwt-decode'; // Ensure 'jwt-decode' is installed via npm/yarn

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const navigate = useNavigate();
  // Ensure AuthContext is correctly provided in a parent component (e.g., App.jsx)
  const { setUser } = useContext(AuthContext); 

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswdChange = (e) => setPasswd(e.target.value);

  const handleSignInClick = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // userSignIn directly returns the JWT token string
      const token = await userSignIn(email, passwd); 

      if (token) {
        sessionStorage.setItem("token", token); // Store the received token

        // Decode the token to get user details, including the role
        const decodedUser = jwtDecode(token);
        
        // Update setUser with isAuthenticated, token, and the decoded user object
        setUser({ isAuthenticated: true, token: token, user: decodedUser }); 

        toast.success("Signed in successfully!");

        // Role-based navigation
        // Ensure the role casing matches what's in your JWT payload (e.g., 'owner' or 'Owner')
        if (decodedUser.role === "owner") { 
          navigate("/owner-dashboard"); // Navigate to owner's dashboard
        } else if (decodedUser.role === "admin") {
          navigate("/admin-dashboard"); // Navigate to admin's dashboard
        } else {
          // Fallback for other roles or if role is not explicitly handled
          navigate("/user"); 
        }
      } else {
        toast.error("An unexpected error occurred during sign-in: No token received.");
      }
    } catch (err) {
      console.error("Sign-in error details:", err); // Log full error for debugging
      const errorMessage = err.response?.data?.message || err.message || "An unexpected error occurred during sign-in.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="login-wrapper">
      <div
        className="bg-blur"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="login-card">
        <h2 className="text-center mb-4">Login Form</h2>

        <form onSubmit={handleSignInClick}> 
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              className="form-control"
              name="email"
              type="email" // Changed to type="email" for better semantics
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Password:</label>
            <input
              className="form-control"
              name="passwd"
              type="password"
              value={passwd}
              onChange={handlePasswdChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="d-flex justify-content-center mb-3">
            <Link to="/register" className="text-decoration-none">
              Don’t have an account? <strong>Register Here</strong>
            </Link>
          </div>
          <div className="d-flex justify-content-between">
            <button className="btn btn-primary w-100 me-2" type="submit"> 
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

