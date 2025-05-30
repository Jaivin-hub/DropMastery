import React from "react";
import { motion } from "framer-motion"; // Import motion for animations
import { Link } from "react-router-dom"; // Import Link for navigation
import { Bell, BookOpen, TrendingUp, MessageSquare, PlusCircle, Zap, BarChart2 } from "lucide-react"; // Icons for new sections, added Zap and BarChart2

// Define a common style object for gradient text
const gradientTextStyle = {
  background: 'linear-gradient(to right, #6A67FE, #FE67F6)', // Gradient from the image
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent', // Fallback
};

// Define a common dark background color for cards/sections
const darkBgColor = "#1E1E1E"; // From your DashboardHome and MyMentor components
const darkBorderColor = "#222222"; // Consistent border color

const DashboardHome = () => {
  // Dummy data for new sections
  const recentActivities = [
    { id: 1, text: "New module released in 'Winning Products Mastery'", time: "2 hours ago" },
    { id: 2, text: "Mentor John Doe replied to your community post", time: "Yesterday" },
    { id: 3, text: "Your 'Shopify Build' course is 100% complete!", time: "3 days ago" },
  ];

  const quickActions = [
    { name: "Continue Learning", to: "/dashboard/student/my-courses", icon: <BookOpen size={20} /> },
    { name: "Explore New Courses", to: "/explore", icon: <TrendingUp size={20} /> },
    { name: "Ask a Question", to: "/dashboard/student/community", icon: <MessageSquare size={20} /> },
    { name: "View All Notifications", to: "/dashboard/student/notifications", icon: <Bell size={20} /> },
  ];

  const announcements = [
    { id: 1, title: "Platform Update: New AI Tools Available!", date: "May 20, 2025" },
    { id: 2, title: "Webinar: Scaling Your Dropshipping Business", date: "May 15, 2025" },
  ];

  const recommendedCourses = [
    { id: 1, title: "E-commerce SEO Masterclass", mentor: "Emily White", icon: <Zap size={48} className="text-purple-400" /> },
    { id: 2, title: "Advanced Google Ads for Dropshippers", mentor: "David Brown", icon: <BarChart2 size={48} className="text-purple-400" /> },
  ];

  return (
    <div className=""> {/* Added padding for consistency */}
      {/* Apply the gradient to the main heading */}
      <h1
        className="text-4xl font-extrabold mb-4"
        style={gradientTextStyle}
      >
        Welcome Back!
      </h1>
      <p className="text-gray-300 mb-6">
        Here’s a quick snapshot of your learning journey:
      </p>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"> {/* Added margin-bottom */}
        <motion.div
          className="bg-[#1E1E1E] p-6 rounded-xl shadow-lg shadow-black/70 border"
          style={{ borderColor: darkBorderColor }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h2
            className="font-bold text-lg mb-2"
            style={gradientTextStyle}
          >
            Current Course
          </h2>
          <p className="text-gray-300">“Winning Products Mastery” - 40% complete</p>
        </motion.div>
        <motion.div
          className="bg-[#1E1E1E] p-6 rounded-xl shadow-lg shadow-black/70 border"
          style={{ borderColor: darkBorderColor }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h2
            className="font-bold text-lg mb-2"
            style={gradientTextStyle}
          >
            Upcoming Session
          </h2>
          <p className="text-gray-300">Monday 5PM with John Doe (Mentor)</p>
        </motion.div>
        <motion.div
          className="bg-[#1E1E1E] p-6 rounded-xl shadow-lg shadow-black/70 border"
          style={{ borderColor: darkBorderColor }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <h2
            className="font-bold text-lg mb-2"
            style={gradientTextStyle}
          >
            Earnings Shared
          </h2>
          <p className="text-gray-300">$120 from Dropship Bootcamp</p>
        </motion.div>
      </div>

      {/* Additional Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity / Notifications */}
        <motion.div
          className="bg-[#1E1E1E] p-6 rounded-xl shadow-lg shadow-black/70 border"
          style={{ borderColor: darkBorderColor }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <h2 className="font-bold text-lg mb-4" style={gradientTextStyle}>
            Recent Activity
          </h2>
          <ul className="space-y-3">
            {recentActivities.map((activity) => (
              <li key={activity.id} className="flex items-start text-gray-300">
                <Bell size={18} className="text-gray-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p>{activity.text}</p>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="bg-[#1E1E1E] p-6 rounded-xl shadow-lg shadow-black/70 border"
          style={{ borderColor: darkBorderColor }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <h2 className="font-bold text-lg mb-4" style={gradientTextStyle}>
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Link to={action.to} key={index}>
                <motion.button
                  className="cursor-pointer w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out font-medium flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {action.icon} {action.name}
                </motion.button>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Announcements */}
        <motion.div
          className="bg-[#1E1E1E] p-6 rounded-xl shadow-lg shadow-black/70 border lg:col-span-2"
          style={{ borderColor: darkBorderColor }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <h2 className="font-bold text-lg mb-4" style={gradientTextStyle}>
            Announcements
          </h2>
          <ul className="space-y-3">
            {announcements.map((announcement) => (
              <li key={announcement.id} className="flex items-start text-gray-300">
                <PlusCircle size={18} className="text-purple-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">{announcement.title}</p>
                  <span className="text-xs text-gray-500">{announcement.date}</span>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Recommended Courses */}
        <motion.div
          className="bg-[#1E1E1E] p-6 rounded-xl shadow-lg shadow-black/70 border lg:col-span-2"
          style={{ borderColor: darkBorderColor }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        >
          <h2 className="font-bold text-lg mb-4" style={gradientTextStyle}>
            Recommended for You
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedCourses.map((course) => (
              <motion.div
                key={course.id}
                className="bg-[#121212] p-4 rounded-lg shadow-md shadow-black/50 border border-[#2A2A2A] flex flex-col items-center text-center"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="mb-3">{course.icon}</div>
                <h3 className="text-md font-semibold text-white mb-1">{course.title}</h3>
                <p className="text-xs text-gray-400">Mentor: {course.mentor}</p>
                <motion.button
                  className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md text-sm hover:bg-purple-700 transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Course
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardHome;
