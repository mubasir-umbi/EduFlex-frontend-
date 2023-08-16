import React from "react";
import OtpScreen from "../screens/tutorScreens/otpScreen";
import { Route, Routes } from "react-router-dom";
import LoginScreen from "../screens/tutorScreens/LoginScreen";
import DashboardScreen from "../screens/tutorScreens/DashboardScreen";
import PrivateRoute from "../components/tutor/PrivateRoute";
import MyCourseScreen from "../screens/tutorScreens/MyCoursesScreen";
import LessonsScreen from "../screens/tutorScreens/LessonsScreen";
import MyStudentsScreen from "../screens/tutorScreens/MyStudentsScreen";
import ProfileScreen from '../screens/tutorScreens/ProfileScreen'
import EditProfileScreen from "../screens/tutorScreens/EditProfileScreen";
import ChatScreen from "../screens/tutorScreens/ChatScreen";
import Page404 from '../screens/Page404'



const tutorRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/otp" element={<OtpScreen />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/edit_profile" element={<EditProfileScreen />} />
        <Route path="/dashboard" element={<DashboardScreen />} />
        <Route path="/my_course" element={<MyCourseScreen />} />
        <Route path='/lessons/:id' element={<LessonsScreen />} />
        <Route path='/my_students' element={<MyStudentsScreen />} />
        <Route path='/chat' element={<ChatScreen />} />
      </Route>
      <Route path="/*" element={<Page404 />} />

    </Routes>
  );
};

export default tutorRoutes;
