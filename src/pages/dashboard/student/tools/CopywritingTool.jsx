import React, { useState } from "react";
import { motion } from "framer-motion";

// Define a common style object for gradient text
const gradientTextStyle = {
  background: 'linear-gradient(to right, #6A67FE, #FE67F6)', // Gradient from the image
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent', // Fallback
};

// Define a common dark background color for cards/sections
const darkBgColor = "#1E1E1E"; // Consistent with other components

const CopywritingTool = () => {
  const [productName, setProductName] = useState("");
  const [tone, setTone] = useState("Friendly");
  const [result, setResult] = useState("");

  const handleGenerate = () => {
    // Simulate API call or processing delay
    setTimeout(() => {
      setResult(
        `Introducing the incredible ${productName}! Crafted with passion, designed to make your life easier, and guaranteed to bring a smile. Embrace innovation today!`
      );
    }, 700);
  };

  return (
    <div
      className="p-6 rounded-xl shadow-lg shadow-black/70 border border-[#222222]" // Dark background, increased padding, consistent shadow & border
      style={{ backgroundColor: darkBgColor }}
    >
      {/* Apply gradient to the heading */}
      <h3
        className="text-2xl font-bold mb-5" // Adjusted font size and margin
        style={gradientTextStyle}
      >
        AI Copywriter
      </h3>

      <input
        type="text"
        placeholder="Enter product name"
        className="bg-[#222222] text-gray-300 border border-gray-700 px-4 py-2.5 w-full mb-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500" // New input styling
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />

      <label className="block mb-3 font-medium text-gray-300">Tone</label> {/* Adjusted label styling */}
      <select
        className="bg-[#222222] text-gray-300 border border-gray-700 px-4 py-2.5 w-full mb-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none cursor-pointer" // New select styling
        value={tone}
        onChange={(e) => setTone(e.target.value)}
      >
        {/* Explicitly style options for better cross-browser dark mode compatibility */}
        <option className="bg-[#121212] text-gray-300">Friendly</option>
        <option className="bg-[#121212] text-gray-300">Professional</option>
        <option className="bg-[#121212] text-gray-300">Funny</option>
        <option className="bg-[#121212] text-gray-300">Persuasive</option>
      </select>

      <motion.button
        onClick={handleGenerate}
        className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out font-medium text-lg" // New button styling
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        Generate Copy
      </motion.button>

      {result && (
        <motion.div
          className="mt-8 p-5 rounded-lg shadow-md shadow-black/50 border border-[#222222]" // Dark background for result, increased padding, shadow
          style={{ backgroundColor: '#222222' }} // Slightly different dark shade for distinction
          initial={{ opacity: 0, y: 20 }} // Animation for results
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h4 className="text-xl font-semibold mb-3" style={gradientTextStyle}>Generated Copy:</h4> {/* New heading for the result */}
          <p className="text-gray-200 text-lg leading-relaxed">{result}</p> {/* Adjusted text color, size, and line height */}
        </motion.div>
      )}
    </div>
  );
};

export default CopywritingTool;