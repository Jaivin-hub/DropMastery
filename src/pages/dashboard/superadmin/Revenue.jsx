// src/pages/dashboard/superadmin/Revenue.jsx

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Import motion for animations

// Define a common style object for gradient text
const gradientTextStyle = {
  background: 'linear-gradient(to right, #6A67FE, #FE67F6)', // Gradient from your brand
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent', // Fallback
};

// Define common dark background colors and border
const darkBgColor = "#1E1E1E"; // Consistent for main cards
const darkBorderColor = "#222222"; // Consistent border color
const darkTableHeadBg = "#1A1A1A"; // Slightly different for table header
const darkTableCellBorder = "#2A2A2A"; // Darker border for table cells

const Revenue = () => {
  const [revenueData, setRevenueData] = useState({
    totalRevenue: 0,
    platformCut: 0,
    mentorPayouts: 0,
    studentPayouts: 0,
    transactions: [],
  });

  useEffect(() => {
    // Simulate API data
    const data = {
      totalRevenue: 100000,
      platformCut: 10000,
      mentorPayouts: 50000,
      studentPayouts: 40000,
      transactions: [
        {
          id: 1,
          user: "John Doe",
          type: "Student",
          amount: 1200,
          platformFee: 120,
          date: "2025-05-20",
        },
        {
          id: 2,
          user: "Jane Smith",
          type: "Mentor",
          amount: 1500,
          platformFee: 150,
          date: "2025-05-18",
        },
        {
          id: 3,
          user: "Arjun Rao",
          type: "Student",
          amount: 950,
          platformFee: 95,
          date: "2025-05-17",
        },
        {
          id: 4,
          user: "Priya Sharma",
          type: "Mentor",
          amount: 2000,
          platformFee: 200,
          date: "2025-05-15",
        },
        {
          id: 5,
          user: "Amit Kumar",
          type: "Student",
          amount: 700,
          platformFee: 70,
          date: "2025-05-14",
        },
        {
          id: 6,
          user: "Sara Khan",
          type: "Student",
          amount: 1100,
          platformFee: 110,
          date: "2025-05-12",
        },
        {
          id: 7,
          user: "Rahul Singh",
          type: "Mentor",
          amount: 3000,
          platformFee: 300,
          date: "2025-05-10",
        },
      ],
    };

    setRevenueData(data);
  }, []);

  return (
    <motion.div
      className="" // Consistent padding for the overall page content
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2
        className="text-3xl font-extrabold mb-8" // Larger font, bolder, consistent margin
        style={gradientTextStyle} // Apply gradient to the title
      >
        Revenue & Platform Earnings
      </h2>

      {/* Revenue Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"> {/* Increased gap, added lg-cols */}
        {/* Card 1: Total Revenue */}
        <motion.div
          className="p-6 rounded-xl shadow-lg shadow-black/70 border" // Dark background, increased padding/roundness, stronger shadow, border
          style={{ backgroundColor: darkBgColor, borderColor: darkBorderColor }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h4 className="text-base text-gray-400 mb-2">Total Revenue</h4> {/* Adjusted text color and size */}
          <p className="text-3xl font-bold text-green-500">₹{revenueData.totalRevenue.toLocaleString()}</p> {/* Adjusted text size and color for accent */}
        </motion.div>

        {/* Card 2: Platform Earnings */}
        <motion.div
          className="p-6 rounded-xl shadow-lg shadow-black/70 border"
          style={{ backgroundColor: darkBgColor, borderColor: darkBorderColor }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h4 className="text-base text-gray-400 mb-2">Platform Earnings</h4>
          <p className="text-3xl font-bold text-blue-500">₹{revenueData.platformCut.toLocaleString()}</p>
        </motion.div>

        {/* Card 3: Mentor Payouts */}
        <motion.div
          className="p-6 rounded-xl shadow-lg shadow-black/70 border"
          style={{ backgroundColor: darkBgColor, borderColor: darkBorderColor }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <h4 className="text-base text-gray-400 mb-2">Mentor Payouts</h4>
          <p className="text-3xl font-bold text-purple-500">₹{revenueData.mentorPayouts.toLocaleString()}</p>
        </motion.div>

        {/* Card 4: Student Payouts */}
        <motion.div
          className="p-6 rounded-xl shadow-lg shadow-black/70 border"
          style={{ backgroundColor: darkBgColor, borderColor: darkBorderColor }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <h4 className="text-base text-gray-400 mb-2">Student Payouts</h4>
          <p className="text-3xl font-bold text-orange-500">₹{revenueData.studentPayouts.toLocaleString()}</p>
        </motion.div>
      </div>

      {/* Transaction History Section */}
      <motion.div
        className="p-6 rounded-xl shadow-lg shadow-black/70 border"
        style={{ backgroundColor: darkBgColor, borderColor: darkBorderColor }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="text-xl font-bold mb-4 text-gray-200">Transaction History</h3> {/* Adjusted text color and size */}
        <div className="overflow-x-auto custom-scrollbar"> {/* Use overflow-x-auto for horizontal scroll on small screens */}
          <table className="min-w-full border-collapse"> {/* Use border-collapse for cleaner lines */}
            <thead>
              <tr className="text-left text-gray-300 font-semibold text-sm" style={{ backgroundColor: darkTableHeadBg }}> {/* Dark table header background, bold text */}
                <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>#</th>
                <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>User</th>
                <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>Type</th>
                <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>Amount</th>
                <th className="p-3 border-b border-r" style={{ borderColor: darkBorderColor }}>Platform Fee</th>
                <th className="p-3 border-b" style={{ borderColor: darkBorderColor }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {revenueData.transactions.length > 0 ? (
                revenueData.transactions.map((txn, index) => (
                  <tr key={txn.id} className="text-sm text-gray-300 hover:bg-[#2A2A2A] transition-colors duration-200"> {/* Dark text, hover effect */}
                    <td className="p-3 border-b border-r" style={{ borderColor: darkTableCellBorder }}>{index + 1}</td>
                    <td className="p-3 border-b border-r" style={{ borderColor: darkTableCellBorder }}>{txn.user}</td>
                    <td className="p-3 border-b border-r" style={{ borderColor: darkTableCellBorder }}>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        txn.type === 'Student' ? 'bg-blue-900/50 text-blue-300' : 'bg-purple-900/50 text-purple-300'
                      }`}>
                        {txn.type}
                      </span>
                    </td>
                    <td className="p-3 border-b border-r" style={{ borderColor: darkTableCellBorder }}>₹{txn.amount.toLocaleString()}</td>
                    <td className="p-3 border-b border-r text-red-400" style={{ borderColor: darkTableCellBorder }}>₹{txn.platformFee.toLocaleString()}</td> {/* Adjusted red shade */}
                    <td className="p-3 border-b" style={{ borderColor: darkTableCellBorder }}>{txn.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-gray-500">No transactions found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Revenue;