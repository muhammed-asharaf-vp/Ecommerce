import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import AdminLayout from "../AdminLayout";
import api from "../../../Api/Axios";
import { FaUserShield, FaTrashAlt, FaSearch } from "react-icons/fa";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [refresh, setRefresh] = useState(false);

  // ✅ Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/users");
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [refresh]);

  // ✅ Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await api.delete(`/users/${id}`);
      toast.success("User deleted successfully");
      setRefresh(!refresh);
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    }
  };

  // ✅ Toggle role
  const handleToggleRole = async (id, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    try {
      await api.put(`/users/${id}`, { role: newRole });
      toast.success(`User role updated to ${newRole}`);
      setRefresh(!refresh);
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error("Failed to update role");
    }
  };

  // ✅ Filter users
  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Users</h2>

        {/* Search Bar */}
        <div className="flex items-center bg-white shadow-sm rounded-lg border border-gray-200 px-4 py-2 mb-6 w-full md:w-1/2">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none text-gray-700"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
          {loading ? (
            <p className="text-center p-6 text-gray-500">Loading users...</p>
          ) : filteredUsers.length === 0 ? (
            <p className="text-center p-6 text-gray-500">No users found.</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="p-3 border-b">#</th>
                  <th className="p-3 border-b">Name</th>
                  <th className="p-3 border-b">Email</th>
                  <th className="p-3 border-b">Role</th>
                  <th className="p-3 border-b text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={user._id || index} className="hover:bg-gray-50">
                    <td className="p-3 border-b">{index + 1}</td>
                    <td className="p-3 border-b font-medium text-gray-800">
                      {user.name}
                    </td>
                    <td className="p-3 border-b text-gray-600">{user.email}</td>
                    <td className="p-3 border-b">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          user.role === "admin"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="p-3 border-b text-center space-x-2">
                      <button
                        onClick={() => handleToggleRole(user._id, user.role)}
                        className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-full transition"
                        title="Toggle Role"
                      >
                        <FaUserShield />
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-full transition"
                        title="Delete User"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageUsers;
