// import React, { useState } from "react";
// import { motion } from "framer-motion"; // Import motion for animations
// import { useNavigate } from "react-router-dom"; // Import useNavigate hook
// // Import icons from lucide-react if you want to use them for courses
// import { Award, Zap, LayoutDashboard, DollarSign, MessageSquare, Briefcase, BarChart2, CheckCircle } from "lucide-react";

// // Define a common style object for gradient text
// const gradientTextStyle = {
//   background: 'linear-gradient(to right, #6A67FE, #FE67F6)', // Gradient from the image
//   WebkitBackgroundClip: 'text',
//   WebkitTextFillColor: 'transparent',
//   backgroundClip: 'text',
//   color: 'transparent', // Fallback
// };

// // Define a common dark background color for cards/sections
// const darkBgColor = "#1E1E1E"; // From your DashboardHome and MyMentor components
// const darkBorderColor = "#222222"; // Consistent border color

// const myCourses = [
//   {
//     id: 1,
//     title: "Dropshipping Fundamentals",
//     mentor: "Sarah Lee",
//     progress: 65,
//     icon: <Briefcase size={48} className="text-purple-400" />, // Using Lucide icon
//   },
//   {
//     id: 2,
//     title: "Advanced Facebook Ads",
//     mentor: "John Carter",
//     progress: 30,
//     icon: <BarChart2 size={48} className="text-purple-400" />, // Using Lucide icon
//   },
//   {
//     id: 3,
//     title: "Build Shopify Store",
//     mentor: "Nina Patel",
//     progress: 100,
//     icon: <LayoutDashboard size={48} className="text-purple-400" />, // Using Lucide icon
//   },
//   {
//     id: 4,
//     title: "Winning Product Research",
//     mentor: "Alex Chen",
//     progress: 80,
//     icon: <Zap size={48} className="text-purple-400" />,
//   },
//   {
//     id: 5,
//     title: "Customer Service Excellence",
//     mentor: "Maria Garcia",
//     progress: 100,
//     icon: <MessageSquare size={48} className="text-purple-400" />,
//   },
//   {
//     id: 6,
//     title: "E-commerce Analytics",
//     mentor: "David Kim",
//     progress: 45,
//     icon: <DollarSign size={48} className="text-purple-400" />,
//   },
// ];

// const MyCourses = () => {
//   const [filter, setFilter] = useState("All");
//   const navigate = useNavigate(); // Initialize useNavigate

//   const filteredCourses = myCourses.filter((course) => {
//     if (filter === "In Progress") return course.progress < 100;
//     if (filter === "Completed") return course.progress === 100;
//     return true;
//   });

//   const handleButtonClick = (courseId) => {
//     // Navigate to the course-details page, potentially passing the courseId as a state or URL parameter
//     navigate(`/dashboard/student/course-details/${courseId}`); // Example: passing ID as URL parameter
//     // Or navigate('/dashboard/student/course-details', { state: { courseId: courseId } });
//   };

//   return (
//     <div className="p-8"> {/* Increased padding for consistency */}
//       {/* Apply gradient to the main heading */}
//       <h2
//         className="text-3xl font-extrabold mb-8" // Increased font size and margin, bolder
//         style={gradientTextStyle}
//       >
//         My Courses
//       </h2>

//       {/* Filter Buttons */}
//       <div className="flex gap-4 mb-8"> {/* Increased gap and margin */}
//         {["All", "In Progress", "Completed"].map((item) => (
//           <motion.button
//             key={item}
//             className={`px-5 py-2.5 rounded-full text-base font-medium transition-all duration-300 ease-in-out ${ // Adjusted padding and font size
//               filter === item
//                 ? "bg-purple-600 text-white shadow-md shadow-purple-500/30" // Active state: solid purple background with subtle shadow
//                 : "bg-transparent text-gray-400 border border-gray-700 hover:border-purple-600 hover:text-white" // Inactive state: transparent with border
//             }`}
//             onClick={() => setFilter(item)}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             transition={{ type: "spring", stiffness: 200 }}
//           >
//             {item}
//           </motion.button>
//         ))}
//       </div>

//       {/* Course Cards Grid */}
//       <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
//         {filteredCourses.map((course, index) => (
//           <motion.div
//             key={course.id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
//             whileHover={{ scale: 1.02 }}
//             className="rounded-xl shadow-lg shadow-black/70 overflow-hidden border" // Added border
//             style={{ backgroundColor: darkBgColor, borderColor: darkBorderColor }} // Applied border color
//           >
//             <div className="p-5 flex flex-col items-center text-center"> {/* Increased padding, added flex for icon centering */}
//               <div className="mb-4">
//                 {course.icon} {/* Render the icon directly */}
//               </div>
//               {/* Course title now white */}
//               <h3
//                 className="text-xl font-semibold mb-2 text-white" // Changed text color to white
//               >
//                 {course.title}
//               </h3>
//               <p className="text-sm text-gray-400 mb-3"> {/* Adjusted text color */}
//                 Mentor: <span className="font-medium text-gray-300">{course.mentor}</span> {/* Adjusted mentor name color */}
//               </p>

