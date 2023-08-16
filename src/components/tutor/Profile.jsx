import React from "react";
import { Avatar, Typography, Button, Paper, Divider, } from "@mui/material";
import { Link } from "react-router-dom";

const UserProfile = ({ tutor, students, course, user, isTutor, }) => {
  const paperStyle = {
    maxWidth: "md",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  };

  const avatarStyle = {
    width: "120px",
    height: "120px",
    marginBottom: "16px",
  };

  const usernameStyle = {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "8px",
  };

  const subtitleStyle = {
    fontSize: "18px",
    color: "#666",
    marginBottom: "8px",
  };

  const bioStyle = {
    fontSize: "16px",
    color: "#666",
    marginBottom: "20px",
    textAlign: "center",
  };

  const editButtonStyle = {
    backgroundColor: "#2196F3",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#1976D2",
    },
    marginTop: "16px",
  };

  return (
    <Paper sx={{ width: "80%", mt: 12, ml: 'auto', mr: 'auto'}} elevation={3} style={paperStyle}>
      <Avatar alt="User Avatar" style={avatarStyle}></Avatar>
      <Typography variant="h4" style={usernameStyle}>
        {tutor?.firstName}
      </Typography>
      {console.log(tutor, "tutorinfooooooooooooo")}

      {user && (
        <>
          {" "}
          <Typography variant="subtitle1" style={subtitleStyle}>
            Total Course: <strong>{course}</strong>
          </Typography>
          <Typography variant="subtitle1" style={subtitleStyle}>
            Total Students: <strong>{students} </strong>
          </Typography>
        </>
      )}

      <Divider style={{ margin: "20px 0", width: "100%" }} />
      <Typography variant="h6">About Me</Typography>
      <Typography maxWidth={600} variant="body1" style={bioStyle}>
        {tutor?.about}
      </Typography>
      <Divider style={{ margin: "20px 0", width: "100%" }} />
      <Typography mb={2} variant="h6">{user ? 'Contact' : 'Details'}</Typography>
      <Typography variant="body1" style={subtitleStyle}>
        Email: {tutor?.email}
      </Typography>
      <Typography variant="body1" style={subtitleStyle}>
        Location: {tutor?.city}
      </Typography>
      {isTutor && (
        <>
          <Typography variant="body1" style={subtitleStyle}>
            Name: {tutor?.firstName} {tutor?.lastName}
          </Typography>
          <Typography variant="body1" style={subtitleStyle}>
            mobile: {tutor?.mobile}
          </Typography>{" "}
          <Typography variant="body1" style={subtitleStyle}>
            Email: {tutor?.email}
          </Typography>
          <Typography variant="body1" style={subtitleStyle}>
            Location: {tutor?.city}
          </Typography>
          <Typography variant="body1" style={subtitleStyle}>
            Address1: {tutor?.addressline}
          </Typography>
          <Typography variant="body1" style={subtitleStyle}>
            Address2: {tutor?.addressline2}
          </Typography>
          <Typography variant="body1" style={subtitleStyle}>
            Mobile: {tutor?.mobile}
          </Typography>
          <Typography variant="body1" style={subtitleStyle}>
            Country: {tutor?.country}
          </Typography>
          <Typography variant="body1" style={subtitleStyle}>
            State: {tutor?.state}
          </Typography>
          <Typography variant="body1" style={subtitleStyle}>
            Zip: {tutor?.zip}
          </Typography>
          <Link to={'/tutor/edit_profile'}>
          <Button variant="contained" style={editButtonStyle}>
            Edit Profile
          </Button>
          </Link>
        </>
      )}
    </Paper>
  );
};

export default UserProfile;
