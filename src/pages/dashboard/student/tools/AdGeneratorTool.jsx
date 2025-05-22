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

const AdGeneratorTool = () => {
  const [productName, setProductName] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [adType, setAdType] = useState("Headline");
  const [result, setResult] = useState("");

  const handleGenerate = () => {
    // Simulate API call or processing delay
    setTimeout(() => {
      let generatedCopy = "";
      if (adType === "Headline") {
        generatedCopy = `🚀 Unleash the Power of ${productName}!`;
      } else if (adType === "Caption") {
        generatedCopy = `Elevate your ${productName} game! Designed for peak performance on ${platform}. Get yours today and transform your experience. #${productName.replace(/\s/g, '')} #NewArrival`;
      } else if (adType === "Hashtag List") {
        generatedCopy = `#${productName.replace(/\s/g, '')} #ShopNow #${platform}Ads #Trending #MustHave`;
      }
      setResult(generatedCopy);
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
        📢 Ad Copy Generator
      </h3>

      <input
        type="text"
        placeholder="Enter product name"
        className="bg-[#222222] text-gray-300 border border-gray-700 px-4 py-2.5 w-full mb-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500" // New input styling
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />

      <label className="block mb-3 font-medium text-gray-300">Ad Platform</label> {/* Adjusted label styling */}
      <select
        className="bg-[#222222] text-gray-300 border border-gray-700 px-4 py-2.5 w-full mb-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none cursor-pointer" // New select styling
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
      >
        {/* Explicitly style options for better cross-browser dark mode compatibility */}
        <option className="bg-[#121212] text-gray-300">Instagram</option>
        <option className="bg-[#121212] text-gray-300">Facebook</option>
        <option className="bg-[#121212] text-gray-300">TikTok</option>
        <option className="bg-[#121212] text-gray-300">Google Ads</option>
      </select>

      <label className="block mb-3 font-medium text-gray-300">Ad Type</label> {/* Adjusted label styling */}
      <select
        className="bg-[#222222] text-gray-300 border border-gray-700 px-4 py-2.5 w-full mb-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none cursor-pointer" // New select styling
        value={adType}
        onChange={(e) => setAdType(e.target.value)}
      >
        <option className="bg-[#121212] text-gray-300">Headline</option>
        <option className="bg-[#121212] text-gray-300">Caption</option>
        <option className="bg-[#121212] text-gray-300">Hashtag List</option>
      </select>

      <motion.button
        onClick={handleGenerate}
        className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out font-medium text-lg" // New button styling
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        Generate Ad Copy
      </motion.button>

      {result && (
        <motion.div
          className="mt-8 p-5 rounded-lg shadow-md shadow-black/50 border border-[#222222]" // Dark background for result, increased padding, shadow
          style={{ backgroundColor: darkBgColorLighter }} // Slightly different dark shade for distinction
          initial={{ opacity: 0, y: 20 }} // Animation for results
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h4 className="text-xl font-semibold mb-3" style={gradientTextStyle}>Generated Ad Copy:</h4> {/* New heading for the result */}
          <p className="text-gray-200 text-lg leading-relaxed whitespace-pre-wrap">{result}</p> {/* Adjusted text color, size, and line height. Added whitespace-pre-wrap to preserve formatting */}
        </motion.div>
      )}
    </div>
  );
};

export default AdGeneratorTool;