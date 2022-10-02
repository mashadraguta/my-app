import React, { useEffect, useState } from "react";
import userAva from "../../components/images/image.jpg";

const ws = new WebSocket(
  "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
);

type PropsType = {};

export type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};

const ChatPage: React.FC<PropsType> = () => {
  return (
    <div>
      <Chat />
    </div>
  );
};
const Chat = () => {
  return (
    <div>
      <Messages />
      <MessageForm />
    </div>
  );
};

const Messages = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([])
  
  useEffect(() => {
   
    ws.addEventListener("message", (e) => {
      setMessages((prevMessages)=>[...prevMessages,...JSON.parse(e.data)]);
    })
  }, [])

  return (
    <div
      style={{
        marginBottom: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        height: "500px",
        overflowY: "auto",
      }}
    >
      {messages.map((mes: any) => (
        <Message key={Math.random()} message={mes}/>
      ))}

    </div>
  );
};

const MessageForm = () => {
  const [message,setMessage]  =useState('')
const sendMessage = ()=>{
  if(!message) {
    return
  }
  ws.send(message)
  setMessage('')
}
  return (
    <div>
      <div>
        <textarea onChange={(e)=>setMessage(e.currentTarget.value)} value={message}></textarea>
        <button onClick={sendMessage}>Send message</button>
      </div>
    </div>
  );
};

const Message: React.FC<{message:ChatMessageType}> = ({message}) => {

  return (
    <div>
       
      <div
        style={{
          display: "flex",      
          alignItems: "center",  
        }}
      >
        <img
          src={message.photo}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
           
          }}
          alt="logo"
        />
        <div style={{ }}>
          {message.userName}
        </div>
        </div>
        <div> {message.message} </div>
      
    </div>
  );
};

export default ChatPage
