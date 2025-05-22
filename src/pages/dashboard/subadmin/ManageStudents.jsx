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

// Custom Confirmation Modal Component (reused from MentorApproval and CourseControl)
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

const dummyStudents = [
  { id: 1, name: "Aarav Sharma", email: "aarav@example.com", course: "Full Stack Development", status: "Active" },
  { id: 2, name: "Meera Patel", email: "meera@example.com", course: "UI/UX Design", status: "Inactive" },
  { id: 3, name: "Rohan Das", email: "rohan@example.com", course: "AI Tools Mastery", status: "Active" },
  { id: 4, name: "Priya Singh", email: "priya@example.com", course: "Digital Marketing", status: "Active" },
  { id: 5, name: "Vikram Kumar", email: "vikram@example.com", course: "E-commerce Fundamentals", status: "Inactive" },
  { id: 6, name: "Sneha Reddy", email: "sneha@example.com", course: "ReactJS Advanced", status: "Active" },
];

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [showRemoveConfirmModal, setShowRemoveConfirmModal] = useState(false);
  const [studentToRemoveId, setStudentToRemoveId] = useState(null);

  useEffect(() => {
    // In real app, fetch from API
    setStudents(dummyStudents);
  }, []);

  const handleRemoveClick = (id) => {
    setStudentToRemoveId(id);
    setShowRemoveConfirmModal(true);
  };

  const confirmRemove = () => {
    setStudents((prev) => prev.filter((student) => student.id !== studentToRemoveId));
    setShowRemoveConfirmModal(false);
    setStudentToRemoveId(null);
  };

  const cancelRemove = () => {
    setShowRemoveConfirmModal(false);
    setStudentToRemoveId(null);
  };

  // Function to determine status badge color
  const getStatusClasses = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-700/30 text-green-400";
      case "Inactive":
        return "bg-red-700/30 text-red-400";
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
        Manage Students
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
              <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>Name</th>
              <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>Email</th>
              <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>Course</th>
              <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>Status</th>
              <th className="p-3 border-b" style={{ borderColor: darkBorderColor }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student, index) => (
                <motion.tr
                  key={student.id}
                  className="text-sm text-gray-300 hover:bg-[#2A2A2A] transition-colors duration-200" // Dark text, hover effect
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.05 }} // Staggered animation for rows
                >
                  <td className="p-3 border-b border-r" style={{ borderColor: darkTableCellBorder }}>{student.name}</td>
                  <td className="p-3 border-b border-r" style={{ borderColor: darkTableCellBorder }}>{student.email}</td>
                  <td className="p-3 border-b border-r" style={{ borderColor: darkTableCellBorder }}>{student.course}</td>
                  <td className="p-3 border-b border-r" style={{ borderColor: darkTableCellBorder }}>
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusClasses(student.status)}`} // Pill-style status badge
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="p-3 border-b" style={{ borderColor: darkTableCellBorder }}>
                    <motion.button
                      className="text-blue-400 hover:text-blue-300 transition duration-150 font-medium mr-3"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View
                    </motion.button>
                    <motion.button
                      onClick={() => handleRemoveClick(student.id)} // Use handleRemoveClick for modal
                      className="text-red-400 hover:text-red-300 transition duration-150 font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Remove
                    </motion.button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-6 text-center text-gray-400 text-lg">No students found.</td> {/* Adjusted text color and size */}
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>

      {/* Confirmation Modal for Remove */}
      <AnimatePresence>
        {showRemoveConfirmModal && (
          <ConfirmationModal
            isOpen={showRemoveConfirmModal}
            message="Are you sure you want to remove this student?"
            onConfirm={confirmRemove}
            onCancel={cancelRemove}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ManageStudents;