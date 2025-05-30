import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const gradientTextStyle = {
    background: 'linear-gradient(to right, #6A67FE, #FE67F6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: 'transparent',
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-[#121212] text-gray-300 p-4 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-9xl font-extrabold mb-4"
        style={gradientTextStyle}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
      >
        404
      </motion.h1>
      <motion.p
        className="text-4xl font-semibold mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Page Not Found
      </motion.p>
      <motion.p
        className="text-lg text-gray-400 mb-8 max-w-md"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Oops! The page you're looking for doesn't exist or has been moved.
      </motion.p>
      <Link to="/">
        <motion.button
          className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out font-semibold text-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Go to Homepage
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default NotFound;
