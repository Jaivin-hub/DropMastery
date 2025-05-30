// src/components/course-form/CourseLessonsTab.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpenText, PlusCircle } from "lucide-react"; // Changed Plus to PlusCircle
import { gradientTextStyle } from '../../../../constants/styles';
import LessonEditor from './LessonEditor';

const CourseLessonsTab = ({
  course,
  expandedLessons,
  addingContentToLessonId,
  newContentType,
  handleAddLesson,
  toggleLessonExpansion,
  moveLesson,
  handleRemoveLesson,
  handleLessonInputChange,
  onContentBlockDragEnd,
  handleAddContentBlock,
  setNewContentType,
  confirmAddContentBlock,
  setAddingContentToLessonId,
  handleContentBlockChange,
  handleContentBlockItemsChange,
  handleAddListItem,
  handleRemoveListItem,
  handleRemoveContentBlock,
}) => {
  // Extract the lessons array length here
   const totalLessons = course.lessons ? course.lessons.length : 0;

  return (
    <motion.div
      key="course-lessons-tab"
      className="p-8 rounded-xl shadow-lg shadow-black/70 border border-[#222222] bg-[#222222]"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-3xl font-bold text-gray-200 mb-7 flex items-center gap-3" style={gradientTextStyle}>
        <BookOpenText size={28} /> Course Lessons
      </h2>
      {(course.lessons || []).map((lesson, lessonIndex) => (
        <LessonEditor
          key={lesson.tempId}
          lesson={lesson}
          lessonIndex={lessonIndex}
          expandedLessons={expandedLessons}
          addingContentToLessonId={addingContentToLessonId}
          newContentType={newContentType}
          toggleLessonExpansion={toggleLessonExpansion}
          moveLesson={moveLesson}
          handleRemoveLesson={handleRemoveLesson}
          handleLessonInputChange={handleLessonInputChange}
          onContentBlockDragEnd={onContentBlockDragEnd}
          handleAddContentBlock={handleAddContentBlock}
          setNewContentType={setNewContentType}
          confirmAddContentBlock={confirmAddContentBlock}
          setAddingContentToLessonId={setAddingContentToLessonId}
          handleContentBlockChange={handleContentBlockChange}
          handleContentBlockItemsChange={handleContentBlockItemsChange}
          handleAddListItem={handleAddListItem}
          handleRemoveListItem={handleRemoveListItem}
          handleRemoveContentBlock={handleRemoveContentBlock}
          totalLessons={totalLessons}
        />
       ))}

      {/* --- */}
      {/* Add New Lesson Button - Updated to match color pattern */}
      <div className="flex justify-center mt-10">
        <motion.button
          type="button"
          onClick={handleAddLesson}
          // Updated classes for consistent purple/indigo gradient, larger size, and stronger shadow/hover
          className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-3.5 px-8 rounded-xl hover:from-purple-700 hover:to-indigo-800 transition-all duration-300 ease-in-out flex items-center gap-3 text-xl font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 border border-purple-500"
          whileHover={{ scale: 1.03, boxShadow: "0 10px 30px rgba(128, 90, 213, 0.4)" }} // Stronger shadow/glow on hover
          whileTap={{ scale: 0.97 }}
          title="Add a New Lesson to the Course"
        >
          <PlusCircle size={24} strokeWidth={2.5} /> {/* Slightly larger icon */}
          <span>Add New Lesson</span>
        </motion.button>
      </div>
      {/* --- */}
    </motion.div>
  );
};

export default CourseLessonsTab;