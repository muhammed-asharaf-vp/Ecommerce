import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // import axios
import logo from "../assets/new.png";
import api from "../Api/Axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      setError("Enter a valid email");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

     try {
    const response = await api.post("/users", {
      email,
      password,
      
    });
          

    console.log(response.data)

      const data = response.data;

      if (data.length === 0) {
        setError("User not found. Please Sign Up first.");
        return;
      }

      // Success
      setError("");
      navigate("/home");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-600">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl flex overflow-hidden">
        {/* Left Side - Branding/Illustration */}
        <div className="hidden md:flex w-1/2 bg-yellow-600 items-center justify-center p-10">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
            <p className="text-lg">
              Login to continue shopping with <br />
              <span className="font-semibold">ChronoMart</span>
            </p>
            <img src={logo} alt="Login illustration" className="w-60 mx-auto mt-8" />
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign In</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter your password"
              />
              <div className="text-right mt-1">
                <a
                  href="/forget"
                  className="text-yellow-600 font-medium text-sm hover:underline"
                >
                  Forgot Password?
                </a>
              </div>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-600 text-sm">{error}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-yellow-600 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-700 transition transform hover:scale-105"
            >
              Login
            </button>
          </form>

          <p className="text-center text-gray-600 text-sm mt-5">
            Don't have an account?{" "}
            <a href="/signup" className="text-yellow-600 font-medium hover:underline">
              SignUp
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
