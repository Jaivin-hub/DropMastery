import React, { useState } from "react";
import { motion } from "framer-motion"; // Import motion for animations

// Define a common style object for gradient text
const gradientTextStyle = {
  background: 'linear-gradient(to right, #6A67FE, #FE67F6)', // Gradient from your brand
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent', // Fallback
};

// Define common dark background colors
const darkBgColor = "#1E1E1E"; // For card/table container
const darkBgColorLighter = "#222222"; // For inputs, table header, slightly lighter than darkBgColor

const dummyUsers = [
  { id: 1, name: "Alice", email: "alice@example.com", role: "Student", status: "Active" },
  { id: 2, name: "Bob", email: "bob@example.com", role: "Mentor", status: "Pending" },
  { id: 3, name: "Charlie", email: "charlie@example.com", role: "Subadmin", status: "Active" },
  { id: 4, name: "Dave", email: "dave@example.com", role: "Student", status: "Banned" },
  { id: 5, name: "Eve", email: "eve@example.com", role: "Student", status: "Active" },
  { id: 6, name: "Frank", email: "frank@example.com", role: "Mentor", status: "Active" },
  { id: 7, name: "Grace", email: "grace@example.com", role: "Student", status: "Pending" },
];

const UserManagement = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const filteredUsers = dummyUsers.filter((user) => {
    return (
      (roleFilter === "All" || user.role === roleFilter) &&
      (user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()))
    );
  });

  // Function to determine status badge color
  const getStatusClasses = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-700/30 text-green-400";
      case "Pending":
        return "bg-yellow-700/30 text-yellow-400";
      case "Banned":
        return "bg-red-700/30 text-red-400";
      default:
        return "bg-gray-700/30 text-gray-400";
    }
  };

  return (
    <div>
      <motion.h1
        className="text-4xl font-extrabold mb-8" // Larger font, bolder, increased margin
        style={gradientTextStyle} // Apply gradient to the title
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        User Management
      </motion.h1>

      <motion.div
        className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4" // Adjusted spacing and alignment
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <input
          type="text"
          placeholder="Search by name or email..."
          className="flex-1 bg-[#222222] text-gray-200 border border-gray-700 px-5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 transition duration-200" // Dark input styling
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="bg-[#222222] text-gray-300 border border-gray-700 px-5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none cursor-pointer transition duration-200" // Dark select styling
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="All" className="bg-[#121212] text-gray-300">All Roles</option> {/* Dark option styling */}
          <option value="Student" className="bg-[#121212] text-gray-300">Student</option>
          <option value="Mentor" className="bg-[#121212] text-gray-300">Mentor</option>
          <option value="Subadmin" className="bg-[#121212] text-gray-300">Subadmin</option>
        </select>
      </motion.div>

      <motion.div
        className="overflow-auto shadow-lg shadow-black/70 rounded-xl border border-[#222222]" // Container for the table with dark card styling
        style={{ backgroundColor: darkBgColor }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <table className="min-w-full text-base"> {/* Base font size for table */}
          <thead className="bg-[#222222] text-gray-300"> {/* Dark table header */}
            <tr>
              <th className="px-6 py-4 text-left font-semibold">Name</th> {/* Adjusted padding, font, size */}
              <th className="px-6 py-4 text-left font-semibold">Email</th>
              <th className="px-6 py-4 text-left font-semibold">Role</th>
              <th className="px-6 py-4 text-left font-semibold">Status</th>
              <th className="px-6 py-4 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <motion.tr
                key={user.id}
                className="border-b border-gray-700 text-gray-200 hover:bg-[#2A2A2A] transition duration-150" // Dark border, text color, hover effect
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.05 }} // Staggered animation for rows
              >
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClasses(user.status)}`} // Dynamic status badge
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 space-x-3"> {/* Increased space between buttons */}
                  <motion.button
                    className="text-purple-400 hover:text-purple-300 transition duration-150 font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Edit
                  </motion.button>
                  <motion.button
                    className="text-red-400 hover:text-red-300 transition duration-150 font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Delete
                  </motion.button>
                  <motion.button
                    className="text-yellow-400 hover:text-yellow-300 transition duration-150 font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Ban
                  </motion.button>
                </td>
              </motion.tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400 text-lg"> {/* Adjusted text color and size */}
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>

      <div className="mt-8 text-gray-400 text-center">Pagination Coming Soon...</div> {/* Adjusted margin and text color */}
    </div>
  );
};

export default UserManagement;