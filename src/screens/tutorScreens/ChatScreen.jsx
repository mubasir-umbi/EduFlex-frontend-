import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Paper,
} from "@mui/material";
import SideBar from "../../components/tutor/sideBar";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { chatApi, tutorApi, tutorApiToken } from "../../services/api";
import  io  from "socket.io-client";
import Chat from '../chat'
import { END_POINT } from "../../constants/usersConstants";


let socket

const UserList = ({ users, getChatHistory }) => (

  <Paper
    style={{ flex: 1, overflowY: "auto", width: '30%' }}
    elevation={3}
  >
    <List>
      {users.map((user, index) => (
        <ListItem
          key={index}
          button
          onClick={() => getChatHistory(user.conversation)}
        //   style={{ background: user.selected ? "#E0E0E0" : "inherit" }}
        >
          <ListItemText primary={user.user.fName} />
          <ListSubheader primary={user.user.email} />
        </ListItem>
      ))}
    </List>
  </Paper>
);

const ChatScreen = () => {

  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([])
  const [user, setUser] = useState('')
  const [conversation, setConversation] = useState("");

  const {tutorInfo} = useSelector(state => state.tutorAuth)
  const sender = tutorInfo?.res?.id

  const loadChatList = async () => {
   try {
    const res = await tutorApi.get(`chats?id=${sender}`)
    setUsers(res?.data)
    console.log(res.data, 'res dataaaaaaaxxxxxxxxxxxxxxxxxxxxxx');
   } catch (error) {
    console.log(error)
   }
  }

  useEffect(() => {
    loadChatList()
  }, [])



    const LoadAllMessage = async(conversation) => {
        setConversation(conversation)
        try {
          const res = await chatApi.get(`message?id=${conversation}`)
          if(res){
            setMessages(res.data)
            setUser(res.data[0].sender._id)
            console.log(res.data[0].sender._id, 'am all message');
            socket.emit('join-chat', conversation)
          }
        } catch (error) {
          console.log(error)
        }
      }

      React.useEffect(() => {
        socket = io(END_POINT)
        socket.emit("setup", tutorInfo.res)
        // socket.on('connection', ()=> setSocketConnected(true))
    
        socket.on('new message', (newMessage) => {
          setMessages([...messages, newMessage]);
          LoadAllMessage(conversation)

        });
    
        socket.on('message sent', (sentMessage) => {
          // Handle the confirmation, maybe update UI
        })
        
      
      }, [tutorInfo, messages]);


    //   const handleSendMessage = async (message) => {
    //     try {
    //       const messageData = {
    //         conversation,
    //         sender,
    //         message,
    //       };
    //       console.log(messageData);
    //       const res = await chatApi.post(`message`, messageData)
    //       if (res) {
    //         socket.emit('message', messageData);
    //         console.log(res.data, '?????????????????????????????????????????');
    //         setLoad(!load)
    //       }
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };


      const handleSendMessage = async (message) => {
        if(!message) return
        try {
          const messageData = {
            conversation,
            sender,
            message,
          };
          socket.emit('message', messageData);
          await LoadAllMessage(conversation)
        } catch (error) {
          console.error(error);
        }
      };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (inputValue.trim() !== "") {
//       setMessages([...messages, { text: inputValue, isSent: true }]);
//       setInputValue("");
//     }
//   };

  return (
    <SideBar>
      <Box
        style={{
          display: "flex",
          height: "75vh",
          width: 700,
          padding: 16,
          marginTop: 100,
          marginLeft: 50
        }}
      >
        <UserList users={users} getChatHistory={LoadAllMessage} />
        <Box width={'70%'}>
            <Chat  messages={messages} handleSendMessage={handleSendMessage} sender={user}/>
        </Box>
      </Box>
    </SideBar>
  );
};

export default ChatScreen;
