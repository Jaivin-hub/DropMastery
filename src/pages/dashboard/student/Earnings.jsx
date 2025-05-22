import React, { useState } from "react";
import { motion } from "framer-motion";
import { Wallet, Clock, Banknote, CalendarDays, ArrowDownToLine } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Define a common style object for gradient text
const gradientTextStyle = {
  background: 'linear-gradient(to right, #6A67FE, #FE67F6)', // Gradient from the image
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent', // Fallback
};

// Define common dark background colors
const darkBgColor = "#1E1E1E"; // Consistent for main cards
const darkBgColorLighter = "#222222"; // Slightly lighter for internal elements like inputs, table headers

const earningsData = {
  totalEarnings: 785.50,
  pending: 120.00,
  withdrawn: 665.50,
  transactions: [
    { id: 1, date: "2025-08-01", type: "Referral Bonus", amount: 50.0, status: "Completed", month: "August" },
    { id: 2, date: "2025-08-02", type: "Course Sale Commission", amount: 70.0, status: "Pending", month: "August" },
    { id: 3, date: "2025-07-15", type: "Mentor Session Cut", amount: 20.0, status: "Completed", month: "July" },
    { id: 4, date: "2025-08-04", type: "Affiliate Payout", amount: 105.0, status: "Completed", month: "August" },
    { id: 5, date: "2025-06-20", type: "Withdrawal", amount: -100.0, status: "Completed", month: "June" }, // Example withdrawal
    { id: 6, date: "2025-08-06", type: "New Course Bonus", amount: 150.0, status: "Pending", month: "August" },
    { id: 7, date: "2025-05-10", type: "Referral Bonus", amount: 30.0, status: "Completed", month: "May" },
    { id: 8, date: "2025-04-05", type: "Course Sale Commission", amount: 80.0, status: "Completed", month: "April" },
  ],
};

const chartData = [
  { month: "April", earnings: 80 },
  { month: "May", earnings: 110 }, // 80 (April) + 30 (May) = 110
  { month: "June", earnings: 150 }, // 110 + 40 (hypothetical) = 150 - 100 (withdrawal) = 50. Let's adjust this to make more sense for actual monthly earnings.
  // Re-calculating chart data to reflect net monthly earnings for a more realistic chart
  // This would typically come from backend
  { month: "April", earnings: 80 }, // Only one transaction for April: 80
  { month: "May", earnings: 30 }, // Only one transaction for May: 30
  { month: "June", earnings: -100 }, // Only one transaction for June: -100 (withdrawal)
  { month: "July", earnings: 20 }, // Only one transaction for July: 20
  { month: "August", earnings: 375 }, // 50+70+105+150 = 375
];


const months = ["All", "August", "July", "June", "May", "April"];

// Custom Tooltip for Recharts
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#2A2A2A] p-3 rounded-lg shadow-xl border border-gray-700 text-gray-200 text-sm">
        <p className="font-semibold text-purple-400 mb-1">{`Month: ${label}`}</p>
        <p className="text-gray-300">{`Earnings: ₹${payload[0].value.toFixed(2)}`}</p>
      </div>
    );
  }
  return null;
};


