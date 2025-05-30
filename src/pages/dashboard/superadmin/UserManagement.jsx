import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "../../../api/axios"; // Assuming axios is correctly configured

// Define a common style object for gradient text
const gradientTextStyle = {
  background: 'linear-gradient(to right, #6A67FE, #FE67F6)', // Gradient from your brand
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent', // Fallback
};

// Define common dark background colors
const darkBgColor = "#1E1E1E";
const darkBgColorLighter = "#222222";
const darkBorderColor = "#222222";

// Default avatar image URL
const defaultAvatar = "https://img.freepik.com/premium-psd/3d-icon-black-user-avatar_930095-100.jpg?ga=GA1.1.1575405467.1748030386&semt=ais_hybrid&w=740";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for status update confirmation modal
  const [showStatusConfirmModal, setShowStatusConfirmModal] = useState(false);
  const [userToUpdateStatus, setUserToUpdateStatus] = useState(null);
  const [newStatusValue, setNewStatusValue] = useState('');

  // State for delete confirmation modal
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Function to fetch all users from the API
  const fetchAllUsers = async () => {
    setLoading(true);
    setError(null);
    const endpoint = '/users/all';
    const token = localStorage.getItem('authToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(endpoint, config);
      setUsers(response.data);
    } catch (err) {
      console.error('Failed to fetch users:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to load users.');
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch users on component mount
  useEffect(() => {
    fetchAllUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const nameMatch = user?.name?.toLowerCase().includes(search?.toLowerCase());
    const emailMatch = user?.email?.toLowerCase().includes(search?.toLowerCase());
    const roleMatch = (roleFilter === "All" || user?.role === roleFilter);

    return roleMatch && (nameMatch || emailMatch);
  });

  // Function to determine status badge color
  const getStatusClasses = (status) => {
    switch (status) {
      case "active":
        return "bg-green-700/30 text-green-400";
      case "pending":
        return "bg-yellow-700/30 text-yellow-400";
      case "banned":
        return "bg-red-700/30 text-red-400";
      default:
        return "bg-gray-700/30 text-gray-400";
    }
  };

  // Handler to open the status update confirmation modal
  const handleStatusChangeClick = (user, status) => {
    setUserToUpdateStatus(user);
    setNewStatusValue(status);
    setShowStatusConfirmModal(true);
  };

  // Handler to confirm the status update and make API call
  const handleConfirmStatusUpdate = async () => {
    if (!userToUpdateStatus || !newStatusValue) return;

    setShowStatusConfirmModal(false);

    const endpoint = `/users/${userToUpdateStatus._id}/status`;
    const token = localStorage.getItem('authToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
    const body = { status: newStatusValue };

    try {
      await axios.patch(endpoint, body, config);
      fetchAllUsers(); // Refresh the user list
    } catch (err) {
      console.error('Failed to update user status:', err.response?.data || err.message);
      alert(`Failed to update status: ${err.response?.data?.message || err.message}`);
    } finally {
      setUserToUpdateStatus(null);
      setNewStatusValue('');
    }
  };

  // Handler to cancel the status update
  const handleCancelStatusUpdate = () => {
    setShowStatusConfirmModal(false);
    setUserToUpdateStatus(null);
    setNewStatusValue('');
  };

  // Handler to open the delete confirmation modal
  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteConfirmModal(true);
  };

  // Handler to confirm deletion and make API call
  const handleConfirmDelete = async () => {
    if (!userToDelete) return;

    setShowDeleteConfirmModal(false);

    const endpoint = `/users/${userToDelete._id}`;
    const token = localStorage.getItem('authToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.delete(endpoint, config);
      fetchAllUsers(); // Refresh the user list
    } catch (err) {
      console.error('Failed to delete user:', err.response?.data || err.message);
      alert(`Failed to delete user: ${err.response?.data?.message || err.message}`);
    } finally {
      setUserToDelete(null);
    }
  };

  // Handler to cancel deletion
  const handleCancelDelete = () => {
    setShowDeleteConfirmModal(false);
    setUserToDelete(null);
  };


  return (
    <div className="">
      <motion.h1
        className="text-4xl font-extrabold mb-8"
        style={gradientTextStyle}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        User Management
      </motion.h1>

      <motion.div
        className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <input
          type="text"
          placeholder="Search by name or email..."
          className="flex-1 bg-[#222222] text-gray-200 border border-gray-700 px-5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 transition duration-200"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="bg-[#222222] text-gray-300 border border-gray-700 px-5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none cursor-pointer transition duration-200"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="All" className="bg-[#121212] text-gray-300">All Roles</option>
          <option value="student" className="bg-[#121212] text-gray-300">Student</option>
          <option value="mentor" className="bg-[#121212] text-gray-300">Mentor</option>
          <option value="subadmin" className="bg-[#121212] text-gray-300">Subadmin</option>
          <option value="superadmin" className="bg-[#121212] text-gray-300">Superadmin</option>
        </select>
      </motion.div>

      <motion.div
        className="overflow-auto shadow-lg shadow-black/70 rounded-xl border border-[#222222]"
        style={{ backgroundColor: darkBgColor }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <table className="min-w-full text-base">
          <thead className="bg-[#222222] text-gray-300">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">Name</th>
              <th className="px-6 py-4 text-left font-semibold">Email</th>
              <th className="px-6 py-4 text-left font-semibold">Role</th>
              <th className="px-6 py-4 text-left font-semibold">Phone</th>
              <th className="px-6 py-4 text-left font-semibold">Status</th>
              <th className="px-6 py-4 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400 text-lg">
                  Loading users...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-red-400 text-lg">
                  Error: {error}
                </td>
              </tr>
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <motion.tr
                  key={user._id}
                  className="border-b border-gray-700 text-gray-200 hover:bg-[#2A2A2A] transition duration-150"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img
                      src={user.userprofile || defaultAvatar}
                      alt={`${user.name}'s profile`}
                      className="w-10 h-10 rounded-full object-cover border border-gray-600 flex-shrink-0"
                    />
                    <span>{user.name}</span>
                  </td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="px-6 py-4">{user.phone || 'N/A'}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize ${getStatusClasses(user.status)}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex items-center gap-3">
                    <motion.button
                      className="text-purple-400 hover:text-purple-300 transition duration-150 font-medium px-2 py-1 min-w-[50px] text-center" // Added min-w and text-center
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Edit
                    </motion.button>
                    {user.status === 'banned' ? (
                        <motion.button
                            className="text-green-400 hover:text-green-300 transition duration-150 font-medium px-2 py-1 min-w-[70px] text-center" // Added min-w and text-center
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleStatusChangeClick(user, 'active')}
                        >
                            Activate
                        </motion.button>
                    ) : (
                        <motion.button
                            className="text-yellow-400 hover:text-yellow-300 transition duration-150 font-medium px-2 py-1 min-w-[70px] text-center" // Added min-w and text-center
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleStatusChangeClick(user, 'banned')}
                        >
                            Ban
                        </motion.button>
                    )}
                    <motion.button
                      className="text-red-400 hover:text-red-300 transition duration-150 font-medium px-2 py-1 min-w-[50px] text-center" // Added min-w and text-center
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDeleteClick(user)}
                    >
                      Delete
                    </motion.button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400 text-lg">
                  No users found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>

      <div className="mt-8 text-gray-400 text-center">Pagination Coming Soon...</div>

      {/* Status Confirmation Modal */}
      <AnimatePresence>
        {showStatusConfirmModal && userToUpdateStatus && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#1E1E1E] rounded-lg shadow-xl border border-[#2A2A2A] p-8 max-w-sm w-full text-center"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <h3 className="text-xl font-semibold text-gray-100 mb-4">Confirm Status Change</h3>
              <p className="text-gray-300 mb-6">
                Are you sure you want to change the status of{" "}
                <span className="font-bold text-white">{userToUpdateStatus.name}</span> to{" "}
                <span className={`font-bold capitalize ${getStatusClasses(newStatusValue)}`}>{newStatusValue}</span>?
              </p>
              <div className="flex justify-center space-x-4">
                <motion.button
                  onClick={handleConfirmStatusUpdate}
                  className={`px-6 py-2 rounded-lg text-white font-medium hover:opacity-80 transition ${
                    newStatusValue === 'active' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Confirm
                </motion.button>
                <motion.button
                  onClick={handleCancelStatusUpdate}
                  className="px-6 py-2 rounded-lg bg-gray-600 text-white font-medium hover:bg-gray-700 transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirmModal && userToDelete && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#1E1E1E] rounded-lg shadow-xl border border-[#2A2A2A] p-8 max-w-sm w-full text-center"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <h3 className="text-xl font-semibold text-gray-100 mb-4">Confirm User Deletion</h3>
              <p className="text-gray-300 mb-6">
                Are you sure you want to permanently delete user{" "}
                <span className="font-bold text-white">{userToDelete.name}</span>?
                This action cannot be undone.
              </p>
              <div className="flex justify-center space-x-4">
                <motion.button
                  onClick={handleConfirmDelete}
                  className="px-6 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Delete User
                </motion.button>
                <motion.button
                  onClick={handleCancelDelete}
                  className="px-6 py-2 rounded-lg bg-gray-600 text-white font-medium hover:bg-gray-700 transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserManagement;
