import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"; // Assuming a dark-themed Footer will be implemented or already exists

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3 },
  }),
};

// Define a common style object for gradient text
const gradientTextStyle = {
  background: 'linear-gradient(to right, #6A67FE, #FE67F6)', // Gradient from the image
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent', // Fallback
};

// Define a common style object for gradient buttons
const gradientButtonStyle = {
  background: 'linear-gradient(to right, #6A67FE, #FE67F6)',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)', // Subtle shadow
};

// Define common dark background colors
const darkBgPrimary = "#121212"; // Primary dark background, consistent with StudentLayout main
const darkBgSecondary = "#1A1A1A"; // Slightly lighter dark for sections
const darkBgCard = "#1E1E1E"; // Dark background for cards
const darkBorderColor = "#222222"; // Consistent border color

const LandingPage = () => {
  return (
    <>
      <Navbar /> {/* Assuming Navbar is already dark-themed */}

      <main className="bg-black text-gray-300"> {/* Set main background to black and default text to light gray */}
        {/* Hero Section */}
        <section className="py-20 px-4 text-center flex flex-col items-center shadow-inner" style={{ backgroundColor: darkBgPrimary }}> {/* Dark background */}
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold mb-5 leading-tight"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            style={gradientTextStyle} // Apply gradient
          >
            Tired of Failing at Dropshipping?
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl" // Adjusted text color for dark background
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={1.5}
          >
            Join mentors who’ve already built profitable stores and learn from real experience.
          </motion.p>
          <motion.button
            className="text-white font-bold py-4 px-10 rounded-full shadow-lg transform transition-all duration-300 ease-out hover:scale-105 active:scale-95"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={2}
            aria-label="Get Started Now"
            style={gradientButtonStyle} // Apply gradient button style
          >
            Get Started Now
          </motion.button>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4 text-center" aria-labelledby="benefits-title" style={{ backgroundColor: darkBgSecondary }}> {/* Dark background */}
          <h2
            id="benefits-title"
            className="text-4xl font-extrabold mb-12"
            style={gradientTextStyle} // Apply gradient
          >
            Why Choose DropMastery?
          </h2>
          <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
            {[
              { img: "https://img.freepik.com/free-vector/hand-drawn-flat-design-affiliate-marketing-illustration_23-2149347413.jpg?ga=GA1.1.843766667.1747855460&semt=ais_hybrid&w=740", title: "Daily Mentorship Support" },
              { img: "https://img.freepik.com/free-vector/robot-doing-repeatable-tasks-with-lot-folders-magnifier-robotic-process-automation-service-robots-profit-automated-processing-concept_335657-2111.jpg?ga=GA1.1.843766667.1747855460&semt=ais_hybrid&w=740", title: "AI Product Research Tools" },
              { img: "https://img.freepik.com/free-vector/online-tutorials-concept_52683-37481.jpg?ga=GA1.1.843766667.1747855460&semt=ais_hybrid&w=740", title: "Live Classes & Q&A" },
            ].map((item, index) => (
              <motion.article
                key={index}
                className="p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 border"
                style={{ backgroundColor: darkBgCard, borderColor: darkBorderColor }} // Dark card background and border
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                custom={index + 1}
              >
                <img src={item.img} alt={item.title} className="w-full h-48 object-contain rounded mb-6" />
                <h3
                  className="text-xl font-bold mb-3"
                  style={gradientTextStyle} // Apply gradient
                >
                  {item.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> {/* Adjusted text color */}
              </motion.article>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 text-center px-4" aria-labelledby="testimonials-title" style={{ backgroundColor: darkBgPrimary }}> {/* Dark background */}
          <h2
            id="testimonials-title"
            className="text-4xl font-extrabold mb-12"
            style={gradientTextStyle} // Apply gradient
          >
            What Our Students Say
          </h2>
          <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
            {[
              { id: 1, text: "Thanks to DropMastery, I made my first $1,000 profit in just weeks!", name: "Alex R." },
              { id: 2, text: "The AI tools are a game-changer! Product research has never been easier.", name: "Maria S." },
              { id: 3, text: "The live sessions with mentors provide invaluable insights. Highly recommended!", name: "David L." },
            ].map((testimonial, id) => (
              <motion.article
                key={testimonial.id}
                className="p-8 rounded-xl shadow-xl border"
                style={{ backgroundColor: darkBgCard, borderColor: darkBorderColor }} // Dark card background and border
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                custom={id + 1}
              >
                <img
                  src={`https://img.freepik.com/premium-photo/color-user-icon-white-background_961147-8.jpg?ga=GA1.1.843766667.1747855460&semt=ais_hybrid&w=740`} // Using DiceBear for varied avatars
                  alt={`Student ${testimonial.name}`}
                  className="w-24 h-24 rounded-full mx-auto mb-6 object-cover border-2 border-gray-700" // Darker border for avatar
                />
                <p className="text-gray-300 italic text-lg mb-4">“{testimonial.text}”</p> {/* Adjusted text color */}
                <p className="font-bold text-lg" style={gradientTextStyle}>- {testimonial.name}</p> {/* Applied gradient */}
              </motion.article>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 text-center px-4" style={{ backgroundColor: darkBgSecondary }}> {/* Dark background */}
          <motion.h2
            className="text-4xl font-extrabold mb-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            style={gradientTextStyle} // Apply gradient
          >
            Ready to Start Your Success Journey?
          </motion.h2>
          <motion.button
            className="text-white font-bold py-4 px-12 rounded-full shadow-lg transform transition-all duration-300 ease-out hover:scale-105 active:scale-95"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={2}
            aria-label="Find a Mentor"
            style={gradientButtonStyle} // Apply gradient button style
          >
            Find a Mentor
          </motion.button>
        </section>
      </main>

      <Footer /> {/* Assuming Footer is already dark-themed */}
    </>
  );
};

export default LandingPage;