//               {/* Progress bar */}
//               <div className="w-full bg-gray-700 h-2 rounded-full mb-4"> {/* Darker background for the track */}
//                 <div
//                   className="bg-purple-500 h-2 rounded-full" // Vibrant purple for the progress fill
//                   style={{ width: `${course.progress}%` }}
//                 ></div>
//               </div>

//               {/* Action Button */}
//               <motion.button
//                 className="w-full bg-purple-600 text-white py-2.5 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out text-base font-medium" // Consistent button styling
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 transition={{ type: "spring", stiffness: 200 }}
//                 onClick={() => handleButtonClick(course.id)} // Added onClick handler
//               >
//                 {course.progress === 100 ? "Review" : "Continue Learning"}
//               </motion.button>
//             </div>
//           </motion.div>
//         ))}
//         {filteredCourses.length === 0 && (
//           <div className="md:col-span-3 sm:col-span-2 col-span-1 p-6 text-center text-gray-400 text-lg">
//             No courses found for this filter.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyCourses;



import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Award, Zap, LayoutDashboard, DollarSign, MessageSquare, Briefcase, BarChart2, CheckCircle } from "lucide-react";

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
const darkBorderColor = "#222222";

const MyCourses = () => {
  const [filter, setFilter] = useState("All");
  const [courses, setCourses] = useState([]); // State to store fetched courses
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null);   // State for error handling
  const navigate = useNavigate();

  // Function to fetch courses from the API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/courses'); // Your API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Assuming your backend sends an array of course objects under 'courses' key
        // The mock 'progress' is not coming from the backend, so we need to add it or remove it.
        // For demonstration, let's just add a dummy progress or remove it.
        // If you want actual progress, that logic would need to be in your backend/data.
        const coursesWithDummyProgress = data.courses.map(course => ({
          ...course,
          progress: Math.floor(Math.random() * 101), // Add a dummy progress for display
          // You might need a more sophisticated way to assign icons or remove them if not used
          icon: <Award size={48} className="text-purple-400" />, // Default icon
        }));
        setCourses(coursesWithDummyProgress);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        setError("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []); // Empty dependency array means this runs once on mount

  const filteredCourses = courses.filter((course) => {
    if (filter === "In Progress") return course.progress < 100;
    if (filter === "Completed") return course.progress === 100;
    return true;
  });

  const handleButtonClick = (courseId) => {
    navigate(`/dashboard/student/course-details/${courseId}`);
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-400">
        <p className="text-lg">Loading courses...</p>
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

  return (
    <div className="">
      <h2
        className="text-3xl font-extrabold mb-8"
        style={gradientTextStyle}
      >
        My Courses
      </h2>

      {/* Filter Buttons */}
      <div className="flex gap-4 mb-8">
        {["All", "In Progress", "Completed"].map((item) => (
          <motion.button
            key={item}
            className={`px-5 py-2.5 rounded-full text-base font-medium transition-all duration-300 ease-in-out ${
              filter === item
                ? "bg-purple-600 text-white shadow-md shadow-purple-500/30"
                : "bg-transparent text-gray-400 border border-gray-700 hover:border-purple-600 hover:text-white"
            }`}
            onClick={() => setFilter(item)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {item}
          </motion.button>
        ))}
      </div>

      {/* Course Cards Grid */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course, index) => (
            <motion.div
              key={course._id} // Use MongoDB _id as key
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="rounded-xl shadow-lg shadow-black/70 overflow-hidden border"
              style={{ backgroundColor: darkBgColor, borderColor: darkBorderColor }}
            >
              <div className="p-5 flex flex-col items-center text-center">
                <div className="mb-4">
                  {/* You might want to assign specific icons based on category or type from backend */}
                  {course.icon}
                </div>
                <h3
                  className="text-xl font-semibold mb-2 text-white"
                >
                  {course.title}
                </h3>
                {/* Display mentors. Assuming 'mentors' is an array of objects with 'name' property */}
                <p className="text-sm text-gray-400 mb-1">
                  Mentor(s):{" "}
                  <span className="font-medium text-gray-300">
                    {course.mentors && course.mentors.length > 0
                      ? course.mentors.map(m => m.name).join(', ')
                      : 'N/A'}
                  </span>
                </p>
                {/* Display price */}
                <p className="text-sm text-gray-400 mb-3">
                  Price:{" "}
                  <span className="font-medium text-gray-300">
                    ${course.price.toFixed(2)}
                  </span>
                </p>

                {/* Progress bar - still using dummy progress */}
                <div className="w-full bg-gray-700 h-2 rounded-full mb-4">
                  <div
                    className="bg-purple-500 h-2 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>

                <motion.button
                  className="w-full bg-purple-600 text-white py-2.5 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out text-base font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  onClick={() => handleButtonClick(course._id)} 
                >
                  {course.progress === 100 ? "Review" : "Continue Learning"}
                </motion.button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="md:col-span-3 sm:col-span-2 col-span-1 p-6 text-center text-gray-400 text-lg">
            No courses found.
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
