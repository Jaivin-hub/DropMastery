import React, { useState } from "react";
import { motion } from "framer-motion"; // Import motion for animations

// Define a common style object for gradient text
const gradientTextStyle = {
  background: 'linear-gradient(to right, #6A67FE, #FE67F6)', // Gradient from the image
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent', // Fallback
};

// Define common dark background colors
const darkBgColor = "#1E1E1E"; // Consistent with other AI tools
const darkBgColorLighter = "#222222"; // Slightly lighter for internal elements like input/result cards

const StoreNameGenerator = () => {
  const [keyword, setKeyword] = useState("");
  const [ideas, setIdeas] = useState([]);

  const generateIdeas = () => {
    if (!keyword.trim()) {
      setIdeas([]); // Clear ideas if keyword is empty
      return;
    }

    // Dummy name ideas (replace with AI logic/API later)
    const samples = [
      `${keyword}ify`,
      `Shop ${keyword}`,
      `The ${keyword} Hub`,
      `${keyword} Central`,
      `${keyword}verse`,
      `${keyword} Bazaar`,
      `${keyword} Junction`,
      `NextGen ${keyword}`,
      `House of ${keyword}`,
      `${keyword} Lane`,
    ];

    // Simulate a short delay for better UX
    setTimeout(() => {
      setIdeas(samples);
    }, 500);
  };

  return (
    <div
      className="p-6 rounded-xl shadow-lg shadow-black/70 border border-[#222222]" // Consistent main container styling
      style={{ backgroundColor: darkBgColor }}
    >
      {/* Apply gradient to the heading */}
      <h3
        className="text-2xl font-bold mb-5" // Adjusted font size and margin
        style={gradientTextStyle}
      >
        🏪 Store Name Generator
      </h3>
      <div className="flex items-center gap-4 mb-6"> {/* Used gap instead of space-x, increased margin */}
        <input
          type="text"
          placeholder="Enter keyword or niche..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="bg-[#222222] text-gray-300 border border-gray-700 px-4 py-2.5 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500" // Consistent input styling
        />
        <motion.button
          onClick={generateIdeas}
          className="bg-gradient-to-r from-[#6A67FE] to-[#FE67F6] text-white px-6 py-3 rounded-lg font-semibold text-lg hover:brightness-110 transition-all duration-200" // Adjusted padding/size, added brightness hover
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          Generate
        </motion.button>
      </div>

      {ideas.length > 0 && (
        <div className="mt-8"> {/* Increased margin top */}
          <h4 className="text-xl font-semibold mb-4" style={gradientTextStyle}>Generated Ideas:</h4>
          <ul className="space-y-4"> {/* Increased space-y */}
            {ideas.map((idea, index) => (
              <motion.li
                key={index}
                className="bg-[#222222] p-4 rounded-lg shadow-md shadow-black/50 border border-[#222222] text-lg text-gray-200 hover:bg-[#2A2A2A] transition duration-200" // Consistent list item styling
                initial={{ opacity: 0, y: 20 }} // Animation for list items
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <span style={gradientTextStyle}>{idea}</span> {/* Apply gradient to the idea text */}
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StoreNameGenerator;