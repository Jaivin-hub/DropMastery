// src/pages/Auth.jsx
import React from "react";
import { motion } from "framer-motion"; // Import motion for page transitions
import AuthForm from "../components/AuthForm";

const Auth = () => {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#121212" }} // Set the background to the dark theme color
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AuthForm />
    </motion.div>
  );
};

export default Auth;