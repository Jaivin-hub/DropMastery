// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

// const gradientTextStyle = {
//   background: 'linear-gradient(to right, #6A67FE, #FE67F6)',
//   WebkitBackgroundClip: 'text',
//   WebkitTextFillColor: 'transparent',
//   backgroundClip: 'text',
//   color: 'transparent',
// };

// const Announcement = () => {
//   const [items, setItems] = useState([
//     { id: 'item-1', content: 'Announcement Card 1' },
//     { id: 'item-2', content: 'Announcement Card 2' },
//     { id: 'item-3', content: 'Announcement Card 3' },
//     { id: 'item-4', content: 'Announcement Card 4' },
//     { id: 'item-5', content: 'Announcement Card 5' },
//     { id: 'item-6', content: 'Announcement Card 6' },
//   ]);

//   const onDragEnd = (result) => {
//     if (!result.destination) return;
//     const newItems = Array.from(items);
//     const [movedItem] = newItems.splice(result.source.index, 1);
//     newItems.splice(result.destination.index, 0, movedItem);
//     setItems(newItems);
//   };

//   return (
//     <div className="">
//       <motion.div
//         key="announcement-page"
//         className="p-8 rounded-xl shadow-lg shadow-black/70 border border-[#222222] bg-[#222222] min-h-[calc(100vh-100px)]"
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -50 }}
//         transition={{ duration: 0.3 }}
//       >
//         <h2 className="text-3xl font-bold text-gray-200 mb-7 flex items-center gap-3" style={gradientTextStyle}>
//           <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-megaphone"><path d="m3 11 18-2v7l-18 2v-7z" /><path d="M7 5v12" /><path d="M11 5v12" /><path d="M15 5v12" /></svg>
//           Announcement Settings (Drag Test)
//         </h2>

//         <p className="text-gray-400 mb-6">
//           Drag these dummy cards to test the drag-and-drop smoothness.
//           The entire card is draggable.
//         </p>

//         <DragDropContext onDragEnd={onDragEnd}>
//           <Droppable droppableId="announcement-cards">
//             {(provided) => (
//               <div
//                 {...provided.droppableProps}
//                 ref={provided.innerRef}
//                 className="space-y-4 p-4 rounded-lg bg-[#1F1F1F] border border-gray-700 max-h-[400px] overflow-y-auto"
//               >
//                 {items.map((item, index) => (
//                   <Draggable key={item.id} draggableId={item.id} index={index}>
//                     {(provided, snapshot) => {
//                       const isDragging = snapshot.isDragging;
//                       return (
//                         <div
//                           ref={provided.innerRef}
//                           {...provided.draggableProps}
//                           {...provided.dragHandleProps}
//                           className={`p-5 rounded-lg border text-gray-200 relative cursor-grab ${
//                             isDragging
//                               ? "bg-[#3B3B3B] border-gray-600 shadow-xl"
//                               : "bg-[#2A2A2A] border-gray-800 shadow-md"
//                           }`}
//                           style={{
//                             ...provided.draggableProps.style,
//                             transition: isDragging ? "none" : "background 0.2s ease",
//                           }}
//                         >
//                           {item.content}
//                         </div>
//                       );
//                     }}
//                   </Draggable>
//                 ))}
//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>
//         </DragDropContext>
//       </motion.div>
//     </div>
//   );
// };

// export default Announcement;


// src/pages/dashboard/superadmin/Announcement.jsx

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from 'react-toastify';
import axios from "../../../api/axios"; // Ensure this axios instance is configured with your base URL

// Define a common style object for gradient text
const gradientTextStyle = {
  background: 'linear-gradient(to right, #6A67FE, #FE67F6)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent',
};

