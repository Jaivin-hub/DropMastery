import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { motion } from "framer-motion";

const gradientTextStyle = {
  background: 'linear-gradient(to right, #6A67FE, #FE67F6)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent',
};

const darkBgCard = "#1E1E1E";
const darkBorderColor = "#222222";
const darkInputBg = "#2A2A2A";

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
        style={{ backgroundColor: darkBgCard }}
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

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "New Live Session on Facebook Ads!",
      message: "Join our upcoming live session on **Facebook Ads** this Sunday at 5PM. Don't miss out!",
      target: "all",
      date: "2025-08-05",
    },
    {
      id: 2,
      title: "Course Update: Shopify Mastery",
      message: "We've added a new module on `high-converting product pages`.",
      target: "students",
      date: "2025-08-01",
    },
    {
      id: 3,
      title: "Holiday Discount Extended!",
      message: "Our special holiday discount on all courses has been extended until **August 15th**.",
      target: "mentors",
      date: "2025-07-28",
    },
  ]);

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    message: "",
    target: "all",
    date: new Date().toISOString().split("T")[0],
  });

  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [announcementToDeleteId, setAnnouncementToDeleteId] = useState(null);

  const handleChange = (field, value) => {
    setNewAnnouncement({ ...newAnnouncement, [field]: value });
  };

  const handleAddAnnouncement = () => {
    const { title, message, target, date } = newAnnouncement;
    if (!title.trim() || !message.trim()) {
      alert("Please enter both title and message for the announcement.");
      return;
    }

    const newItem = {
      id: Date.now(),
      title: title.trim(),
      message: message.trim(),
      target,
      date,
    };

    setAnnouncements([newItem, ...announcements]);
    setNewAnnouncement({
      title: "",
      message: "",
      target: "all",
      date: new Date().toISOString().split("T")[0],
    });
  };

  const handleDeleteClick = (id) => {
    setAnnouncementToDeleteId(id);
    setShowDeleteConfirmModal(true);
  };

  const confirmDelete = () => {
    setAnnouncements(announcements.filter((item) => item.id !== announcementToDeleteId));
    setShowDeleteConfirmModal(false);
    setAnnouncementToDeleteId(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirmModal(false);
    setAnnouncementToDeleteId(null);
  };

  const formatTarget = (target) =>
    target === "mentors"
      ? "Mentors"
      : target === "students"
      ? "Students"
      : "Everyone";

  return (
    <motion.div className="p-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <h2 className="text-3xl font-extrabold mb-8" style={gradientTextStyle}>Announcements</h2>

      <motion.div
        className="p-6 rounded-xl shadow-lg shadow-black/70 border mb-8 space-y-6"
        style={{ backgroundColor: darkBgCard, borderColor: darkBorderColor }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h3 className="text-xl font-bold text-gray-200 mb-4">Create New Announcement</h3>

        <input
          type="text"
          placeholder="Title"
          value={newAnnouncement.title}
          onChange={(e) => handleChange("title", e.target.value)}
          className="w-full bg-[#2A2A2A] border border-[#444444] text-gray-200 placeholder-gray-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <div className="mb-4">
          <label className="block text-base font-medium text-gray-300 mb-2">Message (Markdown):</label>
          <div data-color-mode="dark">
            <MDEditor
              value={newAnnouncement.message}
              onChange={(value) => handleChange("message", value || "")}
              height={200}
              preview="edit"
            />
          </div>
        </div>

        <label className="block text-base font-medium text-gray-300 mb-2">Target Audience:</label>
        <select
          value={newAnnouncement.target}
          onChange={(e) => handleChange("target", e.target.value)}
          className="w-full bg-[#2A2A2A] border border-[#444444] text-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="all">Everyone</option>
          <option value="mentors">Mentors Only</option>
          <option value="students">Students Only</option>
        </select>

        <label className="block text-base font-medium text-gray-300 mb-2 mt-4">Schedule Date:</label>
        <input
          type="date"
          value={newAnnouncement.date}
          onChange={(e) => handleChange("date", e.target.value)}
          className="w-full bg-[#2A2A2A] border border-[#444444] text-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <motion.button
          onClick={handleAddAnnouncement}
          className="bg-gradient-to-r from-[#6A67FE] to-[#FE67F6] text-white font-medium px-6 py-3 rounded-lg hover:opacity-90 transition duration-300 ease-in-out text-base mt-6"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          Post Announcement
        </motion.button>
      </motion.div>

      <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <h3 className="text-2xl font-bold mb-4 text-gray-200">Previous Announcements</h3>
        {announcements.length > 0 ? (
          announcements.map((item, index) => (
            <motion.div
              key={item.id}
              className="p-6 rounded-xl shadow-lg shadow-black/70 border"
              style={{ backgroundColor: darkBgCard, borderColor: darkBorderColor }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-bold text-gray-100 mb-2">{item.title}</h4>
                  <div className="text-gray-300 mb-2 whitespace-pre-wrap">{item.message}</div>
                  <div className="text-sm text-gray-500">
                    Target: {formatTarget(item.target)} | Date: {item.date}
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteClick(item.id)}
                  className="text-red-500 hover:text-red-600 font-medium"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-400">No announcements available.</p>
        )}
      </motion.div>

      <ConfirmationModal
        isOpen={showDeleteConfirmModal}
        message="Are you sure you want to delete this announcement?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </motion.div>
  );
};

export default Announcements;
