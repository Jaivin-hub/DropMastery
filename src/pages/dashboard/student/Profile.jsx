import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit } from 'lucide-react'; // Import the Edit icon
import axios from "../../../api/axios"; // Assuming axios is correctly configured

// Define common styles
const gradientTextStyle = {
  background: 'linear-gradient(to right, #6A67FE, #FE67F6)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent',
};
const darkBgColor = "#1E1E1E";
const darkBorderColor = "#222222";
const darkInputBg = "#2A2A2A"; // Input background
const darkInputDisabledBg = "#1A1A1A"; // Disabled input background

const Profile = () => {
  const [profileImage, setProfileImage] = useState(null); // Stores the File object if a new image is selected
  const [preview, setPreview] = useState(null); // Stores the URL for image preview
  const [isEditing, setIsEditing] = useState(false); // New state to manage edit mode

  const [formData, setFormData] = useState({
    name: '',
    email: 'student@example.com', // Default, will be overwritten by fetched data
    phone: '',
    upi: '',
  });

  const fetchProfileData = async () => {
    const endpoint = '/users/profile'
    const token = localStorage.getItem('authToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Pass token in the Authorization header
      },
    };
    try {
      const { data } = await axios.get(endpoint, config);
      return data;
    } catch (err) {
      console.error('Failed to fetch profile:', err);
      // Handle error, e.g., show a message to the user
      return null;
    }
  };

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchProfileData();
        if (data) {
          setFormData({
            name: data?.name || '',
            email: data?.email || 'student@example.com',
            phone: data?.phone || '',
            upi: data?.upi || '',
          });
          // Use data?.userprofile for the profile picture URL
          if (data?.userprofile) {
            setPreview(data?.userprofile);
          } else {
            // Default avatar if no image is uploaded or fetched
            setPreview("https://img.freepik.com/premium-psd/3d-icon-black-user-avatar_930095-100.jpg?ga=GA1.1.1575405467.1748030386&semt=ais_hybrid&w=740");
          }
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    };

    loadProfile();
  }, []); // Empty dependency array means this runs once on mount

  // Update preview URL when profileImage changes (for newly selected local image)
  useEffect(() => {
    if (profileImage) {
      const objectUrl = URL.createObjectURL(profileImage);
      setPreview(objectUrl);
      // Clean up the object URL when the component unmounts or image changes
      return () => URL.revokeObjectURL(objectUrl);
    }
    // If profileImage is null, do nothing here; the preview should retain the fetched URL or default
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

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let finalProfileImageUrl = preview; // Start with the current preview URL

    // If a new image file is selected, upload it first
    if (profileImage) {
      const imageFormData = new FormData();
      imageFormData.append('image', profileImage); // 'image' should match the field name expected by your upload API

      try {
        const uploadRes = await axios.post('/users/upload', imageFormData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Important for file uploads
          },
        });
        // Assuming your upload API returns the URL in uploadRes.data.imageUrl
        finalProfileImageUrl = uploadRes.data.imageUrl;
      } catch (uploadErr) {
        console.error('Image upload failed:', uploadErr.response?.data || uploadErr.message);
        alert(`Failed to upload profile picture: ${uploadErr.response?.data?.message || uploadErr.message}`);
        return; // Stop execution if image upload fails
      }
    }

    const token = localStorage.getItem('authToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // This header is for the JSON payload
      },
    };

    // Construct the body for the profile update API
    const body = {
      name: formData.name,
      phone: formData.phone,
      upi: formData.upi,
      // IMPORTANT: Use 'userprofile' to match your backend's User model field name
      userprofile: finalProfileImageUrl,
    };

    try {
      const { data } = await axios.put('/users/profile', body, config);
      setIsEditing(false); // Exit edit mode after successful save

      // Re-fetch profile data to ensure UI is in sync with backend
      const updatedData = await fetchProfileData();
      if (updatedData) {
        setFormData({
          name: updatedData?.name || '',
          email: updatedData?.email || 'student@example.com',
          phone: updatedData?.phone || '',
          upi: updatedData?.upi || '',
        });
        // Ensure you're setting the preview from the correct backend field ('userprofile')
        setPreview(updatedData?.userprofile || "https://img.freepik.com/premium-psd/3d-icon-black-user-avatar_930095-100.jpg?ga=GA1.1.1575405467.1748030386&semt=ais_hybrid&w=740");
      }

    } catch (err) {
      console.error('Failed to update profile:', err.response?.data || err.message);
      alert(`Failed to update profile: ${err.response?.data?.message || err.message}`); // Provide user feedback
    }
  };


  return (
    <motion.div
      className="p-8 mx-auto shadow-lg shadow-black/70 rounded-xl border"
      style={{ backgroundColor: darkBgColor, borderColor: darkBorderColor }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-extrabold" style={gradientTextStyle}>Profile</h2>
        {!isEditing && (
          <motion.button
            onClick={handleEditClick}
            className="text-gray-400 hover:text-white transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Edit Profile"
          >
            <Edit size={24} />
          </motion.button>
        )}
      </div>

      {/* Profile Picture Upload */}
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
        <img
          src={
            preview || 'https://img.freepik.com/premium-psd/3d-icon-black-user-avatar_930095-100.jpg?ga=GA1.1.1575405467.1748030386&semt=ais_hybrid&w=740'
          }
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-2 border-gray-700 flex-shrink-0"
        />

        {isEditing && ( // Only show upload option when editing
          <div>
            <label className="block mb-2 text-base font-medium text-gray-300">Upload Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 transition duration-200"
            />
          </div>
        )}
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
              readOnly={!isEditing} // Non-editable unless editing
              className={`mt-1 block w-full px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500 ${isEditing ? `bg-[${darkInputBg}] text-gray-200 border border-[#444444]` : `bg-[${darkInputDisabledBg}] text-gray-400 border border-[#444444] cursor-not-allowed`
                }`}
            />
          </div>

          <div>
            <label className="block text-base font-medium text-gray-300 mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              disabled // Always disabled
              className={`mt-1 block w-full px-4 py-2.5 rounded-lg cursor-not-allowed bg-[${darkInputDisabledBg}] text-gray-500 border border-[#444444]`}
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
              readOnly={!isEditing} // Non-editable unless editing
              className={`mt-1 block w-full px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500 ${isEditing ? `bg-[${darkInputBg}] text-gray-200 border border-[#444444]` : `bg-[${darkInputDisabledBg}] text-gray-400 border border-[#444444] cursor-not-allowed`
                }`}
            />
          </div>
          <div>
            <label className="block text-base font-medium text-gray-300 mb-1">UPI ID or Bank Details</label>
            <input
              type="text"
              name="upi"
              value={formData.upi}
              onChange={handleInputChange}
              placeholder="example@upi or Bank Acc info"
              readOnly={!isEditing} // Non-editable unless editing
              className={`mt-1 block w-full px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500 ${isEditing ? `bg-[${darkInputBg}] text-gray-200 border border-[#444444]` : `bg-[${darkInputDisabledBg}] text-gray-400 border border-[#444444] cursor-not-allowed`
                }`}
            />
          </div>
        </div>

        {/* Submit Button - Only visible when editing */}
        {isEditing && (
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
        )}
      </form>
    </motion.div>
  );
};

export default Profile;
