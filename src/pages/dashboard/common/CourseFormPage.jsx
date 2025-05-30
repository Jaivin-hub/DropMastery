// src/pages/admin/courses/CourseFormPage.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';

import {
  Save,
  Plus,
  Trash2,
  ChevronUp, // Still needed for loading spinner for example
  ChevronDown,
  ArrowLeft,
  X,
  Edit,
  Youtube,
  ClipboardList,
  Heading,
  AlignLeft,
  Code,
  Download,
  Link,
  Info,
  CheckCircle,
  XCircle,
  Briefcase,
  BookOpenText,
  Image as ImageIcon,
  ArrowRight,
  PlusCircle, // Ensure PlusCircle is imported for the 'Add New Lesson' button
} from "lucide-react";

// Import common styles and utilities
import { gradientTextStyle, darkBgColor } from '../../../constants/styles';
import { generateUniqueId, reorder } from '../common/utils';

// Import refactored components
import ConfirmationModal from '../common/course-form/ConfirmationModal';
import CourseInfoTab from '../common/course-form/CourseInfoTab';
import CourseLessonsTab from '../common/course-form/CourseLessonsTab';
// ContentBlockEditor is used inside LessonEditor, so no direct import needed here

const CourseFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  // Change initial activeTab to 'lessons' for create mode
  const [activeTab, setActiveTab] = useState('info'); // 'info' or 'lessons'

  const [course, setCourse] = useState(() => ({
    title: '',
    description: '',
    mentors: [],
    price: '',
    status: 'draft',
    category: '',
    imageUrl: '',
    lessons: [],
  }));

  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState(null); // General form error
  const [mentorError, setMentorError] = useState(null); // Specific error for mentors fetch
  const [isSaving, setIsSaving] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [showSaveError, setShowSaveError] = useState(false);

  const [mentorsList, setMentorsList] = useState([]);
  const [selectedMentors, setSelectedMentors] = useState([]);
  const [searchTermForMentors, setSearchTermForMentors] = useState('');
  const [showMentorSuggestions, setShowMentorSuggestions] = useState(false);
  const [loadingMentors, setLoadingMentors] = useState(false);
  const mentorSelectRef = useRef(null);

  const [addingContentToLessonId, setAddingContentToLessonId] = useState(null);
  const [newContentType, setNewContentType] = useState('');

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [expandedLessons, setExpandedLessons] = useState({});

  const toggleLessonExpansion = useCallback((lessonTempId) => {
    setExpandedLessons(prev => ({
      ...prev,
      [lessonTempId]: !prev[lessonTempId]
    }));
  }, []);

  // Fetch Course Data (for Edit Mode)
  useEffect(() => {
    const fetchCourse = async () => {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        setError("Authentication token not found. Please log in.");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`/api/courses/${id}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        const fetchedCourse = response.data.course;
        // Ensure lessons and content arrays exist and add tempIds for UI management
        const processedLessons = (fetchedCourse.lessons || []).map(lesson => ({
          ...lesson,
          tempId: lesson._id || generateUniqueId(),
          content: (lesson.content || []).map(block => ({
            ...block,
            tempId: block._id || generateUniqueId()
          }))
        }));
        setCourse({ ...fetchedCourse, lessons: processedLessons });

        // Set selectedMentors for display based on fetched course data
        setSelectedMentors(fetchedCourse.mentors || []);

        // Expand all lessons by default in edit mode for easy review
        const initialExpanded = {};
        processedLessons.forEach(lesson => {
          initialExpanded[lesson.tempId] = true;
        });
        setExpandedLessons(initialExpanded);


        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch course:", err);
        setError("Failed to load course details. Please try again.");
        setLoading(false);
      }
    };

    if (isEditMode) {
      fetchCourse();
    } else {
      setLoading(false);
    }
  }, [id, isEditMode]);

  // Fetch all Mentors (for both Create and Edit Mode)
  useEffect(() => {
    const fetchMentors = async () => {
      setLoadingMentors(true);
      setMentorError(null); // Clear previous mentor error
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        setMentorError("Authentication token not found. Please log in.");
        setLoadingMentors(false);
        return;
      }

      try {
        const response = await axios.get('/api/users/role/mentor', {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'If-None-Match': '',
            'If-Modified-Since': '',
          },
          params: { _t: Date.now() }
        });

        if (response.data && response.data.users) {
          const processedMentors = response.data.users.map(mentor => ({
              ...mentor,
              name: mentor.name || mentor.email
          }));
          setMentorsList(processedMentors);
        } else if (response.status === 304) {
        } else {
          console.warn("Unexpected empty response data for mentors:", response);
          setMentorError("Received empty data for mentors."); // Set specific error
        }

      } catch (err) {
        console.error("Failed to fetch mentors:", err);
        setMentorError("Failed to load mentors. Please try again."); // Set specific error
      } finally {
        setLoadingMentors(false);
      }
    };
    fetchMentors();
  }, []);

  // Click outside handler for closing mentor suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mentorSelectRef.current && !mentorSelectRef.current.contains(event.target)) {
        setShowMentorSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const handleCourseInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleLessonInputChange = useCallback((lessonTempId, e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({
      ...prev,
      lessons: prev.lessons.map((lesson) =>
        lesson.tempId === lessonTempId
          ? { ...lesson, [name]: value }
          : lesson
      ),
    }));
  }, []);

  const handleContentBlockChange = useCallback((lessonTempId, blockTempId, fieldName, value) => {
    setCourse((prev) => ({
      ...prev,
      lessons: prev.lessons.map((lesson) =>
        lesson.tempId === lessonTempId
          ? {
              ...lesson,
              content: lesson.content.map((block) =>
                block.tempId === blockTempId
                  ? { ...block, [fieldName]: value }
                  : block
              ),
            }
          : lesson
      ),
    }));
  }, []);

  const handleContentBlockItemsChange = useCallback((lessonTempId, blockTempId, itemIndex, value) => {
    setCourse((prev) => ({
      ...prev,
      lessons: prev.lessons.map((lesson) =>
        lesson.tempId === lessonTempId
          ? {
              ...lesson,
              content: lesson.content.map((block) =>
                (block.tempId === blockTempId && (block.type === 'list' || block.type === 'ordered-list'))
                  ? {
                      ...block,
                      items: block.items.map((item, idx) => (idx === itemIndex ? value : item)),
                    }
                  : block
              ),
            }
          : lesson
      ),
    }));
  }, []);

  const handleAddListItem = useCallback((lessonTempId, blockTempId) => {
    setCourse((prev) => ({
      ...prev,
      lessons: prev.lessons.map((lesson) =>
        lesson.tempId === lessonTempId
          ? {
              ...lesson,
              content: lesson.content.map((block) =>
                (block.tempId === blockTempId && (block.type === 'list' || block.type === 'ordered-list'))
                  ? { ...block, items: [...(block.items || []), ''] }
                  : block
              ),
            }
          : lesson
      ),
    }));
  }, []);

  const handleRemoveListItem = useCallback((lessonTempId, blockTempId, itemIndex) => {
    setCourse((prev) => ({
      ...prev,
      lessons: prev.lessons.map((lesson) =>
        lesson.tempId === lessonTempId
          ? {
              ...lesson,
              content: lesson.content.map((block) =>
                (block.tempId === blockTempId && (block.type === 'list' || block.type === 'ordered-list'))
                  ? {
                      ...block,
                      items: block.items.length > 1
                        ? block.items.filter((_, idx) => idx !== itemIndex)
                        : block.items,
                    }
                  : block
              ),
            }
          : lesson
      ),
    }));
  }, []);


  const handleAddLesson = useCallback(() => {
    const newLessonTempId = generateUniqueId();
    setCourse((prev) => ({
      ...prev,
      lessons: [
        ...(prev.lessons || []),
        {
          tempId: newLessonTempId,
          title: "",
          videoUrl: "",
          content: [],
        },
      ],
    }));
    setExpandedLessons(prev => ({ ...prev, [newLessonTempId]: true }));
  }, []);

  const handleRemoveLesson = useCallback((lessonTempId) => {
    setDeleteTarget({ type: 'lesson', lessonId: lessonTempId });
    setShowConfirmDelete(true);
  }, []);

  const handleAddContentBlock = useCallback((lessonTempId) => {
    setAddingContentToLessonId(lessonTempId);
    setNewContentType('');
  }, []);

  const confirmAddContentBlock = useCallback(() => {
    if (!newContentType) return;

    const newBlock = { tempId: generateUniqueId(), type: newContentType };
    if (newContentType === 'heading') newBlock.level = 3;
    if (newContentType === 'list' || newContentType === 'ordered-list') newBlock.items = [''];
    if (newContentType === 'code') { newBlock.language = 'javascript'; newBlock.code = ''; }
    if (newContentType === 'download') { newBlock.label = ''; newBlock.fileUrl = ''; }
    if (newContentType === 'call-to-action') { newBlock.text = ''; newBlock.buttonText = ''; newBlock.buttonLink = ''; }
    if (newContentType === 'paragraph') newBlock.text = '';
    if (newContentType === 'image') newBlock.imageUrl = ''; // Added for image block type

    setCourse((prev) => ({
      ...prev,
      lessons: prev.lessons.map((lesson) =>
        lesson.tempId === addingContentToLessonId
          ? { ...lesson, content: [...(lesson.content || []), newBlock] }
          : lesson
      ),
    }));
    setAddingContentToLessonId(null);
    setNewContentType('');
  }, [addingContentToLessonId, newContentType]);

  const handleRemoveContentBlock = useCallback((lessonTempId, blockTempId) => {
    setDeleteTarget({ type: 'content', lessonId: lessonTempId, contentBlockId: blockTempId });
    setShowConfirmDelete(true);
  }, []);

  const confirmActualDelete = useCallback(() => {
    if (!deleteTarget) return;

    if (deleteTarget.type === 'lesson') {
      setCourse((prev) => ({
        ...prev,
        lessons: prev.lessons.filter((lesson) =>
          lesson.tempId !== deleteTarget.lessonId
        ),
      }));
      setExpandedLessons(prev => {
        const newExpanded = { ...prev };
        delete newExpanded[deleteTarget.lessonId];
        return newExpanded;
      });
    } else if (deleteTarget.type === 'content') {
      setCourse((prev) => ({
        ...prev,
        lessons: prev.lessons.map((lesson) =>
          lesson.tempId === deleteTarget.lessonId
            ? {
                ...lesson,
                content: lesson.content.filter((block) =>
                  block.tempId !== deleteTarget.contentBlockId
                ),
              }
            : lesson
        ),
      }));
    }
    setShowConfirmDelete(false);
    setDeleteTarget(null);
  }, [deleteTarget]);

  const cancelDelete = useCallback(() => {
    setShowConfirmDelete(false);
    setDeleteTarget(null);
  }, []);

  const moveLesson = useCallback((lessonTempId, direction) => {
    setCourse(prevCourse => {
      const lessons = [...prevCourse.lessons];
      const index = lessons.findIndex(l => l.tempId === lessonTempId);

      if (index === -1) return prevCourse;

      let newIndex = index + direction;
      if (newIndex < 0 || newIndex >= lessons.length) return prevCourse;

      const [movedLesson] = lessons.splice(index, 1);
      lessons.splice(newIndex, 0, movedLesson);

      return { ...prevCourse, lessons };
    });
  }, []);

  const onContentBlockDragEnd = useCallback((lessonTempId, result) => {
    if (!result.destination) {
      return;
    }

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (sourceIndex === destinationIndex) {
      return;
    }

    setCourse(prevCourse => {
      const updatedLessons = prevCourse.lessons.map(lesson => {
        if (lesson.tempId === lessonTempId) {
          const newContent = Array.from(lesson.content);
          const [movedBlock] = newContent.splice(sourceIndex, 1);
          newContent.splice(destinationIndex, 0, movedBlock);
          return { ...lesson, content: newContent };
        }
        return lesson;
      });
      return { ...prevCourse, lessons: updatedLessons };
    });
  }, []);

  const handleMentorSearchChange = useCallback((e) => {
    setSearchTermForMentors(e.target.value);
    setShowMentorSuggestions(true);
  }, []);

  const handleAddMentor = useCallback((mentorToAdd) => {
    if (!selectedMentors.some(m => m._id === mentorToAdd._id)) {
      setSelectedMentors((prev) => [...prev, mentorToAdd]);
      setCourse((prev) => ({
        ...prev,
        mentors: [...prev.mentors, mentorToAdd._id],
      }));
      setSearchTermForMentors('');
      setShowMentorSuggestions(false);
    }
  }, [selectedMentors]);

  const handleRemoveMentor = useCallback((mentorIdToRemove) => {
    setSelectedMentors((prev) => prev.filter(m => m._id !== mentorIdToRemove));
    setCourse((prev) => ({
      ...prev,
      mentors: prev.mentors.filter(id => id !== mentorIdToRemove),
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setShowSaveSuccess(false);
    setShowSaveError(false);
    setError(null);

    const authToken = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');

    if (!authToken) {
      setError("Authentication token not found. Please log in.");
      setIsSaving(false);
      return;
    }
    if (!userId && !isEditMode) {
      setError("User ID not found for course creation. Please log in.");
      setIsSaving(false);
      return;
    }

    try {
      const lessonsToSend = course.lessons.map(lesson => {
        const { tempId, ...restLesson } = lesson;
        return {
          ...restLesson,
          content: lesson.content.map(block => {
            const { tempId: blockTempId, ...restBlock } = block;
            return restBlock;
          })
        };
      });

      const mentorIdsToSend = selectedMentors.map(mentor => mentor._id);

      const dataToSend = {
        title: course.title,
        description: course.description,
        mentors: mentorIdsToSend,
        price: parseFloat(course.price),
        status: course.status,
        category: course.category,
        imageUrl: course.imageUrl,
        lessons: lessonsToSend,
      };


      if (!isEditMode) {
        dataToSend.createdBy = userId;
      }

      let response;
      if (isEditMode) {
        response = await axios.patch(`/api/courses/${id}`, dataToSend, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
      } else {
        response = await axios.post('/api/courses', dataToSend, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
      }

      setShowSaveSuccess(true);
      setTimeout(() => setShowSaveSuccess(false), 3000);
      if (!isEditMode && response.status === 201) {
        setTimeout(() => navigate('/admin/courses'), 1500);
      }
    } catch (err) {
      console.error("Failed to save course:", err.response ? err.response.data : err.message);
      setError("Failed to save course. Please check console for details.");
      setShowSaveError(true);
      setTimeout(() => setShowSaveError(false), 5000);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen" style={{ backgroundColor: darkBgColor }}>
        <p className="text-gray-300 text-xl">Loading course...</p>
      </div>
    );
  }

  if (error && !isSaving && !showSaveSuccess && !showSaveError) {
    return (
      <div className="flex flex-col justify-center items-center h-screen p-4" style={{ backgroundColor: darkBgColor }}>
        <p className="text-red-400 text-xl mb-4">{error}</p>
        <motion.button
          onClick={() => navigate('/admin/courses')}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out font-semibold text-base"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={20} className="inline mr-2" /> Back to Course Control
        </motion.button>
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen font-sans" style={{ backgroundColor: darkBgColor }}>
      {/* Back button */}
       <motion.button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-200
                   px-4 py-2 rounded-lg border border-gray-600 hover:border-gray-400
                   bg-gray-800 hover:bg-gray-700 shadow-md"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ArrowLeft size={18} /> <span className="text-base font-medium">Back to Courses</span>
      </motion.button>

      {/* Main Caption (H1) */}
      <h1
        className="text-4xl md:text-4xl font-extrabold mb-8 flex items-center gap-3"
        style={gradientTextStyle}
      >
        {isEditMode ? <Edit className="text-purple-400" size={36} /> : <Plus className="text-purple-400" size={36} />}
        {isEditMode ? `Edit Course: ${course?.title || 'Loading...'}` : "Create New Course"}
      </h1>

      {/* Tab Navigation */}
      <div className="flex mb-8 border-b border-gray-700">
        {/* Keep both tabs visible */}
        <button
          type="button"
          onClick={() => setActiveTab('info')}
          className={`py-3 px-6 text-xl font-semibold border-b-4 ${activeTab === 'info' ? 'border-purple-600 text-purple-400' : 'border-transparent text-gray-400 hover:text-gray-200'} transition-colors flex items-center gap-2`}
        >
          <Info size={24} /> Course Information
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('lessons')}
          className={`py-3 px-6 text-xl font-semibold border-b-4 ${activeTab === 'lessons' ? 'border-purple-600 text-purple-400' : 'border-transparent text-gray-400 hover:text-gray-200'} transition-colors flex items-center gap-2`}
        >
          <BookOpenText size={24} /> Course Lessons
        </button>
      </div>

      {/* Save Status Notifications */}
      <AnimatePresence>
        {showSaveSuccess && (
          <motion.div
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-700 text-white px-6 py-3 rounded-lg shadow-xl flex items-center gap-2 z-50 border border-green-500"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <CheckCircle size={20} /> Course saved successfully!
          </motion.div>
        )}
        {showSaveError && (
          <motion.div
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-red-700 text-white px-6 py-3 rounded-lg shadow-xl flex items-center gap-2 z-50 border border-red-500"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <XCircle size={20} /> Failed to save course. {error}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-10">
        <AnimatePresence mode="wait">
          {activeTab === 'info' && (
            <CourseInfoTab
              course={course}
              handleCourseInputChange={handleCourseInputChange}
              mentorsList={mentorsList}
              selectedMentors={selectedMentors}
              searchTermForMentors={searchTermForMentors}
              showMentorSuggestions={showMentorSuggestions}
              loadingMentors={loadingMentors}
              error={mentorError} // Pass specific mentor error
              mentorSelectRef={mentorSelectRef}
              handleMentorSearchChange={handleMentorSearchChange}
              handleAddMentor={handleAddMentor}
              handleRemoveMentor={handleRemoveMentor}
              setShowMentorSuggestions={setShowMentorSuggestions}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'lessons' && (
            <> {/* Use a fragment to group lessons tab content and the button */}
              <CourseLessonsTab
                course={course}
                expandedLessons={expandedLessons}
                addingContentToLessonId={addingContentToLessonId}
                newContentType={newContentType}
                handleAddLesson={handleAddLesson}
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
              />
              {/* Save Button now only renders when activeTab is 'lessons' */}
              <div className="flex justify-center w-full mt-12 mb-8"> {/* Container for centering and spacing */}
                <motion.button
                  type="submit"
                  className="bg-gradient-to-r from-purple-700 to-violet-800 text-white py-4 px-10 rounded-xl hover:from-purple-800 hover:to-violet-900 transition-all duration-300 ease-in-out font-bold text-xl flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border border-purple-600"
                  whileHover={{ scale: 1.02, boxShadow: "0 12px 35px rgba(128, 90, 213, 0.5)" }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSaving}
                  title={isEditMode ? "Save all changes to the course" : "Create this new course"}
                >
                  {isSaving ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {isEditMode ? "Saving Changes..." : "Creating Course..."}
                    </>
                  ) : (
                    <>
                      <Save size={26} strokeWidth={2.5} /> {/* Slightly larger and bolder icon */}
                      <span>{isEditMode ? "Save Changes" : "Create Course"}</span>
                    </>
                  )}
                </motion.button>
              </div>
            </>
          )}
        </AnimatePresence>
      </form>

      {/* Confirmation Modal for Delete */}
      <AnimatePresence>
        {showConfirmDelete && (
          <ConfirmationModal
            isOpen={showConfirmDelete}
            message={`Are you sure you want to delete this ${deleteTarget?.type === 'lesson' ? 'lesson' : 'content block'}? This action cannot be undone.`}
            onConfirm={confirmActualDelete}
            onCancel={cancelDelete}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CourseFormPage;