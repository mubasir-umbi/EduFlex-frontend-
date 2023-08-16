import { Typography } from "@mui/material";
import React from "react";
import SideBar from "../../components/tutor/sideBar";
import RegistrationForm from "../../components/tutor/RegistrationForm";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";

const EditProfileScreen = () => {
    const {tutorInfo} = useSelector(state => state.tutorAuth)
    const tutor = tutorInfo.res
  return (
    <>
      <SideBar>
        <Box width={'80%'} alignContent={"center"} mt={10}>
          <RegistrationForm tutor={tutor} profile={true} />
        </Box>
      </SideBar>
    </>
  );
};

export default EditProfileScreen;
