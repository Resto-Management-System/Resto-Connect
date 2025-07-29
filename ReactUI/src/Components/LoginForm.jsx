import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { userSignIn } from "../Services/users";
// import { AuthContext } from "../App";
import "../CSS/login.css"; 

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const navigate = useNavigate();
  // const { setUser } = useContext(AuthContext);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswdChange = (e) => setPasswd(e.target.value);

  const handleSignInClick = async (e) => {
    try {
      const user = await userSignIn(email, passwd);
      sessionStorage.setItem("user", JSON.stringify(user));
      // setUser(user);
      navigate("/user");
    } catch (err) {
      toast.error("Invalid credentials.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="text-center mb-4">Login Form</h2>

        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            className="form-control"
            name="email"
            type="text"
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
            onChange={handlePasswdChange}
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="d-flex justify-content-between">
          <button className="btn btn-primary w-100 me-2" onClick={handleSignInClick}>
            Sign In
          </button>
          <Link className="btn btn-secondary w-100 ms-2" to="/register">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
