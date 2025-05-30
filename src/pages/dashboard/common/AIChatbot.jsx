import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send } from 'lucide-react';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null); // Ref for auto-scrolling

  // Scroll to the bottom of the chat window when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (inputMessage.trim() === '') return;

    const userMessage = { role: 'user', text: inputMessage };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      let chatHistory = messages.map(msg => ({ role: msg.role, parts: [{ text: msg.text }] }));
      chatHistory.push({ role: "user", parts: [{ text: inputMessage }] });

      const payload = { contents: chatHistory };
      const apiKey = ""; // Canvas will provide this at runtime
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const aiResponseText = result.candidates[0].content.parts[0].text;
        setMessages((prevMessages) => [...prevMessages, { role: 'model', text: aiResponseText }]);
      } else {
        setMessages((prevMessages) => [...prevMessages, { role: 'model', text: 'Sorry, I could not get a response.' }]);
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      setMessages((prevMessages) => [...prevMessages, { role: 'model', text: 'Error: Could not connect to the AI. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <motion.button
        className="fixed bottom-6 right-6 bg-purple-600 text-white p-4 rounded-full shadow-lg z-50 hover:bg-purple-700 transition-colors duration-200"
        onClick={toggleChat}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isOpen ? "Close Chat" : "Open Chat"}
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-80 h-[400px] bg-[#1E1E1E] rounded-lg shadow-xl border border-[#2A2A2A] flex flex-col z-50 overflow-hidden"
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
          >
            {/* Chat Header */}
            <div className="bg-purple-700 text-white p-3 flex items-center justify-between rounded-t-lg">
              <h3 className="font-semibold text-lg">DropMastery AI</h3>
              <button onClick={toggleChat} className="text-white hover:text-gray-200">
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto custom-scrollbar" style={{ scrollbarWidth: 'thin', scrollbarColor: '#888 #1E1E1E' }}>
              {messages.length === 0 && (
                <p className="text-gray-400 text-center mt-10">How can I help you today?</p>
              )}
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-3 p-2 rounded-lg max-w-[85%] ${
                    msg.role === 'user'
                      ? 'bg-purple-600 text-white ml-auto rounded-br-none'
                      : 'bg-gray-700 text-gray-200 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {isLoading && (
                <div className="mb-3 p-2 rounded-lg bg-gray-700 text-gray-200 rounded-bl-none animate-pulse">
                  Typing...
                </div>
              )}
              <div ref={messagesEndRef} /> {/* Scroll target */}
            </div>

            {/* Message Input */}
            <form onSubmit={sendMessage} className="p-3 border-t border-[#2A2A2A] bg-[#1E1E1E] flex items-center">
              <input
                type="text"
                value={inputMessage}
                onChange={handleInputChange}
                placeholder="Type your message..."
                className="flex-1 bg-[#222222] text-gray-200 border border-gray-600 px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                disabled={isLoading}
              />
              <motion.button
                type="submit"
                className="ml-2 bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isLoading}
                aria-label="Send Message"
              >
                <Send size={20} />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
