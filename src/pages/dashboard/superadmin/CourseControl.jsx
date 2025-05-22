import React, { useState } from "react";
import {
  BookOpen,
  Pencil,
  Trash2,
  Search,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // Import motion and AnimatePresence

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
const darkBgColorLighter = "#222222"; // Slightly lighter for internal elements like inputs

// Custom Confirmation Modal Component (reused from MentorApproval)
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

const mockCourses = [
  {
    id: 1,
    title: "React Mastery",
    mentor: "Jane Doe",
    status: "Active",
  },
  {
    id: 2,
    title: "UI/UX Fundamentals",
    mentor: "John Smith",
    status: "Inactive",
  },
  {
    id: 3,
    title: "Advanced Python",
    mentor: "Mike Lee",
    status: "Active",
  },
  {
    id: 4,
    title: "Machine Learning Basics",
    mentor: "Sara Ali",
    status: "Inactive",
  },
  {
    id: 5,
    title: "Flutter Dev",
    mentor: "Anna Kim",
    status: "Active",
  },
  {
    id: 6,
    title: "Cloud Computing Essentials",
    mentor: "Jane Doe",
    status: "Inactive",
  },
];

const CourseControl = () => {
  const [courses, setCourses] = useState(mockCourses);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [courseToDeleteId, setCourseToDeleteId] = useState(null);

  const handleToggleStatus = (id) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === id
          ? {
              ...course,
              status: course.status === "Active" ? "Inactive" : "Active",
            }
          : course
      )
    );
  };

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

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.mentor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCourses = filteredCourses.slice(
    startIndex,
    startIndex + itemsPerPage
  );

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
    <div className="p-6">
      {/* Main Heading with Gradient */}
      <motion.h2
        className="text-4xl font-extrabold mb-8 flex items-center gap-4" // Larger font, increased gap
        style={gradientTextStyle}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <BookOpen className="text-purple-400" size={40} /> {/* Lucide icon with explicit size and color */}
        Course Control
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
          placeholder="Search by course title or mentor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full outline-none bg-transparent text-lg text-gray-200 placeholder-gray-500" // Dark input text and placeholder
        />
      </motion.div>

      {paginatedCourses.length === 0 ? (
        <motion.p
          className="text-gray-400 text-lg text-center mt-12" // Adjusted text color, size, and margin
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          No courses found.
        </motion.p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {paginatedCourses.map((course, index) => (
            <motion.div
              key={course.id}
              className="shadow-lg shadow-black/70 rounded-xl p-6 border border-[#222222] flex flex-col justify-between" // Consistent card styling
              style={{ backgroundColor: darkBgColor }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }} // Staggered animation
              whileHover={{ scale: 1.02 }} // Subtle hover effect
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-200 mb-2"> {/* Adjusted font size and color */}
                  {course.title}
                </h3>
                <p className="text-base text-gray-400 text-sm">👨‍🏫 {course.mentor}</p> {/* Adjusted text color */}

                <div className="mt-4">
                  <span
                    className={`inline-block px-3 py-1.5 text-xs font-semibold rounded-full ${getStatusClasses(course.status)}`} // Pill-style status badge
                  >
                    {course.status}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex gap-4"> {/* Increased margin-top and gap */}
                <motion.button
                  onClick={() => handleToggleStatus(course.id)}
                  className={`flex items-center justify-center gap-2 px-5 py-2.5 text-base rounded-lg transition duration-300 ease-in-out font-medium flex-1 ${
                    course.status === "Active"
                      ? "bg-red-600 hover:bg-red-700 text-white" // Deactivate button
                      : "bg-green-600 hover:bg-green-700 text-white" // Activate button
                  }`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  {course.status === "Active" ? (
                    <>
                      <XCircle size={20} /> Deactivate
                    </>
                  ) : (
                    <>
                      <CheckCircle size={20} /> Activate
                    </>
                  )}
                </motion.button>

                <motion.button
                  className="flex items-center justify-center gap-2 px-5 py-2.5 text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out font-medium flex-1"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Pencil size={20} />
                  Edit
                </motion.button>

                <motion.button
                  onClick={() => handleDeleteClick(course.id)} // Use handleDeleteClick for modal
                  className="flex items-center justify-center gap-2 px-5 py-2.5 text-base bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out font-medium flex-1" // Neutral gray for delete
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Trash2 size={20} />
                  Delete
                </motion.button>
              </div>
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
    </div>
  );
};

export default CourseControl;