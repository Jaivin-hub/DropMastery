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

const ProductResearch = () => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    // Placeholder for actual API call or logic
    // Simulate a slight delay for better UX
    setTimeout(() => {
      setResults([
        { name: "Smart Water Bottle", niche: "Health", competition: "Medium" },
        { name: "Foldable Desk", niche: "Home Office", competition: "Low" },
        { name: "Ergonomic Pillow", niche: "Sleep & Wellness", competition: "Medium" },
      ]);
    }, 500);
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
        Find Trending Products
      </h3>
      <input
        type="text"
        placeholder="Enter niche (e.g. pets, fitness)"
        className="bg-[#222222] text-gray-300 border border-gray-700 px-4 py-2.5 w-full mb-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500" // New input styling
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <motion.button
        onClick={handleSearch}
        className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out font-medium text-lg" // New button styling
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        Generate Ideas
      </motion.button>

      {results.length > 0 && (
        <div className="mt-8 space-y-4"> {/* Increased margin and space-y */}
          <h4 className="text-xl font-semibold mb-3 text-gray-300">Generated Ideas:</h4> {/* Added heading for results */}
          {results.map((item, i) => (
            <motion.div
              key={i}
              className="rounded-lg p-4 shadow-md shadow-black/50 border border-[#222222] hover:bg-[#2A2A2A] transition duration-200" // Dark background for results, hover effect
              style={{ backgroundColor: '#222222' }} // Slightly different dark shade for distinction
              initial={{ opacity: 0, y: 20 }} // Animation for results
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <p className="text-gray-200 text-lg mb-1"> {/* Adjusted text color and size */}
                <strong style={gradientTextStyle}>{item.name}</strong> - {item.niche}
              </p>
              <p className="text-sm text-gray-400">Competition: {item.competition}</p> {/* Adjusted text color */}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductResearch;