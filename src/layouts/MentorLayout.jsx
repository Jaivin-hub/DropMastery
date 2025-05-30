import React, { useEffect } from "react"; // Import useEffect
import { NavLink, Outlet, useNavigate } from "react-router-dom"; // Import useNavigate
import { motion } from "framer-motion"; // Keeping motion for consistency
import Navbar from "../components/Navbar";

// Define common dark background colors and border
const darkBgColor = "#121212"; // Very dark overall background
const sidebarBgColor = "#1E1E1E"; // Slightly lighter for sidebar
const darkBorderColor = "#222222"; // Consistent border color
const activeLinkBg = "#6A67FE"; // Gradient start color for active link

// Define a common style object for gradient text
const gradientTextStyle = {
  background: 'linear-gradient(to right, #6A67FE, #FE67F6)', // Gradient from your brand
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent', // Fallback
};

// Base class for NavLinks with default text color, size, font weight, transitions, and hover effects
const baseClass =
  "text-gray-400 text-lg font-medium transition-colors duration-200 hover:text-white hover:pl-4"; // Changed hover color to white, added hover padding

// Active class for NavLinks with gradient and subtle highlight
// This class includes styling for the left gradient bar and text padding
const activeClass =
  "font-bold relative before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-gradient-to-r before:from-[#6A67FE] before:to-[#FE67F6] before:rounded-r-full pl-4";


function MentorLayout() {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Authentication check effect
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      // If no auth token, redirect to login page
      navigate('/auth');
    }
    // Optional: You might also want to check userRole here if only specific roles can access this layout
    // const userRole = localStorage.getItem('userRole');
    // if (userRole !== 'mentor') {
    //   navigate('/auth'); // Or to a forbidden page, depending on your app's logic
    // }
  }, [navigate]); // Add navigate to dependency array

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen font-sans bg-[#121212] text-gray-300">

        {/* Sidebar */}
        <aside className="w-64 bg-[#1E1E1E] p-8 hidden md:block shadow-lg shadow-black/80 border-r border-[#222222]">
          {/* <h2
          className="text-3xl font-extrabold mb-8 tracking-wide whitespace-nowrap" // Matches other admin headings
          style={gradientTextStyle} // Applied gradient to the heading
        >
          Mentor Panel
        </h2> */}
          <nav className="flex flex-col space-y-6"> {/* Increased vertical spacing for links */}
            <NavLink
              to="/dashboard/mentor"
              end // Ensures exact match for the root dashboard path
              className={({ isActive }) =>
                isActive
                  ? activeClass
                  : baseClass
              }
              style={({ isActive }) => (isActive ? gradientTextStyle : null)}
            >
              Dashboard Home
            </NavLink>
            <NavLink
              to="/dashboard/mentor/my-courses"
              className={({ isActive }) =>
                isActive
                  ? activeClass
                  : baseClass
              }
              style={({ isActive }) => (isActive ? gradientTextStyle : null)}
            >
              My Courses
            </NavLink>
            <NavLink
              to="/dashboard/mentor/my-students"
              className={({ isActive }) =>
                isActive
                  ? activeClass
                  : baseClass
              }
              style={({ isActive }) => (isActive ? gradientTextStyle : null)}
            >
              My Students
            </NavLink>
            <NavLink
              to="/dashboard/mentor/live-sessions"
              className={({ isActive }) =>
                isActive
                  ? activeClass
                  : baseClass
              }
              style={({ isActive }) => (isActive ? gradientTextStyle : null)}
            >
              Live Sessions
            </NavLink>
            <NavLink
              to="/dashboard/mentor/community"
              className={({ isActive }) =>
                isActive
                  ? activeClass
                  : baseClass
              }
              style={({ isActive }) => (isActive ? gradientTextStyle : null)}
            >
              Community
            </NavLink>
            <NavLink
              to="/dashboard/mentor/earnings"
              className={({ isActive }) =>
                isActive
                  ? activeClass
                  : baseClass
              }
              style={({ isActive }) => (isActive ? gradientTextStyle : null)}
            >
              Earnings
            </NavLink>
            <NavLink
              to="/dashboard/mentor/announcements"
              className={({ isActive }) =>
                isActive
                  ? activeClass
                  : baseClass
              }
              style={({ isActive }) => (isActive ? gradientTextStyle : null)}
            >
              Announcements
            </NavLink>
            <NavLink
              to="/dashboard/mentor/profile"
              className={({ isActive }) =>
                isActive
                  ? activeClass
                  : baseClass
              }
              style={({ isActive }) => (isActive ? gradientTextStyle : null)}
            >
              Profile
            </NavLink>
            <NavLink
              to="/dashboard/mentor/notifications"
              className={({ isActive }) =>
                isActive
                  ? activeClass
                  : baseClass
              }
              style={({ isActive }) => (isActive ? gradientTextStyle : null)}
            >
              Notifications
            </NavLink>
          </nav>
        </aside>

        {/* Main content area */}
        <main className="flex-1 bg-[#121212] p-8 overflow-y-auto"> {/* Consistent dark background and padding */}
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default MentorLayout;
