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
const darkBgColor = "#1E1E1E"; // From your DashboardHome and MyMentor components

const sampleCourses = [
  {
    id: 1,
    title: "Winning Product Research",
    mentor: "Sarah Lee",
    progress: 65,
    image: "https://img.freepik.com/free-vector/business-performance-analysis-with-graphs_53876-66260.jpg?ga=GA1.1.843766667.1747855460&semt=ais_hybrid&w=740",
  },
  {
    id: 2,
    title: "Facebook Ads Mastery",
    mentor: "John Carter",
    progress: 30,
    image: "https://img.freepik.com/free-psd/business-page-promotion-with-3d-render-facebook-digital-marketing-promotion-template_47987-20568.jpg?ga=GA1.1.843766667.1747855460&semt=ais_hybrid&w=740",
  },
  {
    id: 3,
    title: "Build Shopify Store",
    mentor: "Nina Patel",
    progress: 100,
    image: "https://img.freepik.com/free-vector/laptop-ecommerce-technology-with-website-basket_24877-56054.jpg?ga=GA1.1.843766667.1747855460&semt=ais_hybrid&w=740",
  },
];

const MyCourses = () => {
  const [filter, setFilter] = useState("All");

  const filteredCourses = sampleCourses.filter((course) => {
    if (filter === "In Progress") return course.progress < 100;
    if (filter === "Completed") return course.progress === 100;
    return true;
  });

  return (
    <div className="p-6">
      {/* Apply gradient to the main heading */}
      <h2
        className="text-3xl font-bold mb-6" // Increased font size and margin
        style={gradientTextStyle}
      >
        My Courses
      </h2>

      {/* Filter Buttons */}
      <div className="flex gap-4 mb-8"> {/* Increased gap and margin */}
        {["All", "In Progress", "Completed"].map((item) => (
          <button
            key={item}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out ${
              filter === item
                ? "bg-purple-600 text-white shadow-md" // Active state: solid purple background
                : "bg-transparent text-gray-400 border border-gray-700 hover:border-purple-600 hover:text-white" // Inactive state: transparent with border
            }`}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Course Cards Grid */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {filteredCourses.map((course) => (
          <motion.div
            key={course.id}
            whileHover={{ scale: 1.02 }}
            // Apply dark background and consistent shadow
            className="rounded-xl shadow-lg shadow-black/70 overflow-hidden"
            style={{ backgroundColor: darkBgColor }}
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-40 object-cover"
              // Add a subtle overlay or border to images if needed
            />
            <div className="p-5"> {/* Increased padding */}
              {/* Apply gradient to course title */}
              <h3
                className="text-xl font-semibold mb-2" // Increased font size
                style={gradientTextStyle}
              >
                {course.title}
              </h3>
              <p className="text-sm text-gray-400 mb-3"> {/* Adjusted text color */}
                Mentor: <span className="font-medium text-gray-300">{course.mentor}</span> {/* Adjusted mentor name color */}
              </p>

              {/* Progress bar */}
              <div className="w-full bg-gray-700 h-2 rounded-full mb-4"> {/* Darker background for the track */}
                <div
                  className="bg-purple-500 h-2 rounded-full" // Vibrant purple for the progress fill
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>

              {/* Action Button */}
              <button
                className="w-full bg-purple-600 text-white py-2.5 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out text-base font-medium" // Consistent button styling
              >
                {course.progress === 100 ? "Review" : "Continue Learning"}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;