import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PrivateRoute from '../components/PrivateRoute'
// import { TopNav } from '../components/admin/TopNav'
import Home from '../components/admin/Home'
import Page from '../screens/adminScreens/Students'
import RequstsScreen from '../screens/adminScreens/RequestsScreens.jsx'
import Tutors from '../screens/adminScreens/Tutors'
import CategoryScreen from '../screens/adminScreens/CategoryScreen.jsx'
import Page404 from '../screens/Page404'


const adminRoutes = () => {
  return (
   <Routes>
    <Route path='' element={<PrivateRoute />}>
        <Route path='dashboard' element={<Home />} />
        <Route path='students' element={<Page />} />
        <Route path='requests' element={<RequstsScreen />} />
        <Route path='tutors' element={<Tutors />} />
        <Route path='category' element={<CategoryScreen />} />
    </Route>
    <Route path="/*" element={<Page404 />} />
   </Routes>
  )
}

export default adminRoutes
