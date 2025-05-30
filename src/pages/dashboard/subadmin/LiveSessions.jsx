import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import motion and AnimatePresence

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
const darkTableHeadBg = "#1A1A1A"; // Slightly different for table header
const darkTableCellBorder = "#2A2A2A"; // Darker border for table cells

// Custom Confirmation Modal Component (reused from other components)
const ConfirmationModal = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="rounded-xl p-6 w-full max-w-sm relative shadow-xl shadow-black/90 border border-[#222222]"
        style={{ backgroundColor: darkBgColor }}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
      >
        <h3 className="text-xl font-bold text-gray-200 mb-4">{message}</h3>
        <div className="flex justify-end gap-3">
          <motion.button
            onClick={onCancel}
            className="px-5 py-2.5 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition duration-300 ease-in-out font-medium text-base"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            Cancel
          </motion.button>
          <motion.button
            onClick={onConfirm}
            className="bg-purple-600 text-white px-5 py-2.5 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out font-medium text-base"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            Confirm
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const dummySessions = [
  {
    id: 1,
    title: "Finding Winning Products",
    instructor: "Amit Joshi",
    date: "2025-08-10",
    time: "6:00 PM",
    link: "https://zoom.us/fake-link-1",
    status: "Scheduled",
  },
  {
    id: 2,
    title: "Shopify Store Optimization",
    instructor: "Nikita Sharma",
    date: "2025-08-12",
    time: "4:00 PM",
    link: "https://zoom.us/fake-link-2",
    status: "Ongoing",
  },
  {
    id: 3,
    title: "Facebook Ads for Dropshipping",
    instructor: "Ravi Patel",
    date: "2025-08-15",
    time: "7:00 PM",
    link: "https://zoom.us/fake-link-3",
    status: "Completed",
  },
  {
    id: 4,
    title: "Advanced SEO for E-commerce",
    instructor: "Priya Das",
    date: "2025-08-18",
    time: "5:00 PM",
    link: "https://zoom.us/fake-link-4",
    status: "Scheduled",
  },
  {
    id: 5,
    title: "Branding Your Dropshipping Store",
    instructor: "Siddharth Verma",
    date: "2025-08-20",
    time: "3:00 PM",
    link: "https://zoom.us/fake-link-5",
    status: "Scheduled",
  },
];

const LiveSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [showCancelConfirmModal, setShowCancelConfirmModal] = useState(false);
  const [sessionToCancelId, setSessionToCancelId] = useState(null);

  useEffect(() => {
    // Simulate fetching session data
    setSessions(dummySessions);
  }, []);

  const handleCancelClick = (id) => {
    setSessionToCancelId(id);
    setShowCancelConfirmModal(true);
  };

  const confirmCancel = () => {
    setSessions((prev) => prev.filter((session) => session.id !== sessionToCancelId));
    setShowCancelConfirmModal(false);
    setSessionToCancelId(null);
  };

  const cancelModalDismiss = () => {
    setShowCancelConfirmModal(false);
    setSessionToCancelId(null);
  };

  // Function to determine status badge color
  const getStatusClasses = (status) => {
    switch (status) {
      case "Scheduled":
        return "bg-yellow-700/30 text-yellow-400";
      case "Ongoing":
        return "bg-green-700/30 text-green-400";
      case "Completed":
        return "bg-gray-700/30 text-gray-400";
      default:
        return "bg-gray-700/30 text-gray-400";
    }
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
        Live Sessions
      </h2>

      <motion.div
        className="overflow-x-auto shadow-lg shadow-black/70 rounded-xl border" // Container for the table with dark card styling
        style={{ backgroundColor: darkBgColor, borderColor: darkBorderColor }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <table className="min-w-full border-collapse text-base"> {/* Base font size for table */}
          <thead>
            <tr className="text-left text-gray-300 font-semibold text-sm" style={{ backgroundColor: darkTableHeadBg }}> {/* Dark table header background, bold text */}
              <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>Title</th>
              <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>Instructor</th>
              <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>Date</th>
              <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>Time</th>
              <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>Join Link</th>
              <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>Status</th>
              <th className="p-3 border-b" style={{ borderColor: darkBorderColor }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sessions.length > 0 ? (
              sessions.map((session, index) => (
                <motion.tr
                  key={session.id}
                  className="text-sm text-gray-300 hover:bg-[#2A2A2A] transition-colors duration-200" // Dark text, hover effect
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.05 }} // Staggered animation for rows
                >
                  <td className="p-3 border-b border-r" style={{ borderColor: darkTableCellBorder }}>{session.title}</td>
                  <td className="p-3 border-b border-r" style={{ borderColor: darkTableCellBorder }}>{session.instructor}</td>
                  <td className="p-3 border-b border-r" style={{ borderColor: darkTableCellBorder }}>{session.date}</td>
                  <td className="p-3 border-b border-r" style={{ borderColor: darkTableCellBorder }}>{session.time}</td>
                  <td className="p-3 border-b border-r" style={{ borderColor: darkTableCellBorder }}>
                    <a
                      href={session.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 transition-colors duration-150 font-medium" // Styled join link
                    >
                      Join
                    </a>
                  </td>
                  <td className="p-3 border-b border-r" style={{ borderColor: darkTableCellBorder }}>
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusClasses(session.status)}`} // Pill-style status badge
                    >
                      {session.status}
                    </span>
                  </td>
                  <td className="p-3 border-b" style={{ borderColor: darkTableCellBorder }}>
                    <motion.button
                      className="text-purple-400 hover:text-purple-300 transition duration-150 font-medium mr-3" // Consistent button style
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Edit
                    </motion.button>
                    <motion.button
                      onClick={() => handleCancelClick(session.id)} // Use handleCancelClick for modal
                      className="text-red-400 hover:text-red-300 transition duration-150 font-medium" // Consistent button style
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Cancel
                    </motion.button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-6 text-center text-gray-400 text-lg">
                  No sessions scheduled.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>

      {/* Confirmation Modal for Cancel */}
      <AnimatePresence>
        {showCancelConfirmModal && (
          <ConfirmationModal
            isOpen={showCancelConfirmModal}
            message="Are you sure you want to cancel this session?"
            onConfirm={confirmCancel}
            onCancel={cancelModalDismiss}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LiveSessions;