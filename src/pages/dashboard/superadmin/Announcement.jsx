// src/pages/dashboard/superadmin/Announcement.jsx

import React, { useState } from "react";
import { motion } from "framer-motion"; // Import motion for animations

// Define a common style object for gradient text
const gradientTextStyle = {
  background: 'linear-gradient(to right, #6A67FE, #FE67F6)', // Gradient from your brand
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent', // Fallback
};

// Define common dark background colors and border
const darkBgColor = "#1E1E1E"; // Consistent for main cards
const darkBorderColor = "#222222"; // Consistent border color

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !message) return;

    const newAnnouncement = {
      id: Date.now(),
      title,
      message,
      date: new Date().toLocaleString(),
    };

    setAnnouncements([newAnnouncement, ...announcements]); // Add new at the top
    setTitle("");
    setMessage("");
  };

  const handleDelete = (id) => {
    const updated = announcements.filter((a) => a.id !== id);
    setAnnouncements(updated);
  };

  return (
    <motion.div
      className="p-8" // Consistent padding for the overall page content
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2
        className="text-3xl font-extrabold mb-8" // Larger font, bolder, consistent margin
        style={gradientTextStyle} // Apply gradient to the title
      >
        Post New Announcement
      </h2>

      {/* Announcement Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="p-6 rounded-xl shadow-lg shadow-black/70 border mb-8 space-y-6" // Dark background, increased padding/roundness, stronger shadow, border, larger space-y
        style={{ backgroundColor: darkBgColor, borderColor: darkBorderColor }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <input
          type="text"
          placeholder="Announcement Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-[#222222] text-gray-200 border border-gray-700 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500" // Dark input styling
          required
        />
        <textarea
          rows={4}
          placeholder="Announcement Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full bg-[#222222] text-gray-200 border border-gray-700 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500 resize-y" // Dark textarea styling, added resize-y
          required
        ></textarea>
        <motion.button
          type="submit"
          className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out font-semibold text-lg" // Consistent primary button styling
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          Post Announcement
        </motion.button>
      </motion.form>

      <h3 className="text-2xl font-bold mb-4 text-gray-200">Previous Announcements</h3> {/* Adjusted text color and size */}

      {announcements.length === 0 ? (
        <p className="text-gray-400 text-lg">No announcements yet.</p> // Adjusted text color and size
      ) : (
        <div className="space-y-6"> {/* Increased spacing */}
          {announcements.map((a, index) => (
            <motion.div
              key={a.id}
              className="p-6 rounded-xl shadow-lg shadow-black/70 border-l-4 border-purple-500" // Dark background, increased padding/roundness, stronger shadow, left border accent
              style={{ backgroundColor: darkBgColor, borderColor: darkBorderColor }} // Ensure full border styling
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }} // Staggered animation
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 mr-4"> {/* Added flex-1 and margin-right for better spacing */}
                  <h4 className="text-xl font-bold text-gray-200 mb-2">{a.title}</h4> {/* Adjusted text color and size */}
                  <p className="text-gray-300 leading-relaxed">{a.message}</p> {/* Adjusted text color */}
                  <p className="text-base text-gray-500 mt-3">{a.date}</p> {/* Adjusted text color and size */}
                </div>
                <motion.button
                  onClick={() => handleDelete(a.id)}
                  className="text-red-400 hover:text-red-300 transition-colors duration-200 px-4 py-2 rounded-lg font-medium" // Adjusted red shade, added padding/roundness
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  Delete
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Announcement;