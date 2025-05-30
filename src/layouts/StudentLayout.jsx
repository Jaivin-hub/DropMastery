// StudentLayout.jsx

import React, { useEffect, useState, useRef } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // Assuming Navbar is fixed at top
import PosterAnnouncementBanner from '../pages/dashboard/common/PosterAnnouncementModal';

const NAVBAR_HEIGHT = 80; // Example height of your Navbar, adjust as needed

const StudentLayout = () => {
  const navigate = useNavigate();
  const [bannerHeight, setBannerHeight] = useState(0);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      navigate('/auth');
    }
  }, [navigate]);

  const handleBannerHeightChange = (height) => {
    setBannerHeight(height);
  };

  const gradientTextStyle = {
    background: 'linear-gradient(to right, #6A67FE, #FE67F6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: 'transparent',
  };

  const activeClass =
    "font-bold relative before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-gradient-to-r before:from-[#6A67FE] before:to-[#FE67F6] before:rounded-r-full pl-4";

  const baseClass =
    "text-gray-400 text-lg font-medium transition-colors duration-200 hover:text-white hover:pl-4";

  const mainContentTopOffset = NAVBAR_HEIGHT + bannerHeight;

  return (
    <>
      {/* Navbar - Assuming it's fixed at the very top and has a z-index */}
      <Navbar /> 
      
      {/* Poster Announcement Banner - Fixed below Navbar, its height is dynamic */}
      <PosterAnnouncementBanner onHeightChange={handleBannerHeightChange} />

      {/* Main layout container for sidebar and content */}
      <div
        className="flex min-h-screen font-sans bg-[#121212] text-gray-300 relative" // Added relative for positioning
        style={{ paddingTop: `${mainContentTopOffset}px` }} // Push content down below Navbar and Banner
      >
        {/* Sidebar */}
        <aside
          className="w-64 bg-[#1E1E1E] p-8 hidden md:block shadow-lg shadow-black/80 border-r border-[#222222] fixed left-0 overflow-y-auto z-20"
          style={{ 
            top: `${mainContentTopOffset}px`, // Starts below Navbar and Banner
            height: `calc(100vh - ${mainContentTopOffset}px)` // Full height remaining
          }}
        >
          <nav className="flex flex-col space-y-6"> {/* Removed mt-16, let padding handle it */}
            <NavLink to="/dashboard/student" end className={({ isActive }) => isActive ? `${activeClass} ${gradientTextStyle}` : baseClass} style={({ isActive }) => (isActive ? gradientTextStyle : null)}>Dashboard</NavLink>
            <NavLink to="/dashboard/student/my-courses" className={({ isActive }) => isActive ? `${activeClass} ${gradientTextStyle}` : baseClass} style={({ isActive }) => (isActive ? gradientTextStyle : null)}>My Courses</NavLink>
            <NavLink to="/dashboard/student/live-sessions" className={({ isActive }) => isActive ? `${activeClass} ${gradientTextStyle}` : baseClass} style={({ isActive }) => (isActive ? gradientTextStyle : null)}>Live Sessions</NavLink>
            <NavLink to="/dashboard/student/my-mentor" className={({ isActive }) => isActive ? `${activeClass} ${gradientTextStyle}` : baseClass} style={({ isActive }) => (isActive ? gradientTextStyle : null)}>My Mentor</NavLink>
            <NavLink to="/dashboard/student/community" className={({ isActive }) => isActive ? `${activeClass} ${gradientTextStyle}` : baseClass} style={({ isActive }) => (isActive ? gradientTextStyle : null)}>Community</NavLink>
            <NavLink to="/dashboard/student/ai-tools" className={({ isActive }) => isActive ? `${activeClass} ${gradientTextStyle}` : baseClass} style={({ isActive }) => (isActive ? gradientTextStyle : null)}>AI Tools</NavLink>
            <NavLink to="/dashboard/student/earnings" className={({ isActive }) => isActive ? `${activeClass} ${gradientTextStyle}` : baseClass} style={({ isActive }) => (isActive ? gradientTextStyle : null)}>Earnings</NavLink>
            <NavLink to="/dashboard/student/certificates" className={({ isActive }) => isActive ? `${activeClass} ${gradientTextStyle}` : baseClass} style={({ isActive }) => (isActive ? gradientTextStyle : null)}>Certificates</NavLink>
            <NavLink to="/dashboard/student/profile" className={({ isActive }) => isActive ? `${activeClass} ${gradientTextStyle}` : baseClass} style={({ isActive }) => (isActive ? gradientTextStyle : null)}>Profile</NavLink>
            <NavLink to="/dashboard/student/notifications" className={({ isActive }) => isActive ? `${activeClass} ${gradientTextStyle}` : baseClass} style={({ isActive }) => (isActive ? gradientTextStyle : null)}>Notifications</NavLink>
          </nav>
        </aside>

        {/* Main content area (where Outlet renders) */}
        <main
          className="flex-1 bg-[#121212] pl-8 pt-0 pr-8 ml-64" // ml-64 pushes it to the right of the sidebar
          style={{ minHeight: `calc(100vh - ${mainContentTopOffset}px)` }} // Ensures it takes available height if content is short
        >
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default StudentLayout;