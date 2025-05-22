import React from "react";
import { Download, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion"; // Import motion for animations

// Define a common style object for gradient text
const gradientTextStyle = {
  background: 'linear-gradient(to right, #6A67FE, #FE67F6)', // Gradient from your brand
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent', // Fallback
};

// Define common dark background colors
const darkBgColor = "#1E1E1E"; // Consistent for main cards
// const darkBgColorLighter = "#222222"; // Not directly used in this component but good to have

const certificates = [
  {
    id: 1,
    course: "Frontend Web Development Fundamentals",
    date: "2025-07-10",
    downloadUrl: "/certificates/frontend-web-dev.pdf",
  },
  {
    id: 2,
    course: "ReactJS Advanced Concepts",
    date: "2025-06-15",
    downloadUrl: "/certificates/reactjs-mastery.pdf",
  },
  {
    id: 3,
    course: "UI/UX Design Essentials",
    date: "2025-05-22",
    downloadUrl: "/certificates/ui-ux-design.pdf",
  },
  {
    id: 4,
    course: "E-commerce Business Blueprint",
    date: "2025-04-01",
    downloadUrl: "/certificates/ecom-blueprint.pdf",
  },
];

const Certificates = () => {
  return (
    <div className="p-6">
      {/* Main Heading with Gradient */}
      <h2
        className="text-4xl font-extrabold mb-8 flex items-center gap-4" // Larger font, increased gap
        style={gradientTextStyle}
      >
        <BadgeCheck className="text-purple-400" size={40} /> {/* Lucide icon with explicit size and color */}
        My Certificates
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert, index) => (
          <motion.div
            key={cert.id}
            className="shadow-lg shadow-black/70 rounded-xl p-6 border border-[#222222] flex flex-col justify-between" // Consistent card styling
            style={{ backgroundColor: darkBgColor }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }} // Staggered animation
            whileHover={{ scale: 1.02 }} // Subtle hover effect
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-200 mb-2"> {/* Adjusted font size and color */}
                {cert.course}
              </h3>
              <p className="text-base text-gray-400 mb-4">Date Earned: {cert.date}</p> {/* Adjusted font size and color */}
            </div>
            <a
              href={cert.downloadUrl}
              download
              className="inline-flex items-center justify-center gap-2 text-lg text-white bg-purple-600 px-6 py-3 mt-auto rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out font-medium" // Consistent primary button styling
            >
              <Download size={20} /> {/* Lucide icon with explicit size */}
              Download Certificate
            </a>
          </motion.div>
        ))}
      </div>

      {certificates.length === 0 && (
        <p className="text-gray-400 text-center text-lg mt-12"> {/* Adjusted text color, size, and margin */}
          No certificates earned yet.
        </p>
      )}
    </div>
  );
};

export default Certificates;