const Earnings = () => {
  const [selectedMonth, setSelectedMonth] = useState("All");

  const filteredTransactions =
    selectedMonth === "All"
      ? earningsData.transactions
      : earningsData.transactions.filter((txn) => txn.month === selectedMonth);

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"> {/* Adjusted spacing and alignment */}
        <h2
          className="text-4xl font-extrabold" // Increased font size and boldness
          style={gradientTextStyle}
        >
          💰 My Earnings
        </h2>
        <motion.button
          className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out font-medium text-lg" // Consistent primary button styling
          onClick={() => alert("Withdraw request sent!")}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <ArrowDownToLine size={20} /> {/* Lucide icon with explicit size */}
          Request Withdraw
        </motion.button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"> {/* Adjusted gap and breakpoint */}
        {/* Total Earnings Card */}
        <motion.div
          className="shadow-lg shadow-black/70 rounded-xl p-6 border border-[#222222]" // Consistent card styling
          style={{ backgroundColor: darkBgColor }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center gap-4 mb-2"> {/* Increased gap */}
            <Wallet className="text-purple-400" size={32} /> {/* Using Lucide icon with explicit size */}
            <h4 className="text-xl font-bold text-gray-200">Total Earnings</h4> {/* Adjusted text color and size */}
          </div>
          <p
            className="mt-3 text-3xl font-extrabold" // Increased text size and boldness
            style={gradientTextStyle} // Apply gradient to the amount
          >
            ₹{earningsData.totalEarnings.toFixed(2)}
          </p>
        </motion.div>

        {/* Pending Card */}
        <motion.div
          className="shadow-lg shadow-black/70 rounded-xl p-6 border border-[#222222]"
          style={{ backgroundColor: darkBgColor }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-4 mb-2">
            <Clock className="text-yellow-400" size={32} /> {/* Using Lucide icon with explicit size */}
            <h4 className="text-xl font-bold text-gray-200">Pending</h4>
          </div>
          <p className="mt-3 text-3xl font-extrabold text-yellow-400"> {/* Adjusted text color and size */}
            ₹{earningsData.pending.toFixed(2)}
          </p>
        </motion.div>

        {/* Withdrawn Card */}
        <motion.div
          className="shadow-lg shadow-black/70 rounded-xl p-6 border border-[#222222]"
          style={{ backgroundColor: darkBgColor }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center gap-4 mb-2">
            <Banknote className="text-green-400" size={32} /> {/* Using Lucide icon with explicit size */}
            <h4 className="text-xl font-bold text-gray-200">Withdrawn</h4>
          </div>
          <p className="mt-3 text-3xl font-extrabold text-green-400"> {/* Adjusted text color and size */}
            ₹{earningsData.withdrawn.toFixed(2)}
          </p>
        </motion.div>
      </div>

      {/* Chart */}
      <motion.div
        className="shadow-lg shadow-black/70 rounded-xl p-7 mb-8 border border-[#222222]"
        style={{ backgroundColor: darkBgColor }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h3
          className="text-2xl font-bold mb-6" // Adjusted font size and margin
          style={gradientTextStyle}
        >
          Monthly Earnings Overview
        </h3>
        <ResponsiveContainer width="100%" height={280}> {/* Increased height for better visibility */}
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <XAxis dataKey="month" stroke="#888888" tickLine={false} axisLine={false} style={{ fontSize: '14px' }} /> {/* Darker stroke, removed lines, adjusted font */}
            <YAxis stroke="#888888" tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} style={{ fontSize: '14px' }} /> {/* Darker stroke, removed lines, added formatter */}
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#555555', strokeWidth: 1 }} /> {/* Custom tooltip, dark cursor */}
            <Line
              type="monotone"
              dataKey="earnings"
              stroke="#6A67FE" // Gradient-matching color
              strokeWidth={3}
              dot={{ stroke: '#FE67F6', strokeWidth: 2, r: 4 }} // Gradient-matching dot color
              activeDot={{ r: 6, stroke: '#FE67F6', strokeWidth: 3 }} // Larger active dot
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Transactions Table */}
      <motion.div
        className="shadow-lg shadow-black/70 rounded-xl p-7 border border-[#222222]" // Consistent card styling, increased padding
        style={{ backgroundColor: darkBgColor }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4"> {/* Adjusted spacing and alignment */}
          <h3
            className="text-2xl font-bold" // Adjusted font size and boldness
            style={gradientTextStyle}
          >
            Transaction History
          </h3>
          <div className="flex items-center gap-3"> {/* Increased gap */}
            <CalendarDays className="text-gray-400" size={24} /> {/* Lucide icon with explicit size */}
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-[#222222] text-gray-300 border border-gray-700 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 appearance-none cursor-pointer" // Consistent select styling
            >
              {months.map((m) => (
                <option key={m} value={m} className="bg-[#121212] text-gray-300"> {/* Dark background for options */}
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar"> {/* Added custom-scrollbar class */}
          <table className="w-full table-auto text-base"> {/* Adjusted font size */}
            <thead>
              <tr className="bg-[#222222] text-left text-gray-300 rounded-lg"> {/* Darker background for header */}
                <th className="px-5 py-3 font-semibold rounded-tl-lg">Date</th> {/* Adjusted padding, font, roundness */}
                <th className="px-5 py-3 font-semibold">Type</th>
                <th className="px-5 py-3 font-semibold">Amount</th>
                <th className="px-5 py-3 font-semibold rounded-tr-lg">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((txn, index) => (
                <motion.tr
                  key={txn.id}
                  className="border-b border-gray-700 text-gray-200 hover:bg-[#2A2A2A] transition duration-150" // Dark border, text color, hover effect
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                >
                  <td className="px-5 py-3">{txn.date}</td> {/* Adjusted padding */}
                  <td className="px-5 py-3">{txn.type}</td>
                  <td
                    className={`px-5 py-3 font-semibold ${
                      txn.amount >= 0 ? "text-green-400" : "text-red-400" // Color based on positive/negative amount
                    }`}
                  >
                    ₹{txn.amount.toFixed(2)}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`px-2.5 py-1.5 rounded-full text-xs font-semibold ${ // Pill-style status
                        txn.status === "Completed"
                          ? "bg-green-700/30 text-green-400"
                          : "bg-yellow-700/30 text-yellow-400"
                      }`}
                    >
                      {txn.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-5 py-4 text-center text-gray-400"> {/* Adjusted padding and text color */}
                    No transactions found for {selectedMonth}.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Earnings;