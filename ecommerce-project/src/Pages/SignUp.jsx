
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
    shippingAddress: []
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
      role
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
      //  json-server already filters with ?email
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
        role
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create Your Account
        </h2>
        <p className="text-sm text-gray-500 text-center mt-2">
          Please fill in the details to sign up
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
            />
          </div>
          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
            />
          </div>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
            />
          </div>
          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
            />
          </div>
          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
