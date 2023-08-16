import React, { useEffect, useState } from "react";
import { Avatar, Paper, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useSelector } from "react-redux";
import { chatApi } from "../services/api";
import { ChatMessage } from "../components/chat";
import { styles } from "../components/chat";




const ChatUI = ({ messages, handleSendMessage, sender }) => {
  const [message, setMessage] = useState("");
console.log(sender, '/>>>>>>>>>>>>>>>>>>>>>>>>');
  const {userInfo} = useSelector(state => state.auth)
 

  return (
    <div style={styles.container}>
      <Paper style={styles.paper}>
        {messages.map((msg, index) =>
        
          msg?.sender?._id === sender ? (
            <>
            {console.log(msg, 'am from trueeeeeee')}
            <ChatMessage
              key={index}
              message={msg.message}
              // sender={msg.sender}
              isReciever={true}
            />
            </>
          ) : (
            <>
            {/* {console.log(msg , 'am from falseeeeee')} */}
            <ChatMessage
              key={index}
              message={msg.message}
              // sender={msg.sender}
              isReciever={false}
            />
            </>
          )
        )}
      </Paper>
      <div style={styles.inputContainer}>
        <TextField
          size="small"
          sx={styles.input}
          variant="outlined"
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          label="Type a message"
          autoFocus
        />
        <SendIcon 
          color="primary"
          style={styles.sendIcon}
          onClick={()=>{handleSendMessage(message)  
             setMessage("")}}
        />
      </div>
    </div>
  );
};

export default ChatUI;
