import React, { useEffect } from "react"; // Import useEffect
import { NavLink, Outlet, useNavigate } from "react-router-dom"; // Import useNavigate
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
        // if (userRole !== 'superadmin') {
        //   navigate('/auth'); // Or to a forbidden page, depending on your app's logic
        // }
    }, [navigate]); // Add navigate to dependency array to avoid lint warnings

    return (
        <>
            <Navbar />
            {/* Main container for the layout, flex-col to stack Navbar and content */}
            <div className="flex flex-col min-h-screen font-sans bg-[#121212] text-gray-300">
                {/* Content area below the Navbar, using flex to arrange sidebar and main content */}
                <div className="flex flex-1"> {/* flex-1 ensures this div takes up remaining height */}
                    {/* Sidebar - now fixed and takes full height */}
                    <aside className="w-64 bg-[#1E1E1E] p-8 hidden md:block shadow-lg shadow-black/80 border-r border-[#222222] fixed top-0 left-0 h-screen overflow-y-auto z-20"> {/* Added fixed, top-0, left-0, h-screen, overflow-y-auto, and z-20 */}
                        {/* <h2
                            className="text-3xl font-extrabold mb-8 tracking-wide whitespace-nowrap" // Ensured "Admin Panel" stays on one line, adjusted spacing
                            style={gradientTextStyle} // Applied gradient to the heading
                        >
                            Admin Panel
                        </h2> */}
                        <nav className="flex flex-col space-y-6 mt-16"> {/* Increased vertical spacing for links, added mt-16 to push content down below Navbar */}
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

                    {/* Main content - pushed to the right by the sidebar's width */}
                    <main className="flex-1 bg-[#121212] p-8  ml-64"> {/* Changed main bg to consistent dark shade, increased padding, added ml-64 to offset fixed sidebar, and mt-16 to push content down below Navbar */}
                        <Outlet />
                    </main>
                </div>
            </div>
        </>
    );
};

export default SuperAdminLayout;