// Define common dark background colors and border
const darkBgColor = "#1E1E1E";
const darkBorderColor = "#222222";

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // States for poster settings in the creation form
  const [isPosterCreate, setIsPosterCreate] = useState(false);
  const [posterUntilCreate, setPosterUntilCreate] = useState('');
  const [targetAudienceCreate, setTargetAudienceCreate] = useState('all');

  // States for image upload
  const [posterImageFile, setPosterImageFile] = useState(null);
  const [posterImageUrlCreate, setPosterImageUrlCreate] = useState('');
  const [posterImagePreview, setPosterImagePreview] = useState(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const [posterButtonText, setPosterButtonText] = useState('');
  const [posterButtonUrl, setPosterButtonUrl] = useState('');

  // --- Fetch Announcements on component mount ---
  useEffect(() => {
    const fetchAnnouncements = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('/announcements', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        // FIX: Ensure response.data.announcements is always an array
        setAnnouncements(response.data.announcements || []); 
      } catch (err) {
        console.error("Failed to fetch announcements:", err);
        const errorMessage = err.response?.data?.message || err.message || "Failed to load announcements.";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  // --- Handle Image File Selection and Upload ---
  const handleImageFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      setPosterImageFile(null);
      setPosterImagePreview(null);
      setPosterImageUrlCreate('');
      return;
    }

    if (!file.type.startsWith('image/')) {
        toast.error("Please select an image file.");
        setPosterImageFile(null);
        setPosterImagePreview(null);
        setPosterImageUrlCreate('');
        e.target.value = '';
        return;
    }

    setPosterImageFile(file);
    setPosterImagePreview(URL.createObjectURL(file));
    setIsUploadingImage(true);

    const imageFormData = new FormData();
    imageFormData.append('image', file);

    try {
      const uploadRes = await axios.post('/announcements/upload', imageFormData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setPosterImageUrlCreate(uploadRes.data.imageUrl);
      toast.success("Image uploaded successfully!");
    } catch (uploadErr) {
      console.error('Image upload failed:', uploadErr.response?.data || uploadErr.message);
      const errorMessage = uploadErr.response?.data?.message || uploadErr.message || "Error uploading image.";
      toast.error(`Failed to upload image: ${errorMessage}`);
      setPosterImageFile(null);
      setPosterImagePreview(null);
      setPosterImageUrlCreate('');
      e.target.value = '';
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleClearImage = () => {
    setPosterImageFile(null);
    setPosterImagePreview(null);
    setPosterImageUrlCreate('');
    const fileInput = document.getElementById('posterImageFile');
    if (fileInput) fileInput.value = '';
  };

  // --- Handle Announcement Submission (Create) ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Title and message are now optional
    if (!title.trim() && !message.trim() && !isPosterCreate) {
        toast.warn("Please provide either a title/message or select 'Display as Homepage Poster'.");
        return;
    }

    // Validation: If Button Text exists, Button URL is required
    if (posterButtonText.trim() && !posterButtonUrl.trim()) {
        toast.warn("If 'Button Text' is provided, 'Button URL' is required.");
        return;
    }

    if (isUploadingImage) {
        toast.info("Please wait for the image to finish uploading before posting the announcement.");
        return;
    }

    try {
      const payload = {
        title: title.trim() || null, // Make title optional
        message: message.trim() || null, // Make message optional
        isPoster: isPosterCreate,
      };

      // Only include poster-specific fields if isPosterCreate is true
      // OR if any of the poster fields actually have content
      // This prevents sending empty poster fields if the user didn't intend to make it a poster
      const hasPosterContent = posterUntilCreate || targetAudienceCreate !== 'all' || posterImageUrlCreate || posterButtonText || posterButtonUrl;

      if (isPosterCreate || hasPosterContent) {
        payload.posterUntil = posterUntilCreate ? new Date(posterUntilCreate).toISOString() : null;
        payload.targetAudience = targetAudienceCreate;
        payload.imageUrl = posterImageUrlCreate.trim() || null;
        payload.buttonText = posterButtonText.trim() || null;
        payload.buttonUrl = posterButtonUrl.trim() || null;
      }

      const response = await axios.post('/announcements', payload, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
      });

      // Ensure announcements is an array before spreading
      setAnnouncements([response.data.announcement, ...(announcements || [])]);
      setTitle("");
      setMessage("");
      setIsPosterCreate(false); // Reset checkbox for new announcement form
      setPosterUntilCreate('');
      setTargetAudienceCreate('all');
      setPosterImageFile(null);
      setPosterImageUrlCreate('');
      setPosterImagePreview(null);
      setPosterButtonText('');
      setPosterButtonUrl('');
      toast.success("Announcement posted successfully!");
    } catch (err) {
      console.error("Failed to post announcement:", err);
      const errorMessage = err.response?.data?.message || err.message || "Error posting announcement.";
      toast.error(errorMessage);
    }
  };

  // --- Handle Announcement Deletion ---
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this announcement?")) {
      return;
    }

    try {
      await axios.delete(`/announcements/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      const updated = (announcements || []).filter((a) => a._id !== id);
      setAnnouncements(updated);
      toast.success("Announcement deleted successfully!");
    } catch (err) {
      console.error("Failed to delete announcement:", err);
      const errorMessage = err.response?.data?.message || err.message || "Error deleting announcement.";
      toast.error(errorMessage);
    }
  };

  // --- Handle Publish/Unpublish for existing announcements ---
  const handleTogglePublish = async (announcement) => {
    try {
      const newIsPoster = !announcement.isPoster;
      let payload = { isPoster: newIsPoster };

      if (newIsPoster) {
        const now = new Date();
        const oneWeekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        payload.posterUntil = announcement.posterUntil && new Date(announcement.posterUntil) > now
                              ? announcement.posterUntil : oneWeekFromNow.toISOString();
        payload.targetAudience = announcement.targetAudience || 'all';
        payload.imageUrl = announcement.imageUrl || null;
        payload.buttonText = announcement.buttonText || null;
        payload.buttonUrl = announcement.buttonUrl || null;
      } else {
        payload.posterUntil = null;
        payload.targetAudience = 'all';
        payload.imageUrl = null;
        payload.buttonText = null;
        payload.buttonUrl = null;
      }

      const response = await axios.patch(`/announcements/${announcement._id}`, payload, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
      });

      setAnnouncements((announcements || []).map(ann =>
        ann._id === announcement._id ? response.data.announcement : ann
      ));

      toast.success(newIsPoster ? "Announcement published as poster!" : "Announcement unpublished from poster!");
      if (newIsPoster) {
          localStorage.removeItem(`dismissed_announcement_${announcement._id}`);
      }
    } catch (err) {
      console.error("Failed to toggle publish status:", err);
      const errorMessage = err.response?.data?.message || err.message || "Error toggling publish status.";
      toast.error(errorMessage);
    }
  };


  if (loading) {
    return (
      <motion.div
        className="p-8 text-center text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-lg">Loading announcements...</p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="p-8 text-center text-red-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-lg">{error}</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2
        className="text-3xl font-extrabold mb-8"
        style={gradientTextStyle}
      >
        Post New Announcement
      </h2>

      {/* Announcement Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="p-6 rounded-xl shadow-lg shadow-black/70 border mb-8 space-y-6"
        style={{ backgroundColor: darkBgColor, borderColor: darkBorderColor }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {/* Core Announcement Fields */}
        <div>
          <label htmlFor="title" className="block text-gray-300 text-sm font-medium mb-2">Announcement Title (Optional):</label>
          <input
            type="text"
            id="title"
            placeholder="e.g., Important System Update"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-[#222222] text-gray-200 border border-gray-700 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-gray-300 text-sm font-medium mb-2">Announcement Message (Optional):</label>
          <textarea
            rows={4}
            id="message"
            placeholder="e.g., We will be performing maintenance on..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-[#222222] text-gray-200 border border-gray-700 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500 resize-y"
          ></textarea>
        </div>

        {/* Poster-Specific Fields - Grouped together with 2-column layout */}
        <hr className="border-gray-700" /> {/* Visual separator */}
        <p className="text-gray-300 text-lg font-semibold mt-6 mb-4">Poster Settings (Optional)</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Grid for 2 columns on medium screens and up */}
          <div>
            <label htmlFor="posterUntilCreate" className="block text-gray-300 text-sm font-medium mb-2">Display Until (Optional Date/Time):</label>
            <input
              type="datetime-local"
              id="posterUntilCreate"
              value={posterUntilCreate}
              onChange={(e) => setPosterUntilCreate(e.target.value)}
              className="w-full bg-[#222222] text-gray-200 border border-gray-700 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500"
            />
          </div>
          <div>
            <label htmlFor="targetAudienceCreate" className="block text-gray-300 text-sm font-medium mb-2">Target Audience (Optional):</label>
            <select
              id="targetAudienceCreate"
              value={targetAudienceCreate}
              onChange={(e) => setTargetAudienceCreate(e.target.value)}
              className="w-full bg-[#222222] text-gray-200 border border-gray-700 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Users</option>
              <option value="students">Students</option>
              <option value="mentors">Mentors</option>
              <option value="subadmin">Subadmin</option>
            </select>
          </div>
        </div>

        {/* Image upload is still a single row for better preview space */}
        <div>
            <label htmlFor="posterImageFile" className="block text-gray-300 text-sm font-medium mb-2">Poster Background Image (Optional):</label>
            <input
                type="file"
                id="posterImageFile"
                accept="image/*"
                onChange={handleImageFileChange}
                className="w-full bg-[#222222] text-gray-200 border border-gray-700 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-500 file:text-white hover:file:bg-purple-600"
            />
            {isUploadingImage && (
                <p className="text-gray-400 text-sm mt-2">Uploading image...</p>
            )}
            {posterImagePreview && (
                <div className="mt-4 flex items-center gap-4">
                    <img src={posterImagePreview} alt="Image Preview" className="w-24 h-24 object-cover rounded-lg border border-gray-700" />
                    <button
                        type="button"
                        onClick={handleClearImage}
                        className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200 text-sm"
                    >
                        Clear Image
                    </button>
                </div>
            )}
            {posterImageUrlCreate && !posterImagePreview && (
                <p className="text-gray-400 text-sm mt-2">Current Image URL: <a href={posterImageUrlCreate} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">{posterImageUrlCreate}</a></p>
            )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Grid for 2 columns on medium screens and up */}
          <div>
              <label htmlFor="posterButtonText" className="block text-gray-300 text-sm font-medium mb-2">Button Text (Optional):</label>
              <input
                  type="text"
                  id="posterButtonText"
                  placeholder="e.g., Learn More"
                  value={posterButtonText}
                  onChange={(e) => setPosterButtonText(e.target.value)}
                  className="w-full bg-[#222222] text-gray-200 border border-gray-700 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500"
              />
          </div>
          <div>
              <label htmlFor="posterButtonUrl" className="block text-gray-300 text-sm font-medium mb-2">Button URL (Required if Button Text is present):</label>
              <input
                  type="url"
                  id="posterButtonUrl"
                  placeholder="e.g., https://example.com/learn"
                  value={posterButtonUrl}
                  onChange={(e) => setPosterButtonUrl(e.target.value)}
                  className="w-full bg-[#222222] text-gray-200 border border-gray-700 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500"
              />
          </div>
        </div>

        {/* Display as Homepage Poster Checkbox - Now at the end */}
        <hr className="border-gray-700" /> {/* Visual separator */}
        <div className="flex items-center gap-2 pt-4">
          <input
            type="checkbox"
            id="isPosterCreate"
            checked={isPosterCreate}
            onChange={(e) => setIsPosterCreate(e.target.checked)}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded"
          />
          <label htmlFor="isPosterCreate" className="text-gray-300 text-lg font-semibold">Display as Homepage Poster?</label>
        </div>

        <motion.button
          type="submit"
          className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out font-semibold text-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
          disabled={isUploadingImage}
        >
          {isUploadingImage ? 'Uploading Image...' : 'Post Announcement'}
        </motion.button>
      </motion.form>

      <h3 className="text-2xl font-bold mb-4 text-gray-200">Previous Announcements</h3>

      {announcements.length === 0 ? (
        <p className="text-gray-400 text-lg">No announcements yet.</p>
      ) : (
        <div className="space-y-6">
          {announcements.map((a, index) => (
            <motion.div
              key={a._id}
              className="p-6 rounded-xl shadow-lg shadow-black/70 border-l-4 border-purple-500"
              style={{ backgroundColor: darkBgColor, borderColor: darkBorderColor }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 mr-4">
                  <h4 className="text-xl font-bold text-gray-200 mb-2">{a.title || "No Title"}</h4>
                  <p className="text-gray-300 leading-relaxed">{a.message || "No Message"}</p>
                  <p className="text-base text-gray-500 mt-3">
                    Posted: {new Date(a.createdAt).toLocaleString()}
                    {a.createdBy && a.createdBy.name && ` by ${a.createdBy.name}`}
                  </p>
                  {a.isPoster && (
                      <div className="mt-3 flex flex-wrap gap-2 text-sm">
                          <span className="px-2 py-1 bg-green-700 text-green-100 font-semibold rounded-full">
                              Currently Poster
                          </span>
                          {a.posterUntil && (
                              <span className="px-2 py-1 bg-gray-600 text-gray-200 rounded-full">
                                  Expires: {new Date(a.posterUntil).toLocaleString()}
                              </span>
                          )}
                          {a.targetAudience && a.targetAudience !== 'all' && (
                              <span className="px-2 py-1 bg-blue-700 text-blue-100 rounded-full">
                                  Target: {a.targetAudience.charAt(0).toUpperCase() + a.targetAudience.slice(1)}
                              </span>
                          )}
                          {a.imageUrl && (
                              <span className="px-2 py-1 bg-purple-700 text-purple-100 rounded-full">
                                  <a href={a.imageUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">Image URL</a>
                              </span>
                          )}
                          {a.buttonText && (
                              <span className="px-2 py-1 bg-indigo-700 text-indigo-100 rounded-full">
                                  Button: "{a.buttonText}"
                              </span>
                          )}
                          {a.buttonUrl && (
                              <a href={a.buttonUrl} target="_blank" rel="noopener noreferrer" className="px-2 py-1 bg-sky-700 text-sky-100 rounded-full hover:underline">
                                  Button URL
                              </a>
                          )}
                      </div>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <motion.button
                    onClick={() => handleDelete(a._id)}
                    className="text-red-400 hover:text-red-300 transition-colors duration-200 px-4 py-2 rounded-lg font-medium"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    Delete
                  </motion.button>
                  <motion.button
                    onClick={() => handleTogglePublish(a)}
                    className={`px-4 py-2 rounded-lg font-medium transition duration-300 ease-in-out
                      ${a.isPoster ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'}`
                    }
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    {a.isPoster ? 'Unpublish' : 'Publish as Poster'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Announcement;