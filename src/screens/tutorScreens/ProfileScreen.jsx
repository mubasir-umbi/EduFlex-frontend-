import React from 'react'
import SideBar from '../../components/tutor/sideBar'
import Profile from '../../components/tutor/Profile'
import { useSelector } from 'react-redux'

const ProfileScreen = () => {
    const {tutorInfo} = useSelector(state => state.tutorAuth)
    const tutor = tutorInfo.res

  return (
    <>
      <SideBar>
        <Profile tutor={tutor} isTutor={true}/>
      </SideBar>
    </>
  )
}

export default ProfileScreen
