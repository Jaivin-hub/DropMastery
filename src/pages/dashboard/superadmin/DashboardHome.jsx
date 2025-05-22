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

// Define common dark background colors
const darkBgColor = "#1E1E1E"; // Consistent for main cards

// Card component updated for dark theme and gradient title
const Card = ({ title, description, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }} // Staggered animation for cards
    className="shadow-lg shadow-black/70 rounded-xl p-6 border border-[#222222]" // Consistent card styling
    style={{ backgroundColor: darkBgColor }}
    whileHover={{ scale: 1.02 }} // Subtle hover effect
  >
    <h2
      className="text-2xl font-bold mb-2" // Adjusted font size, boldness, margin
      style={gradientTextStyle} // Apply gradient to the card title
    >
      {title}
    </h2>
    <p className="text-gray-300 mt-2 leading-relaxed">{description}</p> {/* Adjusted text color and line height */}
  </motion.div>
);

const DashboardHome = () => {
  return (
    <div>
      {/* Main Heading with Gradient */}
      <motion.h1
        className="text-4xl font-extrabold mb-8" // Larger font, bolder, increased margin
        style={gradientTextStyle} // Apply gradient to the title
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Superadmin Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="User Management" description="View and manage all users and roles." index={0} />
        <Card title="Mentor Approval" description="Review and approve mentor applications." index={1} />
        <Card title="Analytics" description="Track platform usage, revenue and sessions." index={2} />
        <Card title="Course Control" description="Approve or reject uploaded course content." index={3} />
        <Card title="Announcements" description="Broadcast important updates to all users." index={4} />
      </div>
    </div>
  );
};

export default DashboardHome;