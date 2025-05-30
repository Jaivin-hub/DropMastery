import React from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react"; // Example icon for search
import Navbar from "../../../components/Navbar";

// Define common styles
const gradientTextStyle = {
  background: 'linear-gradient(to right, #6A67FE, #FE67F6)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent',
};
const darkBgColor = "#121212"; // Main background
const darkCardBg = "#1E1E1E"; // Card background
const darkBorderColor = "#222222"; // Border color
const darkInputBg = "#2A2A2A"; // Input background

const Explore = () => {
  // Dummy data for categories/courses to explore
  const categories = [
    { name: "Dropshipping Fundamentals", description: "Learn the basics of starting your dropshipping business.", icon: "📦" },
    { name: "Advanced Facebook Ads", description: "Master Facebook advertising strategies for e-commerce.", icon: "📈" },
    { name: "E-commerce SEO", description: "Optimize your store for search engines and drive organic traffic.", icon: "🔍" },
    { name: "Product Research & Sourcing", description: "Discover winning products and reliable suppliers.", icon: "💡" },
    { name: "Shopify Store Setup", description: "Build and customize your professional Shopify store.", icon: "🛒" },
    { name: "Customer Service Excellence", description: "Provide top-notch support to retain your customers.", icon: "💬" },
    { name: "Branding & Marketing", description: "Create a strong brand identity and effective marketing campaigns.", icon: "🎨" },
    { name: "Financial Management for E-commerce", description: "Manage your finances and maximize profitability.", icon: "💰" },
  ];

  return (
    <>
    <Navbar/>
    <motion.div
      className="min-h-screen p-8"
      style={{ backgroundColor: darkBgColor }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-4xl font-extrabold mb-8 text-center"
        style={gradientTextStyle}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Explore Our Content
      </motion.h1>

      <motion.div
        className="max-w-3xl mx-auto mb-10 relative"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <input
          type="text"
          placeholder="Search for courses, topics, or mentors..."
          className="w-full bg-[#222222] text-gray-200 border border-gray-700 px-5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 transition duration-200 pl-12"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            className="bg-[#1E1E1E] rounded-xl shadow-lg shadow-black/60 border border-[#222222] p-6 flex flex-col items-center text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.4)" }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-5xl mb-4" role="img" aria-label={category.name}>
              {category.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-100 mb-2" style={gradientTextStyle}>
              {category.name}
            </h3>
            <p className="text-gray-400 text-sm">{category.description}</p>
            <motion.button
              className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-200 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="text-center mt-12 text-gray-500 text-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        More exciting content coming soon!
      </motion.div>
    </motion.div>
    </>
  );
};

export default Explore;
