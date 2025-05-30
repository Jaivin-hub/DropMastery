import React, { useState, useEffect, useRef } from 'react'; // Import useRef
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react'; // Import the X (close) icon
import axios from '../../../api/axios'; // Adjust path
import { toast } from 'react-toastify';

const gradientTextStyle = {
  background: 'linear-gradient(to right, #6A67FE, #FE67F6)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent',
};

// Accept onHeightChange prop from the parent (StudentLayout)
const PosterAnnouncementBanner = ({ onHeightChange }) => {
  const [poster, setPoster] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const bannerRef = useRef(null); // Create a ref for the banner element

  useEffect(() => {
    const fetchPoster = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
          setPoster(null);
          setIsVisible(false);
          // If no auth token, ensure height is reported as 0
          if (onHeightChange) onHeightChange(0);
          return;
        }

        const response = await axios.get('/announcements/poster', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        const fetchedPoster = response.data.announcement;

        if (fetchedPoster) {
          const dismissed = localStorage.getItem(`dismissed_announcement_${fetchedPoster._id}`);
          const isExpired = fetchedPoster.posterUntil && new Date(fetchedPoster.posterUntil) < new Date();

          if (!dismissed && !isExpired) {
            setPoster(fetchedPoster);
            setIsVisible(true);
          } else {
            setPoster(null);
            setIsVisible(false);
            // If poster is dismissed or expired, ensure height is reported as 0
            if (onHeightChange) onHeightChange(0);
          }
        } else {
          setPoster(null);
          setIsVisible(false);
          // If no poster is returned from API, ensure height is reported as 0
          if (onHeightChange) onHeightChange(0);
        }
      } catch (error) {
        console.error("Error fetching poster announcement:", error);
        if (error.response?.status !== 404 && error.response?.status !== 200 && !error.response?.data?.announcement) {
          toast.error("Failed to load poster announcement.");
        }
        setPoster(null);
        setIsVisible(false);
        // On error, ensure height is reported as 0
        if (onHeightChange) onHeightChange(0);
      }
    };

    fetchPoster();
  }, []);

  // Use useEffect to measure banner height and report it to parent
  useEffect(() => {
    // Only proceed if the ref is attached and onHeightChange callback is provided
    if (bannerRef.current && onHeightChange) {
      if (isVisible) {
        // Measure height when the banner becomes visible
        const resizeObserver = new ResizeObserver(entries => {
          for (let entry of entries) {
            // Report the actual height to the parent component
            onHeightChange(entry.contentRect.height);
          }
        });
        resizeObserver.observe(bannerRef.current);
        // Clean up observer when component unmounts or visibility changes
        return () => resizeObserver.disconnect();
      } else {
        // If banner is not visible, report 0 height to parent
        onHeightChange(0);
      }
    }
  }, [isVisible, onHeightChange]); // Re-run effect when visibility or callback changes


  const handleClose = () => {
    if (poster) {
      localStorage.setItem(`dismissed_announcement_${poster._id}`, 'true');
    }
    setIsVisible(false);
  };

  const handleButtonClick = () => {
    if (poster && poster.buttonUrl) {
      window.open(poster.buttonUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // Only render AnimatePresence if poster data exists, to avoid unnecessary rendering
  // AnimatePresence will handle the exit animation based on isVisible state
  if (!poster) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={bannerRef} // Attach the ref to the main banner container
          // Main container for the banner.
          // Keep a background color for fallback if image fails or isn't present
          className="w-full bg-[#1A1A1A] text-white py-3 px-8 shadow-md border-b border-[#222222] flex items-center justify-between z-40 relative overflow-hidden"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
        >
          {/* Background Image (Conditional Rendering) */}
          {poster.imageUrl && (
            <>
              <img
                src={poster.imageUrl} // Use the dynamic image URL from the poster data
                alt="Announcement Background"
                className="absolute inset-0 w-full h-full object-cover" // Fills the entire banner area
              />
              {/* Optional: Overlay for better text readability on top of image */}
              <div className="absolute inset-0 bg-black opacity-40"></div> {/* Adjust opacity (0-100) */}
            </>
          )}

          {/* Content (Title, Message) - takes up available space */}
          <div className="flex-1 relative z-10 flex flex-col pr-4"> {/* Added pr-4 to content div */}
            <h4 className="text-lg font-bold" style={gradientTextStyle}>{poster.title}</h4>
            <p className="text-gray-300 text-sm">{poster.message}</p>
          </div>

          {/* Dynamic Button (Conditional Rendering) - positioned before close icon */}
          {poster.buttonText && poster.buttonUrl && (
            <motion.button
              onClick={handleButtonClick}
              className="flex-shrink-0 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out font-semibold text-sm relative z-10 mr-4 cursor-pointer" // Added mr-4 for spacing
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {poster.buttonText}
            </motion.button>
          )}

          {/* Close Icon - positioned at the very end */}
          <motion.button
            onClick={handleClose}
            className="flex-shrink-0 p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-700 transition duration-300 ease-in-out relative z-10"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
            aria-label="Close Announcement"
          >
            <X size={20} />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PosterAnnouncementBanner;