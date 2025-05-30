import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon, Send } from "lucide-react";

// Define a common style object for gradient text
const gradientTextStyle = {
  background: 'linear-gradient(to right, #6A67FE, #FE67F6)', // Gradient from the brand
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent', // Fallback
};

// Define common dark background colors
const darkBgColor = "#1E1E1E"; // Consistent for main cards
const darkBorderColor = "#222222"; // Consistent border color

// ---------- dummy data for mentor community - UPDATED WITH FREEEPIK STYLE AVATARS ----------
const demoMentorPosts = [
  {
    id: 1,
    user: "Mentor-Priya",
    avatar: "https://img.freepik.com/premium-vector/woman-violet-hoodie-blue-circle-with-brown-hairs-cute-girl-avatar-circle-female-v_630301-25.jpg?ga=GA1.1.843766667.1747855460&semt=ais_hybrid&w=740",
    content: "What are your best strategies for keeping students engaged in long courses? Share your tips!",
    timestamp: "3 h ago",
    comments: [
      { id: 11, user: "Mentor-Rahul", text: "I use interactive quizzes after each module. Works wonders!" },
      { id: 12, user: "You", text: "Gamification has been effective for me too, especially leaderboards." },
    ],
  },
  {
    id: 2,
    user: "Mentor-Amit",
    avatar: "https://img.freepik.com/premium-vector/asian-men-avatar_7814-345.jpg?ga=GA1.1.843766667.1747855460&semt=ais_hybrid&w=740",
    content: "Just finished updating my 'Advanced Facebook Ads' course with the latest iOS 18 changes. It's a big one!",
    timestamp: "7 h ago",
    comments: [],
  },
  {
    id: 3,
    user: "Mentor-Sarah",
    avatar: "https://img.freepik.com/premium-vector/people-avatar-icons-man_755164-20762.jpg?ga=GA1.1.843766667.1747855460&semt=ais_hybrid&w=740",
    content: "Reminder: Our weekly mentor sync-up call is tomorrow at 10 AM EST. Topic: Student Success Metrics.",
    timestamp: "1 day ago",
    comments: [],
  },
  {
    id: 4,
    user: "Mentor-David",
    avatar: "https://img.freepik.com/premium-vector/man-avatar-profile-round-icon_24640-14044.jpg?ga=GA1.1.843766667.1747855460&semt=ais_hybrid&w=740",
    content: "Any recommendations for new tools to streamline course content creation?",
    timestamp: "2 days ago",
    comments: [{ id: 41, user: "Mentor-Priya", text: "I've been experimenting with AI writing tools. They save a lot of time!" }],
  },
];

const onlineUsers = ["Mentor-Jane", "Mentor-Sam", "Mentor-Priya", "Mentor-Lee", "Mentor-David", "Mentor-Emily", "Mentor-Chris", "Mentor-Olivia"]; // More users for scrolling

// ---------- component ----------
const Community = () => {
  const [posts, setPosts] = useState(demoMentorPosts);
  const [newPost, setNewPost] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [chatLog, setChatLog] = useState([
    { id: 1, user: "System", text: "Welcome to the Mentor community chat!" },
    { id: 2, user: "Mentor-Jane", text: "Hello mentors! Happy to share insights and help." },
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
        user: "You (Mentor)",
        // UPDATED: Avatar for "You (Mentor)" to match Freepik style
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
    setChatLog([...chatLog, { id: Date.now(), user: "You (Mentor)", text: chatInput }]);
    setChatInput("");
  };

  // Handle Enter key for posting a new general post
  const handlePostKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handlePost();
    }
  };

  // Handle Enter key for sending a chat message
  const handleChatKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendChat();
    }
  };

  return (
    // The parent div should define a height for flex-1 to work effectively
    // min-h-[calc(100vh-160px)] is a heuristic for full viewport height minus nav/footer.
    // Adjust 160px based on your actual Navbar and Footer height if necessary.
    <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-160px)] p-8"> {/* Added p-8 for consistent page padding */}
      {/* ---------- MAIN FEED ---------- */}
      <section className="flex-1 flex flex-col"> {/* This section takes available height and arranges its children in a column */}
        {/* Scrollable Feed */}
        <div className="flex-1 overflow-y-auto space-y-6 pb-4 custom-scrollbar" ref={postFeedRef}> {/* flex-1 makes this div take all available space, enabling scrolling */}
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
                      {post.user.includes("Mentor") || post.user.includes("System") ? (
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
                            {c.user.includes("Mentor") || c.user.includes("System") ? (
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

        {/* Post composer - positioned at the bottom of the main feed section */}
        <div
          className="mt-6 p-6 rounded-xl shadow-lg shadow-black/70 border flex-shrink-0" // flex-shrink-0 to ensure it doesn't shrink
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
      <aside className="lg:w-72 w-full space-y-8 flex-shrink-0 flex flex-col"> {/* Adjusted top for sticky, added flex-shrink-0 */}
        {/* Online users */}
        <div
          className="p-6 rounded-xl shadow-lg shadow-black/70 border flex-shrink-0"
          style={{ backgroundColor: darkBgColor, borderColor: darkBorderColor }}
        >
          <h3
            className="text-xl font-bold mb-4"
            style={gradientTextStyle}
          >
            Online {/* UPDATED: Changed title to "Online" */}
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

        {/* Live chat */}
        <div
          className="p-6 rounded-xl shadow-lg shadow-black/70 border flex flex-col flex-1" // flex-col to manage content and input
          style={{ backgroundColor: darkBgColor, borderColor: darkBorderColor }}
        >
          <h3
            className="text-xl font-bold mb-4"
            style={gradientTextStyle}
          >
            Live Chat
          </h3>
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
          {/* Input and Send button for chat - fixed overlapping issue */}
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
