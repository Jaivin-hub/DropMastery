import React, { useState, useEffect } from "react";
import {
  Pencil,
  Trash2,
  Search,
  CheckCircle,
  XCircle,
  Settings,
  Briefcase, BarChart2, LayoutDashboard, Zap, MessageSquare, DollarSign,
  PlusCircle,
  ChevronDown // This might not be needed if mentor search is only in CourseFormPage
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import { useNavigate } from "react-router-dom"; // Add this import

// Define a common style object for gradient text
const gradientTextStyle = {
  background: 'linear-gradient(to right, #6A67FE, #FE67F6)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent',
};

// Define common dark background colors
const darkBgColor = "#1E1E1E";
// const darkBgColorLighter = "#222222"; // Not needed if CreateCourseModal removed

// Custom Confirmation Modal Component (Keep this here as it's used for course deletion)
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


const CourseControl = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [courseToDeleteId, setCourseToDeleteId] = useState(null);

  // const [showCreateCourseModal, setShowCreateCourseModal] = useState(false); // REMOVE THIS
  const navigate = useNavigate(); // Initialize useNavigate


  useEffect(() => {
    const fetchCourses = async () => {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        console.warn("Authentication token not found. Please log in.");
        return;
      }

      try {
        const response = await axios.get('/api/courses', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        const transformedCourses = response.data.courses.map(course => {
          const createdByName = course.createdBy?.name || course.createdBy?.email || 'N/A';
          const mentorNames = course.mentors?.map(m => m.name || m.email).filter(Boolean) || [];

          return {
            ...course,
            createdBy: createdByName,
            mentorNames: mentorNames,
            icon: <Briefcase size={48} className="text-purple-400" />,
          };
        });
        setCourses(transformedCourses);
      } catch (error) {
        console.error('Error fetching courses:', error.response ? error.response.data : error.message);
      }
    };

    fetchCourses();
  }, []);

  const handleToggleStatus = async (id) => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
        alert("Authentication token not found. Please log in.");
        return;
    }

    const courseToUpdate = courses.find(course => course._id === id);
    if (!courseToUpdate) return;

    let newStatus;
    if (courseToUpdate.status === "published") {
        newStatus = "archived";
    } else if (courseToUpdate.status === "draft") {
        newStatus = "published";
    } else {
        newStatus = "published";
    }

    try {
        await axios.patch(`/api/courses/${id}/status`, { status: newStatus }, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });

        setCourses((prev) =>
            prev?.map((course) =>
                course._id === id
                    ? { ...course, status: newStatus }
                    : course
            )
        );
    } catch (error) {
        console.error('Error updating course status:', error.response ? error.response.data : error.message);
        alert(`Failed to update course status: ${error.response?.data?.message || 'Unknown error'}`);
    }
  };


  const handleDeleteClick = (id) => {
    setCourseToDeleteId(id);
    setShowDeleteConfirmModal(true);
  };

  const confirmDelete = async () => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      alert("Authentication token not found. Please log in.");
      setShowDeleteConfirmModal(false);
      return;
    }

    try {
      await axios.delete(`/api/courses/${courseToDeleteId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setCourses((prev) => prev.filter((course) => course._id !== courseToDeleteId));
      setShowDeleteConfirmModal(false);
      setCourseToDeleteId(null);
    } catch (error) {
      console.error('Error deleting course:', error.response ? error.response.data : error.message);
      alert(`Failed to delete course: ${error.response?.data?.message || 'Unknown error'}`);
      setShowDeleteConfirmModal(false);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirmModal(false);
    setCourseToDeleteId(null);
  };

  // Modified: Redirect to CourseFormPage for creation
  const handleCreateCourseClick = () => {
    navigate('new'); // Navigate to the CourseFormPage for creation
  };

  // Modified: Redirect to CourseFormPage for editing
  const handleEditClick = (courseId) => {
    navigate(`edit/${courseId}`);
  };


  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.createdBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.mentorNames.some(name => name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredCourses?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCourses = filteredCourses.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const getStatusClasses = (status) => {
    switch (status) {
      case "published":
        return "bg-green-700/30 text-green-400";
      case "draft":
        return "bg-yellow-700/30 text-yellow-400";
      case "archived":
        return "bg-red-700/30 text-red-400";
      default:
        return "bg-gray-700/30 text-gray-400";
    }
  };

  return (
    <div className="">
      <motion.h2
        className="text-4xl font-extrabold mb-8 flex items-center gap-4"
        style={gradientTextStyle}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Settings className="text-purple-400" size={40} />
        Course Control
      </motion.h2>

      <motion.div
        className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex items-center bg-[#222222] border border-gray-700 rounded-lg px-4 py-2 flex-1 shadow-md shadow-black/50">
          <Search className="text-gray-400 mr-3" size={20} />
          <input
            type="text"
            placeholder="Search by course title or creator..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full outline-none bg-transparent text-lg text-gray-200 placeholder-gray-500"
          />
        </div>
        <motion.button
          onClick={handleCreateCourseClick} // Calls redirect function
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out font-semibold text-base flex items-center justify-center gap-2 shadow-md shadow-purple-500/30"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <PlusCircle size={20} /> Add New Course
        </motion.button>
      </motion.div>


      {paginatedCourses?.length === 0 ? (
        <motion.p
          className="text-gray-400 text-lg text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          No courses found.
        </motion.p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {paginatedCourses?.map((course, index) => (
            <motion.div
              key={course._id}
              className="shadow-lg shadow-black/70 rounded-xl p-6 border border-[#222222] flex flex-col justify-between"
              style={{ backgroundColor: darkBgColor }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div>
                <div className="mb-3 flex justify-center">{course.icon}</div>
                <h3 className="text-2xl font-bold text-gray-200 mb-2 text-center">
                  {course.title}
                </h3>
                <p className="text-base text-gray-400 text-sm text-center">
                  Created by: {course.createdBy}
                  {course?.mentorNames && course?.mentorNames?.length > 0 && (
                    <span className="block mt-1">
                      Mentors: {course.mentorNames.join(', ')}
                    </span>
                  )}
                </p>

                <div className="mt-4 text-center">
                  <span
                    className={`inline-block px-3 py-1.5 text-xs font-semibold rounded-full ${getStatusClasses(course.status)}`}
                  >
                    {course.status}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                <motion.button
                  onClick={() => handleToggleStatus(course._id)}
                  className={`flex items-center justify-center gap-2 px-5 py-2.5 text-base rounded-lg transition duration-300 ease-in-out font-medium flex-1 ${
                    course.status === "published"
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  {course.status === "published" ? (
                    <>
                      <XCircle size={20} /> Archive
                    </>
                  ) : (
                    <>
                      <CheckCircle size={20} /> Publish
                    </>
                  )}
                </motion.button>

                <motion.button
                  onClick={() => handleEditClick(course._id)} // Redirect to CourseFormPage
                  className="flex items-center justify-center gap-2 px-5 py-2.5 text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out font-medium flex-1"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Pencil size={20} />
                  Edit
                </motion.button>

                <motion.button
                  onClick={() => handleDeleteClick(course._id)}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 text-base bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out font-medium flex-1"
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
        <div className="mt-8 flex justify-center items-center gap-3">
          {Array.from({ length: totalPages }, (_, i) => (
            <motion.button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg text-base font-medium transition duration-200 ${
                currentPage === i + 1
                  ? "bg-purple-600 text-white shadow-md"
                  : "bg-[#222222] text-gray-300 hover:bg-[#2A2A2A] hover:text-white"
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