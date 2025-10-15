import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../Api/Axios";
import { AuthContext } from "../Context/AuthContext";
import { FaEnvelope, FaLock, FaUserShield, FaHeadset, FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validation
    if (!email.includes("@")) {
      setError("Enter a valid email");
      setIsLoading(false);
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    try {
      // Fetch user by email first
      const emailResponse = await api.get(`/users?email=${email}`);
      const usersWithEmail = emailResponse.data;

      if (usersWithEmail.length === 0) {
        setError("No account found with this email. Please Sign Up first.");
        setIsLoading(false);
        return;
      }

      const userData = usersWithEmail[0];

      // Check user status before password verification
      if (userData.status === "blocked") {
        setError("🚫 Your account has been blocked. Please contact the administrator for assistance.");
        setIsLoading(false);
        return;
      }

      if (userData.status === "inactive") {
        setError("⏸️ Your account is currently inactive. Please contact support.");
        setIsLoading(false);
        return;
      }

      // Now verify password
      if (userData.password !== password) {
        setError("Invalid password. Please try again.");
        setIsLoading(false);
        return;
      }

      // Check if user is active before login
      if (userData.status !== "active") {
        setError("Account not active. Please contact administrator.");
        setIsLoading(false);
        return;
      }

      // Save user in context & localStorage
      login(userData);

      // Navigate based on role
      if (userData.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }

      setError("");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#003631] to-[#002822] px-4 py-8">
      <div className="bg-[#002822]/80 backdrop-blur-sm rounded-xl border border-white/10 shadow-2xl w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-lg px-4 py-2 rounded-full mb-4 border border-[#FFEDA8]/20">
            <div className="w-1.5 h-1.5 bg-[#FFEDA8] rounded-full animate-pulse"></div>
            <span className="text-xs font-light tracking-widest text-[#FFEDA8]">
              SIGN IN
            </span>
          </div>

          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-[#FFEDA8]/10 rounded-full flex items-center justify-center mr-4 border border-[#FFEDA8]/20">
              <FaUserShield className="text-[#FFEDA8] text-xl" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-light text-white">Welcome Back</h1>
              <p className="text-gray-300 text-sm mt-1">Sign in to your Veloce account</p>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400 text-sm" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 bg-[#003631] border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFEDA8] focus:border-[#FFEDA8] transition-all duration-300"
                placeholder="Enter your email"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400 text-sm" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-10 py-3 bg-[#003631] border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFEDA8] focus:border-[#FFEDA8] transition-all duration-300"
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
              {/* Show/Hide Password Button */}
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300 transition-colors duration-300"
                disabled={isLoading}
              >
                {showPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className={`p-4 rounded-lg border text-sm ${
              error.includes("blocked") 
                ? "bg-red-500/10 text-red-400 border-red-500/20" 
                : error.includes("inactive") || error.includes("not active")
                ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                : "bg-red-500/10 text-red-400 border-red-500/20"
            }`}>
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!email || !password || isLoading}
            className="w-full py-3 bg-[#FFEDA8] text-[#003631] font-medium rounded-lg hover:bg-[#FFEDA8]/90 transition-all duration-300 flex items-center justify-center gap-2 border border-[#FFEDA8] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-[#003631] border-t-transparent rounded-full animate-spin"></div>
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <p className="text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link 
              to="/signup" 
              className="text-[#FFEDA8] font-medium hover:text-[#FFEDA8]/80 transition-colors duration-300"
            >
              Create Account
            </Link>
          </p>
        </div>

        {/* Contact information for blocked users */}
        {error && error.includes("blocked") && (
          <div className="mt-6 p-4 bg-[#003631]/50 rounded-lg border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#FFEDA8]/10 rounded flex items-center justify-center">
                <FaHeadset className="text-[#FFEDA8] text-sm" />
              </div>
              <div>
                <p className="text-xs text-gray-300">
                  Need help? Contact administrator at{" "}
                  <span className="font-medium text-[#FFEDA8]">admin@veloce.com</span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Security Notice */}
        <div className="mt-6 p-3 bg-[#003631]/30 rounded-lg border border-white/5">
          <p className="text-xs text-gray-400 text-center">
            Your security is our priority. All data is encrypted and protected.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;