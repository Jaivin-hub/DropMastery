import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, CheckCircle, XCircle, MessageSquare, Trash2 } from "lucide-react"; // Icons for actions

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
const darkInputBg = "#2A2A2A"; // Input background

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

// Ticket Detail Modal
const TicketDetailModal = ({ isOpen, onClose, ticket, onUpdateStatus, onReply }) => {
  const [replyText, setReplyText] = useState("");
  const messagesEndRef = React.useRef(null); // Ref for auto-scrolling messages

  // Scroll to the latest message when the modal opens or messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [ticket?.messages]); // Re-scroll when ticket messages change

  if (!isOpen || !ticket) return null;

  const handleSendReply = () => {
    if (replyText.trim()) {
      onReply(ticket.id, replyText);
      setReplyText("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { // Allow Shift+Enter for new line
      e.preventDefault();
      handleSendReply();
    }
  };

  const getStatusClasses = (status) => {
    switch (status) {
      case "Open":
        return "bg-blue-700/30 text-blue-400";
      case "In Progress":
        return "bg-yellow-700/30 text-yellow-400";
      case "Closed":
        return "bg-gray-700/30 text-gray-400";
      default:
        return "bg-gray-700/30 text-gray-400";
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="rounded-xl p-8 w-full max-w-2xl relative shadow-xl shadow-black/90 border border-[#222222] flex flex-col"
        style={{ backgroundColor: darkBgCard, maxHeight: '90vh' }} // Increased max-width, added flex-col and max-height
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
      >
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-2xl font-bold text-gray-200">{ticket.subject}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <XCircle size={28} />
          </button>
        </div>

        <div className="mb-4 text-gray-300">
          <p className="text-lg mb-1">From: <span className="font-semibold">{ticket.user}</span></p>
          <p className="text-sm text-gray-400">Last Update: {ticket.lastUpdate}</p>
          <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-semibold mt-2 ${getStatusClasses(ticket.status)}`}>
            {ticket.status}
          </span>
        </div>

        {/* Messages/Conversation Area */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar" ref={messagesEndRef}>
          {ticket.messages.length > 0 ? (
            ticket.messages.map((msg, index) => (
              <div key={index} className={`p-3 rounded-lg ${msg.sender === 'Admin' ? 'bg-purple-800/30 text-gray-200 self-end' : 'bg-[#2A2A2A] text-gray-300 self-start'} max-w-[85%]`}>
                <p className="font-semibold mb-1">{msg.sender}:</p>
                <p>{msg.text}</p>
                <p className="text-xs text-gray-500 mt-1 text-right">{msg.timestamp}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center py-4">No messages yet.</p>
          )}
        </div>

        {/* Reply Input */}
        <div className="mt-6 flex gap-3 items-center flex-shrink-0">
          <textarea
            className="flex-1 bg-[#2A2A2A] border border-[#444444] text-gray-200 placeholder-gray-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200 resize-y min-h-[40px] max-h-[120px]"
            placeholder="Type your reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
          />
          <motion.button
            onClick={handleSendReply}
            className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageSquare size={20} />
          </motion.button>
        </div>

        {/* Status Update & Close Button */}
        <div className="mt-6 flex justify-end gap-3">
          {ticket.status !== "Closed" && (
            <motion.button
              onClick={() => onUpdateStatus(ticket.id, "Closed")}
              className="bg-red-600 text-white px-5 py-2.5 rounded-lg hover:bg-red-700 transition duration-300 ease-in-out font-medium text-base"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              Close Ticket
            </motion.button>
          )}
          {ticket.status === "Open" && (
            <motion.button
              onClick={() => onUpdateStatus(ticket.id, "In Progress")}
              className="bg-yellow-600 text-white px-5 py-2.5 rounded-lg hover:bg-yellow-700 transition duration-300 ease-in-out font-medium text-base"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              Mark In Progress
            </motion.button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};


const dummyTickets = [
  {
    id: 1,
    subject: "Payment issue with course enrollment",
    user: "Student-Aarav",
    status: "Open",
    lastUpdate: "2025-05-20, 10:30 AM",
    messages: [
      { sender: "Student-Aarav", text: "I tried enrolling in 'Dropshipping Mastery' but the payment failed.", timestamp: "2025-05-20, 10:30 AM" },
      { sender: "Admin", text: "Please provide your transaction ID and a screenshot of the error.", timestamp: "2025-05-20, 10:45 AM" },
    ],
  },
  {
    id: 2,
    subject: "Mentor session scheduling conflict",
    user: "Mentor-Sneha",
    status: "In Progress",
    lastUpdate: "2025-05-18, 02:15 PM",
    messages: [
      { sender: "Mentor-Sneha", text: "My student, Rohan, and I are having trouble finding a common time for our next session.", timestamp: "2025-05-18, 02:15 PM" },
      { sender: "Admin", text: "We'll check both your calendars and suggest some slots. Please bear with us.", timestamp: "2025-05-18, 02:30 PM" },
    ],
  },
  {
    id: 3,
    subject: "Content access problem for 'Shopify 101'",
    user: "Student-Meera",
    status: "Closed",
    lastUpdate: "2025-05-17, 09:00 AM",
    messages: [
      { sender: "Student-Meera", text: "I can't access module 3 of the Shopify 101 course. It says 'locked'.", timestamp: "2025-05-16, 04:00 PM" },
      { sender: "Admin", text: "Apologies! There was a temporary glitch. It should be resolved now. Please try again.", timestamp: "2025-05-17, 08:30 AM" },
      { sender: "Student-Meera", text: "It's working now, thank you!", timestamp: "2025-05-17, 09:00 AM" },
    ],
  },
  {
    id: 4,
    subject: "Feature request: Dark mode for dashboard",
    user: "Student-Rohan",
    status: "Open",
    lastUpdate: "2025-05-21, 01:00 PM",
    messages: [
      { sender: "Student-Rohan", text: "Can we please get a dark mode for the dashboard? My eyes hurt at night!", timestamp: "2025-05-21, 01:00 PM" },
    ],
  },
];

const SupportTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [actionToConfirm, setActionToConfirm] = useState(null); // { type: 'close' | 'delete', id: number }

  useEffect(() => {
    // Simulate fetching tickets
    setTickets(dummyTickets);
  }, []);

  const handleViewDetails = (ticket) => {
    setSelectedTicket(ticket);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedTicket(null);
  };

  const handleUpdateTicketStatus = (id, newStatus) => {
    if (newStatus === "Closed") {
      setActionToConfirm({ type: 'close', id, newStatus });
      setShowConfirmModal(true);
    } else {
      setTickets((prev) =>
        prev.map((ticket) =>
          ticket.id === id ? { ...ticket, status: newStatus, lastUpdate: new Date().toLocaleString() } : ticket
        )
      );
      if (selectedTicket && selectedTicket.id === id) {
        setSelectedTicket((prev) => ({ ...prev, status: newStatus, lastUpdate: new Date().toLocaleString() }));
      }
    }
  };

  const handleConfirmAction = () => {
    const { type, id, newStatus } = actionToConfirm;
    if (type === 'close') {
      setTickets((prev) =>
        prev.map((ticket) =>
          ticket.id === id ? { ...ticket, status: newStatus, lastUpdate: new Date().toLocaleString() } : ticket
        )
      );
      if (selectedTicket && selectedTicket.id === id) {
        setSelectedTicket((prev) => ({ ...prev, status: newStatus, lastUpdate: new Date().toLocaleString() }));
      }
    } else if (type === 'delete') {
      setTickets((prev) => prev.filter(ticket => ticket.id !== id));
    }
    setShowConfirmModal(false);
    setActionToConfirm(null);
  };

  const handleCancelAction = () => {
    setShowConfirmModal(false);
    setActionToConfirm(null);
  };

  const handleReplyToTicket = (id, replyText) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === id
          ? {
              ...ticket,
              messages: [
                ...ticket.messages,
                {
                  sender: "Admin",
                  text: replyText,
                  timestamp: new Date().toLocaleString(),
                },
              ],
              lastUpdate: new Date().toLocaleString(),
              status: ticket.status === "Open" ? "In Progress" : ticket.status // Automatically set to In Progress if Open
            }
          : ticket
      )
    );
    // Also update the selected ticket in the modal if it's the one being replied to
    if (selectedTicket && selectedTicket.id === id) {
      setSelectedTicket((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          {
            sender: "Admin",
            text: replyText,
            timestamp: new Date().toLocaleString(),
          },
        ],
        lastUpdate: new Date().toLocaleString(),
        status: prev.status === "Open" ? "In Progress" : prev.status
      }));
    }
  };

  const handleDeleteTicket = (id) => {
    setActionToConfirm({ type: 'delete', id });
    setShowConfirmModal(true);
  };

  const getStatusClasses = (status) => {
    switch (status) {
      case "Open":
        return "bg-blue-700/30 text-blue-400";
      case "In Progress":
        return "bg-yellow-700/30 text-yellow-400";
      case "Closed":
        return "bg-gray-700/30 text-gray-400";
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
        style={gradientTextStyle} // Apply gradient to the title
      >
        Support Tickets
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
              <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>ID</th>
              <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>Subject</th>
              <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>User</th>
              <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>Status</th>
              <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>Last Update</th>
              <th className="p-3 border-b" style={{ borderColor: darkBorderColor }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.length > 0 ? (
              tickets.map((ticket, index) => (
                <motion.tr
                  key={ticket.id}
                  className="border-t hover:bg-[#2A2A2A] transition-colors duration-200 text-gray-300"
                  style={{ borderColor: darkTableCellBorder }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  <td className="p-3 border-r" style={{ borderColor: darkTableCellBorder }}>{ticket.id}</td>
                  <td className="p-3 border-r" style={{ borderColor: darkTableCellBorder }}>{ticket.subject}</td>
                  <td className="p-3 border-r" style={{ borderColor: darkTableCellBorder }}>{ticket.user}</td>
                  <td className="p-3 border-r" style={{ borderColor: darkTableCellBorder }}>
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusClasses(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="p-3 border-r" style={{ borderColor: darkTableCellBorder }}>{ticket.lastUpdate}</td>
                  <td className="p-3 flex gap-3 items-center">
                    <motion.button
                      title="View Details"
                      onClick={() => handleViewDetails(ticket)}
                      className="text-blue-400 hover:text-blue-300 transition duration-150"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Eye size={20} />
                    </motion.button>
                    {ticket.status !== "Closed" && (
                      <motion.button
                        title="Close Ticket"
                        onClick={() => handleUpdateTicketStatus(ticket.id, "Closed")}
                        className="text-red-400 hover:text-red-300 transition duration-150"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <XCircle size={20} />
                      </motion.button>
                    )}
                    <motion.button
                      title="Delete Ticket"
                      onClick={() => handleDeleteTicket(ticket.id)}
                      className="text-gray-400 hover:text-gray-300 transition duration-150"
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
                <td colSpan="6" className="p-6 text-center text-gray-400 text-lg">
                  No support tickets found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>

      {/* Ticket Detail Modal */}
      <AnimatePresence>
        {showDetailModal && (
          <TicketDetailModal
            isOpen={showDetailModal}
            onClose={handleCloseDetailModal}
            ticket={selectedTicket}
            onUpdateStatus={handleUpdateTicketStatus}
            onReply={handleReplyToTicket}
          />
        )}
      </AnimatePresence>

      {/* Confirmation Modal for actions (Close/Delete) */}
      <AnimatePresence>
        {showConfirmModal && actionToConfirm && (
          <ConfirmationModal
            isOpen={showConfirmModal}
            message={
              actionToConfirm.type === 'close'
                ? "Are you sure you want to close this ticket?"
                : "Are you sure you want to delete this ticket?"
            }
            onConfirm={handleConfirmAction}
            onCancel={handleCancelAction}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SupportTickets;