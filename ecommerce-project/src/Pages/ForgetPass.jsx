import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgetPass() {
  const [email, setEmail] = useState("");
 const [newpass,setnew]=useState("")
 const [confirmpass,setconfirmpass]=useState("")
  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!email.includes("@")) {
    //   setEmail("Enter a valid email");
    //   return;
    

    try {
      // Check if user exists
      const res = await fetch(`http://localhost:5000/users?email=${email}`);
      const data = await res.json();

      if (data.length === 0) {
        setError("Email not found. Please sign up first.");
        return;
      }

      setError("");
      setMessage("Password reset link sent to your email!");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-600">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
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

          {error && <p className="text-red-600 text-sm">{error}</p>}
          {message && <p className="text-green-600 text-sm">{message}</p>}

          <button
            type="submit"
            className="w-full py-3 px-4 bg-yellow-600 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-700 transition transform hover:scale-105"
          >
            Send Reset Link
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-5">
          Remembered your password?{" "}
          <a href="/login" className="text-yellow-600 font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default ForgetPass;
