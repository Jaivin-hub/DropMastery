import React from "react";
import { Routes, Route } from "react-router-dom";
import { SocketProvider } from "./pages/dashboard/common/SocketContext";


import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Auth";
import Notifications from "./pages/dashboard/common/Notifications";
import NotFound from "./pages/dashboard/common/NotFound"; // Corrected path to NotFound
import Explore from "./pages/dashboard/common/Explore"; // Corrected path to Explore
import About from "./pages/dashboard/common/About"; // Corrected path to About
import AIChatbot from "./pages/dashboard/common/AIChatbot"; // Import the AI Chatbot component
import CourseFormPage from './pages/dashboard/common/CourseFormPage'; 

import SuperAdminLayout from './layouts/SuperAdminLayout';
import SubAdminLayout from './layouts/SubAdminLayout';
import MentorLayout from './layouts/MentorLayout';
import StudentLayout from './layouts/StudentLayout';

import SuperDashboard from './pages/dashboard/superadmin/DashboardHome';
import SubDashboard from './pages/dashboard/subadmin/DashboardHome';
import MentorDashboard from './pages/dashboard/mentor/DashboardHome';
import StudentDashboard from './pages/dashboard/student/DashboardHome';

import MentorMyCourses from './pages/dashboard/mentor/MyCourses';
import MentorMyStudents from './pages/dashboard/mentor/MyStudents';
import MentorLiveSessions from './pages/dashboard/mentor/LiveSessions';
import MentorCommunity from './pages/dashboard/mentor/Community';
import MentorEarnings from './pages/dashboard/mentor/Earnings';
import MentorAnnouncements from './pages/dashboard/mentor/Announcements';
import MentorProfile from './pages/dashboard/mentor/Profile';

import UserManagement from "./pages/dashboard/superadmin/UserManagement";
import MyMentor from "./pages/dashboard/student/MyMentor";
import MyCourses from "./pages/dashboard/student/MyCourses";
import LiveSessions from "./pages/dashboard/student/LiveSessions";
import CourseDetails from './pages/dashboard/student/CourseDetails';
import AiTools from './pages/dashboard/student/AiTools';
import Community from "./pages/dashboard/student/Community";
import Earnings from "./pages/dashboard/student/Earnings";
import Certificates from "./pages/dashboard/student/Certificates";
import MentorApproval from "./pages/dashboard/superadmin/MentorApproval";
import CourseControl from "./pages/dashboard/superadmin/CourseControl";
import Profile from "./pages/dashboard/student/Profile";
import Revenue from "./pages/dashboard/superadmin/Revenue";
import Analysts from "./pages/dashboard/superadmin/Analysts";
import Announcement from "./pages/dashboard/superadmin/Announcement";

import ManageStudents from './pages/dashboard/subadmin/ManageStudents';
import ManageCourses from './pages/dashboard/subadmin/ManageCourses';
import LiveSessionsSub from './pages/dashboard/subadmin/LiveSessions';
import AnnouncementsSub from './pages/dashboard/subadmin/Announcements';
import RevenueReports from './pages/dashboard/subadmin/RevenueReports';
import ManageMentors from './pages/dashboard/subadmin/ManageMentors';
import SupportTickets from './pages/dashboard/subadmin/SupportTickets';
import FeedbackReports from './pages/dashboard/subadmin/FeedbackReports';
import ContactUs from "./pages/dashboard/common/ContactUs";


const App = () => {
  return (
    <SocketProvider> {/* Use a React Fragment to wrap multiple top-level components */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/about" element={<About />} />
        <Route path="/contactus" element={<ContactUs />} />



        <Route path="/dashboard/superadmin" element={<SuperAdminLayout />}>
          <Route index element={<SuperDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="mentors" element={<MentorApproval />} />
          <Route path="course" element={<CourseControl />} />
          <Route path="course/new" element={<CourseFormPage />} />
          <Route path="course/edit/:id" element={<CourseFormPage />} />
          <Route path="revenue" element={<Revenue />} />
          <Route path="analytics" element={<Analysts />} />
          <Route path="announcements" element={<Announcement />} />
        </Route>

        <Route path="/dashboard/subadmin" element={<SubAdminLayout />}>
          <Route index element={<SubDashboard />} />
          <Route path="manage-students" element={<ManageStudents />} />
          <Route path="manage-courses" element={<ManageCourses />} />
          <Route path="live-sessions" element={<LiveSessionsSub />} />
          <Route path="announcements" element={<AnnouncementsSub />} />
          <Route path="revenue" element={<RevenueReports />} />
          <Route path="manage-mentors" element={<ManageMentors />} />
          <Route path="support-tickets" element={<SupportTickets />} />
          <Route path="feedback" element={<FeedbackReports />} />
        </Route>

        <Route path="/dashboard/mentor" element={<MentorLayout />}>
          <Route index element={<MentorDashboard />} />
          <Route path="my-courses" element={<MentorMyCourses />} />
          <Route path="my-students" element={<MentorMyStudents />} />
          <Route path="live-sessions" element={<MentorLiveSessions />} />
          <Route path="community" element={<MentorCommunity />} />
          <Route path="earnings" element={<MentorEarnings />} />
          <Route path="announcements" element={<MentorAnnouncements />} />
          <Route path="profile" element={<MentorProfile />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>

        <Route path="/dashboard/student" element={<StudentLayout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="my-mentor" element={<MyMentor />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="live-sessions" element={<LiveSessions />} />
          <Route path="course-details/:courseId" element={<CourseDetails />} />
          <Route path="ai-tools" element={<AiTools />} />
          <Route path="community" element={<Community />} />
          <Route path="earnings" element={<Earnings />} />
          <Route path="certificates" element={<Certificates />} />
          <Route path="profile" element={<Profile />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>

        {/* 404 Not Found Route - This should be the last route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <AIChatbot /> {/* Render the AI Chatbot component here */}
    </SocketProvider>
  );
};

export default App;
