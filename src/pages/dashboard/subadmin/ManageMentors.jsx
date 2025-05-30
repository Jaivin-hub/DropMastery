import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Check, X, Trash2 } from "lucide-react";

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

const initialMentors = [
  { id: 1, name: "Amit Sharma", email: "amit@example.com", category: "Business", status: "Pending" },
  { id: 2, name: "Sneha Kapoor", email: "sneha@example.com", category: "Technology", status: "Approved" },
  { id: 3, name: "Ravi Verma", email: "ravi@example.com", category: "Design", status: "Rejected" },
  { id: 4, name: "Priya Singh", email: "priya@example.com", category: "Marketing", status: "Pending" },
  { id: 5, name: "Vikram Kumar", email: "vikram@example.com", category: "Finance", status: "Approved" },
];

const ManageMentors = () => {
  const [mentors, setMentors] = useState(initialMentors);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentAction, setCurrentAction] = useState(null); // { type: 'approve' | 'reject' | 'delete', id: number }

  const handleActionClick = (type, id) => {
    setCurrentAction({ type, id });
    let message = "";
    if (type === "approve") message = "Are you sure you want to approve this mentor?";
    else if (type === "reject") message = "Are you sure you want to reject this mentor?";
    else if (type === "delete") message = "Are you sure you want to delete this mentor?";

    setShowConfirmModal(true);
  };

  const confirmAction = () => {
    const { type, id } = currentAction;
    if (type === "approve") {
      setMentors((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status: "Approved" } : m))
      );
    } else if (type === "reject") {
      setMentors((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status: "Rejected" } : m))
      );
    } else if (type === "delete") {
      setMentors((prev) => prev.filter((m) => m.id !== id));
    }
    setShowConfirmModal(false);
    setCurrentAction(null);
  };

  const cancelAction = () => {
    setShowConfirmModal(false);
    setCurrentAction(null);
  };

  // Function to determine status badge color
  const getStatusClasses = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-700/30 text-green-400";
      case "Pending":
        return "bg-yellow-700/30 text-yellow-400";
      case "Rejected":
        return "bg-red-700/30 text-red-400";
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
        style={gradientTextStyle} // Applied consistent gradient
      >
        Manage Mentors
      </h2>

      <motion.div
        className="rounded-xl border overflow-x-auto shadow-lg shadow-black/70" // Consistent card styling for table container
        style={{ backgroundColor: darkBgCard, borderColor: darkBorderColor }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <table className="min-w-full text-base border-collapse">
          <thead>
            {/* FIX: Removed the whitespace/newline between <tr> and <th> */}
            <tr className="bg-[#1A1A1A] text-left text-gray-300 font-semibold text-sm">
              <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>Name</th>
              <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>Email</th>
              <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>Category</th>
              <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>Status</th>
              <th className="p-3 border-b" style={{ borderColor: darkBorderColor }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mentors.length > 0 ? (
              mentors.map((mentor, index) => (
                <motion.tr
                  key={mentor.id}
                  className="border-t hover:bg-[#2A2A2A] transition-colors duration-200 text-gray-300"
                  style={{ borderColor: darkTableCellBorder }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  <td className="p-3 border-r" style={{ borderColor: darkTableCellBorder }}>{mentor.name}</td>
                  <td className="p-3 border-r" style={{ borderColor: darkTableCellBorder }}>{mentor.email}</td>
                  <td className="p-3 border-r" style={{ borderColor: darkTableCellBorder }}>{mentor.category}</td>
                  <td className="p-3 border-r" style={{ borderColor: darkTableCellBorder }}>
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusClasses(mentor.status)}`}
                    >
                      {mentor.status}
                    </span>
                  </td>
                  <td className="p-3 flex gap-3 items-center">
                    <motion.button
                      title="View"
                      className="text-blue-400 hover:text-blue-300 transition duration-150"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Eye size={20} />
                    </motion.button>
                    {mentor.status === "Pending" && (
                      <>
                        <motion.button
                          title="Approve"
                          onClick={() => handleActionClick("approve", mentor.id)}
                          className="text-green-400 hover:text-green-300 transition duration-150"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Check size={20} />
                        </motion.button>
                        <motion.button
                          title="Reject"
                          onClick={() => handleActionClick("reject", mentor.id)}
                          className="text-yellow-400 hover:text-yellow-300 transition duration-150"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <X size={20} />
                        </motion.button>
                      </>
                    )}
                    <motion.button
                      title="Delete"
                      onClick={() => handleActionClick("delete", mentor.id)}
                      className="text-red-400 hover:text-red-300 transition duration-150"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Trash2 size={20} />
                    </motion.button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-400 text-lg">
                  No mentors to display.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmModal && currentAction && (
          <ConfirmationModal
            isOpen={showConfirmModal}
            message={
              currentAction.type === "approve"
                ? "Are you sure you want to approve this mentor?"
                : currentAction.type === "reject"
                ? "Are you sure you want to reject this mentor?"
                : "Are you sure you want to delete this mentor?"
            }
            onConfirm={confirmAction}
            onCancel={cancelAction}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ManageMentors;