import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import loginImage from "../assets/loginImage.png";
import "../styles/Login.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Url } from "../Url";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [error, setError] = useState(""); // Error state
    const navigate = useNavigate();
    const URL = `${Url}/user/signin`;

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Reset error message

        if (!username || !password) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            const response = await axios.post(URL, { username, password });

            if (response.data?.payload?.token) {
                localStorage.setItem("token", response.data.payload.token);
                localStorage.setItem("username", response.data.payload.name);
                navigate("/dashboard");
                return toast.success("Login Successfully");
            } else {
                setError("Invalid username or password.");
            }
        } catch (err) {
            setError("Login failed. Please check your credentials and try again.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-image">
                    <img src={loginImage} alt="Login" />
                </div>
                <div className="login-form">
                    <h2>Welcome Back!</h2>
                    <p className="subtitle">Login to your account</p>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </div>
                        <div className="form-group password-group">
                            <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        <div className="terms-group">
                            <input type="checkbox" id="terms" checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} />
                            <label htmlFor="terms">I accept the terms and conditions</label>
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        <button type="submit" disabled={!acceptedTerms}>
                            Login
                        </button>
                    </form>
                    <div className="navigation-link">
                        <p>
                            Don't have an account? <Link to="/signup">Signup</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
