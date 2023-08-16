import React from "react";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const SuccessPage = () => {
  const styles = {
    root: {
      textAlign: "center",
      paddingTop: "16px",
    },
    icon: {
      fontSize: "100px",
      color: "green", // You can use the desired color here
    },
    heading: {
      marginBottom: "8px",
      fontSize: "24px",
      fontWeight: "bold",
    },
    message: {
      fontSize: "16px",
    },
  };

  return (
    <div style={styles.root}>
      <CheckCircleIcon style={styles.icon} />
      <Typography variant="h4" component="h1" style={styles.heading}>
        Thank You for Your Order!
      </Typography>
      <Typography variant="body1" style={styles.message}>
        Your order has been successfully placed.
      </Typography>
      {/* Additional details or next steps can be added here */}
      <Box mt={10}>
        <Link to={'/my_courses'}>
        <Button sx={{mr: 2}} variant="contained">My courses</Button>
        </Link>
        <Link to={'/'}>
        <Button variant="contained">Go Home</Button>
        </Link>
      </Box>
    </div>
  );
};

export default SuccessPage;
