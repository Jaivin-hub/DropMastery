import React from "react";
import { motion } from "framer-motion"; // Import motion for animations

// Define common dark background colors (reusing from other components)
const darkBgPrimary = "#121212"; // Primary dark background

const Footer = () => {
  return (
    <motion.footer
      className="text-center p-6 text-sm text-gray-400 border-t border-[#222222]" // Dark background, light text, top border
      style={{ backgroundColor: darkBgPrimary }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="mb-3"> {/* Adjusted margin for spacing */}
        <a href="#" className="mx-3 text-gray-300 hover:text-purple-400 transition duration-200">Contact</a> {/* Adjusted link colors */}
        <a href="#" className="mx-3 text-gray-300 hover:text-purple-400 transition duration-200">FAQ</a>
        <a href="#" className="mx-3 text-gray-300 hover:text-purple-400 transition duration-200">Legal</a>
      </div>
      <p className="text-gray-500">© 2025 DropMastery. All rights reserved.</p> {/* Copyright text slightly dimmer */}
    </motion.footer>
  );
};

export default Footer;