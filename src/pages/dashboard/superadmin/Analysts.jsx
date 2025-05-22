// src/pages/dashboard/superadmin/Analysts.jsx

import React, { useEffect, useState } from "react";
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

const Analysts = () => {
  const [data, setData] = useState({
    students: 0,
    mentors: 0,
    subadmins: 0,
    totalCourses: 0,
    activeCourses: 0,
    inactiveCourses: 0,
    approvedMentors: 0,
    pendingMentors: 0,
  });

  useEffect(() => {
    // Simulate fetch
    const mock = {
      students: 1325,
      mentors: 110,
      subadmins: 5,
      totalCourses: 75,
      activeCourses: 68,
      inactiveCourses: 7,
      approvedMentors: 90,
      pendingMentors: 20,
    };
    setData(mock);
  }, []);

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
        Platform Analysts Overview
      </h2>

      {/* Analytics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"> {/* Increased gap, added sm:grid-cols-2 */}
        {/* Card: Total Students */}
        <motion.div
          className="p-6 rounded-xl shadow-lg shadow-black/70 border" // Dark background, increased padding/roundness, stronger shadow, border
          style={{ backgroundColor: darkBgColor, borderColor: darkBorderColor }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h4 className="text-base text-gray-400 mb-2">Total Students</h4> {/* Adjusted text color and size */}
          <p className="text-3xl font-bold text-blue-500">{data.students}</p> {/* Adjusted text size and color for accent */}
        </motion.div>

        {/* Card: Total Mentors */}
        <motion.div
          className="p-6 rounded-xl shadow-lg shadow-black/70 border"
          style={{ backgroundColor: darkBgColor, borderColor: darkBorderColor }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h4 className="text-base text-gray-400 mb-2">Total Mentors</h4>
          <p className="text-3xl font-bold text-purple-500">{data.mentors}</p>
        </motion.div>

        {/* Card: Sub Admins */}
        <motion.div
          className="p-6 rounded-xl shadow-lg shadow-black/70 border"
          style={{ backgroundColor: darkBgColor, borderColor: darkBorderColor }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <h4 className="text-base text-gray-400 mb-2">Sub Admins</h4>
          <p className="text-3xl font-bold text-pink-500">{data.subadmins}</p> {/* Adjusted pink shade */}
        </motion.div>

        {/* Card: Total Courses */}
        <motion.div
          className="p-6 rounded-xl shadow-lg shadow-black/70 border"
          style={{ backgroundColor: darkBgColor, borderColor: darkBorderColor }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <h4 className="text-base text-gray-400 mb-2">Total Courses</h4>
          <p className="text-3xl font-bold text-green-500">{data.totalCourses}</p>
        </motion.div>

        {/* Card: Active Courses */}
        <motion.div
          className="p-6 rounded-xl shadow-lg shadow-black/70 border"
          style={{ backgroundColor: darkBgColor, borderColor: darkBorderColor }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <h4 className="text-base text-gray-400 mb-2">Active Courses</h4>
          <p className="text-3xl font-bold text-teal-500">{data.activeCourses}</p> {/* Adjusted teal shade */}
        </motion.div>

        {/* Card: Inactive Courses */}
        <motion.div
          className="p-6 rounded-xl shadow-lg shadow-black/70 border"
          style={{ backgroundColor: darkBgColor, borderColor: darkBorderColor }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <h4 className="text-base text-gray-400 mb-2">Inactive Courses</h4>
          <p className="text-3xl font-bold text-red-400">{data.inactiveCourses}</p> {/* Adjusted red shade */}
        </motion.div>

        {/* Card: Approved Mentors */}
        <motion.div
          className="p-6 rounded-xl shadow-lg shadow-black/70 border"
          style={{ backgroundColor: darkBgColor, borderColor: darkBorderColor }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        >
          <h4 className="text-base text-gray-400 mb-2">Approved Mentors</h4>
          <p className="text-3xl font-bold text-indigo-500">{data.approvedMentors}</p>
        </motion.div>

        {/* Card: Pending Mentors */}
        <motion.div
          className="p-6 rounded-xl shadow-lg shadow-black/70 border"
          style={{ backgroundColor: darkBgColor, borderColor: darkBorderColor }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.8 }}
        >
          <h4 className="text-base text-gray-400 mb-2">Pending Mentors</h4>
          <p className="text-3xl font-bold text-yellow-500">{data.pendingMentors}</p>
        </motion.div>
      </div>

      {/* Notes Section */}
      <motion.div
        className="mt-8 p-6 rounded-xl shadow-lg shadow-black/70 border" // Added dark theme styling
        style={{ backgroundColor: darkBgColor, borderColor: darkBorderColor }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <h3 className="text-xl font-bold mb-3 text-gray-200">Notes</h3> {/* Adjusted text color and size */}
        <p className="text-gray-400 text-base leading-relaxed"> {/* Adjusted text color and size */}
          This page shows a real-time summary of platform user roles, course statuses,
          and mentor approvals. Use this page to get a quick overview of platform
          health and operations.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Analysts;