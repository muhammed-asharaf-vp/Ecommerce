import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../Api/Axios";
import { AuthContext } from "../Context/AuthContext";

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
      // Fetch user by email first
      const emailResponse = await api.get(`/users?email=${email}`);
      const usersWithEmail = emailResponse.data;

      if (usersWithEmail.length === 0) {
        setError("No account found with this email. Please Sign Up first.");
        return;
      }

      const userData = usersWithEmail[0];

      // ✅ Check user status before password verification
      if (userData.status === "blocked") {
        setError("🚫 Your account has been blocked. Please contact the administrator for assistance.");
        return;
      }

      if (userData.status === "inactive") {
        setError("⏸️ Your account is currently inactive. Please contact support.");
        return;
      }

      // Now verify password
      if (userData.password !== password) {
        setError("Invalid password. Please try again.");
        return;
      }

      // ✅ Check if user is active before login
      if (userData.status !== "active") {
        setError("Account not active. Please contact administrator.");
        return;
      }

      // Save user in context & localStorage
      login(userData);

      // ✅ Navigate based on role
      if (userData.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }

      setError(""); // Clear any previous errors
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again later.");
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
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <div className={`p-3 rounded-lg text-sm ${
              error.includes("blocked") 
                ? "bg-red-100 text-red-700 border border-red-300" 
                : error.includes("inactive") || error.includes("not active")
                ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
                : "bg-red-50 text-red-600 border border-red-200"
            }`}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-yellow-600 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-700 transition disabled:opacity-50"
            disabled={!email || !password}
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

        {/* Contact information for blocked users */}
        {error && error.includes("blocked") && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-600 text-center">
              Need help? Contact administrator at{" "}
              <span className="font-medium">admin@veloce.com</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;