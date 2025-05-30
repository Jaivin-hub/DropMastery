// src/components/course-form/LessonEditor.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import {
    Youtube,
    ClipboardList,
    ChevronUp,
    ChevronDown,
    Trash2,
    Plus,
    CheckCircle,
    X,
    LayoutDashboard, // Added a new icon for content blocks
} from "lucide-react";
import { gradientTextStyle } from '../../../../constants/styles';
import ContentBlockEditor from './ContentBlockEditor';

const LessonEditor = ({
    lesson,
    lessonIndex,
    expandedLessons,
    addingContentToLessonId,
    newContentType,
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
    totalLessons,
}) => {
    return (
        <motion.div
            key={lesson.tempId}
            className="bg-[#1E1E1E] p-6 rounded-lg mb-6 border border-gray-700 relative shadow-inner shadow-black/20"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.3 }}
        >
            {/* Lesson Header with Title, Expand/Collapse, and Action Buttons */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-800 mb-4">
                <h3 className="text-xl font-bold text-gray-200 flex items-center gap-2" style={gradientTextStyle}>
                    Lesson {lessonIndex + 1}:
                    <input
                        type="text"
                        name="title"
                        placeholder="Lesson Title"
                        value={lesson.title}
                        onChange={(e) => handleLessonInputChange(lesson.tempId, e)}
                        className="block w-auto max-w-[80%] mt-0 bg-transparent text-gray-200 border-none px-0 py-0 focus:outline-none focus:ring-0 focus:border-b focus:border-purple-500 font-semibold text-lg"
                        required
                    />
                </h3>
                <div className="flex items-center gap-2">
                    {/* Move Up/Down buttons for lessons */}
                    <motion.button
                        type="button"
                        onClick={() => moveLesson(lesson.tempId, -1)}
                        className="p-2 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                        disabled={lessonIndex === 0}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Move Lesson Up"
                    >
                        <ChevronUp size={20} />
                    </motion.button>
                    <motion.button
                        type="button"
                        onClick={() => moveLesson(lesson.tempId, 1)}
                        className="p-2 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                        disabled={lessonIndex === (totalLessons - 1)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Move Lesson Down"
                    >
                        <ChevronDown size={20} />
                    </motion.button>
                    {/* Expand/Collapse Toggle */}
                    <motion.button
                        type="button"
                        onClick={() => toggleLessonExpansion(lesson.tempId)}
                        className="p-2 rounded-full bg-purple-700 text-white hover:bg-purple-600 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title={expandedLessons[lesson.tempId] ? "Collapse Lesson" : "Expand Lesson"}
                    >
                        {expandedLessons[lesson.tempId] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </motion.button>
                    {/* Delete button */}
                    <motion.button
                        type="button"
                        onClick={() => handleRemoveLesson(lesson.tempId)}
                        className="p-2 rounded-full bg-red-700 text-white hover:bg-red-600 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Delete Lesson"
                    >
                        <Trash2 size={20} />
                    </motion.button>
                </div>
            </div>

            {expandedLessons[lesson.tempId] && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                >
                    <label htmlFor={`videoUrl-${lesson.tempId}`} className="block text-gray-400 text-sm font-semibold mb-2 flex items-center gap-2">
                        <Youtube size={16} /> Video URL
                    </label>
                    <input
                        type="url"
                        id={`videoUrl-${lesson.tempId}`}
                        name="videoUrl"
                        placeholder="e.g., https://www.youtube.com/embed/YOUR_VIDEO_ID"
                        value={lesson.videoUrl}
                        onChange={(e) => handleLessonInputChange(lesson.tempId, e)}
                        className="w-full bg-[#1E1E1E] text-gray-200 border border-gray-700 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-6 placeholder-gray-500"
                        required
                    />

                    <h4 className="text-xl font-semibold text-gray-300 mb-4 flex items-center gap-2" style={gradientTextStyle}>
                        <ClipboardList size={20} /> Lesson Content Blocks
                    </h4>
                    <DragDropContext onDragEnd={(result) => onContentBlockDragEnd(lesson.tempId, result)}>
                        <Droppable droppableId={`lesson-${lesson.tempId}-content-droppable`}>
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="space-y-4 relative overflow-x-hidden"
                                >
                                    {(lesson.content || []).map((block, blockIndex) => (
                                        <Draggable key={block.tempId} draggableId={block.tempId} index={blockIndex}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={{
                                                        ...provided.draggableProps.style,
                                                        width: snapshot.isDragging
                                                            ? provided.draggableProps.style.width
                                                            : 'auto', // Or '100%' if it should always take full width
                                                        background: snapshot.isDragging ? '#2A2A2A' : 'transparent',
                                                        boxShadow: snapshot.isDragging
                                                            ? '0 4px 12px rgba(0, 0, 0, 0.3)'
                                                            : 'none',
                                                    }}
                                                    className={snapshot.isDragging ? 'is-dragging-content-block' : ''}
                                                >
                                                    <ContentBlockEditor
                                                        block={block}
                                                        lessonTempId={lesson.tempId}
                                                        index={blockIndex}
                                                        provided={provided}
                                                        snapshot={snapshot}
                                                        handleContentBlockChange={handleContentBlockChange}
                                                        handleContentBlockItemsChange={handleContentBlockItemsChange}
                                                        handleAddListItem={handleAddListItem}
                                                        handleRemoveListItem={handleRemoveListItem}
                                                        handleRemoveContentBlock={handleRemoveContentBlock}
                                                    />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>

                    {/* Add Content Block Button/Dropdown */}
                    <div className="mt-8 flex justify-center">
                        {addingContentToLessonId === lesson.tempId ? (
                            <motion.div
                                className="bg-[#2A2A2A] p-5 rounded-xl flex flex-col md:flex-row items-center gap-4 border border-gray-600 shadow-xl shadow-black/30 w-full max-w-lg"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Removed flex-1 and w-full from the parent div of select to make it full width */}
                                <div className="relative w-full"> {/* Changed this line */}
                                    <select
                                        value={newContentType}
                                        onChange={(e) => setNewContentType(e.target.value)}
                                        className="w-full bg-[#1E1E1E] text-gray-200 border border-gray-700 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none pr-10 text-base shadow-sm"
                                    >
                                        <option value="" disabled>Choose Content Type</option>
                                        <option value="paragraph">Paragraph</option>
                                        <option value="heading">Heading</option>
                                        <option value="list">Unordered List</option>
                                        <option value="ordered-list">Ordered List</option>
                                        <option value="code">Code Block</option>
                                        <option value="download">Downloadable</option>
                                        <option value="call-to-action">Call to Action</option>
                                        <option value="image">Image</option>
                                    </select>
                                    <ChevronDown size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                                <div className="flex gap-3 w-full md:w-auto">
                                    <motion.button
                                        type="button"
                                        onClick={confirmAddContentBlock}
                                        disabled={!newContentType}
                                        className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-3 rounded-lg hover:from-green-600 hover:to-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 ease-in-out flex-1 flex items-center justify-center shadow-md hover:shadow-lg"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        title="Confirm Add Block"
                                    >
                                        <CheckCircle size={20} />
                                    </motion.button>
                                    <motion.button
                                        type="button"
                                        onClick={() => setAddingContentToLessonId(null)}
                                        className="bg-gradient-to-r from-red-500 to-rose-600 text-white p-3 rounded-lg hover:from-red-600 hover:to-rose-700 transition-all duration-200 ease-in-out flex-1 flex items-center justify-center shadow-md hover:shadow-lg"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        title="Cancel Add"
                                    >
                                        <X size={20} />
                                    </motion.button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.button
                                type="button"
                                onClick={() => handleAddContentBlock(lesson.tempId)}
                                className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-3 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-800 transition-all duration-300 ease-in-out flex items-center gap-3 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(128, 90, 213, 0.4)" }}
                                whileTap={{ scale: 0.95 }}
                                title="Add New Content Block"
                            >
                                <LayoutDashboard size={22} strokeWidth={2.5} />
                                <span>Add New Content Block</span>
                            </motion.button>
                        )}
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};

export default LessonEditor;