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
const darkBgColor = "#1E1E1E"; // Consistent with DashboardHome, MyMentor, etc.
const darkBgColorLighter = "#222222"; // Slightly lighter for internal elements

const sampleLessons = [
  { id: 1, title: "1. Introduction to Dropshipping", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" }, // Using a sample YouTube embed
  { id: 2, title: "2. Finding Winning Products", videoUrl: "https://www.youtube.com/embed/K7qg2xXyYtE" },
  { id: 3, title: "3. Setting Up Your Store", videoUrl: "https://www.youtube.com/embed/n_dV3W1910A" },
  { id: 4, title: "4. Facebook Ads Mastery", videoUrl: "https://www.youtube.com/embed/bM74f6_jL-I" },
  { id: 5, title: "5. Scaling Your Business", videoUrl: "https://www.youtube.com/embed/3vG0rB_iRkY" },
];

const CourseDetails = () => {
  const [activeLesson, setActiveLesson] = useState(sampleLessons[0]);

  return (
    <div className="p-6">
      {/* Apply gradient to the main course title */}
      <h1
        className="text-4xl font-extrabold mb-5" // Increased font size and boldness
        style={gradientTextStyle}
      >
        Master Dropshipping with Sarah Lee
      </h1>
      <p className="text-gray-300 mb-8"> {/* Adjusted text color for dark background */}
        Learn from a top mentor how to set up a profitable eCommerce business from scratch.
      </p>

      {/* Layout */}
      <div className="flex flex-col lg:flex-row gap-8"> {/* Increased gap */}
        {/* Video Section */}
        <motion.div
          key={activeLesson.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1"
        >
          <div
            className="aspect-video w-full rounded-xl overflow-hidden shadow-lg shadow-black/70 border border-[#222222]" // Consistent border, shadow, increased roundness
            style={{ backgroundColor: 'black' }} // Background for iframe area
          >
            <iframe
              src={activeLesson.videoUrl}
              title={activeLesson.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          {/* Apply gradient to the active lesson title below the video */}
          <h2
            className="text-2xl font-bold mt-6" // Increased font size, boldness, margin
            style={gradientTextStyle}
          >
            {activeLesson.title}
          </h2>
        </motion.div>

        {/* Lesson List */}
        <div
          className="lg:w-1/3 p-5 rounded-xl shadow-lg shadow-black/70 border border-[#222222]" // Added padding, roundness, shadow, border
          style={{ backgroundColor: darkBgColor }} // Dark background for the list container
        >
          {/* Apply gradient to "Lessons" heading */}
          <h3
            className="text-xl font-bold mb-4" // Increased font size and margin
            style={gradientTextStyle}
          >
            Lessons
          </h3>
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-3 custom-scrollbar"> {/* Increased space-y, added custom-scrollbar class for styling */}
            {sampleLessons.map((lesson) => (
              <motion.button
                key={lesson.id}
                onClick={() => setActiveLesson(lesson)}
                className={`
                  w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 ease-in-out
                  ${activeLesson.id === lesson.id
                      ? "border-l-4 border-purple-500 bg-purple-900/30" // Active: purple border, subtle dark purple background
                      : "bg-[#222222] hover:bg-[#2A2A2A]" // Inactive: dark background, subtle hover
                  }
                  ${activeLesson.id === lesson.id ? 'text-transparent' : 'text-gray-300'} // Apply gradient text only if active
                `}
                style={activeLesson.id === lesson.id ? gradientTextStyle : null} // Conditionally apply gradient text
                whileHover={{ x: activeLesson.id === lesson.id ? 0 : 5 }} // Subtle slide on hover for inactive
              >
                {lesson.title}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;