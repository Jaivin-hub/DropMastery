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

// Define common dark background colors
const darkBgCard = "#1E1E1E"; // Consistent for main cards
const darkBorderColor = "#222222"; // Consistent border color
const darkInputBg = "#2A2A2A"; // Input background

const MentorProfile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    name: 'Mentor Jane Doe',
    email: 'mentor.jane@example.com', // Read-only for now
    phone: '+91 98765 43210',
    specialization: 'Dropshipping, Facebook Ads, E-commerce SEO',
    bio: 'Experienced e-commerce mentor passionate about helping aspiring entrepreneurs build successful dropshipping businesses from scratch. Specializing in product research, effective marketing strategies, and scaling operations.',
    upi: 'mentorjane@upi',
    coursesTaught: [
      "Dropshipping Mastery: From Zero to Hero",
      "Advanced Facebook Ads for E-commerce",
      "Winning Product Research Strategies",
    ],
  });

  useEffect(() => {
    // Simulate fetching existing profile data
    // In a real app, you'd fetch this from an API
    if (profileImage) {
      setPreview(URL.createObjectURL(profileImage));
    } else {
      // Default avatar if no image is uploaded
      setPreview("https://api.dicebear.com/7.x/personas/svg?seed=MentorProfile&radius=50&backgroundColor=b6e3f4,c0aede,d1d4f9,ffdfbf,ffd5dc&facialHair=none");
    }
  }, [profileImage]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add actual API call to save/update mentor profile
    alert("Mentor profile saved successfully!"); // Use a custom modal in a real app
  };

  return (
    <motion.div
      className="p-8 mx-auto shadow-lg shadow-black/70 rounded-xl border"
      style={{ backgroundColor: darkBgCard, borderColor: darkBorderColor }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2
        className="text-3xl font-extrabold mb-8"
        style={gradientTextStyle}
      >
        My Profile
      </h2>

      {/* Profile Picture Upload */}
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
        <img
          src={preview}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-2 border-gray-700 flex-shrink-0"
        />
        <div>
          <label className="block mb-2 text-base font-medium text-gray-300">Upload Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 transition duration-200"
          />
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-base font-medium text-gray-300 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full bg-[#2A2A2A] text-gray-200 border border-[#444444] px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-base font-medium text-gray-300 mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              disabled
              className="mt-1 block w-full bg-[#1A1A1A] text-gray-500 border border-[#444444] px-4 py-2.5 rounded-lg cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-base font-medium text-gray-300 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full bg-[#2A2A2A] text-gray-200 border border-[#444444] px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-base font-medium text-gray-300 mb-1">Specialization</label>
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleInputChange}
              placeholder="e.g. Dropshipping, Marketing"
              className="mt-1 block w-full bg-[#2A2A2A] text-gray-200 border border-[#444444] px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-base font-medium text-gray-300 mb-1">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows={4}
              className="mt-1 block w-full bg-[#2A2A2A] text-gray-200 border border-[#444444] px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500 resize-y"
              placeholder="Tell us about yourself and your expertise."
            ></textarea>
          </div>

          <div>
            <label className="block text-base font-medium text-gray-300 mb-1">UPI ID or Bank Details</label>
            <input
              type="text"
              name="upi"
              value={formData.upi}
              onChange={handleInputChange}
              placeholder="example@upi or Bank Acc info for payouts"
              className="mt-1 block w-full bg-[#2A2A2A] text-gray-200 border border-[#444444] px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500"
            />
          </div>

          {/* Display Courses Taught (read-only for this page) */}
          <div>
            <label className="block text-base font-medium text-gray-300 mb-1">Courses Taught</label>
            <div className="mt-1 p-2.5 bg-[#1A1A1A] border border-[#444444] rounded-lg text-gray-400 text-sm">
              {formData.coursesTaught.length > 0 ? (
                <ul className="list-disc list-inside space-y-1">
                  {formData.coursesTaught.map((course, index) => (
                    <li key={index}>{course}</li>
                  ))}
                </ul>
              ) : (
                <p>No courses listed yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <motion.button
            type="submit"
            className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out font-semibold text-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            Save Profile
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default MentorProfile;
