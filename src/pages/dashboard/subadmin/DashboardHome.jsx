// src/pages/dashboard/subadmin/DashboardHome.jsx

import React from "react";
import { motion } from "framer-motion"; // Import motion for animations

// Define a common style object for gradient text
const gradientTextStyle = {
  background: 'linear-gradient(to right, #6A67FE, #FE67F6)', // Gradient from your brand
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent', // Fallback
};

// Define common dark background colors and border
const darkBgColor = "#1E1E1E"; // Consistent for main cards
const darkBorderColor = "#222222"; // Consistent border color

const DashboardHome = () => {
  return (
    <motion.div
      className="p-8" // Consistent padding for the overall page content
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2
        className="text-3xl font-extrabold mb-8" // Larger font, bolder, consistent margin
        style={gradientTextStyle} // Apply gradient to the title
      >
        Welcome, SubAdmin!
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Increased gap, added lg:grid-cols-3 */}

        {/* Card: Total Students */}
        <motion.div
          className="p-6 shadow-lg shadow-black/70 rounded-xl border" // Dark background, increased padding/roundness, stronger shadow, border
          style={{ backgroundColor: darkBgColor, borderColor: darkBorderColor }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h3 className="text-xl font-bold text-gray-200">Total Students</h3> {/* Adjusted text color and size */}
          <p className="text-4xl mt-3 text-purple-400">{128}</p> {/* Adjusted text size and accent color */}
        </motion.div>

        {/* Card: Active Courses */}
        <motion.div
          className="p-6 shadow-lg shadow-black/70 rounded-xl border"
          style={{ backgroundColor: darkBgColor, borderColor: darkBorderColor }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h3 className="text-xl font-bold text-gray-200">Active Courses</h3>
          <p className="text-4xl mt-3 text-blue-400">{12}</p> {/* Different accent color */}
        </motion.div>

        {/* Card: Upcoming Live Sessions */}
        <motion.div
          className="p-6 shadow-lg shadow-black/70 rounded-xl border"
          style={{ backgroundColor: darkBgColor, borderColor: darkBorderColor }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <h3 className="text-xl font-bold text-gray-200">Upcoming Live Sessions</h3>
          <p className="text-4xl mt-3 text-pink-400">{5}</p> {/* Different accent color */}
        </motion.div>

        {/* Card: Pending Approvals */}
        <motion.div
          className="p-6 shadow-lg shadow-black/70 rounded-xl border"
          style={{ backgroundColor: darkBgColor, borderColor: darkBorderColor }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <h3 className="text-xl font-bold text-gray-200">Pending Approvals</h3>
          <p className="text-4xl mt-3 text-orange-400">{3}</p> {/* Different accent color */}
        </motion.div>

        {/* Card: Latest Announcement */}
        <motion.div
          className="p-6 shadow-lg shadow-black/70 rounded-xl border"
          style={{ backgroundColor: darkBgColor, borderColor: darkBorderColor }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <h3 className="text-xl font-bold text-gray-200">Latest Announcement</h3>
          <p className="mt-3 text-base text-gray-400 leading-relaxed"> {/* Adjusted text size, color, and line height */}
            “Orientation for new batch starts tomorrow at 10 AM.”
          </p>
        </motion.div>

        {/* Card: Monthly Revenue */}
        <motion.div
          className="p-6 shadow-lg shadow-black/70 rounded-xl border"
          style={{ backgroundColor: darkBgColor, borderColor: darkBorderColor }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <h3 className="text-xl font-bold text-gray-200">Monthly Revenue</h3>
          <p className="text-4xl mt-3 text-green-400">₹32,000</p> {/* Accent color for revenue */}
        </motion.div>

      </div>
    </motion.div>
  );
};

export default DashboardHome;