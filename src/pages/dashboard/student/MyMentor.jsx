import React from "react";
import { motion } from "framer-motion";

// Define a common style object for gradient text
const gradientTextStyle = {
  background: 'linear-gradient(to right, #6A67FE, #FE67F6)', // Gradient from the image
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent', // Fallback
};

// Define a style for the dark background color, consistent with the other component
const darkBgColor = "#1E1E1E"; // From your DashboardHome component

const MyMentor = () => {
  const mentor = {
    name: "Jane Smith",
    image: "https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?ga=GA1.1.843766667.1747855460&semt=ais_hybrid&w=740",
    bio: "7-figure dropshipping store owner, teaching students worldwide how to find winning products and scale with Facebook Ads.",
    email: "jane@dropmentor.com",
    rating: 4.9,
    mentees: 128,
    storesLaunched: 5,
  };

  return (
    <motion.div
      // Changed background to a dark shade for consistency with the other component
      // and added a shadow for depth. Increased padding.
      className="p-8 rounded-lg shadow-lg shadow-black/70"
      style={{ backgroundColor: darkBgColor }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Apply gradient to the main heading */}
      <h2
        className="text-3xl font-bold mb-6" // Increased font size and bottom margin
        style={gradientTextStyle}
      >
        Your Assigned Mentor
      </h2>

      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start"> {/* Increased gap, centered items for small screens */}
        {/* Image */}
        <motion.img
          src={mentor.image}
          alt="Mentor"
          className="w-36 h-36 rounded-full object-cover border-4 border-gray-700 shadow-md" // Increased size and border
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        />

        {/* Info */}
        <div className="flex-1 text-center md:text-left"> {/* Centered text for small screens */}
          {/* Apply gradient to mentor name */}
          <h3
            className="text-2xl font-semibold mb-2" // Increased font size and bottom margin
            style={gradientTextStyle}
          >
            {mentor.name}
          </h3>
          <p className="text-gray-300 mb-4">{mentor.bio}</p> {/* Changed text color to light gray */}

          <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-4 mb-6 text-sm"> {/* Added flex-wrap and adjusted gaps */}
            <div>
              {/* Apply gradient to stats */}
              <span className="font-semibold text-lg" style={gradientTextStyle}>
                {mentor.rating}⭐
              </span>
              <p className="text-gray-500 text-xs">Average Rating</p> {/* Darker gray for labels */}
            </div>
            <div>
              {/* Apply gradient to stats */}
              <span className="font-semibold text-lg" style={gradientTextStyle}>
                {mentor.mentees}
              </span>
              <p className="text-gray-500 text-xs">Students Mentored</p>
            </div>
            <div>
              {/* Apply gradient to stats */}
              <span className="font-semibold text-lg" style={gradientTextStyle}>
                {mentor.storesLaunched}
              </span>
              <p className="text-gray-500 text-xs">Successful Stores</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6"> {/* Increased gap and top margin */}
            <motion.button
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out text-lg font-medium" // Improved button styling
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              Schedule Live Session
            </motion.button>
            <motion.button
              className="border border-purple-600 text-purple-400 px-6 py-3 rounded-lg hover:bg-purple-600 hover:text-white transition duration-300 ease-in-out text-lg font-medium" // Improved button styling
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              Ask a Question
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MyMentor;