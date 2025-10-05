import React, { useEffect, useState } from "react";
import Navbar from "../Component/Navbar";
import {
  FaUser,
  FaEdit,
  FaTimes,
  FaSave,
  FaShieldAlt,
  FaCog,
  FaEnvelope,
  FaCalendarAlt
} from "react-icons/fa";

function MyProfile() {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: ""
  });

  // Load user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    if (storedUser) {
      setFormData({
        firstname: storedUser.firstname || "",
        lastname: storedUser.lastname || "",
        email: storedUser.email || "",
        phone: storedUser.phone || "",
        address: storedUser.address || "",
        city: storedUser.city || "",
        country: storedUser.country || ""
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const updatedUser = { ...user, ...formData };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setIsModalOpen(false);
  };

  const getInitials = () => {
    return `${user?.firstname?.charAt(0) || ''}${user?.lastname?.charAt(0) || ''}`.toUpperCase();
  };

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/20 flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <FaUser className="text-3xl text-gray-400" />
            </div>
            <h3 className="text-2xl font-serif font-light text-gray-900 mb-4">Please Login</h3>
            <p className="text-gray-600 max-w-sm">Sign in to access your personalized profile and manage your preferences</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50/20 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-light text-gray-900 mb-4">
              My Profile
            </h1>
            <div className="w-24 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-6 sticky top-8">
                {/* User Avatar */}
                <div className="text-center mb-8">
                  <div className="relative inline-block">
                    <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4">
                      <span className="text-2xl font-bold text-white">{getInitials()}</span>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-md border-2 border-white">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <h2 className="text-xl font-serif font-light text-gray-900">
                    {user.firstname} {user.lastname}
                  </h2>
                  <p className="text-gray-500 text-sm flex items-center justify-center gap-1 mt-1">
                    <FaEnvelope className="w-3 h-3" />
                    {user.email}
                  </p>
                </div>

                {/* Navigation */}
                <nav className="space-y-2">
                  {[
                    { id: "profile", icon: FaUser, label: "Profile" },
                    { id: "security", icon: FaShieldAlt, label: "Security" },
                    { id: "settings", icon: FaCog, label: "Settings" }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all duration-300 ${
                        activeTab === item.id
                          ? "bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 text-amber-700 shadow-md"
                          : "text-gray-600 hover:bg-white hover:shadow-sm"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className={`w-4 h-4 ${activeTab === item.id ? 'text-amber-600' : 'text-gray-400'}`} />
                        <span className="font-medium text-sm">{item.label}</span>
                      </div>
                    </button>
                  ))}
                </nav>

                {/* Edit Button */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full mt-6 bg-gradient-to-r from-slate-900 to-slate-700 text-white py-3 rounded-2xl font-semibold hover:from-slate-800 hover:to-slate-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <FaEdit className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-8">
                {/* Profile Tab */}
                {activeTab === "profile" && (
                  <div>
                    <h3 className="text-2xl font-serif font-light text-gray-900 mb-8">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="block text-sm font-semibold text-gray-700">First Name</label>
                        <div className="bg-gray-50 rounded-2xl px-4 py-3 border border-gray-200">
                          <p className="text-gray-900">{user.firstname}</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="block text-sm font-semibold text-gray-700">Last Name</label>
                        <div className="bg-gray-50 rounded-2xl px-4 py-3 border border-gray-200">
                          <p className="text-gray-900">{user.lastname}</p>
                        </div>
                      </div>
                      <div className="md:col-span-2 space-y-1">
                        <label className="block text-sm font-semibold text-gray-700">Email</label>
                        <div className="bg-gray-50 rounded-2xl px-4 py-3 border border-gray-200">
                          <p className="text-gray-900 flex items-center gap-2">
                            <FaEnvelope className="text-gray-400 w-4 h-4" />
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <div className="md:col-span-2 space-y-1">
                        <label className="block text-sm font-semibold text-gray-700">Member Since</label>
                        <div className="bg-gray-50 rounded-2xl px-4 py-3 border border-gray-200">
                          <p className="text-gray-900 flex items-center gap-2">
                            <FaCalendarAlt className="text-gray-400 w-4 h-4" />
                            {user.joinedDate || "October 2025"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Security Tab */}
                {activeTab === "security" && (
                  <div>
                    <h3 className="text-2xl font-serif font-light text-gray-900 mb-8">Security</h3>
                    <div className="max-w-md space-y-6">
                      <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-gray-200/50 p-6">
                        <h4 className="font-semibold text-gray-900 mb-4">Change Password</h4>
                        <div className="space-y-4">
                          <input
                            type="password"
                            placeholder="Current Password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                          />
                          <input
                            type="password"
                            placeholder="New Password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                          />
                          <input
                            type="password"
                            placeholder="Confirm New Password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                          />
                          <button className="bg-amber-500 text-white px-6 py-3 rounded-2xl hover:bg-amber-600 transition-colors">
                            Update Password
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Settings Tab */}
                {activeTab === "settings" && (
                  <div>
                    <h3 className="text-2xl font-serif font-light text-gray-900 mb-8">Settings</h3>
                    <div className="max-w-md space-y-6">
                      <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-gray-200/50 p-6">
                        <h4 className="font-semibold text-gray-900 mb-4">Preferences</h4>
                        <div className="space-y-3">
                          <label className="flex items-center gap-3">
                            <input type="checkbox" className="rounded text-amber-500 focus:ring-amber-500" defaultChecked />
                            <span>Email notifications</span>
                          </label>
                          <label className="flex items-center gap-3">
                            <input type="checkbox" className="rounded text-amber-500 focus:ring-amber-500" defaultChecked />
                            <span>Order updates</span>
                          </label>
                          <label className="flex items-center gap-3">
                            <input type="checkbox" className="rounded text-amber-500 focus:ring-amber-500" />
                            <span>Promotional emails</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md transform transition-all">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-serif font-light text-gray-900">Edit Profile</h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    <FaTimes className="text-gray-500" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSave}
                  className="w-full mt-6 bg-gradient-to-r from-slate-900 to-slate-700 text-white py-4 rounded-2xl font-semibold hover:from-slate-800 hover:to-slate-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <FaSave className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MyProfile;
