import React from "react";

// Define a common style object for gradient text
const gradientTextStyle = {
  background: 'linear-gradient(to right, #6A67FE, #FE67F6)', // Gradient from the image
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent', // Fallback
};

const DashboardHome = () => {
  return (
    <div>
      {/* Apply the gradient to the main heading */}
      <h1
        className="text-4xl font-extrabold mb-4"
        style={gradientTextStyle}
      >
        Welcome Back!
      </h1>
      <p className="text-gray-300 mb-6">
        Here’s a quick snapshot of your learning journey:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1E1E1E] p-6 rounded-lg shadow-lg shadow-black/70">
          <h2
            className="font-bold text-lg mb-2" // Removed text-[#96CDD4]
            style={gradientTextStyle} // Apply gradient
          >
            Current Course
          </h2>
          <p className="text-gray-300">“Winning Products Mastery” - 40% complete</p>
        </div>
        <div className="bg-[#1E1E1E] p-6 rounded-lg shadow-lg shadow-black/70">
          <h2
            className="font-bold text-lg mb-2" // Removed text-[#96CDD4]
            style={gradientTextStyle} // Apply gradient
          >
            Upcoming Session
          </h2>
          <p className="text-gray-300">Monday 5PM with John Doe (Mentor)</p>
        </div>
        <div className="bg-[#1E1E1E] p-6 rounded-lg shadow-lg shadow-black/70">
          <h2
            className="font-bold text-lg mb-2" // Removed text-[#96CDD4]
            style={gradientTextStyle} // Apply gradient
          >
            Earnings Shared
          </h2>
          <p className="text-gray-300">$120 from Dropship Bootcamp</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;