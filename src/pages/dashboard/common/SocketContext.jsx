// src/contexts/SocketContext.js
import React, { createContext, useState, useEffect, useRef, useContext } from 'react';
import io from 'socket.io-client';

// Create the context
export const SocketContext = createContext();

// Create a custom hook to use the socket context easily
export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const socketRef = useRef(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [isConnected, setIsConnected] = useState(false); // Optional: track socket connection status

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const userId = localStorage.getItem('userId');

        if (!token || !userId) {
            console.warn("SocketContext: No auth token or user ID found. Socket will not connect.");
            // Do not connect if no token. You might want to redirect to login here.
            return;
        }

        // Initialize socket connection
        socketRef.current = io(process.env.NODE_ENV === 'production' ? process.env.REACT_APP_SERVER_URL : 'http://localhost:5000', { // <--- CHANGE THIS LINE
            auth: {
                token: token,
            },
            // Optionally, configure reconnection attempts
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
        });

        // --- Socket Event Listeners ---
        socketRef.current.on('connect', () => {
            console.log('SocketContext: Socket connected successfully!');
            setIsConnected(true);
        });

        socketRef.current.on('connect_error', (error) => {
            console.error("SocketContext: Socket connection error:", error.message);
            setIsConnected(false);
            if (error.message.includes("Unauthorized")) {
                alert("Session expired or invalid token. Please log in again.");
                localStorage.removeItem('authToken');
                localStorage.removeItem('userId');
                localStorage.removeItem('userName');
                localStorage.removeItem('userProfile');
                localStorage.removeItem('isMentor');
                window.location.href = '/auth'; // Redirect to login
            }
        });

        socketRef.current.on('disconnect', (reason) => {
            console.log('SocketContext: Socket disconnected:', reason);
            setIsConnected(false);
            // If disconnected due to server or network, try to reconnect
            if (reason === 'io server disconnect' || reason === 'transport close' || reason === 'ping timeout') {
                console.log('SocketContext: Attempting to reconnect...');
                // The socket.io client will usually handle auto-reconnects by default,
                // but you can add custom logic here if needed.
            }
        });

        // Listen for online users updates
        socketRef.current.on('onlineUsersUpdate', (users) => {
            console.log('SocketContext: Received online users update:', users);
            setOnlineUsers(users);
        });

        // Add other global socket listeners here if needed (e.g., global notifications)
        // For example:
        // socketRef.current.on('globalNotification', (data) => {
        //     console.log('Received global notification:', data);
        //     // Display a toast/alert
        // });

        // --- Cleanup on unmount ---
        return () => {
            if (socketRef.current) {
                console.log('SocketContext: Cleaning up socket connection...');
                socketRef.current.disconnect();
                socketRef.current.off('connect');
                socketRef.current.off('connect_error');
                socketRef.current.off('disconnect');
                socketRef.current.off('onlineUsersUpdate');
                // Remove other listeners if added
            }
        };
    }, []); // Empty dependency array means this runs once on mount

    const value = {
        socket: socketRef.current, // Provide the socket instance
        onlineUsers,
        isConnected
    };

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    );
};