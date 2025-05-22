import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import AnimatePresence for modal animations
import { CheckCircle, XCircle, User, Search } from "lucide-react";

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
const darkBgColorLighter = "#222222"; // Slightly lighter for internal elements like inputs, table headers

// Custom Confirmation Modal Component
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

const mockMentorApplications = [
  { id: 1, name: "Jane Doe", email: "jane.doe@example.com", expertise: "Full Stack Developer", portfolio: "https://janedoe.dev", status: "Pending" },
  { id: 2, name: "John Smith", email: "john.smith@example.com", expertise: "UI/UX Designer", portfolio: "https://johnsmith.design", status: "Pending" },
  { id: 3, name: "Sara Ali", email: "sara.ali@example.com", expertise: "Data Scientist", portfolio: "https://sara.dev", status: "Pending" },
  { id: 4, name: "Mike Lee", email: "mike.lee@example.com", expertise: "Mobile App Developer", portfolio: "https://mikelee.dev", status: "Pending" },
  { id: 5, name: "Anna Kim", email: "anna.kim@example.com", expertise: "Marketing Expert", portfolio: "https://annakim.marketing", status: "Pending" },
];

const MentorApproval = () => {
  const [applications, setApplications] = useState(mockMentorApplications);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentDecision, setCurrentDecision] = useState(null); // { id, decision }

  const handleDecision = (id, decision) => {
    setCurrentDecision({ id, decision });
    setShowConfirmModal(true);
  };

  const confirmAction = () => {
    const { id, decision } = currentDecision;
    setApplications((prev) =>
      prev.map((mentor) =>
        mentor.id === id ? { ...mentor, status: decision } : mentor
      )
    );
    setShowConfirmModal(false);
    setCurrentDecision(null);
  };

  const cancelAction = () => {
    setShowConfirmModal(false);
    setCurrentDecision(null);
  };

  const filteredMentors = applications.filter(
    (mentor) =>
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.expertise.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMentors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMentors = filteredMentors.slice(startIndex, startIndex + itemsPerPage);

  // Function to determine status badge color
  const getStatusClasses = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-700/30 text-green-400";
      case "Rejected":
        return "bg-red-700/30 text-red-400";
      case "Pending":
        return "bg-yellow-700/30 text-yellow-400";
      default:
        return "bg-gray-700/30 text-gray-400";
    }
  };

  return (
    <div className="p-6">
      {/* Main Heading with Gradient */}
      <motion.h2
        className="text-4xl font-extrabold mb-8 flex items-center gap-4" // Larger font, increased gap
        style={gradientTextStyle}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <User className="text-purple-400" size={40} /> {/* Lucide icon with explicit size and color */}
        Mentor Approval Panel
      </motion.h2>

      {/* Search Input */}
      <motion.div
        className="flex items-center mb-6 bg-[#222222] border border-gray-700 rounded-lg px-4 py-2 w-full max-w-md shadow-md shadow-black/50" // Dark input styling
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Search className="text-gray-400 mr-3" size={20} /> {/* Adjusted icon color and size */}
        <input
          type="text"
          placeholder="Search by name or expertise..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full outline-none bg-transparent text-lg text-gray-200 placeholder-gray-500" // Dark input text and placeholder
        />
      </motion.div>

      {paginatedMentors.length === 0 ? (
        <motion.p
          className="text-gray-400 text-lg text-center mt-12" // Adjusted text color, size, and margin
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          No mentor applications found.
        </motion.p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {paginatedMentors.map((mentor, index) => (
            <motion.div
              key={mentor.id}
              className="shadow-lg shadow-black/70 rounded-xl p-6 border border-[#222222] flex flex-col justify-between" // Consistent card styling
              style={{ backgroundColor: darkBgColor }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }} // Staggered animation
              whileHover={{ scale: 1.02 }} // Subtle hover effect
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-200 mb-2"> {/* Adjusted font size and color */}
                  {mentor.name}
                </h3>
                <p className="text-base text-gray-400 text-sm">📧 {mentor.email}</p> {/* Adjusted text color */}
                <p className="text-base text-gray-400 text-sm mt-1">💼 {mentor.expertise}</p> {/* Adjusted text color */}
                <a
                  href={mentor.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 transition duration-200 text-base mt-3 inline-block" // Consistent link styling
                >
                  🌐 View Portfolio
                </a>
              </div>

              <div className="mt-4"> {/* Adjusted margin-top */}
                <span
                  className={`inline-block px-3 py-1.5 text-xs font-semibold rounded-full ${getStatusClasses(mentor.status)}`} // Pill-style status badge
                >
                  {mentor.status}
                </span>
              </div>

              {mentor.status === "Pending" && (
                <div className="mt-6 flex gap-4"> {/* Increased margin-top and gap */}
                  <motion.button
                    onClick={() => handleDecision(mentor.id, "Approved")}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 text-base bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 ease-in-out font-medium flex-1" // Consistent button styling
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle size={20} /> {/* Lucide icon with explicit size */}
                    Approve
                  </motion.button>
                  <motion.button
                    onClick={() => handleDecision(mentor.id, "Rejected")}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 text-base bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 ease-in-out font-medium flex-1" // Consistent button styling
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <XCircle size={20} /> {/* Lucide icon with explicit size */}
                    Reject
                  </motion.button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center gap-3"> {/* Increased margin-top and gap */}
          {Array.from({ length: totalPages }, (_, i) => (
            <motion.button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg text-base font-medium transition duration-200 ${
                currentPage === i + 1
                  ? "bg-purple-600 text-white shadow-md" // Active state: solid purple background
                  : "bg-[#222222] text-gray-300 hover:bg-[#2A2A2A] hover:text-white" // Inactive state: dark background, subtle hover
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {i + 1}
            </motion.button>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmModal && currentDecision && (
          <ConfirmationModal
            isOpen={showConfirmModal}
            message={`Are you sure you want to ${currentDecision.decision.toLowerCase()} this mentor?`}
            onConfirm={confirmAction}
            onCancel={cancelAction}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MentorApproval;