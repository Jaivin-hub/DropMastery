import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Import motion for animations

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
const darkBgColorLighter = "#222222"; // Slightly lighter for inputs, etc.
const darkBorderColor = "#222222"; // Consistent border color

const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: 'student@example.com', // Read-only for now
    phone: '',
    address: '',
    upi: '',
    storeName: '',
    preferredCategory: '',
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
    console.log('Uploaded Image:', profileImage);
    // Add actual API call to save/update student profile
    // In a real app, you'd handle file upload to storage (e.g., Firebase Storage)
    // and then save the profile data to Firestore.
    alert("Profile saved successfully!"); // Use a custom modal in a real app
  };

  return (
    <motion.div
      className="p-8 max-w-4xl mx-auto shadow-lg shadow-black/70 rounded-xl border" // Dark background, increased padding/roundness, stronger shadow, border
      style={{ backgroundColor: darkBgColor, borderColor: darkBorderColor }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2
        className="text-3xl font-extrabold mb-8" // Larger font, bolder, increased margin
        style={gradientTextStyle} // Apply gradient to the title
      >
        Store Profile
      </h2>

      {/* Profile Picture Upload */}
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-8"> {/* Adjusted gap and responsiveness */}
        <img
          src={preview || 'https://api.dicebear.com/7.x/personas/svg?seed=Profile&radius=50&backgroundColor=b6e3f4,c0aede,d1d4f9,ffdfbf,ffd5dc&facialHair=none'} // Use DiceBear for placeholder
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-2 border-gray-700 flex-shrink-0" // Darker border, flex-shrink-0
        />
        <div>
          <label className="block mb-2 text-base font-medium text-gray-300">Upload Profile Picture</label> {/* Adjusted text color and size */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 transition duration-200" // Styled file input
          />
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="space-y-6"> {/* Increased spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Increased gap */}
          <div>
            <label className="block text-base font-medium text-gray-300 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full bg-[#222222] text-gray-200 border border-gray-700 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500" // Dark input styling
            />
          </div>

          <div>
            <label className="block text-base font-medium text-gray-300 mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              disabled
              className="mt-1 block w-full bg-[#1A1A1A] text-gray-500 border border-gray-700 px-4 py-2.5 rounded-lg cursor-not-allowed" // Dark disabled input styling
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
              className="mt-1 block w-full bg-[#222222] text-gray-200 border border-gray-700 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500" // Dark input styling
            />
          </div>

          <div>
            <label className="block text-base font-medium text-gray-300 mb-1">Store Name</label>
            <input
              type="text"
              name="storeName"
              value={formData.storeName}
              onChange={handleInputChange}
              placeholder="e.g. Airdrop Sneakers"
              className="mt-1 block w-full bg-[#222222] text-gray-200 border border-gray-700 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500" // Dark input styling
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-base font-medium text-gray-300 mb-1">Shipping Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows={3}
              className="mt-1 block w-full bg-[#222222] text-gray-200 border border-gray-700 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500 resize-y" // Dark textarea styling, added resize-y
              placeholder="Full address for order deliveries"
            ></textarea>
          </div>

          <div>
            <label className="block text-base font-medium text-gray-300 mb-1">UPI ID or Bank Details</label>
            <input
              type="text"
              name="upi"
              value={formData.upi}
              onChange={handleInputChange}
              placeholder="example@upi or Bank Acc info"
              className="mt-1 block w-full bg-[#222222] text-gray-200 border border-gray-700 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500" // Dark input styling
            />
          </div>

          <div>
            <label className="block text-base font-medium text-gray-300 mb-1">Preferred Product Category</label>
            <select
              name="preferredCategory"
              value={formData.preferredCategory}
              onChange={handleInputChange}
              className="mt-1 block w-full bg-[#222222] text-gray-200 border border-gray-700 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none cursor-pointer" // Dark select styling
            >
              <option value="" className="bg-[#121212] text-gray-300">Select Category</option> {/* Dark option styling */}
              <option value="Footwear" className="bg-[#121212] text-gray-300">Footwear</option>
              <option value="Watches" className="bg-[#121212] text-gray-300">Watches</option>
              <option value="Dresses" className="bg-[#121212] text-gray-300">Dresses</option>
              <option value="Gadgets" className="bg-[#121212] text-gray-300">Gadgets</option>
              <option value="Accessories" className="bg-[#121212] text-gray-300">Accessories</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6"> {/* Increased padding top */}
          <motion.button
            type="submit"
            className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out font-semibold text-lg" // Consistent primary button styling
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

export default Profile;