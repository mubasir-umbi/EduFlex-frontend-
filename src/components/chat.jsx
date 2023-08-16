import { Avatar, Typography } from "@mui/material";

export const ChatMessage = ({ message, sender, isReciever }) => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 8,
          flexDirection: isReciever ? "row-reverse" : "row",
        }}
      >
        <Avatar sx={{ width: 24, height: 24, mr: 1 }} alt={sender} />
        <div
          style={{
            marginLeft: isReciever ? 8 : 0,
            marginRight: isReciever ? 8 : 0,
            backgroundColor: isReciever ? "#e1ffc7" : "#f1f1f1",
            padding: "4px 8px",
            borderRadius: 10,
          }}
        >
          <Typography fontSize={12} variant="body1">
            {message}
          </Typography>
        </div>
      </div>
    );
  };


  export const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      height: "70vh",
      width: "100%",
    },
    paper: {
      flexGrow: 1,
      padding: 16,
      overflowY: "scroll",
    },
    inputContainer: {
      display: "flex",
      alignItems: "center",
      marginTop: 16,
    },
    input: {
      backgroundColor: "#fff",
      borderRadius: "5px 0 0px 5px",
    
    },
    sendIcon: {
      cursor: "pointer",
      backgroundColor: "#fff",
      padding: "7px",
      borderRadius: "0 5px 5px 0",
    },
  };