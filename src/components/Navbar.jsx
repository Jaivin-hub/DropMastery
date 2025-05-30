import React, { useState, useEffect } from "react";
import { Menu, X, Bell } from "lucide-react"; // Import Bell icon
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "../api/axios"; // Assuming axios is correctly configured

// Simulate user data (will be dynamic based on localStorage and API)
const defaultAvatar = "https://img.freepik.com/premium-psd/3d-icon-black-user-avatar_930095-100.jpg?ga=GA1.1.1575405467.1748030386&semt=ais_hybrid&w=740";

const gradientTextStyle = {
  background: 'linear-gradient(to right, #6A67FE, #FE67F6)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent',
};
const darkBgPrimary = "#121212";
const darkBgCard = "#1E1E1E";
const darkBorderColor = "#222222";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status
  const [userProfile, setUserProfile] = useState(null); // State to store fetched user profile
  const [notificationCount, setNotificationCount] = useState(3); // Dummy notification count
  const navigate = useNavigate(); // Initialize navigate hook

  // Effect to check login status and fetch user profile
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token); // Set isLoggedIn based on token presence

    const fetchUserProfile = async () => {
      if (token) {
        const endpoint = '/users/profile';
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        try {
          const { data } = await axios.get(endpoint, config);
          // Assuming data.userprofile contains the profile picture URL
          setUserProfile(data.userprofile || defaultAvatar);
        } catch (err) {
          console.error('Failed to fetch user profile for Navbar:', err);
          setUserProfile(defaultAvatar); // Fallback to default on error
        }
      } else {
        setUserProfile(defaultAvatar); // Set default if not logged in
      }
    };

    fetchUserProfile();
    // In a real application, you would fetch notification count here
    // For now, it's a static dummy value
  }, [isLoggedIn]); // Re-run when isLoggedIn changes

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove auth token
    localStorage.removeItem('userRole'); // Remove user role
    setIsLoggedIn(false); // Update login status
    navigate('/'); // Redirect to home page
    setShowDropdown(false); // Close dropdown after logout
    setIsOpen(false); // Close mobile menu if open
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: "easeOut" } },
  };

  // Updated navLinks: "Home" changed to "Dashboard", and added conditional rendering logic
  const navLinks = [
    { name: "Dashboard", to: "/dashboard", showWhenLoggedIn: false }, // Only show when not logged in
    { name: "Explore", to: "/explore", showWhenLoggedIn: true },
    { name: "About", to: "/about", showWhenLoggedIn: true },
  ];

  return (
    <nav className="shadow-lg shadow-black/80 py-4 sticky top-0 z-50" style={{ backgroundColor: darkBgPrimary }}>
      <div className="flex justify-between items-center px-8">
        <NavLink to="/" className="flex items-center">
          <motion.h1
            className="text-3xl font-extrabold"
            style={gradientTextStyle}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            DropMastery
          </motion.h1>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map(link => (
            // Conditionally render links based on isLoggedIn state
            (link.showWhenLoggedIn || !isLoggedIn) && link.name !== "Dashboard" ? ( // Always show Explore/About, but Dashboard only when not logged in
              <NavLink
                key={link.name}
                to={link.to}
                className="text-gray-300 hover:text-white transition duration-200"
              >
                {link.name}
              </NavLink>
            ) : null
          ))}

          {/* Render "Dashboard" link only if not logged in */}
          {!isLoggedIn && (
            <NavLink
              to="/dashboard" // Assuming a generic dashboard entry point
              className="text-gray-300 hover:text-white transition duration-200"
            >
              Dashboard
            </NavLink>
          )}

          {isLoggedIn && (
            <NavLink
              to="/dashboard/student/notifications" // Link to notifications page
              className="relative text-gray-300 hover:text-white transition duration-200"
              aria-label="Notifications"
            >
              <Bell size={24} />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </NavLink>
          )}

          {!isLoggedIn ? (
            <NavLink
              to="/auth" // Redirect to the authentication page
              className="bg-purple-600 text-white px-6 py-2.5 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out font-medium text-base"
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="block"
              >
                Join Now
              </motion.span>
            </NavLink>
          ) : (
            <div className="relative">
              {/* Outer div for the purple border and gap */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer border-2 border-purple-500"
                onClick={toggleDropdown}
              >
                {/* Inner img for the black border and profile picture */}
                <img
                  src={userProfile || defaultAvatar}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover border-2 border-black" // Added object-cover for better image fitting
                />
              </div>
              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    className="absolute right-0 mt-2 w-40 rounded-md shadow-lg z-10 py-1"
                    style={{ backgroundColor: darkBgCard, borderColor: darkBorderColor }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <NavLink
                      to="/dashboard/student/profile" // Example profile link, adjust based on actual user role
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2A2A2A] hover:text-white transition-colors duration-200"
                      onClick={toggleDropdown}
                    >
                      Profile
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#2A2A2A] hover:text-white transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Hamburger */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-300 hover:text-white transition-colors duration-200">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden mt-4 space-y-3 p-4 rounded-b-lg shadow-md shadow-black/50 border-t"
            style={{ backgroundColor: darkBgCard, borderColor: darkBorderColor }}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
          >
            {navLinks.map(link => (
              // Conditionally render links based on isLoggedIn state for mobile
              (link.showWhenLoggedIn || !isLoggedIn) && link.name !== "Dashboard" ? (
                <NavLink
                  key={link.name}
                  to={link.to}
                  className="block text-gray-300 text-base font-medium hover:text-purple-400 py-2"
                  onClick={toggleMenu}
                >
                  {link.name}
                </NavLink>
              ) : null
            ))}

            {/* Render "Dashboard" link only if not logged in for mobile */}
            {!isLoggedIn && (
              <NavLink
                to="/dashboard"
                className="block text-gray-300 text-base font-medium hover:text-purple-400 py-2"
                onClick={toggleMenu}
              >
                Dashboard
              </NavLink>
            )}

            {isLoggedIn && (
              <NavLink
                to="/dashboard/student/notifications" // Link to notifications page
                className="block text-gray-300 text-base font-medium hover:text-purple-400 py-2"
                onClick={toggleMenu}
              >
                Notifications {notificationCount > 0 && <span className="ml-2 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5">{notificationCount}</span>}
              </NavLink>
            )}

            {!isLoggedIn ? (
              <NavLink
                to="/auth"
                className="block w-full text-center bg-purple-600 text-white px-6 py-2.5 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out font-medium text-base mt-3"
                onClick={toggleMenu}
              >
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="block"
                >
                  Join Now
                </motion.span>
              </NavLink>
            ) : (
              <div className="mt-4 space-y-2 text-gray-300">
                <NavLink
                  to="/dashboard/student/profile"
                  onClick={toggleMenu}
                  className="block text-base font-medium hover:text-purple-400 py-2"
                >
                  Profile
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left text-base font-medium hover:text-purple-400 py-2"
                >
                  Logout
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
