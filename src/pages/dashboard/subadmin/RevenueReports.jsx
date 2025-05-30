import React from "react";
import { motion } from "framer-motion";

// Sample revenue data
const revenueData = [
  { id: 1, date: "2025-08-01", source: "Course Sales", amount: 1200, status: "Completed" },
  { id: 2, date: "2025-08-02", source: "Consulting", amount: 350, status: "Pending" },
  { id: 3, date: "2025-08-03", source: "Live Workshop", amount: 500, status: "Completed" },
  { id: 4, date: "2025-08-04", source: "Affiliate", amount: 150, status: "Completed" },
  { id: 5, date: "2025-08-05", source: "Mentorship Program", amount: 700, status: "Refunded" },
  { id: 6, date: "2025-08-06", source: "Ebook Sales", amount: 250, status: "Completed" },
  { id: 7, date: "2025-08-07", source: "Premium Content", amount: 900, status: "Pending" },
];

// Color constants
const gradientTextStyle = {
  background: "linear-gradient(to right, #6A67FE, #FE67F6)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent",
};

const darkBgCard = "#1E1E1E";
const darkBorderColor = "#222222";
const darkTableHeadBg = "#1A1A1A"; // Consistent with other tables
const darkTableCellBorder = "#2A2A2A"; // Consistent with other tables

const RevenueReport = () => {
  const totalRevenue = revenueData.reduce((sum, item) => item.status === "Completed" ? sum + item.amount : sum, 0);

  // Helper function for status badge classes (consistent with other components)
  const getStatusClasses = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-700/30 text-green-400"; // Adjusted for consistency
      case "Pending":
        return "bg-yellow-700/30 text-yellow-400"; // Adjusted for consistency
      case "Refunded":
        return "bg-red-700/30 text-red-400"; // Adjusted for consistency
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
        Revenue Report
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"> {/* Adjusted grid for better responsiveness */}
        {[
          { title: "Total Revenue (Completed)", value: `₹${totalRevenue.toLocaleString()}` }, // Formatted with locale string
          { title: "Revenue This Month", value: "₹4,500" }, // Dummy data, can be dynamic
          { title: "Revenue Today", value: "₹1,200" }, // Dummy data, can be dynamic
        ].map((card, index) => (
          <motion.div
            key={index}
            className="p-6 rounded-xl border shadow-lg shadow-black/70" // Dark card styling, consistent shadow
            style={{ backgroundColor: darkBgCard, borderColor: darkBorderColor }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }} // Staggered animation
          >
            <p className="text-gray-400 mb-2 text-base">{card.title}</p> {/* Adjusted text size */}
            <h4 className="text-3xl font-bold text-white">{card.value}</h4> {/* Larger, bolder value */}
          </motion.div>
        ))}
      </div>

      {/* Revenue Table */}
      <motion.div
        className="rounded-xl border overflow-x-auto shadow-lg shadow-black/70" // Consistent card styling for table container
        style={{ backgroundColor: darkBgCard, borderColor: darkBorderColor }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <table className="min-w-full border-collapse text-base"> {/* Base font size for table */}
          <thead>
            <tr className="text-left text-gray-300 font-semibold text-sm" style={{ backgroundColor: darkTableHeadBg }}> {/* Dark table header background, bold text */}
              <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>Date</th>
              <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>Source</th>
              <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>Amount (₹)</th>
              <th className="p-3 border-b" style={{ borderColor: darkBorderColor }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {revenueData.map((item, index) => (
              <motion.tr
                key={item.id}
                className="text-sm text-gray-300 hover:bg-[#2A2A2A] transition-colors duration-200" // Dark text, hover effect
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.05 }} // Staggered animation for rows
              >
                <td className="p-3 border-b border-r" style={{ borderColor: darkTableCellBorder }}>{item.date}</td>
                <td className="p-3 border-b border-r" style={{ borderColor: darkTableCellBorder }}>{item.source}</td>
                <td className="p-3 border-b border-r font-semibold text-white" style={{ borderColor: darkTableCellBorder }}>₹{item.amount.toLocaleString()}</td> {/* Formatted amount */}
                <td className="p-3 border-b" style={{ borderColor: darkTableCellBorder }}>
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusClasses(item.status)}`} // Pill-style status badge
                  >
                    {item.status}
                  </span>
                </td>
              </motion.tr>
            ))}
            {revenueData.length === 0 && (
              <tr>
                <td colSpan="4" className="py-6 text-center text-gray-400 text-lg">
                  No revenue data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
};

export default RevenueReport;