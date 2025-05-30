import React, { useEffect } from "react"; // Import useEffect
import { NavLink, Outlet, useNavigate } from "react-router-dom"; // Import useNavigate
import Navbar from "../components/Navbar";

// Gradient style for active text
const gradientTextStyle = {
  background: 'linear-gradient(to right, #6A67FE, #FE67F6)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent',
};

// Common link styles
const baseClass =
  "text-gray-400 text-lg font-medium transition-colors duration-200 hover:text-white hover:pl-4";

const activeClass =
  "font-bold relative before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-gradient-to-r before:from-[#6A67FE] before:to-[#FE67F6] before:rounded-r-full pl-4";

const SubAdminLayout = () => {
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
    // if (userRole !== 'subadmin') {
    //   navigate('/auth'); // Or to a forbidden page, depending on your app's logic
    // }
  }, [navigate]); // Add navigate to dependency array

  return (
    <>
    <Navbar/>
    <div className="flex min-h-screen font-sans bg-[#121212] text-gray-300">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1E1E1E] p-8 hidden md:block shadow-lg shadow-black/80 border-r border-[#222222]">
        {/* <h2
          className="text-3xl font-extrabold mb-8 tracking-wide whitespace-nowrap"
          style={gradientTextStyle}
        >
          SubAdmin
        </h2> */}
        <nav className="flex flex-col space-y-6">
          <NavLink to="/dashboard/subadmin" end className={({ isActive }) => isActive ? activeClass : baseClass} style={({ isActive }) => isActive ? gradientTextStyle : null}>Dashboard</NavLink>
          <NavLink to="/dashboard/subadmin/manage-students" className={({ isActive }) => isActive ? activeClass : baseClass} style={({ isActive }) => isActive ? gradientTextStyle : null}>Manage Students</NavLink>
          <NavLink to="/dashboard/subadmin/manage-courses" className={({ isActive }) => isActive ? activeClass : baseClass} style={({ isActive }) => isActive ? gradientTextStyle : null}>Manage Courses</NavLink>
          <NavLink to="/dashboard/subadmin/live-sessions" className={({ isActive }) => isActive ? activeClass : baseClass} style={({ isActive }) => isActive ? gradientTextStyle : null}>Live Sessions</NavLink>
          <NavLink to="/dashboard/subadmin/announcements" className={({ isActive }) => isActive ? activeClass : baseClass} style={({ isActive }) => isActive ? gradientTextStyle : null}>Announcements</NavLink>
          <NavLink to="/dashboard/subadmin/revenue" className={({ isActive }) => isActive ? activeClass : baseClass} style={({ isActive }) => isActive ? gradientTextStyle : null}>Revenue Reports</NavLink>
          <NavLink to="/dashboard/subadmin/manage-mentors" className={({ isActive }) => isActive ? activeClass : baseClass} style={({ isActive }) => isActive ? gradientTextStyle : null}>Manage Mentors</NavLink>
          <NavLink to="/dashboard/subadmin/support-tickets" className={({ isActive }) => isActive ? activeClass : baseClass} style={({ isActive }) => isActive ? gradientTextStyle : null}>Support Tickets</NavLink>
          <NavLink to="/dashboard/subadmin/feedback" className={({ isActive }) => isActive ? activeClass : baseClass} style={({ isActive }) => isActive ? gradientTextStyle : null}>Feedback & Reports</NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-[#121212] p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
    </>
  );
};

export default SubAdminLayout;
