import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Auth";

import SuperAdminLayout from './layouts/SuperAdminLayout';
import SubAdminLayout from './layouts/SubAdminLayout';
import MentorLayout from './layouts/MentorLayout';
import StudentLayout from './layouts/StudentLayout';

import SuperDashboard from './pages/dashboard/superadmin/DashboardHome';
import SubDashboard from './pages/dashboard/subadmin/DashboardHome';
import MentorDashboard from './pages/dashboard/mentor/DashboardHome';
import StudentDashboard from './pages/dashboard/student/DashboardHome';

import UserManagement from "./pages/dashboard/superadmin/UserManagement";
import MyMentor from "./pages/dashboard/student/MyMentor"
import MyCourses from "./pages/dashboard/student/MyCourses"
import LiveSessions from "./pages/dashboard/student/LiveSessions"
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
// import LiveSessionsSub from './pages/dashboard/subadmin/LiveSessions';
// import AnnouncementsSub from './pages/dashboard/subadmin/Announcements';
// import RevenueReports from './pages/dashboard/subadmin/RevenueReports';






const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<Auth />} />


      <Route path="/dashboard/superadmin" element={<SuperAdminLayout />}>
        <Route index element={<SuperDashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="mentors" element={<MentorApproval />} />
        <Route path="course" element={<CourseControl />} />
        <Route path="revenue" element={<Revenue />} />
        <Route path="analytics" element={<Analysts />} />
        <Route path="announcements" element={<Announcement />} />
      </Route>


      <Route path="/dashboard/subadmin" element={<SubAdminLayout />}>
        <Route index element={<SubDashboard />} />
        <Route path="manage-students" element={<ManageStudents />} />
        <Route path="manage-courses" element={<ManageCourses />} />
        {/* <Route path="live-sessions" element={<LiveSessionsSub />} />
        <Route path="announcements" element={<AnnouncementsSub />} />
        <Route path="revenue" element={<RevenueReports />} /> */}
      </Route>

      <Route path="/dashboard/mentor" element={<MentorLayout />}>
        <Route index element={<MentorDashboard />} />
      </Route>

      <Route path="/dashboard/student" element={<StudentLayout />}>
        <Route index element={<StudentDashboard />} />
        <Route path="my-mentor" element={<MyMentor />} />
        <Route path="my-courses" element={<MyCourses />} />
        <Route path="live-sessions" element={<LiveSessions />} />
        <Route path="course-details" element={<CourseDetails />} />
        <Route path="ai-tools" element={<AiTools />} />
        <Route path="community" element={<Community />} />
        <Route path="earnings" element={<Earnings />} />
        <Route path="certificates" element={<Certificates />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default App;