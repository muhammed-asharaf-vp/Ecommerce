import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../Api/Axios";
import { AuthContext } from "../Context/AuthContext";

export default function Signup() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
    cart: [],
    wishlist: [],
    order: [],
    shippingAddress: [],
    status: "active"
  });

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      firstname,
      lastname,
      email,
      password,
      confirmPassword,
      cart,
      wishlist,
      shippingAddress,
      order,
      role,
      status
    } = formData;

    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      alert("Please fill all fields!");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // json-server already filters with ?email
      const { data: users } = await api.get(`/users?email=${email}`);

      if (users.length > 0) {
        alert("User already exists with this email!");
        return;
      }

      // Create new user
      const newUser = {
        firstname,
        lastname,
        email,
        password,
        cart,
        wishlist,
        shippingAddress,
        order,
        role,
        status
      };

      const res = await api.post("/users", newUser);

      // Auto login
      login(res.data);
      alert("Signup successful!");
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error.message);
      alert("Something went wrong, please check server connection!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#003631] to-[#002822] px-4">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-2xl w-full max-w-md border border-[#FFEDA8]/20">
        <h2 className="text-2xl font-bold text-center text-[#FFEDA8]">
          Create Your Account
        </h2>
        <p className="text-sm text-[#FFEDA8]/80 text-center mt-2">
          Please fill in the details to sign up
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-[#FFEDA8]">
              First Name
            </label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-white/5 border border-[#FFEDA8]/30 rounded-lg shadow-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFEDA8] focus:border-transparent"
              placeholder="Enter your first name"
            />
          </div>
          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-[#FFEDA8]">
              Last Name
            </label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-white/5 border border-[#FFEDA8]/30 rounded-lg shadow-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFEDA8] focus:border-transparent"
              placeholder="Enter your last name"
            />
          </div>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[#FFEDA8]">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-white/5 border border-[#FFEDA8]/30 rounded-lg shadow-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFEDA8] focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>
          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-[#FFEDA8]">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-white/5 border border-[#FFEDA8]/30 rounded-lg shadow-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFEDA8] focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>
          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-[#FFEDA8]">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-white/5 border border-[#FFEDA8]/30 rounded-lg shadow-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFEDA8] focus:border-transparent"
              placeholder="Confirm your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#FFEDA8] text-[#003631] font-semibold rounded-lg hover:bg-[#FFEDA8]/90 hover:shadow-lg transform hover:scale-105 transition-all duration-200 shadow-md"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-[#FFEDA8]/80 mt-6">
          Already have an account?{" "}
          <Link 
            to="/login" 
            className="text-[#FFEDA8] hover:text-[#FFEDA8]/90 hover:underline font-medium transition-colors duration-200"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}