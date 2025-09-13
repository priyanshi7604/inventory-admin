// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { FaEye, FaEyeSlash } from "react-icons/fa"; // Eye icons
// import signupImage from "../assets/SignupImage.png"; // Import signup image
// import "../styles/Signup.css";

// const Signup = () => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
//   const [acceptedTerms, setAcceptedTerms] = useState(false); // Terms checkbox
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSignup = (e) => {
//     e.preventDefault();

//     // Basic validation
//     if (!username || !email || !password) {
//       setError("All fields are required");
//       return;
//     }

//     // Replace with API call later
//     // Example: axios.post("/api/signup", { username, email, password })
//     alert("Signup successful! Please login.");
//     navigate("/login"); // Redirect to login page
//   };

//   return (
//     <div className="signup-container">
//       <div className="signup-box">
//         <div className="signup-image">
//           <img src={signupImage} alt="Signup" />
//         </div>
//         <div className="signup-form">
//           <h2>Join Us!</h2>
//           <p className="subtitle">Create your account</p>
//           <form onSubmit={handleSignup}>
//             <div className="form-group">
//               <input
//                 type="text"
//                 placeholder="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="form-group password-group">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <button
//                 type="button"
//                 className="toggle-password"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
//             <div className="terms-group">
//               <input
//                 type="checkbox"
//                 id="terms"
//                 checked={acceptedTerms}
//                 onChange={(e) => setAcceptedTerms(e.target.checked)}
//               />
//               <label htmlFor="terms">I accept the terms and conditions</label>
//             </div>
//             {error && <p className="error-message">{error}</p>}
//             <button type="submit" disabled={!acceptedTerms}>
//               Signup
//             </button>
//           </form>
//           <div className="navigation-link">
//             <p>
//               Already have an account? <Link to="/login">Login</Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import signupImage from "../assets/SignupImage.png";
import "../styles/Signup.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Url } from "../Url"; // <-- make sure Url = "http://localhost:3000/api"

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await axios.post(`${Url}/user/signup`, {
        username,
        email,
        password,
      });

      if (response.data?.success) {
        toast.success("Signup successful! Please login.");
        navigate("/login");
      } else {
        setError(response.data?.message || "Signup failed. Try again.");
      }
    } catch (err) {
      setError(err.response?.data?.errors?.message || "Signup failed.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="signup-image">
          <img src={signupImage} alt="Signup" />
        </div>
        <div className="signup-form">
          <h2>Join Us!</h2>
          <p className="subtitle">Create your account</p>
          <form onSubmit={handleSignup}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group password-group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="terms-group">
              <input
                type="checkbox"
                id="terms"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
              />
              <label htmlFor="terms">I accept the terms and conditions</label>
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" disabled={!acceptedTerms}>
              Signup
            </button>
          </form>
          <div className="navigation-link">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
