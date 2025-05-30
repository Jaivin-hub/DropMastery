import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom"; // Import useParams

// Define a common style object for gradient text
const gradientTextStyle = {
  background: 'linear-gradient(to right, #6A67FE, #FE67F6)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent',
};

// Define a common dark background color for cards/sections
const darkBgColor = "#1E1E1E";
const darkBgColorLighter = "#222222";

const CourseDetails = () => {
  const { courseId } = useParams(); // Get courseId from URL parameters
  const [course, setCourse] = useState(null); // State to store the fetched course details
  const [activeLesson, setActiveLesson] = useState(null); // State for the currently active lesson
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch course details when component mounts or courseId changes
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`/api/courses/${courseId}`); // API call to get single course
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCourse(data.course); // Set the fetched course
        if (data.course && data.course.lessons && data.course.lessons.length > 0) {
          setActiveLesson(data.course.lessons[0]); // Set the first lesson as active initially
        }
      } catch (err) {
        console.error("Failed to fetch course details:", err);
        setError("Failed to load course details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId]); // Re-run effect if courseId changes

  // Component to render different content types (updated for 'image')
  const renderContent = (contentBlock, index) => {
    switch (contentBlock.type) {
      case "paragraph":
        return <p key={index} className="text-gray-300 mb-4">{contentBlock.text}</p>;
      case "heading":
        const headingSize = {
          1: 'text-4xl', 2: 'text-3xl', 3: 'text-2xl', 4: 'text-xl', 5: 'text-lg', 6: 'text-base',
        }[contentBlock.level] || 'text-xl';
        const HeadingTag = `h${contentBlock.level}`;
        return <HeadingTag key={index} className={`${headingSize} font-bold text-gray-200 mt-6 mb-3`}>{contentBlock.text}</HeadingTag>;
      case "list":
        return (
          <ul key={index} className="list-disc list-inside text-gray-300 mb-4 space-y-1">
            {contentBlock?.items?.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        );
      case "ordered-list":
        return (
          <ol key={index} className="list-decimal list-inside text-gray-300 mb-4 space-y-1">
            {contentBlock?.items?.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ol>
        );
      case "code":
        return (
          <pre key={index} className="bg-gray-800 p-4 rounded-lg text-sm text-gray-200 overflow-x-auto mb-4">
            <code className={`language-${contentBlock.language}`}>
              {contentBlock.code}
            </code>
          </pre>
        );
      case "download": // Added download type rendering
        return (
          <div key={index} className="mb-4">
            <a
              href={contentBlock.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
            >
              Download: {contentBlock.label || 'File'}
            </a>
          </div>
        );
      case "call-to-action": // Added call-to-action type rendering
        return (
          <div key={index} className="mb-4 text-center">
            <p className="text-gray-300 mb-2">{contentBlock.text}</p>
            <a
              href={contentBlock.buttonLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300"
            >
              {contentBlock.buttonText || 'Learn More'}
            </a>
          </div>
        );
      case "image": // ADDED IMAGE TYPE RENDERING
        return (
          <div key={index} className="my-6">
            <img
              src={contentBlock.imageUrl}
              alt="Lesson content image"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-400">
        <p className="text-lg">Loading course details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        <p className="text-lg">{error}</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="p-8 text-center text-gray-400">
        <p className="text-lg">Course not found.</p>
      </div>
    );
  }

  // If course is loaded but has no lessons
  if (!course.lessons || course.lessons.length === 0) {
    return (
      <div className="p-8 text-center text-gray-400">
        <h1 className="text-4xl font-extrabold mb-5" style={gradientTextStyle}>{course.title}</h1>
        <p className="text-lg">This course has no lessons yet.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1
        className="text-4xl font-extrabold mb-5"
        style={gradientTextStyle}
      >
        {course.title}
      </h1>
      <p className="text-gray-300 mb-8">
        {course.description}
        {course.mentors && course.mentors.length > 0 && (
          <span className="ml-2">
            Taught by:{" "}
            <span className="font-medium text-purple-300">
              {course.mentors.map(m => m.name).join(', ')}
            </span>
          </span>
        )}
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        <motion.div
          key={activeLesson?._id || 'no-lesson'} // Use activeLesson._id for key
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1"
        >
          {activeLesson && (
            <>
              <div
                className="aspect-video w-full rounded-xl overflow-hidden shadow-lg shadow-black/70 border border-[#222222]"
                style={{ backgroundColor: 'black' }}
              >
                {/* Use the activeLesson.videoUrl */}
                <iframe
                  src={activeLesson.videoUrl}
                  title={activeLesson.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <h2
                className="text-2xl font-bold mt-6"
                style={gradientTextStyle}
              >
                {activeLesson.title}
              </h2>
              <div className="mt-6 p-6 rounded-xl shadow-lg shadow-black/70 border border-[#222222]" style={{ backgroundColor: darkBgColor }}>
                {activeLesson?.content?.map((block, index) => renderContent(block, index))}
              </div>
            </>
          )}
          {!activeLesson && (
            <div className="p-6 text-center text-gray-400">
              No lesson selected or available for this course.
            </div>
          )}
        </motion.div>

        <div
          className="lg:w-1/3 p-5 rounded-xl shadow-lg shadow-black/70 border border-[#222222]"
          style={{ backgroundColor: darkBgColor }}
        >
          <h3
            className="text-xl font-bold mb-4"
            style={gradientTextStyle}
          >
            Lessons
          </h3>
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-3 custom-scrollbar">
            {course.lessons.map((lesson) => (
              <motion.button
                key={lesson._id} // Use lesson._id as key
                onClick={() => setActiveLesson(lesson)}
                className={`
                  w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 ease-in-out
                  ${activeLesson && activeLesson._id === lesson._id
                    ? "border-l-4 border-purple-500 bg-purple-900/30"
                    : "bg-[#222222] hover:bg-[#2A2A2A]"
                  }
                  ${activeLesson && activeLesson._id === lesson._id ? 'text-transparent' : 'text-gray-300'}
                `}
                style={activeLesson && activeLesson._id === lesson._id ? gradientTextStyle : null}
                whileHover={{ x: activeLesson && activeLesson._id === lesson._id ? 0 : 5 }}
              >
                {lesson.title}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
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
  );
};

export default CourseDetails;