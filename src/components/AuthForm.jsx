import React, { useState } from "react";
import { motion } from "framer-motion"; // Import motion for animations

// Define a common style object for gradient text
const gradientTextStyle = {
  background: 'linear-gradient(to right, #6A67FE, #FE67F6)', // Gradient from your brand
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent', // Fallback
};

// Define common dark background colors
const darkBgColor = "#1E1E1E"; // Consistent for main cards
const darkBgColorLighter = "#222222"; // Slightly lighter for elements like inputs

const AuthForm = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [role, setRole] = useState("student");

  return (
    <motion.div
      className="w-full max-w-md mx-auto p-10 rounded-2xl shadow-xl shadow-black/80 border border-[#222222]" // Dark background, increased padding/roundness, stronger shadow
      style={{ backgroundColor: darkBgColor }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
    >
      <h2
        className="text-3xl font-extrabold mb-8 text-center" // Larger font, bolder, increased margin
        style={gradientTextStyle} // Apply gradient to the title
      >
        {isSignup ? "Create Account" : "Welcome Back!"}
      </h2>

      <form className="space-y-6"> {/* Increased spacing */}
        <input
          type="email"
          placeholder="Email"
          className="w-full bg-[#222222] text-gray-200 border border-gray-700 px-5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 transition duration-200" // Dark input styling
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full bg-[#222222] text-gray-200 border border-gray-700 px-5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 transition duration-200" // Dark input styling
        />

        {isSignup && (
          <motion.div
            className="flex justify-around items-center text-gray-300 text-lg gap-4" // Text color, increased spacing
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <label className="flex items-center gap-3 cursor-pointer"> {/* Increased gap for labels */}
              <input
                type="radio"
                name="role"
                value="student"
                checked={role === "student"}
                onChange={() => setRole("student")}
                className="w-5 h-5 text-purple-600 bg-gray-700 border-gray-600 focus:ring-purple-500 transition duration-200" // Styled radio button
              />
              Student
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="mentor"
                checked={role === "mentor"}
                onChange={() => setRole("mentor")}
                className="w-5 h-5 text-purple-600 bg-gray-700 border-gray-600 focus:ring-purple-500 transition duration-200" // Styled radio button
              />
              Mentor
            </label>
          </motion.div>
        )}

        <motion.button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out font-semibold text-lg tracking-wide" // Consistent primary button styling
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSignup ? "Sign Up" : "Login"}
        </motion.button>
      </form>

      <div className="relative my-6 flex items-center justify-center"> {/* Styled "OR" separator */}
        <div className="absolute inset-x-0 h-px bg-gray-700"></div>
        <span className="relative z-10 bg-[#1E1E1E] px-4 text-gray-400 text-sm">OR</span>
      </div>

      <div className="space-y-3"> {/* Increased spacing */}
        <motion.button
          className="w-full border border-gray-700 bg-[#222222] text-gray-300 py-3 rounded-lg hover:bg-[#2A2A2A] transition duration-150 font-medium flex items-center justify-center gap-2" // Dark social button styling
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* You might want to add Google/Facebook/GitHub icons here */}
          Continue with Google
        </motion.button>
        <motion.button
          className="w-full border border-gray-700 bg-[#222222] text-gray-300 py-3 rounded-lg hover:bg-[#2A2A2A] transition duration-150 font-medium flex items-center justify-center gap-2" // Dark social button styling
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Continue with Facebook
        </motion.button>
        <motion.button
          className="w-full border border-gray-700 bg-[#222222] text-gray-300 py-3 rounded-lg hover:bg-[#2A2A2A] transition duration-150 font-medium flex items-center justify-center gap-2" // Dark social button styling
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Continue with GitHub
        </motion.button>
      </div>

      <div className="text-center mt-6"> {/* Increased margin */}
        <motion.button
          onClick={() => setIsSignup(!isSignup)}
          className="text-purple-400 underline text-base hover:text-purple-300 transition duration-200" // Consistent link color, larger text
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSignup
            ? "Already have an account? Login"
            : "Don't have an account? Sign up"}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AuthForm;