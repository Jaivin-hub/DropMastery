import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, MessageSquare } from "lucide-react"; // Icons for actions

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

const dummyMentorStudents = [
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav.s@example.com",
    course: "Dropshipping Mastery",
    status: "Active",
    lastActivity: "2 days ago",
  },
  {
    id: 2,
    name: "Meera Patel",
    email: "meera.p@example.com",
    course: "Advanced Facebook Ads",
    status: "Active",
    lastActivity: "1 day ago",
  },
  {
    id: 3,
    name: "Rohan Das",
    email: "rohan.d@example.com",
    course: "Winning Product Research",
    status: "Inactive", // Example of an inactive student
    lastActivity: "1 week ago",
  },
  {
    id: 4,
    name: "Priya Singh",
    email: "priya.s@example.com",
    course: "Dropshipping Mastery",
    status: "Active",
    lastActivity: "4 hours ago",
  },
  {
    id: 5,
    name: "Vikram Kumar",
    email: "vikram.k@example.com",
    course: "Advanced Facebook Ads",
    status: "Active",
    lastActivity: "3 days ago",
  },
];

const MyStudents = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Simulate fetching students data for the mentor
    setStudents(dummyMentorStudents);
  }, []);

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

  const handleViewProfile = (student) => {
    // In a real application, this would navigate to a detailed student profile view
    alert(`Viewing profile for: ${student.name}\nEmail: ${student.email}\nCourse: ${student.course}`);
  };

  const handleMessageStudent = (student) => {
    // In a real application, this would open a chat interface or compose an email
    alert(`Initiating chat with: ${student.name} (${student.email})`);
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
        My Students
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
              <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>Student Name</th>
              <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>Email</th>
              <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>Course</th>
              <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>Status</th>
              <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>Last Activity</th>
              <th className="p-3 border-b" style={{ borderColor: darkBorderColor }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student, index) => (
                <motion.tr
                  key={student.id}
                  className="border-t hover:bg-[#2A2A2A] transition-colors duration-200 text-gray-300"
                  style={{ borderColor: darkTableCellBorder }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  <td className="p-3 border-r" style={{ borderColor: darkTableCellBorder }}>{student.name}</td>
                  <td className="p-3 border-r" style={{ borderColor: darkTableCellBorder }}>{student.email}</td>
                  <td className="p-3 border-r" style={{ borderColor: darkTableCellBorder }}>{student.course}</td>
                  <td className="p-3 border-r" style={{ borderColor: darkTableCellBorder }}>
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusClasses(student.status)}`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="p-3 border-r" style={{ borderColor: darkTableCellBorder }}>{student.lastActivity}</td>
                  <td className="p-3 flex gap-3 items-center">
                    <motion.button
                      title="View Profile"
                      onClick={() => handleViewProfile(student)}
                      className="text-blue-400 hover:text-blue-300 transition duration-150"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <User size={20} />
                    </motion.button>
                    <motion.button
                      title="Message Student"
                      onClick={() => handleMessageStudent(student)}
                      className="text-purple-400 hover:text-purple-300 transition duration-150"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <MessageSquare size={20} />
                    </motion.button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-400 text-lg">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
};

export default MyStudents;
