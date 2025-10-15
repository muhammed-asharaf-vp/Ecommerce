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
  FaCalendarAlt,
  FaPhone,
  FaMapMarkerAlt
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
        <div className="min-h-screen bg-gradient-to-br from-[#003631] to-[#002822] flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 bg-[#002822]/80 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 border border-[#FFEDA8]/20">
              <FaUser className="text-3xl text-[#FFEDA8]" />
            </div>
            <h3 className="text-2xl font-light text-white mb-4">Please Login</h3>
            <p className="text-gray-300 max-w-sm">Sign in to access your personalized profile and manage your preferences</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#003631] to-[#002822] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-lg px-6 py-3 rounded-full mb-6 border border-[#FFEDA8]/20">
              <div className="w-2 h-2 bg-[#FFEDA8] rounded-full animate-pulse"></div>
              <span className="text-sm font-light tracking-widest text-[#FFEDA8]">
                MY PROFILE
              </span>
            </div>
            
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-[#FFEDA8]/10 rounded-full flex items-center justify-center mr-4 border border-[#FFEDA8]/20">
                <FaUser className="text-[#FFEDA8] text-xl" />
              </div>
              <div className="text-left">
                <h1 className="text-2xl lg:text-3xl font-light text-white">My Profile</h1>
                <p className="text-gray-300 text-sm mt-1">Manage your account information and preferences</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-[#002822]/80 backdrop-blur-sm rounded-xl border border-white/10 p-6 sticky top-8">
                {/* User Avatar */}
                <div className="text-center mb-8">
                  <div className="relative inline-block">
                    <div className="w-20 h-20 bg-[#FFEDA8]/10 rounded-2xl flex items-center justify-center border border-[#FFEDA8]/20 mx-auto mb-4">
                      <span className="text-2xl font-bold text-[#FFEDA8]">{getInitials()}</span>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-[#002822]">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <h2 className="text-lg font-light text-white">
                    {user.firstname} {user.lastname}
                  </h2>
                  <p className="text-gray-400 text-sm flex items-center justify-center gap-1 mt-1">
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
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
                        activeTab === item.id
                          ? "bg-[#FFEDA8]/10 border border-[#FFEDA8]/20 text-[#FFEDA8]"
                          : "text-gray-300 hover:bg-white/5 hover:border-white/10"
                      } border border-transparent`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className={`w-4 h-4 ${activeTab === item.id ? 'text-[#FFEDA8]' : 'text-gray-400'}`} />
                        <span className="font-medium text-sm">{item.label}</span>
                      </div>
                    </button>
                  ))}
                </nav>

                {/* Edit Button */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full mt-6 bg-[#FFEDA8] text-[#003631] py-3 rounded-lg font-medium hover:bg-[#FFEDA8]/90 transition-all duration-300 flex items-center justify-center gap-2 border border-[#FFEDA8]"
                >
                  <FaEdit className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-[#002822]/80 backdrop-blur-sm rounded-xl border border-white/10 p-6">
                {/* Profile Tab */}
                {activeTab === "profile" && (
                  <div>
                    <h3 className="text-xl font-light text-white mb-6">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">First Name</label>
                        <div className="bg-[#003631]/50 rounded-lg px-4 py-3 border border-white/10">
                          <p className="text-white">{user.firstname}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">Last Name</label>
                        <div className="bg-[#003631]/50 rounded-lg px-4 py-3 border border-white/10">
                          <p className="text-white">{user.lastname}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">Email</label>
                        <div className="bg-[#003631]/50 rounded-lg px-4 py-3 border border-white/10">
                          <p className="text-white flex items-center gap-2">
                            <FaEnvelope className="text-gray-400 w-4 h-4" />
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">Phone</label>
                        <div className="bg-[#003631]/50 rounded-lg px-4 py-3 border border-white/10">
                          <p className="text-white flex items-center gap-2">
                            <FaPhone className="text-gray-400 w-4 h-4" />
                            {user.phone || "Not provided"}
                          </p>
                        </div>
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="block text-sm font-medium text-gray-300">Address</label>
                        <div className="bg-[#003631]/50 rounded-lg px-4 py-3 border border-white/10">
                          <p className="text-white flex items-center gap-2">
                            <FaMapMarkerAlt className="text-gray-400 w-4 h-4" />
                            {user.address || "Not provided"}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">City</label>
                        <div className="bg-[#003631]/50 rounded-lg px-4 py-3 border border-white/10">
                          <p className="text-white">{user.city || "Not provided"}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">Country</label>
                        <div className="bg-[#003631]/50 rounded-lg px-4 py-3 border border-white/10">
                          <p className="text-white">{user.country || "Not provided"}</p>
                        </div>
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="block text-sm font-medium text-gray-300">Member Since</label>
                        <div className="bg-[#003631]/50 rounded-lg px-4 py-3 border border-white/10">
                          <p className="text-white flex items-center gap-2">
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
                    <h3 className="text-xl font-light text-white mb-6">Security Settings</h3>
                    <div className="max-w-md">
                      <div className="bg-[#003631]/50 rounded-xl border border-white/10 p-6">
                        <h4 className="font-medium text-white mb-4">Change Password</h4>
                        <div className="space-y-4">
                          <input
                            type="password"
                            placeholder="Current Password"
                            className="w-full px-4 py-3 bg-[#002822] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#FFEDA8] focus:border-[#FFEDA8] text-white placeholder-gray-400"
                          />
                          <input
                            type="password"
                            placeholder="New Password"
                            className="w-full px-4 py-3 bg-[#002822] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#FFEDA8] focus:border-[#FFEDA8] text-white placeholder-gray-400"
                          />
                          <input
                            type="password"
                            placeholder="Confirm New Password"
                            className="w-full px-4 py-3 bg-[#002822] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#FFEDA8] focus:border-[#FFEDA8] text-white placeholder-gray-400"
                          />
                          <button className="w-full bg-[#FFEDA8] text-[#003631] py-3 rounded-lg font-medium hover:bg-[#FFEDA8]/90 transition-colors border border-[#FFEDA8]">
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
                    <h3 className="text-xl font-light text-white mb-6">Account Preferences</h3>
                    <div className="max-w-md">
                      <div className="bg-[#003631]/50 rounded-xl border border-white/10 p-6">
                        <h4 className="font-medium text-white mb-4">Notification Preferences</h4>
                        <div className="space-y-3">
                          <label className="flex items-center gap-3 text-gray-300">
                            <input 
                              type="checkbox" 
                              className="rounded text-[#FFEDA8] focus:ring-[#FFEDA8] bg-[#002822] border-white/20" 
                              defaultChecked 
                            />
                            <span>Email notifications</span>
                          </label>
                          <label className="flex items-center gap-3 text-gray-300">
                            <input 
                              type="checkbox" 
                              className="rounded text-[#FFEDA8] focus:ring-[#FFEDA8] bg-[#002822] border-white/20" 
                              defaultChecked 
                            />
                            <span>Order updates</span>
                          </label>
                          <label className="flex items-center gap-3 text-gray-300">
                            <input 
                              type="checkbox" 
                              className="rounded text-[#FFEDA8] focus:ring-[#FFEDA8] bg-[#002822] border-white/20" 
                            />
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
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-[#002822] rounded-xl border border-white/10 w-full max-w-md transform transition-all">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-light text-white">Edit Profile</h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-white"
                  >
                    <FaTimes className="text-lg" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#003631] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#FFEDA8] focus:border-[#FFEDA8] text-white placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#003631] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#FFEDA8] focus:border-[#FFEDA8] text-white placeholder-gray-400"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#003631] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#FFEDA8] focus:border-[#FFEDA8] text-white placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#003631] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#FFEDA8] focus:border-[#FFEDA8] text-white placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#003631] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#FFEDA8] focus:border-[#FFEDA8] text-white placeholder-gray-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#003631] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#FFEDA8] focus:border-[#FFEDA8] text-white placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Country</label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#003631] border border-white/10 rounded-lg focus:ring-2 focus:ring-[#FFEDA8] focus:border-[#FFEDA8] text-white placeholder-gray-400"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSave}
                  className="w-full mt-6 bg-[#FFEDA8] text-[#003631] py-3 rounded-lg font-medium hover:bg-[#FFEDA8]/90 transition-all duration-300 flex items-center justify-center gap-2 border border-[#FFEDA8]"
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