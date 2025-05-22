import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { motion } from "framer-motion"; // Import motion for animations
import Navbar from "../components/Navbar"; // Assuming Navbar is compatible with dark theme or handles its own styling

// Define a common style object for gradient text
const gradientTextStyle = {
  background: 'linear-gradient(to right, #6A67FE, #FE67F6)', // Gradient from your brand
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent', // Fallback
};

// Active class for NavLinks with gradient and subtle highlight
// This class includes styling for the left gradient bar and text padding
const activeClass =
  "font-bold relative before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-gradient-to-r before:from-[#6A67FE] before:to-[#FE67F6] before:rounded-r-full pl-4";

// Base class for NavLinks
// This class includes default text color, size, font weight, transitions, and hover effects
const baseClass =
  "text-gray-400 text-lg font-medium transition-colors duration-200 hover:text-white hover:pl-4"; // Changed hover color to white, added hover padding

const SuperAdminLayout = () => {
    return (
        <>
            <Navbar />
            <div className="flex min-h-screen font-sans bg-[#121212] text-gray-300"> {/* Changed main bg to a darker shade, added min-h-screen, font, and default text color */}

                {/* Sidebar */}
                <aside className="w-64 bg-[#1E1E1E] p-8 hidden md:block shadow-lg shadow-black/80 border-r border-[#222222]"> {/* Changed sidebar bg, padding, added shadow and right border */}
                    {/* <h2
                        className="text-3xl font-extrabold mb-8 tracking-wide whitespace-nowrap" // Ensured "Admin Panel" stays on one line, adjusted spacing
                        style={gradientTextStyle} // Applied gradient to the heading
                    >
                        Admin Panel
                    </h2> */}
                    <nav className="flex flex-col space-y-6"> {/* Increased vertical spacing for links */}
                        <NavLink
                            to="/dashboard/superadmin"
                            end // Ensures exact match for the root dashboard path
                            className={({ isActive }) =>
                                isActive
                                    ? activeClass // Active class handles gradient bar and padding
                                    : baseClass
                            }
                            // Apply inline style for gradient text color to active link
                            style={({ isActive }) => (isActive ? gradientTextStyle : null)}
                        >
                            Dashboard Home
                        </NavLink>
                        <NavLink
                            to="/dashboard/superadmin/users"
                            className={({ isActive }) =>
                                isActive
                                    ? activeClass
                                    : baseClass
                            }
                            style={({ isActive }) => (isActive ? gradientTextStyle : null)}
                        >
                            User Management
                        </NavLink>
                        <NavLink
                            to="/dashboard/superadmin/mentors"
                            className={({ isActive }) =>
                                isActive
                                    ? activeClass
                                    : baseClass
                            }
                            style={({ isActive }) => (isActive ? gradientTextStyle : null)}
                        >
                            Mentor Approval
                        </NavLink>
                        <NavLink
                            to="/dashboard/superadmin/analytics" // Placeholder link
                            className={({ isActive }) =>
                                isActive
                                    ? activeClass
                                    : baseClass
                            }
                            style={({ isActive }) => (isActive ? gradientTextStyle : null)}
                        >
                            Analytics
                        </NavLink>
                        <NavLink
                            to="/dashboard/superadmin/revenue" // Placeholder link
                            className={({ isActive }) =>
                                isActive
                                    ? activeClass
                                    : baseClass
                            }
                            style={({ isActive }) => (isActive ? gradientTextStyle : null)}
                        >
                            Revenue
                        </NavLink>
                        <NavLink
                            to="/dashboard/superadmin/course" // Placeholder link
                            className={({ isActive }) =>
                                isActive
                                    ? activeClass
                                    : baseClass
                            }
                            style={({ isActive }) => (isActive ? gradientTextStyle : null)}
                        >
                            Course Control
                        </NavLink>
                        <NavLink
                            to="/dashboard/superadmin/announcements" // Placeholder link
                            className={({ isActive }) =>
                                isActive
                                    ? activeClass
                                    : baseClass
                            }
                            style={({ isActive }) => (isActive ? gradientTextStyle : null)}
                        >
                            Announcements
                        </NavLink>
                        {/* Add more links here */}
                    </nav>
                </aside>

                {/* Main content */}
                <main className="flex-1 bg-[#121212] p-8 overflow-y-auto"> {/* Changed main bg to consistent dark shade, increased padding */}
                    <Outlet />
                </main>
            </div>
        </>
    );
};

export default SuperAdminLayout;