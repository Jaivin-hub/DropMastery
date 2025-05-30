import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye } from "lucide-react"; // Icon for viewing details

// Define a common style object for gradient text
const gradientTextStyle = {
  background: 'linear-gradient(to right, #6A67FE, #FE67F6)',
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

const dummyFeedback = [
  {
    id: 1,
    user: "Student-Priya",
    subject: "Course content suggestion",
    type: "Feedback",
    status: "New",
    date: "2025-05-22",
    details: "I suggest adding more practical exercises to the 'Dropshipping Mastery' course, especially for product sourcing.",
  },
  {
    id: 2,
    user: "Mentor-Rahul",
    subject: "Bug: Live session recording issue",
    type: "Bug Report",
    status: "Pending Review",
    date: "2025-05-21",
    details: "The recording for my last live session on 'Facebook Ads' is not available. Please check.",
  },
  {
    id: 3,
    user: "Student-Karan",
    subject: "UI/UX improvement for dashboard",
    type: "Feedback",
    status: "Resolved",
    date: "2025-05-20",
    details: "The navigation on the student dashboard could be more intuitive. Perhaps a quick-access sidebar.",
  },
  {
    id: 4,
    user: "Student-Deepa",
    subject: "Feature request: Payment reminders",
    type: "Feedback",
    status: "New",
    date: "2025-05-19",
    details: "It would be great to have automated reminders for upcoming course payments.",
  },
  {
    id: 5,
    user: "Mentor-Sushma",
    subject: "Login issue on mobile",
    type: "Bug Report",
    status: "In Progress",
    date: "2025-05-18",
    details: "Unable to log in using my mobile device. It gets stuck on the loading screen after entering credentials.",
  },
];

const FeedbackReports = () => {
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    // Simulate fetching feedback data
    setFeedbackData(dummyFeedback);
  }, []);

  // Calculate summary statistics
  const totalFeedback = feedbackData.length;
  const newFeedback = feedbackData.filter(item => item.status === "New").length;
  const resolvedFeedback = feedbackData.filter(item => item.status === "Resolved").length;

  // Function to determine status badge color
  const getStatusClasses = (status) => {
    switch (status) {
      case "New":
        return "bg-blue-700/30 text-blue-400";
      case "Pending Review":
        return "bg-yellow-700/30 text-yellow-400";
      case "In Progress":
        return "bg-orange-700/30 text-orange-400";
      case "Resolved":
        return "bg-green-700/30 text-green-400";
      default:
        return "bg-gray-700/30 text-gray-400";
    }
  };

  const handleViewDetails = (feedbackItem) => {
    // In a real application, this would open a modal with full details
    alert(`Details for ${feedbackItem.subject}:\n\nUser: ${feedbackItem.user}\nType: ${feedbackItem.type}\nStatus: ${feedbackItem.status}\nDate: ${feedbackItem.date}\n\nMessage: ${feedbackItem.details}`);
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
        Feedback & Reports
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <motion.div
          className="p-6 rounded-xl border shadow-lg shadow-black/70"
          style={{ backgroundColor: darkBgCard, borderColor: darkBorderColor }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <p className="text-gray-400 mb-2 text-base">Total Submissions</p>
          <h4 className="text-3xl font-bold text-white">{totalFeedback}</h4>
        </motion.div>

        <motion.div
          className="p-6 rounded-xl border shadow-lg shadow-black/70"
          style={{ backgroundColor: darkBgCard, borderColor: darkBorderColor }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <p className="text-gray-400 mb-2 text-base">New Feedback</p>
          <h4 className="text-3xl font-bold text-blue-400">{newFeedback}</h4>
        </motion.div>

        <motion.div
          className="p-6 rounded-xl border shadow-lg shadow-black/70"
          style={{ backgroundColor: darkBgCard, borderColor: darkBorderColor }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <p className="text-gray-400 mb-2 text-base">Resolved Issues</p>
          <h4 className="text-3xl font-bold text-green-400">{resolvedFeedback}</h4>
        </motion.div>
      </div>

      {/* Feedback & Reports Table */}
      <motion.div
        className="rounded-xl border overflow-x-auto shadow-lg shadow-black/70"
        style={{ backgroundColor: darkBgCard, borderColor: darkBorderColor }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <table className="min-w-full border-collapse text-base">
          <thead>
            <tr className="text-left text-gray-300 font-semibold text-sm" style={{ backgroundColor: darkTableHeadBg }}>
              <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>User</th>
              <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>Subject</th>
              <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>Type</th>
              <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>Status</th>
              <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>Date</th>
              <th className="p-3 border-b" style={{ borderColor: darkBorderColor }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedbackData.length > 0 ? (
              feedbackData.map((item, index) => (
                <motion.tr
                  key={item.id}
                  className="border-t hover:bg-[#2A2A2A] transition-colors duration-200 text-gray-300"
                  style={{ borderColor: darkTableCellBorder }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                >
                  <td className="p-3 border-r" style={{ borderColor: darkTableCellBorder }}>{item.user}</td>
                  <td className="p-3 border-r" style={{ borderColor: darkTableCellBorder }}>{item.subject}</td>
                  <td className="p-3 border-r" style={{ borderColor: darkTableCellBorder }}>
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                      item.type === 'Feedback' ? 'bg-purple-700/30 text-purple-400' : 'bg-red-700/30 text-red-400'
                    }`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="p-3 border-r" style={{ borderColor: darkTableCellBorder }}>
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusClasses(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-3 border-r" style={{ borderColor: darkTableCellBorder }}>{item.date}</td>
                  <td className="p-3">
                    <motion.button
                      title="View Details"
                      onClick={() => handleViewDetails(item)}
                      className="text-blue-400 hover:text-blue-300 transition duration-150"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Eye size={20} />
                    </motion.button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-400 text-lg">
                  No feedback or reports found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
};

export default FeedbackReports;
