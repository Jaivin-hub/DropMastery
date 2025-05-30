import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Define a common style object for gradient text
const gradientTextStyle = {
  background: 'linear-gradient(to right, #6A67FE, #FE67F6)', // Gradient from your brand
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent', // Fallback
};

// Define common dark background colors and border
const darkBgCard = "#1E1E1E"; // Consistent for cards
const darkBorderColor = "#222222"; // Consistent border color

const dummyMentorAnnouncements = [
  {
    id: 1,
    title: "Upcoming Feature: Advanced Analytics for Mentors",
    message: "We're rolling out a new analytics dashboard next week to help you track student progress more effectively. Stay tuned for details!",
    date: "2025-05-25",
  },
  {
    id: 2,
    title: "Reminder: Mentor Community Call Tomorrow",
    message: "Don't forget our weekly mentor community call tomorrow at 10 AM IST. We'll be discussing best practices for live sessions.",
    date: "2025-05-24",
  },
  {
    id: 3,
    title: "New Course Creation Guidelines Released",
    message: "Updated guidelines for creating and submitting new courses are now available in the 'Resources' section. Please review them carefully.",
    date: "2025-05-20",
  },
  {
    id: 4,
    title: "Platform Maintenance Scheduled",
    message: "Scheduled platform maintenance will occur on 2025-06-01 from 1 AM to 3 AM IST. Expect minor disruptions during this period.",
    date: "2025-05-18",
  },
  {
    id: 5,
    title: "Top Mentor Recognition Program Launched!",
    message: "We're excited to announce a new program to recognize our top-performing mentors. Details on criteria and rewards will be shared soon.",
    date: "2025-05-15",
  },
];

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    // Simulate fetching announcements relevant to mentors
    setAnnouncements(dummyMentorAnnouncements);
  }, []);

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
        Announcements
      </h2>

      {/* List of Announcements */}
      <motion.div
        className="space-y-6" // Increased space-y
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {announcements.length > 0 ? (
          announcements.map((item, index) => (
            <motion.div
              key={item.id}
              className="p-6 rounded-xl shadow-lg shadow-black/70 border" // Dark card styling
              style={{ backgroundColor: darkBgCard, borderColor: darkBorderColor }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }} // Staggered animation
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 mr-4">
                  <h4 className="text-xl font-bold text-gray-200">{item.title}</h4>
                  <p className="text-gray-300 mt-2 text-base leading-relaxed">{item.message}</p>
                  <p className="text-sm text-gray-400 mt-3">Posted on: {item.date}</p>
                </div>
                {/* No delete button for mentors on this page, as they only view */}
              </div>
            </motion.div>
          ))
        ) : (
          <motion.p
            className="text-gray-400 text-center text-lg mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            No announcements available at this time.
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Announcements;
