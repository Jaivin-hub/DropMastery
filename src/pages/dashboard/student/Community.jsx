import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon, Send } from "lucide-react";

// Define a common style object for gradient text
const gradientTextStyle = {
  background: 'linear-gradient(to right, #6A67FE, #FE67F6)', // Gradient from the image
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent', // Fallback
};

// Define common dark background colors
const darkBgColor = "#1E1E1E"; // Consistent for main cards
const darkBgColorLighter = "#222222"; // Slightly lighter for inputs, etc.
const darkBorderColor = "#222222"; // Consistent border color

// ---------- demo data ----------
const demoPosts = [
  {
    id: 1,
    user: "Eva",
    avatar: "https://img.freepik.com/premium-vector/woman-violet-hoodie-blue-circle-with-brown-hairs-cute-girl-avatar-circle-female-v_630301-25.jpg?ga=GA1.1.843766667.1747855460&semt=ais_hybrid&w=740",
    content: "Just hit 10k in sales! Thanks to the community tips!",
    timestamp: "2 days ago",
    comments: [{ id: 61, user: "Mentor-Sarah", text: "Awesome, keep it up!" }],
  },
  {
    id: 2,
    user: "Bob",
    avatar: "https://img.freepik.com/premium-vector/asian-men-avatar_7814-345.jpg?ga=GA1.1.843766667.1747855460&semt=ais_hybrid&w=740",
    content: "Here’s my winning product research workflow 👇",
    timestamp: "5 h ago",
    comments: [],
  },
  {
    id: 3,
    user: "Mentor-Sarah",
    avatar: "https://img.freepik.com/premium-vector/people-avatar-icons-man_755164-20762.jpg?ga=GA1.1.843766667.1747855460&semt=ais_hybrid&w=740",
    content: "Don't forget our live Q&A session on sourcing tomorrow at 3 PM EST!",
    timestamp: "10 h ago",
    comments: [],
  },
  {
    id: 4,
    user: "Charlie",
    avatar: "https://img.freepik.com/premium-vector/european-men-avatar_7814-344.jpg?ga=GA1.1.843766667.1747855460&semt=ais_hybrid&w=740",
    content: "Is anyone else having trouble with Shopify payouts recently?",
    timestamp: "12 h ago",
    comments: [{ id: 41, user: "You", text: "Yes, I'm seeing delays too!" }],
  },
  {
    id: 5,
    user: "Mentor-David",
    avatar: "https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?ga=GA1.1.843766667.1747855460&semt=ais_hybrid&w=740",
    content: "New tutorial released: 'Mastering TikTok Ads for Dropshipping'",
    timestamp: "1 day ago",
    comments: [],
  },
  {
    id: 6,
    user: "Alice",
    avatar: "https://img.freepik.com/premium-vector/character-avatar-isolated_729149-194801.jpg?ga=GA1.1.843766667.1747855460&semt=ais_hybrid&w=740",
    content: "Just launched my first store! 🚀 Any tips on scaling FB ads?",
    timestamp: "2 h ago",
    comments: [
      { id: 11, user: "Mentor-John", text: "Congrats! Start with 5-$10 ad sets and test creatives fast." },
      { id: 12, user: "You", text: "That's a great tip, thanks!" },
    ],
  },
];

const onlineUsers = ["Jane-Mentor", "Sam", "Priya", "Mentor-Lee", "David", "Emily", "Chris", "Olivia", "Mark"];

