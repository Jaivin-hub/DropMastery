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

const dummyCourses = [
  {
    id: 1,
    title: "Dropshipping Mastery",
    instructor: "Raj Mehta",
    price: 1999,
    status: "Published",
  },
  {
    id: 2,
    title: "Shopify Dropshipping 101",
    instructor: "Ayesha Khan",
    price: 1499,
    status: "Draft",
  },
  {
    id: 3,
    title: "Winning Products Strategy",
    instructor: "Karan Desai",
    price: 1299,
    status: "Published",
  },
  {
    id: 4,
    title: "Advanced E-commerce SEO",
    instructor: "Priya Singh",
    price: 2499,
    status: "Draft",
  },
  {
    id: 5,
    title: "Social Media Marketing for Dropshippers",
    instructor: "Rahul Sharma",
    price: 1799,
    status: "Published",
  },
];

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [courseToDeleteId, setCourseToDeleteId] = useState(null);

  useEffect(() => {
    // Simulate API call
    setCourses(dummyCourses);
  }, []);

  const handleDeleteClick = (id) => {
    setCourseToDeleteId(id);
    setShowDeleteConfirmModal(true);
  };

  const confirmDelete = () => {
    setCourses((prev) => prev.filter((course) => course.id !== courseToDeleteId));
    setShowDeleteConfirmModal(false);
    setCourseToDeleteId(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirmModal(false);
    setCourseToDeleteId(null);
  };

  // Function to determine status badge color
  const getStatusClasses = (status) => {
    switch (status) {
      case "Published":
        return "bg-green-700/30 text-green-400";
      case "Draft":
        return "bg-yellow-700/30 text-yellow-400";
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
        Manage Dropshipping Courses
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
              <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>Course Title</th>
              <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>Instructor</th>
              <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>Price (₹)</th>
              <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>Status</th>
              <th className="p-3 border-b" style={{ borderColor: darkBorderColor }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.length > 0 ? (
              courses.map((course, index) => (
                <motion.tr
                  key={course.id}
                  className="text-sm text-gray-300 hover:bg-[#2A2A2A] transition-colors duration-200" // Dark text, hover effect
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.05 }} // Staggered animation for rows
                >
                  <td className="p-3 border-b border-r" style={{ borderColor: darkTableCellBorder }}>{course.title}</td>
                  <td className="p-3 border-b border-r" style={{ borderColor: darkTableCellBorder }}>{course.instructor}</td>
                  <td className="p-3 border-b border-r" style={{ borderColor: darkTableCellBorder }}>₹{course.price.toLocaleString()}</td>
                  <td className="p-3 border-b border-r" style={{ borderColor: darkTableCellBorder }}>
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusClasses(course.status)}`} // Pill-style status badge
                    >
                      {course.status}
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
                      className="text-purple-400 hover:text-purple-300 transition duration-150 font-medium mr-3" // Changed to purple for edit
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Edit
                    </motion.button>
                    <motion.button
                      onClick={() => handleDeleteClick(course.id)} // Use handleDeleteClick for modal
                      className="text-red-400 hover:text-red-300 transition duration-150 font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Delete
                    </motion.button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-6 text-center text-gray-400 text-lg">
                  No courses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>

      {/* Confirmation Modal for Delete */}
      <AnimatePresence>
        {showDeleteConfirmModal && (
          <ConfirmationModal
            isOpen={showDeleteConfirmModal}
            message="Are you sure you want to delete this course?"
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ManageCourses;