import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"; // Assuming a dark-themed Footer will be implemented or already exists
import { Users, Brain, Webcam } from "lucide-react"; 

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
const darkBgMap = "#131313";

const LandingPage = () => {
  // Updated Placeholder images for the new section (more varied categories)
  const productImages = [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
    "https://media.istockphoto.com/id/835148968/photo/red-headphones-isolated.jpg?s=612x612&w=0&k=20&c=JAEd1MYVaJjC0Iu1cZ4LPHRigRGZ-NJNjIXXs87me1E=",
    "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg",
    "https://img.freepik.com/free-photo/foundation-advertising-with-glowing-bottle_23-2149511223.jpg?semt=ais_hybrid&w=740",
    "https://jureursicphotography.com/wp-content/uploads/2020/10/2020_02_21_Sephora-Favurite-Box5247.jpg",
    "https://images.unsplash.com/photo-1505740106531-4243f3831c78?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWxlY3Ryb25pYyUyMGRldmljZXxlbnwwfHwwfHx8MA%3D%3D",
    "https://colorlib.com/wp/wp-content/uploads/sites/2/featured-single-product-wordpress-themes.jpg",
    "https://gs1datakart.org/upload/product_image/890600099/8906000991657/5d10b3e5e738d_f.jpg",
    "https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?cs=srgb&dl=pexels-eprism-studio-108171-335257.jpg&fm=jpg",
    "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcGYtbXUxNC10ZWQ2MTM5LWdsb3ktbC5qcGc.jpg",
    "https://www.helium10.com/app/uploads/2023/08/shutterstock_2251573229-copy-scaled.webp",
    "https://rukminim2.flixcart.com/image/850/1000/xif0q/cap/c/y/m/free-latest-side-ny-baseball-cap-highever-original-imagnm8fvyf9jbpv.jpeg?q=20&crop=false",
    "https://img.freepik.com/premium-photo/kitchen-utensils-countertop-culinary-background-wooden-white-ceramic-kitchenware-home-cooking-concept_745171-1943.jpg",
  ];

  const logotypes = [
    { name: "Shopify", src: "https://cdn.prod.website-files.com/6668551da3a255b9631ffddf/667a8260affc28adb367e8fc_shopify-logo.svg" },
    { name: "Amazon", src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { name: "eBay", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/EBay_logo.svg/1280px-EBay_logo.svg.png" },
    { name: "WooCommerce", src: "https://cdn.prod.website-files.com/6668551da3a255b9631ffddf/667a82609be698e16206efde_woo-commerce-logo.svg" },
    { name: "BigCommerce", src: "https://cdn.prod.website-files.com/6668551da3a255b9631ffddf/667a82606f7e806f89265940_bigcommerce-logo.svg" },
  ];

  const shopifyStoreData = [
    { id: 1, name: "Store A", revenue: "$7,342", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoOjC6LFb3d_Itzk1nemF61HLOql2hUEH1BEbOsUOv-7QchR9-r7LdOZDOac_fONr0BvI&usqp=CAU" },
    { id: 2, name: "Store B", revenue: "$14,231", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlBd1BB0vAJ54i8uMfti6YoqwPbKEOuVJgaMD6d1uAeiFd9yh0C0V8w5JVEJXiSEjQ4_M&usqp=CAU" },
    { id: 3, name: "Store C", revenue: "$79,321", icon: "https://i.pinimg.com/280x280_RS/ae/54/07/ae5407b8d5e12e3d683462e85a14bc8c.jpg" },
    { id: 4, name: "Store D", revenue: "$43,231", icon: "https://marketplace.canva.com/EAGNVlRKbDQ/1/0/1600w/canva-black-and-white-illustrative-the-barbershop-logo-V3VHZOwgehE.jpg" },
    { id: 5, name: "Store E", revenue: "$242,212", icon: "https://m.media-amazon.com/images/S/influencer-profile-image-prod/logo/influencer-c1aa4ca8_1613063095800_original._CR2%2C0%2C528%2C528_._US500_SCLZZZZZZZ_.jpeg" },
    { id: 6, name: "Store F", revenue: "$8,932", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnlNJyXQoV0uPNu741GcSTUTURygE882xrEuJykOb4-HEcFwPNguFTXHVvCghtXl5oQFs&usqp=CAU" },
  ];

  // Data for the new Global Sales Map section
  const globalSalesData = [
    { id: 1, amount: "$10 Sale", top: "32%", left: "18%" }, // North America
    { id: 2, amount: "$24 Sale", top: "35%", left: "22%" },
    { id: 3, amount: "$34 Sale", top: "30%", left: "32%" },
    { id: 4, amount: "$52 Sale", top: "45%", left: "15%" },
    { id: 5, amount: "$23 Sale", top: "50%", left: "25%" },
    { id: 6, amount: "$14 Sale", top: "35%", left: "55%" }, // Europe
    { id: 7, amount: "$32 Sale", top: "55%", left: "45%" }, // Africa
    { id: 8, amount: "$10 Sale", top: "55%", left: "58%" },
    { id: 9, amount: "$23 Sale", top: "70%", left: "30%" }, // South America
    { id: 10, amount: "$56 Sale", top: "50%", left: "68%" },
    { id: 11, amount: "$32 Sale", top: "80%", left: "85%" }, // Australia
    { id: 12, amount: "$62 Sale", top: "90%", left: "80%" },
  ];

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
            Join mentors who’ve already built profitable stores and learn from real experience. Stop wasting time and start making profit today.
          </motion.p>

          {/* New: User DPs and Members Joined Text - Corrected */}
          <motion.div
            className="flex items-center justify-center mb-8" // Container for DPs and text
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={1.75} // Appears after the paragraph, before the button
          >
            <div className="flex -space-x-4"> {/* Container for overlapping DPs */}
              <img src="https://i.pravatar.cc/60?img=1" alt="User Avatar 1" className="w-10 h-10 rounded-full border-2 border-gray-700 z-30 flex-shrink-0" />
              <img src="https://i.pravatar.cc/60?img=2" alt="User Avatar 2" className="w-10 h-10 rounded-full border-2 border-gray-700 z-20 flex-shrink-0" />
              <img src="https://i.pravatar.cc/60?img=3" alt="User Avatar 3" className="w-10 h-10 rounded-full border-2 border-gray-700 z-10 flex-shrink-0" /> {/* Corrected border-700 to border-gray-700 and added flex-shrink-0 */}
            </div>
            <p className="ml-4 text-lg font-semibold text-gray-300">500k+ members joined</p>
          </motion.div>

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

        {/* Applicable to All Sellers (Logotypes) - Moved up for early trust building */}
        <section className="py-12 px-4" style={{ backgroundColor: darkBgSecondary }}>
          <div className="max-w-7xl mx-auto">
            <motion.h2
              className="text-center text-gray-400 text-lg mb-8 tracking-widest uppercase font-semibold"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              POWERING SUCCESS ACROSS PLATFORMS
            </motion.h2>
            <div className="flex items-center justify-around flex-wrap gap-8">
              {logotypes.map((logo, index) => (
                <motion.img
                  key={logo.name}
                  src={logo.src}
                  alt={logo.name}
                  className="h-8 md:h-10 object-contain mx-4 opacity-75 hover:opacity-100 transition-opacity duration-300"
                  style={{ filter: 'brightness(0) invert(1)' }} /* Invert color for dark background */
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  custom={index + 1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Core Features / Why Choose DropMastery - Expanded Content */}
        <section className="py-16 px-4 text-center" aria-labelledby="benefits-title" style={{ backgroundColor: darkBgPrimary }}> {/* Dark background */}
          <h2
            id="benefits-title"
            className="text-4xl font-extrabold mb-12"
            style={gradientTextStyle} // Apply gradient
          >
            Unlock Your Dropshipping Potential with DropMastery
          </h2>
          <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
        {[
          { icon: <Users size={64} className="text-purple-400" />, title: "Expert Mentorship & Guidance", description: "Get personalized support and guidance from experienced dropshipping mentors who have built and scaled profitable stores. Avoid common pitfalls and learn from their successes." },
          { icon: <Brain size={64} className="text-purple-400" />, title: "AI-Powered Product Research", description: "Discover winning products effortlessly with our cutting-edge AI tools. Identify trending items, analyze market demand, and find your next bestseller without endless manual searching." },
          { icon: <Webcam size={64} className="text-purple-400" />, title: "Live Classes & Community Q&A", description: "Participate in live interactive sessions, ask questions directly to mentors, and connect with a thriving community of dropshippers. Stay updated with the latest strategies and overcome challenges together." },
        ].map((item, index) => (
          <motion.article
            key={index}
            className="p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 border flex flex-col items-center" // Added flex-col and items-center for icon centering
            style={{ backgroundColor: darkBgCard, borderColor: darkBorderColor }} // Dark card background and border
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={index + 1}
          >
            <div className="mb-6">{item.icon}</div> {/* Replaced img with div for icon */}
            <h3
              className="text-xl font-bold mb-3"
              style={gradientTextStyle} // Apply gradient
            >
              {item.title}
            </h3>
            <p className="text-gray-300 leading-relaxed">{item.description}</p> {/* Adjusted text color */}
          </motion.article>
        ))}
      </div>
        </section>

        {/* New Section: Products at Your Fingertips (AI Product Research) */}
        <section className="py-20 px-4" style={{ backgroundColor: darkBgSecondary }}>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Left Column: Text Content */}
            <div className="md:w-1/2 text-center md:text-left">
              <motion.h2
                className="text-4xl md:text-4xl font-extrabold mb-4 leading-tight"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                style={gradientTextStyle}
              >
                Millions of products at your fingertips
              </motion.h2>
              <motion.p
                className="text-lg text-gray-300 mb-8 max-w-xl mx-auto md:mx-0" /* Added mx-auto for mobile centering */
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                custom={1.5}
              >
                Find your next profitable product by exploring our vast database with millions of products. Use our smart filters and AI insights to refine your search and find products tailored to your interests and niche with one click import to your Shopify store.
              </motion.p>
              <motion.button
                className="text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition-all duration-300 ease-out hover:scale-105 active:scale-95"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                custom={2}
                aria-label="Start Product Research"
                style={gradientButtonStyle}
              >
                Start Product Research
              </motion.button>
            </div>

            {/* Right Column: Image Grid with Infinite Scrolling Rows */}
            <motion.div
              className="md:w-1/2 flex flex-col gap-y-6 py-8 rounded-xl border relative overflow-hidden" /* Changed gap-y to gap-y-6 and py to py-8 */
              style={{ backgroundColor: darkBgCard, borderColor: darkBorderColor, height: '400px' }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              custom={2.5}
            >
              {/* Row 1: Scroll Right */}
              <motion.div
                className="flex flex-nowrap gap-x-3 w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ ease: "linear", duration: 40, repeat: Infinity }} /* Increased duration to 40 for slower speed */
              >
                {/* Duplicate content to ensure smooth loop */}
                {productImages.concat(productImages).map((src, index) => (
                  <img
                    key={`row1-${src}-${index}`}
                    src={src}
                    alt={`Product ${index + 1}`}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md flex-shrink-0 border border-[#222222]"
                  />
                ))}
              </motion.div>

              {/* Row 2: Scroll Left */}
              <motion.div
                className="flex flex-nowrap gap-x-3 w-max"
                animate={{ x: ["-50%", "0%"] }}
                transition={{ ease: "linear", duration: 40, repeat: Infinity, delay: 0.5 }} /* Increased duration to 40 */
              >
                {productImages.concat(productImages).map((src, index) => (
                  <img
                    key={`row2-${src}-${index}`}
                    src={src}
                    alt={`Product ${index + 1}`}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md flex-shrink-0 border border-[#222222]"
                  />
                ))}
              </motion.div>

              {/* Row 3: Scroll Right */}
              <motion.div
                className="flex flex-nowrap gap-x-3 w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ ease: "linear", duration: 40, repeat: Infinity, delay: 1 }} /* Increased duration to 40 */
              >
                {productImages.concat(productImages).map((src, index) => (
                  <img
                    key={`row3-${src}-${index}`}
                    src={src}
                    alt={`Product ${index + 1}`}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md flex-shrink-0 border border-[#222222]"
                  />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* New Section: Track Revenue of Shopify Stores */}
        <section className="py-20 px-4" style={{ backgroundColor: darkBgPrimary }}>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12"> {/* Changed back to md:flex-row */}
            {/* Right Column: Tracking Interface (now physically on the left) */}
            <motion.div
              className="md:w-1/2 p-6 md:p-8 rounded-xl border relative"
              style={{ backgroundColor: darkBgCard, borderColor: darkBorderColor }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              custom={2.5}
            >
              {/* Tracking Stores Header */}
              <div className="flex items-center justify-center mb-6">
                <div className="border border-blue-500 text-blue-400 rounded-full px-4 py-2 flex items-center gap-2 text-sm font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                  Tracking stores
                </div>
              </div>

              {/* Revenue Cards Grid */}
              <div className="grid grid-cols-2 gap-4">
                {shopifyStoreData.map((store, index) => (
                  <motion.div
                    key={store.id}
                    className="p-4 rounded-lg border text-center flex flex-col items-center justify-center"
                    style={{ backgroundColor: darkBgSecondary, borderColor: darkBorderColor }} 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    custom={index * 0.2 + 3} // Stagger animation
                  >
                    <img src={store.icon} alt={store.name} className="w-10 h-10 object-contain mb-2 rounded-full" />
                    <p className="text-xl font-bold mb-1" style={gradientTextStyle}>{store.revenue}</p>
                    <p className="text-gray-400 text-sm">Revenue</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Left Column: Text Content (now physically on the right) */}
            <div className="md:w-1/2 text-center md:text-left">
              <motion.h2
                className="text-4xl md:text-4xl font-extrabold mb-4 leading-tight"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                style={gradientTextStyle}
              >
                Instantly Track Shopify Store Performance
              </motion.h2>
              <motion.p
                className="text-lg text-gray-300 mb-8 max-w-xl mx-auto md:mx-0"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                custom={1.5}
              >
                DropMastery provides real-time access to competitors' Shopify store product offerings and revenue data. This powerful insight empowers you to identify winning products, analyze successful strategies, and minimize the risk of selling low-performing items.
              </motion.p>
              <motion.button
                className="text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition-all duration-300 ease-out hover:scale-105 active:scale-95"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                custom={2}
                aria-label="Start Tracking Now"
                style={gradientButtonStyle}
              >
                Start Tracking Now
              </motion.button>
            </div>
          </div>
        </section>

        {/* Global Sales Map - Positioned to show market opportunity */}
        <section className="py-20 px-4 text-center" style={{ backgroundColor: darkBgMap }}>
          <motion.h2
            className="text-4xl md:text-4xl font-extrabold mb-12 leading-tight"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            style={gradientTextStyle}
          >
            Tap into a rapidly growing global market
          </motion.h2>
          <div className="max-w-7xl mx-auto relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
            <img
             src="https://img.freepik.com/premium-vector/grey-map-world-high-detail-world-map_601298-2429.jpg?uid=R50694967&ga=GA1.1.1575405467.1748030386&semt=ais_items_boosted&w=740" // Using the provided screenshot image
             alt="World Map with Sales Data"
             className="absolute inset-0 w-full h-full object-contain object-center opacity-70 rounded-md" // Added rounded-md class for rounded corners
           />

            {globalSalesData.map((sale, index) => (
              <motion.div
                key={sale.id}
                className="absolute text-sm font-semibold px-3 py-1 rounded-full whitespace-nowrap"
                style={{
                  top: sale.top,
                  left: sale.left,
                  transform: 'translate(-50%, -50%)', // Center the sale point
                  ...gradientTextStyle, // Apply the gradient to the text
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2 + 0.5, // Stagger animation for each point
                  repeat: Infinity, // Make the animation repeat
                  repeatType: "reverse", // Reverse the animation on repeat
                  repeatDelay: Math.random() * 2 + 1 // Random delay between repeats
                }}
                animate={{
                  scale: [1, 1.1, 1], // Pulse animation
                  opacity: [1, 0.7, 1] // Subtle opacity change with pulse
                }}
              >
                {sale.amount}
              </motion.div>
            ))}
          </div>
          <motion.p
            className="text-lg text-gray-300 mt-8 max-w-2xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0.5}
          >
            Dropshipping is a global phenomenon. Our tools and mentorship help you identify profitable niches and expand your reach across continents, maximizing your earning potential.
          </motion.p>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 text-center px-4" aria-labelledby="testimonials-title" style={{ backgroundColor: darkBgSecondary }}> {/* Dark background */}
          <h2
            id="testimonials-title"
            className="text-4xl font-extrabold mb-12"
            style={gradientTextStyle} // Apply gradient
          >
            Hear From Our Successful Students
          </h2>
          <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
            {[
              { id: 1, text: "Thanks to DropMastery, I made my first $1,000 profit in just weeks! The personalized mentorship was a game-changer.", name: "Alex R." },
              { id: 2, text: "The AI tools are incredibly powerful and easy to use. Product research has never been easier or more accurate, leading to real sales.", name: "Maria S." },
              { id: 3, text: "The live sessions with mentors provide invaluable insights, and the community support is fantastic. Highly recommended for anyone serious about dropshipping!", name: "David L." },
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
        <section className="py-20 text-center px-4" style={{ backgroundColor: darkBgPrimary }}> {/* Dark background */}
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
          <motion.p
            className="text-lg text-gray-300 mb-8 max-w-xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={1.5}
          >
            Stop guessing and start winning. Join DropMastery today and transform your dropshipping business.
          </motion.p>
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