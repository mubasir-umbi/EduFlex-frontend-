import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Chat from "../../screens/chat";
import { chatApi } from "../../services/api";
import { useSelector } from "react-redux";
import ChatIcon from '@mui/icons-material/Chat';
import  io  from "socket.io-client";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ENDPOINT = "http://localhost:4001"
let socket, selectedChatCompare

export default function ChatPopUp({tutorId, tutor}) {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState([])
  const [conversation, setConversation] = React.useState('')
  const [load, setLoad] = React.useState(false)
  const [socketConnected, setSocketConnected] = React.useState(false)

  const {userInfo} = useSelector(state => state.auth)
  const senderId = userInfo._id
  const recieverId = tutorId
  const sender = userInfo._id;
  console.log(sender, '{{{{{{{{{{{{{{{{{{{{{{{{{');


  React.useEffect(() => {
    socket = io(ENDPOINT)
    socket.emit("setup", userInfo)
    // socket.on('connection', ()=> setSocketConnected(true))

    socket.on('new message', (newMessage) => {
      setMessages([...messages, newMessage]);
    });

    socket.on('message sent', (sentMessage) => {
      // Handle the confirmation, maybe update UI
    })
  
  
  }, [userInfo, messages]);

  const handleClickOpen = async() => {
    setOpen(true);

    try {
      const res = await chatApi.post('/', {senderId, recieverId})
      if(res){
        setConversation(res?.data?._id)
        setLoad(!load)};
    } catch (error) {
      console.log(error);
    }
  };

   /// Load all messages 


   React.useEffect(() => {
    LoadAllMessage()
    // selectedChatCompare = conversation
  }, [conversation, load,])

  const LoadAllMessage = async() => {
    try {
      const res = await chatApi.get(`message?id=${conversation}`)
      if(res){
        setMessages(res.data)
        console.log(res.data, 'am all message');
        socket.emit('join-chat', conversation)
      }
    } catch (error) {
      console.log(error)
    }
  }


  /// on sending message handler



  // const handleSendMessage = async (message) => {
  //   try {
  //     const messageData = {
  //       conversation,
  //       sender,
  //       message,
  //     };
  //     const res = await chatApi.post(`message`, messageData)
  //     if (res) {
  //       socket.emit('message', messageData);
  //       console.log(res.data, '?????????????????????????????????????????');
  //       setLoad(!load)
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };


 const handleSendMessage = async (message) => {
  if(!message) return
  try {
    const messageData = {
      conversation,
      sender,
      message,
    };
    socket.emit('message', messageData);
    LoadAllMessage()
  } catch (error) {
    console.error(error);
  }
};


  return (
    <div >
      <Button style={{ textTransform: "capitalize" }} variant="outlined" onClick={handleClickOpen}>
       <ChatIcon sx={{mr: 1}}/> Chat with tutor
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {setOpen(false)}}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle textAlign={'center'}>code evalution</DialogTitle>
        <DialogContent style={{minWidth: 400, overflowX: 'hidden', overflowY: "hidden"}}>
          <Chat conversation={conversation} messages={messages} handleSendMessage={handleSendMessage} sender={sender}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {setOpen(false)}}>close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
