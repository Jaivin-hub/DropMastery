import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, PlayCircle, Edit } from "lucide-react"; // Icons for actions

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
const darkInputBg = "#2A2A2A"; // Input background

const dummyMentorLiveSessions = [
  {
    id: 1,
    title: "Weekly Q&A: Dropshipping Fundamentals",
    date: "2025-06-01",
    time: "07:00 PM IST",
    link: "https://zoom.us/j/1234567890",
    status: "Scheduled",
    attendees: 25,
    course: "Dropshipping Mastery: From Zero to Hero",
  },
  {
    id: 2,
    title: "Product Sourcing Masterclass",
    date: "2025-05-28",
    time: "03:00 PM IST",
    link: "https://zoom.us/j/0987654321",
    status: "Ongoing",
    attendees: 40,
    course: "Winning Product Research Strategies",
  },
  {
    id: 3,
    title: "Facebook Ads Deep Dive",
    date: "2025-05-25",
    time: "06:00 PM IST",
    link: "https://zoom.us/j/1122334455",
    status: "Completed",
    attendees: 55,
    course: "Advanced Facebook Ads for E-commerce",
  },
  {
    id: 4,
    title: "Shopify Store Optimization Tips",
    date: "2025-06-05",
    time: "11:00 AM IST",
    link: "https://zoom.us/j/6789012345",
    status: "Scheduled",
    attendees: 0, // No attendees yet
    course: "Shopify Store Building & Optimization",
  },
  {
    id: 5,
    title: "Advanced SEO for E-commerce",
    date: "2025-05-20",
    time: "08:00 PM IST",
    link: "https://zoom.us/j/5432109876",
    status: "Completed",
    attendees: 30,
    course: "Advanced SEO for E-commerce",
  },
];

// Dummy courses a mentor might teach, for the dropdown
const dummyMentorCourses = [
  "Dropshipping Mastery: From Zero to Hero",
  "Advanced Facebook Ads for E-commerce",
  "Winning Product Research Strategies",
  "Shopify Store Building & Optimization",
  "TikTok Marketing for Dropshippers",
  "Advanced SEO for E-commerce",
];

const LiveSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [newSession, setNewSession] = useState({
    title: "",
    date: "",
    time: "",
    link: "",
    course: "",
  });

  useEffect(() => {
    // Simulate fetching live session data for the mentor
    setSessions(dummyMentorLiveSessions);
  }, []);

  // Function to determine status badge color
  const getStatusClasses = (status) => {
    switch (status) {
      case "Scheduled":
        return "bg-blue-700/30 text-blue-400";
      case "Ongoing":
        return "bg-green-700/30 text-green-400";
      case "Completed":
        return "bg-gray-700/30 text-gray-400";
      default:
        return "bg-gray-700/30 text-gray-400";
    }
  };

  const handleViewSession = (session) => {
    // In a real application, this would open a modal with session details or navigate to a recording
    alert(`Viewing session: ${session.title}\nCourse: ${session.course}\nDate: ${session.date}\nTime: ${session.time}\nStatus: ${session.status}\nLink: ${session.link}`);
  };

  const handleStartOrJoinSession = (session) => {
    // In a real application, this would open the session link
    window.open(session.link, "_blank");
  };

  const handleEditSession = (session) => {
    // In a real application, this would open an edit form for the session
    alert(`Editing session: ${session.title}`);
  };

  const handleNewSessionChange = (e) => {
    const { name, value } = e.target;
    setNewSession((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSession = (e) => {
    e.preventDefault();
    const { title, date, time, link, course } = newSession;

    if (!title || !date || !time || !link || !course) {
      alert("Please fill in all fields to create a new session.");
      return;
    }

    const newSessionItem = {
      id: Date.now(),
      title,
      date,
      time,
      link,
      status: "Scheduled", // New sessions are always scheduled
      attendees: 0,
      course,
    };

    setSessions((prev) => [newSessionItem, ...prev]); // Add new session to the top
    setNewSession({
      title: "",
      date: "",
      time: "",
      link: "",
      course: "",
    });
    alert("New live session scheduled successfully!");
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
        My Live Sessions
      </h2>

      {/* Create New Live Session Form */}
      <motion.div
        className="p-6 rounded-xl shadow-lg shadow-black/70 border mb-8 space-y-4"
        style={{ backgroundColor: darkBgCard, borderColor: darkBorderColor }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h3 className="text-xl font-bold text-gray-200 mb-4">Schedule New Live Session</h3>
        <form onSubmit={handleAddSession} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Session Title (e.g., Weekly Q&A)"
            value={newSession.title}
            onChange={handleNewSessionChange}
            className="w-full bg-[#2A2A2A] border border-[#444444] text-gray-200 placeholder-gray-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
            required
          />
          <select
            name="course"
            value={newSession.course}
            onChange={handleNewSessionChange}
            className="w-full bg-[#2A2A2A] border border-[#444444] text-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200 appearance-none"
            required
          >
            <option value="" disabled className="bg-[#121212] text-gray-500">Select Course</option>
            {dummyMentorCourses.map((course, index) => (
              <option key={index} value={course} className="bg-[#121212] text-gray-300">
                {course}
              </option>
            ))}
          </select>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="date"
              name="date"
              value={newSession.date}
              onChange={handleNewSessionChange}
              className="w-full bg-[#2A2A2A] border border-[#444444] text-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
              required
            />
            <input
              type="time"
              name="time"
              value={newSession.time}
              onChange={handleNewSessionChange}
              className="w-full bg-[#2A2A2A] border border-[#444444] text-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
              required
            />
          </div>
          <input
            type="url"
            name="link"
            placeholder="Session Join Link (e.g., Zoom URL)"
            value={newSession.link}
            onChange={handleNewSessionChange}
            className="w-full bg-[#2A2A2A] border border-[#444444] text-gray-200 placeholder-gray-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
            required
          />
          <motion.button
            type="submit"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out font-semibold text-base w-full"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            Schedule Session
          </motion.button>
        </form>
      </motion.div>

      {/* Existing Live Sessions Table */}
      <motion.div
        className="overflow-x-auto shadow-lg shadow-black/70 rounded-xl border" // Container for the table with dark card styling
        style={{ backgroundColor: darkBgCard, borderColor: darkBorderColor }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }} // Staggered animation
      >
        <table className="min-w-full border-collapse text-base">
          <thead>
            <tr className="text-left text-gray-300 font-semibold text-sm" style={{ backgroundColor: darkTableHeadBg }}>
              <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>Title</th>
              <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>Course</th> {/* Added Course column */}
              <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>Date</th>
              <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>Time</th>
              <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>Status</th>
              <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>Attendees</th>
              <th className="p-3 border-b" style={{ borderColor: darkBorderColor }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sessions.length > 0 ? (
              sessions.map((session, index) => (
                <motion.tr
                  key={session.id}
                  className="border-t hover:bg-[#2A2A2A] transition-colors duration-200 text-gray-300"
                  style={{ borderColor: darkTableCellBorder }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }} // Further staggered
                >
                  <td className="p-3 border-r" style={{ borderColor: darkTableCellBorder }}>{session.title}</td>
                  <td className="p-3 border-r" style={{ borderColor: darkTableCellBorder }}>{session.course}</td> {/* Display Course */}
                  <td className="p-3 border-r" style={{ borderColor: darkTableCellBorder }}>{session.date}</td>
                  <td className="p-3 border-r" style={{ borderColor: darkTableCellBorder }}>{session.time}</td>
                  <td className="p-3 border-r" style={{ borderColor: darkTableCellBorder }}>
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusClasses(session.status)}`}>
                      {session.status}
                    </span>
                  </td>
                  <td className="p-3 border-r" style={{ borderColor: darkTableCellBorder }}>{session.attendees}</td>
                  <td className="p-3 flex gap-3 items-center">
                    <motion.button
                      title="View Details"
                      onClick={() => handleViewSession(session)}
                      className="text-blue-400 hover:text-blue-300 transition duration-150"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Eye size={20} />
                    </motion.button>
                    {session.status === "Scheduled" && (
                      <motion.button
                        title="Edit Session"
                        onClick={() => handleEditSession(session)}
                        className="text-purple-400 hover:text-purple-300 transition duration-150"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Edit size={20} />
                      </motion.button>
                    )}
                    {(session.status === "Scheduled" || session.status === "Ongoing") && (
                      <motion.button
                        title="Start/Join Session"
                        onClick={() => handleStartOrJoinSession(session)}
                        className="text-green-400 hover:text-green-300 transition duration-150"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <PlayCircle size={20} />
                      </motion.button>
                    )}
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-6 text-center text-gray-400 text-lg"> {/* Adjusted colspan */}
                  No live sessions scheduled.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
};

export default LiveSessions;
