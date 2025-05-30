import React from "react";
import { motion } from "framer-motion";
import { Users, BookOpen, Lightbulb } from "lucide-react"; // Example icons
import Navbar from "../../../components/Navbar";

// Define common styles
const gradientTextStyle = {
    background: 'linear-gradient(to right, #6A67FE, #FE67F6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: 'transparent',
};
const darkBgColor = "#121212"; // Main background
const darkCardBg = "#1E1E1E"; // Card background
const darkBorderColor = "#222222"; // Border color

const About = () => {
    const sections = [
        {
            icon: <Lightbulb size={48} className="text-purple-400" />,
            title: "Our Mission",
            description: "At DropMastery, our mission is to empower aspiring entrepreneurs with the knowledge and tools to succeed in the dynamic world of dropshipping. We believe in accessible education and practical mentorship to turn your e-commerce dreams into reality.",
        },
        {
            icon: <Users size={48} className="text-purple-400" />,
            title: "Who We Are",
            description: "We are a team of experienced e-commerce professionals, successful dropshippers, and dedicated educators. Our diverse backgrounds allow us to provide comprehensive insights and support, guiding you through every step of your entrepreneurial journey.",
        },
        {
            icon: <BookOpen size={48} className="text-purple-400" />,
            title: "What We Offer",
            description: "From in-depth courses covering everything from product research to advanced marketing, to live mentorship sessions and a vibrant community forum, DropMastery offers a holistic learning environment designed for real-world application and measurable results.",
        },
    ];

    return (
        <>
            <Navbar />
            <motion.div
                className="min-h-screen p-8"
                style={{ backgroundColor: darkBgColor }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.h1
                    className="text-4xl font-extrabold mb-8 text-center"
                    style={gradientTextStyle}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    About DropMastery
                </motion.h1>

                <motion.p
                    className="text-lg text-gray-300 text-center max-w-3xl mx-auto mb-12"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    Your ultimate platform for mastering dropshipping and building a thriving online business. We connect you with expert mentors and provide cutting-edge resources to accelerate your success.
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {sections.map((section, index) => (
                        <motion.div
                            key={index}
                            className="bg-[#1E1E1E] rounded-xl shadow-lg shadow-black/60 border border-[#222222] p-8 flex flex-col items-center text-center"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                            whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.4)" }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="mb-4">{section.icon}</div>
                            <h3 className="text-2xl font-semibold text-gray-100 mb-3" style={gradientTextStyle}>
                                {section.title}
                            </h3>
                            <p className="text-gray-400 text-base">{section.description}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="text-center mt-12 text-gray-500 text-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                >
                    Join us today and start your journey to financial freedom!
                </motion.div>
            </motion.div>
        </>
    );
};

export default About;
