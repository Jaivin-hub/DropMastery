import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";

// Define the gradient text style for the logo
const gradientTextStyle = {
  background: 'linear-gradient(to right, #6A67FE, #FE67F6)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent', // Fallback
};

// Define common dark background colors (reusing from other components)
const darkBgPrimary = "#121212"; // Primary dark background for navbar
const darkBgCard = "#1E1E1E"; // Dark background for mobile menu
const darkBorderColor = "#222222"; // Consistent border color

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Define transition variants for mobile menu for smooth animation
  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: "easeOut" } },
  };

  return (
    <nav className="shadow-lg shadow-black/80 py-4 sticky top-0 z-50" style={{ backgroundColor: darkBgPrimary }}>
      {/* Changed max-w-7xl mx-auto to remove horizontal centering and apply px-8 for alignment */}
      <div className="flex justify-between items-center px-8"> {/* Adjusted padding here */}
        {/* Logo with Gradient Text */}
        <NavLink to="/" className="flex items-center"> {/* Added flex and items-center to keep alignment */}
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
        <div className="space-x-6 hidden md:flex items-center">
          <a
            href="#"
            className="text-gray-400 text-lg font-medium hover:text-white transition-colors duration-200"
          >
            Home
          </a>
          <a
            href="#"
            className="text-gray-400 text-lg font-medium hover:text-white transition-colors duration-200"
          >
            Courses
          </a>
          <a
            href="#"
            className="text-gray-400 text-lg font-medium hover:text-white transition-colors duration-200"
          >
            Mentors
          </a>
          <motion.button
            className="bg-purple-600 text-white px-6 py-2.5 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out font-medium text-base"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            Join Now
          </motion.button>
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-300 hover:text-white transition-colors duration-200">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Animated) */}
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
            <a href="#" className="block text-gray-300 hover:text-white px-2 py-2 rounded transition-colors duration-200 text-lg">Home</a>
            <a href="#" className="block text-gray-300 hover:text-white px-2 py-2 rounded transition-colors duration-200 text-lg">Courses</a>
            <a href="#" className="block text-gray-300 hover:text-white px-2 py-2 rounded transition-colors duration-200 text-lg">Mentors</a>
            <motion.button
              className="block w-full text-center bg-purple-600 text-white px-6 py-2.5 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out font-medium text-base mt-3"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
              onClick={toggleMenu}
            >
              Join Now
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;