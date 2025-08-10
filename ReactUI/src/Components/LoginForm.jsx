import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router"; // Correct: react-router-dom
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
  const { setUser } = useContext(AuthContext);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswdChange = (e) => setPasswd(e.target.value);

  const handleSignInClick = async (e) => {
    e.preventDefault();

    try {
      // The userSignIn function now returns an object with 'token' and 'user'.
      // We need to destructure it to get both values.
      const responseData = await userSignIn(email, passwd);
      const token = responseData.token;
      const user = responseData.user;

      if (token) {
        // Store the received token in sessionStorage
        sessionStorage.setItem("token", token);
        // Also store the user details
        sessionStorage.setItem("user", JSON.stringify({name: user.name, role: user.role}));

        // Decode the token to get the user's role and other details
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.role;

        // Set the user in the global context
        setUser({ token, role: userRole });

        toast.success(`Welcome, ${user.name}!`, { autoClose: 1500 });

        // Navigate based on the user's role
        if (userRole === "owner") {
          navigate("/ownerdashboard");
        } else if (userRole === "admin") {
          navigate("/admin");
        } else if (userRole === "customer") {
          navigate("/customer");
        } else {
          // Fallback for other roles or unhandled cases
          navigate("/");
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      // The API error message might be in err.response.data.message
      const errorMessage = err.response?.data?.message || err.message || "Failed to sign in.";
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

