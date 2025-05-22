import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar"; // Assuming Navbar is compatible with dark theme or handles its own styling

const StudentLayout = () => {
  // Define a common style object for gradient text
  const gradientTextStyle = {
    background: 'linear-gradient(to right, #6A67FE, #FE67F6)', // Gradient from the image
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: 'transparent', // Fallback
  };

  // Active class for NavLinks with gradient and subtle highlight
  const activeClass =
    "font-bold relative before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-gradient-to-r before:from-[#6A67FE] before:to-[#FE67F6] before:rounded-r-full pl-4"; // Added gradient bar and padding

  // Base class for NavLinks
  const baseClass =
    "text-gray-400 text-lg font-medium transition-colors duration-200 hover:text-white hover:pl-4"; // Changed hover color to white, added hover padding

  return (
    <>
      <Navbar />
      <div className="flex h-screen font-sans bg-[#121212] text-gray-300"> {/* Changed main bg to a darker shade */}

        {/* Sidebar */}
        <aside className="w-64 bg-[#1E1E1E] p-8 hidden md:block shadow-lg shadow-black/80 border-r border-[#222222]"> {/* Changed sidebar bg and added right border */}
          {/* <h2
            className="text-3xl font-extrabold mb-8 tracking-wide"
            style={gradientTextStyle} // Applied gradient to the heading
          >
            Student Panel
          </h2> */}
          <nav className="flex flex-col space-y-6">
            <NavLink
              to="/dashboard/student"
              end
              className={({ isActive }) =>
                isActive
                  ? `${activeClass} ${gradientTextStyle}` // Apply gradient to active link text
                  : baseClass
              }
              style={({ isActive }) => (isActive ? gradientTextStyle : null)} // Apply inline style for gradient
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/dashboard/student/my-mentor"
              className={({ isActive }) =>
                isActive
                  ? `${activeClass} ${gradientTextStyle}`
                  : baseClass
              }
              style={({ isActive }) => (isActive ? gradientTextStyle : null)}
            >
              My Mentor
            </NavLink>
            <NavLink
              to="/dashboard/student/my-courses"
              className={({ isActive }) =>
                isActive
                  ? `${activeClass} ${gradientTextStyle}`
                  : baseClass
              }
              style={({ isActive }) => (isActive ? gradientTextStyle : null)}
            >
              My Courses
            </NavLink>
            <NavLink
              to="/dashboard/student/live-sessions"
              className={({ isActive }) =>
                isActive
                  ? `${activeClass} ${gradientTextStyle}`
                  : baseClass
              }
              style={({ isActive }) => (isActive ? gradientTextStyle : null)}
            >
              Live Sessions
            </NavLink>
            <NavLink
              to="/dashboard/student/community"
              className={({ isActive }) =>
                isActive
                  ? `${activeClass} ${gradientTextStyle}`
                  : baseClass
              }
              style={({ isActive }) => (isActive ? gradientTextStyle : null)}
            >
              Community
            </NavLink>
            <NavLink
              to="/dashboard/student/ai-tools"
              className={({ isActive }) =>
                isActive
                  ? `${activeClass} ${gradientTextStyle}`
                  : baseClass
              }
              style={({ isActive }) => (isActive ? gradientTextStyle : null)}
            >
              AI Tools
            </NavLink>
            <NavLink
              to="/dashboard/student/earnings"
              className={({ isActive }) =>
                isActive
                  ? `${activeClass} ${gradientTextStyle}`
                  : baseClass
              }
              style={({ isActive }) => (isActive ? gradientTextStyle : null)}
            >
              Earnings
            </NavLink>
            <NavLink
              to="/dashboard/student/certificates"
              className={({ isActive }) =>
                isActive
                  ? `${activeClass} ${gradientTextStyle}`
                  : baseClass
              }
              style={({ isActive }) => (isActive ? gradientTextStyle : null)}
            >
              Certificates
            </NavLink>
            <NavLink
              to="/dashboard/student/profile"
              className={({ isActive }) =>
                isActive
                  ? `${activeClass} ${gradientTextStyle}`
                  : baseClass
              }
              style={({ isActive }) => (isActive ? gradientTextStyle : null)}
            >
              Profile
            </NavLink>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 bg-[#121212] p-8 overflow-y-auto"> {/* Changed main bg */}
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default StudentLayout;