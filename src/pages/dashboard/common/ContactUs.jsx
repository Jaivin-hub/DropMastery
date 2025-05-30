import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle, XCircle } from "lucide-react";

// Define common styles
const gradientTextStyle = {
  background: 'linear-gradient(to right, #6A67FE, #FE67F6)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent',
};
const darkBgColor = "#121212"; // Main background
const darkCardBg = "#1E1E1E"; // Card background
const darkBorderColor = "#222222"; // Border color
const darkInputBg = "#2A2A2A"; // Input background

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null); // Clear previous status

    // In a real application, you would send this data to your backend API

    // Simulate API call
    try {
      // Replace with actual axios.post('/api/contact-form', formData);
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay

      // Simulate success or error based on some condition or randomly
      if (Math.random() > 0.1) { // 90% chance of success
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form on success
      } else {
        throw new Error("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000); // Hide status message after 5 seconds
    }
  };

  return (
    <motion.div
      className="min-h-screen p-8 flex flex-col items-center justify-center"
      style={{ backgroundColor: darkBgColor }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-4xl font-extrabold mb-6 text-center"
        style={gradientTextStyle}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Get in Touch
      </motion.h1>

      <motion.p
        className="text-lg text-gray-300 text-center max-w-2xl mx-auto mb-12"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Have questions, feedback, or just want to say hello? Fill out the form below or reach us directly. We'd love to hear from you!
      </motion.p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl">
        {/* Contact Information Section */}
        <motion.div
          className="bg-[#1E1E1E] rounded-xl shadow-lg shadow-black/60 border border-[#222222] p-8 flex flex-col justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-gray-200 mb-6" style={gradientTextStyle}>
            Our Contact Details
          </h2>
          <div className="space-y-6 text-gray-300 text-lg">
            <div className="flex items-center gap-4">
              <Mail size={28} className="text-purple-400 flex-shrink-0" />
              <div>
                <p className="font-semibold">Email Us:</p>
                <a href="mailto:support@dropmastery.com" className="hover:underline text-blue-400">support@dropmastery.com</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Phone size={28} className="text-purple-400 flex-shrink-0" />
              <div>
                <p className="font-semibold">Call Us:</p>
                <a href="tel:+911234567890" className="hover:underline text-blue-400">+91 12345 67890</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin size={28} className="text-purple-400 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold">Visit Our Office:</p>
                <p>DropMastery HQ,</p>
                <p>123 E-commerce Lane,</p>
                <p>Digital City, 689001,</p>
                <p>India</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form Section */}
        <motion.div
          className="bg-[#1E1E1E] rounded-xl shadow-lg shadow-black/60 border border-[#222222] p-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-200 mb-6" style={gradientTextStyle}>
            Send Us a Message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-gray-400 text-sm font-semibold mb-2">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-[#2A2A2A] text-gray-200 border border-gray-700 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500"
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-400 text-sm font-semibold mb-2">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-[#2A2A2A] text-gray-200 border border-gray-700 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-gray-400 text-sm font-semibold mb-2">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full bg-[#2A2A2A] text-gray-200 border border-gray-700 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500"
                placeholder="Inquiry about courses, partnership, etc."
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-400 text-sm font-semibold mb-2">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="5"
                className="w-full bg-[#2A2A2A] text-gray-200 border border-gray-700 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 resize-y"
                placeholder="Type your message here..."
                required
              ></textarea>
            </div>
            <motion.button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out font-semibold text-lg flex items-center justify-center gap-2 shadow-md shadow-purple-500/30"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <Send size={20} /> Send Message
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* Submission Status Notification */}
      <AnimatePresence>
        {submitStatus && (
          <motion.div
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-xl flex items-center gap-2 z-50 ${
              submitStatus === 'success' ? 'bg-green-700 text-white border border-green-500' : 'bg-red-700 text-white border border-red-500'
            }`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            {submitStatus === 'success' ? <CheckCircle size={20} /> : <XCircle size={20} />}
            {submitStatus === 'success' ? 'Message sent successfully!' : 'Failed to send message. Please try again.'}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ContactUs;
