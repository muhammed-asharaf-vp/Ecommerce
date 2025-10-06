import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../Api/Axios";
import { AuthContext } from "../Context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!email.includes("@")) {
      setError("Enter a valid email");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      // Fetch users matching email & password
      const response = await api.get(`/users?email=${email}&password=${password}`);
      const data = response.data;

      if (data.length === 0) {
        setError("Invalid email or password. Please Sign Up first.");
        return;
      }

      // ✅ Save user in Context + localStorage
      login(data[0]);

      // Clear error & redirect
      setError("");
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-gray-200">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-yellow-600 tracking-tight mb-2">Veloce</h1>
          <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-sm text-gray-500 mt-2">
            Sign in to your account to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-600 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-yellow-600 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-700 transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-yellow-600 font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;