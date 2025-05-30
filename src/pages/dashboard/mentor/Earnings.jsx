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
const darkBgCard = "#1E1E1E"; // Consistent for main cards
const darkBorderColor = "#222222"; // Consistent border color
const darkTableHeadBg = "#1A1A1A"; // Slightly different for table header
const darkTableCellBorder = "#2A2A2A"; // Darker border for table cells

const dummyEarningsData = {
  totalEarnings: 125000, // Total earnings over time
  availableForPayout: 15000, // Earnings ready to be withdrawn
  pendingEarnings: 5000, // Earnings from recent sales, not yet cleared
  payoutHistory: [
    { id: 1, date: "2025-05-01", amount: 25000, status: "Completed", source: "Monthly Payout" },
    { id: 2, date: "2025-04-15", amount: 10000, status: "Completed", source: "Course Sales" },
    { id: 3, date: "2025-03-20", amount: 30000, status: "Completed", source: "Monthly Payout" },
    { id: 4, date: "2025-02-05", amount: 12000, status: "Completed", source: "Live Sessions" },
    { id: 5, date: "2025-01-10", amount: 18000, status: "Completed", source: "Monthly Payout" },
    { id: 6, date: "2024-12-25", amount: 8000, status: "Completed", source: "Course Sales" },
  ],
};

const Earnings = () => {
  const [earnings, setEarnings] = useState({
    totalEarnings: 0,
    availableForPayout: 0,
    pendingEarnings: 0,
    payoutHistory: [],
  });

  useEffect(() => {
    // Simulate fetching earnings data
    setEarnings(dummyEarningsData);
  }, []);

  // Function to determine status badge color
  const getStatusClasses = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-700/30 text-green-400";
      case "Pending":
        return "bg-yellow-700/30 text-yellow-400";
      case "Failed":
        return "bg-red-700/30 text-red-400";
      default:
        return "bg-gray-700/30 text-gray-400";
    }
  };

  const handleWithdraw = () => {
    alert(`Initiating withdrawal of ₹${earnings.availableForPayout.toLocaleString()}. (This is a simulation)`);
    // In a real app, this would trigger an API call for withdrawal
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
        My Earnings
      </h2>

      {/* Earnings Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          className="p-6 rounded-xl border shadow-lg shadow-black/70"
          style={{ backgroundColor: darkBgCard, borderColor: darkBorderColor }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <p className="text-gray-400 mb-2 text-base">Total Earnings</p>
          <h4 className="text-3xl font-bold text-green-400">₹{earnings.totalEarnings.toLocaleString()}</h4>
        </motion.div>

        <motion.div
          className="p-6 rounded-xl border shadow-lg shadow-black/70"
          style={{ backgroundColor: darkBgCard, borderColor: darkBorderColor }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <p className="text-gray-400 mb-2 text-base">Available for Payout</p>
          <h4 className="text-3xl font-bold text-blue-400">₹{earnings.availableForPayout.toLocaleString()}</h4>
          <motion.button
            onClick={handleWithdraw}
            className="mt-4 bg-purple-600 text-white px-5 py-2.5 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out font-medium text-base w-full"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            Withdraw Now
          </motion.button>
        </motion.div>

        <motion.div
          className="p-6 rounded-xl border shadow-lg shadow-black/70"
          style={{ backgroundColor: darkBgCard, borderColor: darkBorderColor }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <p className="text-gray-400 mb-2 text-base">Pending Earnings</p>
          <h4 className="text-3xl font-bold text-yellow-400">₹{earnings.pendingEarnings.toLocaleString()}</h4>
          <p className="text-sm text-gray-500 mt-2">Will be available after clearance.</p>
        </motion.div>
      </div>

      {/* Payout History Table */}
      <motion.div
        className="rounded-xl border overflow-x-auto shadow-lg shadow-black/70"
        style={{ backgroundColor: darkBgCard, borderColor: darkBorderColor }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <h3 className="text-xl font-bold text-gray-200 p-6 border-b" style={{ borderColor: darkBorderColor }}>Payout History</h3>
        <table className="min-w-full border-collapse text-base">
          <thead>
            <tr className="text-left text-gray-300 font-semibold text-sm" style={{ backgroundColor: darkTableHeadBg }}>
              <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>Date</th>
              <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>Amount (₹)</th>
              <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>Source</th>
              <th className="p-3 border-b" style={{ borderColor: darkBorderColor }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {earnings.payoutHistory.length > 0 ? (
              earnings.payoutHistory.map((item, index) => (
                <motion.tr
                  key={item.id}
                  className="border-t hover:bg-[#2A2A2A] transition-colors duration-200 text-gray-300"
                  style={{ borderColor: darkTableCellBorder }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                >
                  <td className="p-3 border-r" style={{ borderColor: darkTableCellBorder }}>{item.date}</td>
                  <td className="p-3 border-r font-semibold text-white" style={{ borderColor: darkTableCellBorder }}>₹{item.amount.toLocaleString()}</td>
                  <td className="p-3 border-r" style={{ borderColor: darkTableCellBorder }}>{item.source}</td>
                  <td className="p-3" style={{ borderColor: darkTableCellBorder }}>
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusClasses(item.status)}`}
                    >
                      {item.status}
                    </span>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-400 text-lg">
                  No payout history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
};

export default Earnings;
