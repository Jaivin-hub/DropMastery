import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, Edit } from "lucide-react"; // Icons for actions

// Define a common style object for gradient text
const gradientTextStyle = {
  background: 'linear-gradient(to right, #6A67FE, #FE67F6)', // Gradient from your brand
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent', // Fallback
};

// Define common dark background colors and border
const darkBgCard = "#1E1E1E"; // Consistent for main cards
const darkBorderColor = "#222222"; // Consistent border color
const darkTableHeadBg = "#1A1A1A"; // Slightly different for table header
const darkTableCellBorder = "#2A2A2A"; // Darker border for table cells

const dummyMentorCourses = [
  {
    id: 1,
    title: "Dropshipping Mastery: From Zero to Hero",
    studentsEnrolled: 85,
    status: "Active",
    lastUpdated: "2025-05-15",
  },
  {
    id: 2,
    title: "Advanced Facebook Ads for E-commerce",
    studentsEnrolled: 30,
    status: "Active",
    lastUpdated: "2025-05-20",
  },
  {
    id: 3,
    title: "Winning Product Research Strategies",
    studentsEnrolled: 120,
    status: "Active",
    lastUpdated: "2025-05-01",
  },
  {
    id: 4,
    title: "Shopify Store Building & Optimization",
    studentsEnrolled: 50,
    status: "Archived", // Example of an archived course
    lastUpdated: "2024-12-01",
  },
  {
    id: 5,
    title: "TikTok Marketing for Dropshippers",
    studentsEnrolled: 40,
    status: "Active",
    lastUpdated: "2025-05-10",
  },
];

const MyCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Simulate fetching courses data for the mentor
    setCourses(dummyMentorCourses);
  }, []);

  // Function to determine status badge color
  const getStatusClasses = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-700/30 text-green-400";
      case "Archived":
        return "bg-gray-700/30 text-gray-400";
      default:
        return "bg-gray-700/30 text-gray-400";
    }
  };

  const handleViewCourse = (course) => {
    // In a real application, this would navigate to a detailed course view
    alert(`Viewing details for: ${course.title}\nStudents: ${course.studentsEnrolled}\nStatus: ${course.status}`);
  };

  const handleEditCourse = (course) => {
    // In a real application, this would open an edit form or navigate to an edit page
    alert(`Editing course: ${course.title}`);
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
        My Courses
      </h2>

      <motion.div
        className="overflow-x-auto shadow-lg shadow-black/70 rounded-xl border" // Container for the table with dark card styling
        style={{ backgroundColor: darkBgCard, borderColor: darkBorderColor }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <table className="min-w-full border-collapse text-base">
          <thead>
            <tr className="text-left text-gray-300 font-semibold text-sm" style={{ backgroundColor: darkTableHeadBg }}>
              <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>Course Title</th>
              <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>Students Enrolled</th>
              <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>Status</th>
              <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>Last Updated</th>
              <th className="p-3 border-b" style={{ borderColor: darkBorderColor }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.length > 0 ? (
              courses.map((course, index) => (
                <motion.tr
                  key={course.id}
                  className="border-t hover:bg-[#2A2A2A] transition-colors duration-200 text-gray-300"
                  style={{ borderColor: darkTableCellBorder }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  <td className="p-3 border-r" style={{ borderColor: darkTableCellBorder }}>{course.title}</td>
                  <td className="p-3 border-r" style={{ borderColor: darkTableCellBorder }}>{course.studentsEnrolled}</td>
                  <td className="p-3 border-r" style={{ borderColor: darkTableCellBorder }}>
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusClasses(course.status)}`}>
                      {course.status}
                    </span>
                  </td>
                  <td className="p-3 border-r" style={{ borderColor: darkTableCellBorder }}>{course.lastUpdated}</td>
                  <td className="p-3 flex gap-3 items-center">
                    <motion.button
                      title="View Course"
                      onClick={() => handleViewCourse(course)}
                      className="text-blue-400 hover:text-blue-300 transition duration-150"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Eye size={20} />
                    </motion.button>
                    <motion.button
                      title="Edit Course"
                      onClick={() => handleEditCourse(course)}
                      className="text-purple-400 hover:text-purple-300 transition duration-150"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Edit size={20} />
                    </motion.button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-400 text-lg">
                  No courses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
};

export default MyCourses;
