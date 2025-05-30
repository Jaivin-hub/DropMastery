// src/components/course-form/CourseInfoTab.jsx
import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Info,
  ChevronDown,
  ImageIcon,
  Briefcase,
  XCircle,
  PlusCircle,
  ArrowRight
} from 'lucide-react';
import { gradientTextStyle, commonInputClasses, darkBgColorLighter } from '../../../../constants/styles';

const CourseInfoTab = ({
  course,
  handleCourseInputChange,
  mentorsList,
  selectedMentors,
  searchTermForMentors,
  showMentorSuggestions,
  loadingMentors,
  error, // Mentor fetch error, specifically
  mentorSelectRef,
  handleMentorSearchChange,
  handleAddMentor,
  handleRemoveMentor,
  setShowMentorSuggestions,
  setActiveTab,
}) => {
  const filteredMentors = mentorsList.filter(mentor =>
    mentor.name.toLowerCase().includes(searchTermForMentors.toLowerCase()) &&
    !selectedMentors.some(selected => selected._id === mentor._id)
  );

  return (
    <motion.div
      key="course-info-tab"
      className="p-8 rounded-xl shadow-lg shadow-black/70 border border-[#222222] bg-[#222222]"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-3xl font-bold text-gray-200 mb-7 flex items-center gap-3" style={gradientTextStyle}>
        <Info size={28} /> Course Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="title" className="block text-gray-400 text-sm font-semibold mb-2">Course Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={course.title}
            onChange={handleCourseInputChange}
            className={`${commonInputClasses} px-4 py-2.5`}
            placeholder="e.g., Advanced JavaScript Fundamentals"
            required
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-gray-400 text-sm font-semibold mb-2">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={course.category}
            onChange={handleCourseInputChange}
            className={`${commonInputClasses} px-4 py-2.5`}
            placeholder="e.g., Programming, Design, Business"
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-gray-400 text-sm font-semibold mb-2">Price ($)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={course.price}
            onChange={handleCourseInputChange}
            className={`${commonInputClasses} px-4 py-2.5 mb-6`}
            required
            min="0"
            placeholder="e.g., 99.99"
          />
        </div>
        <div>
          <label htmlFor="status" className="block text-gray-400 text-sm font-semibold mb-2">Status</label>
          <div className="relative">
            <select
              id="status"
              name="status"
              value={course.status}
              onChange={handleCourseInputChange}
              className={`${commonInputClasses} px-4 py-2.5 appearance-none pr-10`}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
            <ChevronDown size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="imageUrl" className="block text-gray-400 text-sm font-semibold mb-2">Course Image URL</label>
          <div className="flex items-center bg-[#1E1E1E] border border-gray-700 rounded-lg px-4 py-2.5 focus-within:ring-2 focus-within:ring-purple-500">
            <ImageIcon size={20} className="text-gray-500 mr-3" />
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={course.imageUrl}
              onChange={handleCourseInputChange}
              className="w-full bg-transparent text-gray-200 outline-none placeholder-gray-500"
              placeholder="e.g., https://example.com/course-image.jpg"
            />
          </div>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="description" className="block text-gray-400 text-sm font-semibold mb-2">Course Description</label>
          <textarea
            id="description"
            name="description"
            value={course.description}
            onChange={handleCourseInputChange}
            rows="5"
            className={`${commonInputClasses} px-4 py-2.5 resize-y`}
            placeholder="Provide a detailed description of the course content and objectives."
            required
          ></textarea>
        </div>

        {/* Mentor Selection UI */}
        <div className="md:col-span-2 relative" ref={mentorSelectRef}>
          <label htmlFor="mentor-search" className="block text-gray-400 text-sm font-semibold mb-2">Assigned Mentors</label>
          <div className="w-full bg-[#1E1E1E] text-gray-200 border border-gray-700 px-4 py-2 rounded-lg focus-within:ring-2 focus-within:ring-purple-500 min-h-[48px] flex flex-wrap items-center gap-2 relative">
            {selectedMentors.map(mentor => (
              <motion.span
                key={mentor._id}
                className="bg-purple-600/30 text-purple-300 px-3 py-1 rounded-full text-sm flex items-center gap-1 shadow-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <Briefcase size={14} /> {mentor.name}
                <button
                  type="button"
                  onClick={() => handleRemoveMentor(mentor._id)}
                  className="ml-1 text-purple-200 hover:text-white transition-colors"
                  title={`Remove ${mentor.name}`}
                >
                  <XCircle size={16} />
                </button>
              </motion.span>
            ))}
            <input
              type="text"
              id="mentor-search"
              placeholder={selectedMentors.length > 0 ? "Add more mentors..." : "Search and add mentors..."}
              value={searchTermForMentors}
              onChange={handleMentorSearchChange}
              onFocus={() => setShowMentorSuggestions(true)}
              className="flex-grow bg-transparent outline-none placeholder-gray-500 text-gray-200 text-base"
              disabled={loadingMentors}
            />
          </div>

          <AnimatePresence>
            {showMentorSuggestions && (
              <motion.div
                className="absolute z-10 w-full bg-[#2A2A2A] border border-gray-700 rounded-lg mt-2 max-h-56 overflow-y-auto custom-scrollbar shadow-xl"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {loadingMentors && (
                  <div className="p-3 text-gray-400 flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading mentors...
                  </div>
                )}
                {error && ( // Use specific mentor error here
                  <div className="p-3 text-red-400">Error: {error}</div>
                )}
                {!loadingMentors && !error && filteredMentors.length === 0 && (
                  <div className="p-3 text-gray-400">
                    {searchTermForMentors ? "No matching mentors found." : "No mentors available to select."}
                  </div>
                )}
                {!loadingMentors && !error && filteredMentors.map((mentor) => (
                  <div
                    key={mentor._id}
                    className="p-3 cursor-pointer text-gray-200 hover:bg-purple-700 hover:text-white transition-colors flex items-center gap-2"
                    onClick={() => handleAddMentor(mentor)}
                  >
                    <PlusCircle size={16} className="text-purple-300" /> {mentor.name} ({mentor.email})
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          <style>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 8px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: ${darkBgColorLighter};
              border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: #888;
              border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #555;
            }
          `}</style>
        </div>
      </div>
      <div className="flex justify-end mt-8">
        <motion.button
          type="button"
          onClick={() => setActiveTab('lessons')}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out font-semibold text-base flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Next: Course Lessons <ArrowRight size={20} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CourseInfoTab;