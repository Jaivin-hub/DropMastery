// Community.jsx (No changes needed for this specific online users issue)
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon, Send } from "lucide-react";
import { useSocket } from '../../../pages/dashboard/common/SocketContext';

// Define a common style object for gradient text
const gradientTextStyle = {
  background: 'linear-gradient(to right, #6A67FE, #FE67F6)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent',
};

const darkBgColor = "#1E1E1E";
const darkBgColorLighter = "#222222";
const darkBorderColor = "#222222";

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const userId = localStorage.getItem('userId');

  // Destructure socket, onlineUsers, and isConnected from the useSocket hook
  const { socket, onlineUsers, isConnected } = useSocket();

  const chatMessagesRef = useRef(null);
  const postFeedRef = useRef(null);

  const [currentUser, setCurrentUser] = useState({
    _id: userId,
    name: localStorage.getItem('userName') || `User-${userId ? userId.substring(0, 8) : 'unknown'}`,
    userprofile: localStorage.getItem('userProfile') || "https://img.freepik.com/premium-vector/technology-concept-vector-illustration-featuring-blockchain-design-flat-style-elements_1226483-3854.jpg",
    isMentor: localStorage.getItem('isMentor') === 'true'
  });

  // Effect for setting up socket event listeners (only runs if socket changes)
  useEffect(() => {
    setCurrentUser({
      _id: userId,
      name: localStorage.getItem('userName') || `User-${userId ? userId.substring(0, 8) : 'unknown'}`,
      userprofile: localStorage.getItem('userProfile') || "https://img.freepik.com/premium-vector/technology-concept-vector-illustration-featuring-blockchain-design-flat-style-elements_1226483-3854.jpg",
      isMentor: localStorage.getItem('isMentor') === 'true'
    });

    if (socket) {
      console.log('Community: Attaching socket listeners for real-time updates.');

      socket.on('initialChatMessages', (messages) => {
        console.log('Client: Received initial chat messages:', messages.length);
        setChatLog(messages);
      });

      socket.on('initialPosts', (receivedPosts) => {
        console.log('Client: Received initial community posts:', receivedPosts.length);
        setPosts(receivedPosts);
      });

      socket.on('postReceived', (post) => {
        console.log('Client: New post received via socket:', post);
        setPosts((prevPosts) => [...prevPosts, post]);
      });

      socket.on('chatMessageReceived', (message) => {
        console.log('Client: New chat message received via socket:', message);
        setChatLog((prevChatLog) => [...prevChatLog, message]);
      });
    } else {
        console.log('Community: Socket not yet available from context. Listeners will attach on next render when socket is ready.');
    }

    // Cleanup function: remove listeners when the component unmounts
    // or when 'socket' changes (meaning the effect re-runs and new listeners are attached)
    return () => {
      if (socket) {
        console.log('Community: Cleaning up socket listeners...');
        socket.off('initialChatMessages');
        socket.off('initialPosts');
        socket.off('postReceived');
        socket.off('chatMessageReceived');
      }
    };
  }, [userId, socket]); // userId included as currentUser depends on it

  // Effect for requesting initial data (runs when component mounts or socket/connection status changes)
  useEffect(() => {
    // Only request data if socket is connected and available
    if (isConnected && socket) {
      console.log('Community: Socket connected. Requesting initial data from server.');
      socket.emit('requestInitialChatMessages');
      socket.emit('requestInitialPosts');
    }
  }, [isConnected, socket]); // Dependencies ensure this runs when connection status or socket changes

  // Effect for auto-scrolling chat messages
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatLog]);

  // Effect for auto-scrolling post feed
  useEffect(() => {
    if (postFeedRef.current) {
      postFeedRef.current.scrollTop = postFeedRef.current.scrollHeight;
    }
  }, [posts]);

  // Handler for sending a new post
  const handlePost = () => {
    if (!newPost.trim() || !currentUser || !currentUser._id) {
      console.warn("Client: Cannot post: content is empty or user not identified.");
      return;
    }

    const postData = {
      userId: currentUser._id.toString(),
      content: newPost,
    };

    if (socket && isConnected) {
      socket.emit('newPost', postData);
    } else {
      console.warn("Socket not connected, cannot send post.");
      // Optionally, show a user notification or disable input if not connected
    }
    setNewPost("");
  };

  // Handler for sending a new chat message
  const sendChat = () => {
    if (!chatInput.trim() || !currentUser || !currentUser._id) {
      console.warn("Client: Cannot send chat: content is empty or user not identified.");
      return;
    }

    const chatMessage = {
      userId: currentUser._id.toString(),
      text: chatInput,
    };

    if (socket && isConnected) {
      socket.emit('newChatMessage', chatMessage);
    } else {
      console.warn("Socket not connected, cannot send chat message.");
      // Optionally, show a user notification or disable input if not connected
    }
    setChatInput("");
  };

  // Keyboard handler for posting (Enter key)
  const handlePostKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handlePost();
    }
  };

  // Keyboard handler for chat (Enter key)
  const handleChatKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendChat();
    }
  };

  // Filtered online users list for rendering (excluding the current user)
  const filteredOnlineUsers = onlineUsers.filter(user => user._id !== userId);


  return (

    <div className="flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-160px)] lg:h-[calc(100vh-160px)] lg:items-stretch p-4 sm:p-0">
      {/* ---------- MAIN FEED ---------- */}
      <section className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto pb-2 custom-scrollbar" ref={postFeedRef}>
          {posts.length === 0 && (
            <p className="text-center text-gray-400 py-10">
              {isConnected ? "No community posts yet. Be the first to share something!" : "Connecting to community feed..."}
            </p>
          )}
          <div className="space-y-4">
            {posts.map((post) => (
              <motion.div
                key={post.id || post._id} // Use post._id if it's coming from MongoDB
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="p-4 rounded-lg shadow-lg shadow-black/70 border"
                style={{ backgroundColor: darkBgColor, borderColor: darkBorderColor }}
              >
                <div className="flex items-start gap-3">
                  <img
                    src={post.userprofile}
                    alt={post.user}
                    className="w-10 h-10 rounded-full object-cover border-2 border-gray-700"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-bold text-gray-200 text-base">
                        {(post?.isMentor) ? ( // Check post.isMentor directly (no need for currentUser.isMentor here)
                          <span style={gradientTextStyle}>{post.user}</span>
                        ) : (
                          post.user
                        )}
                      </h4>
                      {/* Consider formatting timestamp more user-friendly */}
                      <span className="text-xs text-gray-400">{post.timestamp}</span>
                    </div>
                    <p className="mt-1 text-gray-300 text-sm leading-snug">
                      {post.content}
                    </p>

                    {post.comments && post.comments.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {post.comments.map((c) => (
                          <div
                            key={c.id || c._id} // Use c._id if from MongoDB
                            className="bg-[#121212] p-2 rounded border text-gray-300 text-sm"
                            style={{ borderColor: darkBorderColor }}
                          >
                            <span className="font-semibold mr-1 text-gray-200">
                              {c?.isMentor ? ( // Check c.isMentor directly
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
        </div>
        <div
          className="mt-4 p-4 rounded-lg shadow-lg shadow-black/70 border flex-shrink-0"
          style={{ backgroundColor: darkBgColor, borderColor: darkBorderColor }}
        >
          <div className="relative flex items-center">
            <input
              type="text"
              className="flex-1 bg-[#1A1A1A] text-gray-300 border border-gray-700 pl-4 pr-20 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500 text-sm"
              placeholder="Share an update, question, or win…"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              onKeyDown={handlePostKeyDown}
              disabled={!isConnected} // Disable input if not connected
            />
            <div className="absolute inset-y-0 right-0 pr-1 flex items-center">
              <label htmlFor="post-file-upload" className="flex items-center cursor-pointer text-gray-400 hover:text-purple-400 transition-colors p-1 rounded-full hover:bg-gray-700">
                <input id="post-file-upload" type="file" className="hidden" />
                <ImageIcon size={18} />
              </label>
              <motion.button
                onClick={handlePost}
                className={`bg-purple-600 text-white p-2 rounded-md text-sm hover:bg-purple-700 transition duration-300 ease-in-out font-medium ml-1 flex justify-center items-center ${!isConnected ? 'opacity-50 cursor-not-allowed' : ''}`}
                whileHover={{ scale: isConnected ? 1.05 : 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                disabled={!isConnected} // Disable button if not connected
              >
                <Send size={16} />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- RIGHT SIDEBAR ---------- */}
      <aside className="w-full lg:w-72 flex-shrink-0 flex flex-col mt-8 lg:mt-0 lg:h-full space-y-8">
        <div
          className="p-6 rounded-xl shadow-lg shadow-black/70 border flex-shrink-0"
          style={{ backgroundColor: darkBgColor, borderColor: darkBorderColor }}
        >
          <h3
            className="text-xl font-bold mb-4"
            style={gradientTextStyle}
          >
            Online Users
          </h3>
          <ul className="space-y-2 text-base text-gray-300 custom-scrollbar max-h-[150px] overflow-y-auto pr-2">
            {/* Use the filtered list here */}
            {filteredOnlineUsers.length === 0 ? (
              <li className="text-gray-500">
                {isConnected ? "No one else is online right now." : "Checking online users..."}
              </li>
            ) : (
              filteredOnlineUsers.map((user) => ( // 'user' here is an object: { _id, name, isMentor, userprofile }
                <li key={user._id} className="flex items-center gap-2"> {/* Use user._id as key */}
                  <span className="h-2.5 w-2.5 bg-green-500 rounded-full animate-pulse" />
                  {user.isMentor ? ( // Check user.isMentor property
                    <span style={gradientTextStyle}>{user.name}</span>
                  ) : (
                    user.name // Display user.name
                  )}
                </li>
              ))
            )}
          </ul>
        </div>

        <div
          className="rounded-xl shadow-lg shadow-black/70 border flex flex-col flex-1 overflow-hidden"
          style={{ backgroundColor: darkBgColor, borderColor: darkBorderColor }}
        >
          <h3
            className="text-xl font-bold p-6 pb-4"
            style={gradientTextStyle}
          >
            Live Chat
          </h3>
          <div className="flex-1 overflow-y-auto space-y-3 px-6 custom-scrollbar" ref={chatMessagesRef}>
            {chatLog.length === 0 && (
              <p className="text-center text-gray-500 py-10">
                {isConnected ? "Start a conversation!" : "Connecting to chat..."}
              </p>
            )}
            {chatLog.map((msg) => (
              <div key={msg.id || msg._id} className="text-base text-gray-300 flex items-start gap-2">
                {msg.userprofile && (
                  <img src={msg.userprofile} alt={msg.user} className="w-6 h-6 rounded-full object-cover flex-shrink-0" />
                )}
                <div>
                  <span className="font-semibold mr-1 text-gray-200">
                    {msg?.isMentor || msg.user === "System" ? ( // Assuming msg object might have isMentor or still check for "System" string for special messages
                      <span style={gradientTextStyle}>{msg.user}</span>
                    ) : (
                      msg.user
                    )}:
                  </span>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div
            className="mt-4 px-6 pb-6 pt-2 flex items-center flex-shrink-0"
            style={{ backgroundColor: darkBgColor }}
          >
            <div className="relative flex-1">
              <input
                className={`w-full bg-[#222222] text-gray-300 border border-gray-700 pl-4 pr-24 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 placeholder-gray-500 text-base ${!isConnected ? 'opacity-50 cursor-not-allowed' : ''}`}
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={handleChatKeyDown}
                placeholder={isConnected ? "Type message…" : "Connecting to chat..."}
                disabled={!isConnected} // Disable input if not connected
              />
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
                <label htmlFor="chat-file-upload" className="flex items-center cursor-pointer text-gray-400 hover:text-purple-400 transition-colors">
                  <input id="chat-file-upload" type="file" className="hidden" />
                  <ImageIcon size={18} />
                </label>
                <motion.button
                  onClick={sendChat}
                  className={`bg-purple-600 text-white p-2 rounded-lg text-sm hover:bg-purple-700 transition duration-300 ease-in-out font-medium ml-2 flex justify-center items-center ${!isConnected ? 'opacity-50 cursor-not-allowed' : ''}`}
                  whileHover={{ scale: isConnected ? 1.05 : 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  disabled={!isConnected} // Disable button if not connected
                >
                  <Send size={16} />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Community;