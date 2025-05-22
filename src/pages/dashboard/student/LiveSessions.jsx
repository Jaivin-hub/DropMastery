import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Define a common style object for gradient text
const gradientTextStyle = {
  background: 'linear-gradient(to right, #6A67FE, #FE67F6)', // Gradient from the image
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent', // Fallback
};

// Define a common dark background color for cards/sections
const darkBgColor = "#1E1E1E"; // Consistent with DashboardHome and MyMentor

const sampleSessions = [
  {
    id: 1,
    mentor: "Sarah Lee",
    date: "2025-08-01",
    time: "14:00",
    status: "Upcoming",
    joinLink: "#",
  },
  {
    id: 2,
    mentor: "Nina Patel",
    date: "2025-07-21",
    time: "18:30",
    status: "Completed",
    joinLink: "#",
  },
];

const LiveSessions = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6"> {/* Increased mb */}
        {/* Apply gradient to the main heading */}
        <h2
          className="text-3xl font-bold" // Increased font size
          style={gradientTextStyle}
        >
          Live Sessions
        </h2>
        <motion.button
          onClick={() => setShowModal(true)}
          className="bg-purple-600 text-white px-5 py-2.5 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out font-medium text-base" // New button styling
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          + Schedule New
        </motion.button>
      </div>

      {/* Session list */}
      <div className="space-y-4">
        {sampleSessions.map((session) => (
          <motion.div
            key={session.id}
            whileHover={{ scale: 1.01 }}
            // Apply dark background and consistent shadow
            className="rounded-xl p-4 shadow-lg shadow-black/70 border border-[#222222]" // Added subtle border
            style={{ backgroundColor: darkBgColor }}
          >
            <div className="flex justify-between items-center">
              <div>
                {/* Apply gradient to mentor name */}
                <h3
                  className="font-semibold text-xl" // Increased font size
                  style={gradientTextStyle}
                >
                  {session.mentor}
                </h3>
                <p className="text-sm text-gray-400"> {/* Adjusted text color */}
                  {session.date} @ {session.time}
                </p>
              </div>
              <div className="text-right">
                <p
                  className={`text-sm font-medium ${
                    session.status === "Upcoming"
                      ? "text-green-400" // Adjusted for dark background
                      : "text-gray-500"
                  }`}
                >
                  {session.status}
                </p>
                {session.status === "Upcoming" && (
                  <motion.a
                    href={session.joinLink}
                    className="text-purple-400 text-sm font-medium mt-1 inline-block hover:text-purple-200 transition" // New link styling
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Join Now
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-4" // Darker overlay, added padding for small screens
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="rounded-xl p-6 w-full max-w-md relative shadow-xl shadow-black/90 border border-[#222222]" // Dark background, shadow, border
              style={{ backgroundColor: darkBgColor }}
            >
              {/* Apply gradient to modal heading */}
              <h3
                className="text-2xl font-semibold mb-6" // Increased font size and mb
                style={gradientTextStyle}
              >
                Schedule Session
              </h3>
              <form className="space-y-5"> {/* Increased space-y */}
                <input
                  type="date"
                  className="w-full bg-[#222222] text-gray-300 border border-gray-700 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500" // Dark input styling
                  required
                />
                <input
                  type="time"
                  className="w-full bg-[#222222] text-gray-300 border border-gray-700 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500" // Dark input styling
                  required
                />
                <select
                  className="w-full bg-[#222222] text-gray-300 border border-gray-700 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" // Dark select styling
                >
                  <option className="bg-[#121212] text-gray-300">Sarah Lee</option> {/* Options often inherit, but good to be explicit */}
                  <option className="bg-[#121212] text-gray-300">Nina Patel</option>
                </select>
                <textarea
                  placeholder="Notes (optional)"
                  className="w-full bg-[#222222] text-gray-300 border border-gray-700 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500 h-24 resize-y" // Dark textarea styling, added resize
                />
                <div className="flex justify-end gap-4 mt-6"> {/* Increased gap and mt */}
                  <motion.button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-5 py-2.5 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition duration-300 ease-in-out font-medium text-base" // New cancel button styling
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    className="bg-purple-600 text-white px-5 py-2.5 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out font-medium text-base" // New submit button styling
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    Schedule
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LiveSessions;