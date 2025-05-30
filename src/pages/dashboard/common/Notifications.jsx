import React from "react";
import { motion } from "framer-motion"; // Import motion for animations
import { Bell } from "lucide-react";

// Define a common style object for gradient text
const gradientTextStyle = {
  background: 'linear-gradient(to right, #6A67FE, #FE67F6)', // Consistent gradient
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent', // Fallback
};

// Define common dark background colors and border
const darkBgCard = "#1E1E1E"; // Consistent for main cards
const darkBorderColor = "#222222"; // Consistent border color

const notifications = [
  {
    id: 1,
    title: "New Course Available",
    message: "A new course on AI has been added to your dashboard. Check it out now!",
    date: "2025-08-10",
    type: "info", // info, reminder, success, warning, error
  },
  {
    id: 2,
    title: "Session Reminder",
    message: "You have a live session on 'Advanced Product Research' tomorrow at 10 AM. Don't miss it!",
    date: "2025-08-09",
    type: "reminder",
  },
  {
    id: 3,
    title: "Assignment Graded",
    message: "Your assignment on 'React Hooks' has been graded. You scored 95%!",
    date: "2025-08-07",
    type: "success",
  },
  {
    id: 4,
    title: "Profile Update Needed",
    message: "Please complete your profile details to unlock full platform features.",
    date: "2025-08-05",
    type: "warning",
  },
  {
    id: 5,
    title: "Payment Due",
    message: "Your subscription payment is due on 2025-08-15. Please ensure timely payment.",
    date: "2025-08-03",
    type: "error",
  },
];

const Notifications = () => {
  // Function to determine notification type styling
  const getTypeClasses = (type) => {
    switch (type) {
      case "info":
        return "border-blue-500 text-blue-300";
      case "reminder":
        return "border-purple-500 text-purple-300";
      case "success":
        return "border-green-500 text-green-300";
      case "warning":
        return "border-yellow-500 text-yellow-300";
      case "error":
        return "border-red-500 text-red-300";
      default:
        return "border-gray-500 text-gray-300";
    }
  };

  return (
    <motion.div
      className="" // Consistent padding for the overall page content
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2
        className="text-3xl font-extrabold mb-8 flex items-center gap-3" // Larger font, bolder, consistent margin, flex for icon
        style={gradientTextStyle} // Apply gradient to the title
      >
        <Bell size={32} /> Notifications
      </h2>
      <div className="space-y-6"> {/* Increased space between notifications */}
        {notifications.length > 0 ? (
          notifications.map((note, index) => (
            <motion.div
              key={note.id}
              className={`rounded-xl border shadow-lg shadow-black/70 p-6 ${getTypeClasses(note.type)}`} // Dark card styling, dynamic border color
              style={{ backgroundColor: darkBgCard }} // Consistent dark background
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }} // Staggered animation
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-gray-200">{note.title}</h3> {/* Adjusted text color and size */}
                <span className="text-sm text-gray-400">{note.date}</span> {/* Adjusted text color and size */}
              </div>
              <p className="text-base text-gray-300 leading-relaxed">{note.message}</p> {/* Adjusted text color and size */}
            </motion.div>
          ))
        ) : (
          <motion.p
            className="text-gray-400 text-center text-lg mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            No new notifications.
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default Notifications;
