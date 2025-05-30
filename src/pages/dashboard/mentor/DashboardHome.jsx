import React from "react";
import { motion } from "framer-motion";

// Define a common style object for gradient text
const gradientTextStyle = {
  background: 'linear-gradient(to right, #6A67FE, #FE67F6)', // Gradient from your brand
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent', // Fallback
};

// Define common dark background colors and border
const darkBgCard = "#1E1E1E"; // Consistent for main cards
const darkBorderColor = "#222222"; // Consistent border color

const DashboardHome = () => {
  // Dummy data for mentor dashboard metrics
  const mentorMetrics = {
    totalStudents: 45,
    myCourses: 3,
    upcomingLiveSessions: 2,
    communityEngagements: 15, // e.g., new comments on their posts
    totalEarnings: 85000, // in INR
    latestAnnouncement: "New guidelines for live session content uploaded.",
  };

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
        Welcome, Mentor!
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Increased gap, added lg:grid-cols-3 */}

        {/* Card: Total Students */}
        <motion.div
          className="p-6 shadow-lg shadow-black/70 rounded-xl border" // Dark background, increased padding/roundness, stronger shadow, border
          style={{ backgroundColor: darkBgCard, borderColor: darkBorderColor }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h3 className="text-xl font-bold text-gray-200">Total Students</h3> {/* Adjusted text color and size */}
          <p className="text-4xl mt-3 text-purple-400">{mentorMetrics.totalStudents}</p> {/* Adjusted text size and accent color */}
        </motion.div>

        {/* Card: My Courses */}
        <motion.div
          className="p-6 shadow-lg shadow-black/70 rounded-xl border"
          style={{ backgroundColor: darkBgCard, borderColor: darkBorderColor }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h3 className="text-xl font-bold text-gray-200">My Courses</h3>
          <p className="text-4xl mt-3 text-blue-400">{mentorMetrics.myCourses}</p> {/* Different accent color */}
        </motion.div>

        {/* Card: Upcoming Live Sessions */}
        <motion.div
          className="p-6 shadow-lg shadow-black/70 rounded-xl border"
          style={{ backgroundColor: darkBgCard, borderColor: darkBorderColor }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <h3 className="text-xl font-bold text-gray-200">Upcoming Live Sessions</h3>
          <p className="text-4xl mt-3 text-pink-400">{mentorMetrics.upcomingLiveSessions}</p> {/* Different accent color */}
        </motion.div>

        {/* Card: Community Engagements */}
        <motion.div
          className="p-6 shadow-lg shadow-black/70 rounded-xl border"
          style={{ backgroundColor: darkBgCard, borderColor: darkBorderColor }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <h3 className="text-xl font-bold text-gray-200">Community Engagements</h3>
          <p className="text-4xl mt-3 text-orange-400">{mentorMetrics.communityEngagements}</p> {/* Different accent color */}
        </motion.div>

        {/* Card: Total Earnings */}
        <motion.div
          className="p-6 shadow-lg shadow-black/70 rounded-xl border"
          style={{ backgroundColor: darkBgCard, borderColor: darkBorderColor }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <h3 className="text-xl font-bold text-gray-200">Total Earnings</h3>
          <p className="text-4xl mt-3 text-green-400">₹{mentorMetrics.totalEarnings.toLocaleString()}</p> {/* Accent color for earnings */}
        </motion.div>

        {/* Card: Latest Announcement */}
        <motion.div
          className="p-6 shadow-lg shadow-black/70 rounded-xl border"
          style={{ backgroundColor: darkBgCard, borderColor: darkBorderColor }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <h3 className="text-xl font-bold text-gray-200">Latest Announcement</h3>
          <p className="mt-3 text-base text-gray-400 leading-relaxed"> {/* Adjusted text size, color, and line height */}
            “{mentorMetrics.latestAnnouncement}”
          </p>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default DashboardHome;