// ---------- component ----------
const Community = () => {
  const [posts, setPosts] = useState(demoPosts);
  const [newPost, setNewPost] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [chatLog, setChatLog] = useState([
    { id: 1, user: "System", text: "Welcome to the live community chat!" },
    { id: 2, user: "Mentor-Jane", text: "Hello everyone! Happy to help with any questions." },
  ]);

  const chatMessagesRef = useRef(null); // Ref for chat messages container
  const postFeedRef = useRef(null); // Ref for post feed container

  // Scroll chat to bottom when new messages arrive
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatLog]);

  // Scroll post feed to bottom when new posts are added
  useEffect(() => {
    if (postFeedRef.current) {
      postFeedRef.current.scrollTop = postFeedRef.current.scrollHeight;
    }
  }, [posts]);

  // add post - new posts will now be added to the END of the array
  const handlePost = () => {
    if (!newPost.trim()) return;
    setPosts([
      ...posts, // Existing posts first
      {
        id: Date.now(),
        user: "You",
        avatar: "https://img.freepik.com/premium-vector/technology-concept-vector-illustration-featuring-blockchain-design-flat-style-elements_1226483-3854.jpg?ga=GA1.1.843766667.1747855460&semt=ais_hybrid&w=740",
        content: newPost,
        timestamp: "just now",
        comments: [],
      },
    ]);
    setNewPost("");
  };

  // send chat
  const sendChat = () => {
    if (!chatInput.trim()) return;
    setChatLog([...chatLog, { id: Date.now(), user: "You", text: chatInput }]);
    setChatInput("");
  };

  // Handle Enter key for posting a new general post
  const handlePostKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default behavior (e.g., new line in a textarea if it were one)
      handlePost();
    }
  };

  // Handle Enter key for sending a chat message
  const handleChatKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default behavior
      sendChat();
    }
  };


  return (
    // The main container now explicitly defines its height to enable nested flex-1 behavior.
    // '160px' is an approximate combined height of your Navbar and Footer. Adjust as needed.
    <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-160px)]">
      {/* ---------- MAIN FEED ---------- */}
      {/* This section takes available height and arranges its children in a column */}
      <section className="flex-1 flex flex-col">
        {/* Scrollable Feed - This div takes all available vertical space in the section */}
        <div className="flex-1 overflow-y-auto space-y-6 pb-4 custom-scrollbar" ref={postFeedRef}>
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="p-6 rounded-xl shadow-lg shadow-black/70 border"
              style={{ backgroundColor: darkBgColor, borderColor: darkBorderColor }}
            >
              <div className="flex items-start gap-4">
                <img
                  src={post.avatar}
                  alt={post.user}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-700"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-gray-200 text-lg">
                      {post.user.includes("Mentor") ? (
                        <span style={gradientTextStyle}>{post.user}</span>
                      ) : (
                        post.user
                      )}
                    </h4>
                    <span className="text-sm text-gray-400">{post.timestamp}</span>
                  </div>
                  <p className="mt-2 text-gray-300 leading-relaxed">{post.content}</p>

                  {/* comments */}
                  {post.comments.length > 0 && (
                    <div className="mt-4 space-y-3">
                      {post.comments.map((c) => (
                        <div key={c.id} className="bg-[#121212] p-3 rounded-lg border text-gray-300" style={{ borderColor: darkBorderColor }}>
                          <span className="font-semibold mr-1 text-gray-200">
                            {c.user.includes("Mentor") ? (
                              <span style={gradientTextStyle}>{c.user}</span>
                            ) : (
                              c.user
                            )}:
                          </span>
                          {c.text}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Post composer - This area will stick to the bottom of the section */}
        <div
          className="mt-6 p-6 rounded-xl shadow-lg shadow-black/70 border flex-shrink-0" // flex-shrink-0 ensures it maintains its size and doesn't shrink
          style={{ backgroundColor: darkBgColor, borderColor: darkBorderColor }}
        >
          <div className="flex items-center gap-3 mb-4">
            <input
              type="text"
              className="flex-1 bg-[#222222] text-gray-300 border border-gray-700 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500"
              placeholder="Share an update, question, or win…"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              onKeyDown={handlePostKeyDown} 
            />
            <motion.button
              onClick={handlePost}
              className="bg-purple-600 text-white px-6 py-2.5 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out font-medium text-base flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              Post
            </motion.button>
          </div>
          {/* Upload options */}
          <div className="flex items-center gap-4 text-gray-400 text-sm">
            <label htmlFor="file-upload" className="flex items-center cursor-pointer hover:text-purple-400 transition-colors">
              <input id="file-upload" type="file" className="hidden" />
              <span className="flex items-center gap-1">
                <ImageIcon size={20} />
                Photo/Video
              </span>
            </label>
          </div>
        </div>
      </section>

      {/* ---------- RIGHT SIDEBAR ---------- */}
      {/* Sidebar now also uses flex-col to manage its children's height, ensuring alignment */}
      <aside className="lg:w-72 w-full lg:sticky top-24 space-y-8 flex-shrink-0 flex flex-col">
        {/* Online users - flex-shrink-0 ensures it maintains its size */}
        <div
          className="p-6 rounded-xl shadow-lg shadow-black/70 border flex-shrink-0"
          style={{ backgroundColor: darkBgColor, borderColor: darkBorderColor }}
        >
          <h3
            className="text-xl font-bold mb-4"
            style={gradientTextStyle}
          >
            Online
          </h3>
          <ul className="space-y-2 text-base text-gray-300 custom-scrollbar max-h-[150px] overflow-y-auto pr-2">
            {onlineUsers.map((u) => (
              <li key={u} className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 bg-green-500 rounded-full animate-pulse" />
                {u.includes("Mentor") ? <span style={gradientTextStyle}>{u}</span> : u}
              </li>
            ))}
          </ul>
        </div>

        {/* Live chat - This div now takes available height and manages its own scrolling content and sticky input */}
        <div
            className="p-6 rounded-xl shadow-lg shadow-black/70 border flex flex-col flex-1" // flex-1 makes it stretch
            style={{ backgroundColor: darkBgColor, borderColor: darkBorderColor }}
          >
            <h3
              className="text-xl font-bold mb-4"
              style={gradientTextStyle}
            >
              Live Chat
            </h3>
            {/* Chat messages - This div scrolls */}
            <div className="flex-1 overflow-y-auto space-y-3 mb-3 custom-scrollbar" ref={chatMessagesRef}>
              {chatLog.map((msg) => (
                <div key={msg.id} className="text-base text-gray-300">
                  <span className="font-semibold mr-1 text-gray-200">
                     {msg.user.includes("Mentor") || msg.user === "System" ? (
                      <span style={gradientTextStyle}>{msg.user}</span>
                    ) : (
                      msg.user
                    )}:
                  </span>
                  {msg.text}
                </div>
              ))}
            </div>
            {/* Input and Send button for chat - This area sticks to the bottom of the chat box */}
            <div className="flex gap-3 items-center flex-shrink-0">
              <input
                className="flex-1 bg-[#222222] text-gray-300 border border-gray-700 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 placeholder-gray-500 text-base"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={handleChatKeyDown}
                placeholder="Type message…"
              />
              <motion.button
                onClick={sendChat}
                // Changed from px-4 py-2.5 to just p-2.5 for a squarer button that fits better
                // Added flex justify-center items-center to center the icon in case button size changes
                className="bg-purple-600 text-white p-2.5 rounded-lg text-base hover:bg-purple-700 transition duration-300 ease-in-out font-medium flex justify-center items-center flex-shrink-0"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Send size={20} />
              </motion.button>
            </div>
          </div>
      </aside>
    </div>
  );
};

export default Community;