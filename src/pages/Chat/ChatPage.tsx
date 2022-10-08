import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatMessageType } from "../../components/api/chatAPI";
import {
  startMessagesListening,
  stopMessagesListening,
  sendMessage,
} from "../../redux/chatReducer";
import { RootStateType } from "../../redux/reduxStore";

//let wsChannel: WebSocket | null;
// wsChannel = new WebSocket(
//   "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
// );

type PropsType = {
  message: string;
};

const ChatPage: React.FC = () => {
  return (
    <div>
      <Chat />
    </div>
  );
};
const Chat: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startMessagesListening());
    return () => {
      dispatch(stopMessagesListening());
    };
  }, []);

  return (
    <div>
      <Messages />
      <MessageForm />
    </div>
  );
};






const Messages: React.FC<{}> = ({}) => {
  const messages = useSelector((state: RootStateType) => state.chat.messages);

  return (
    <div  
      style={{
       display: "flex",
       marginBottom: "20px",
        flexDirection: "column",
        justifyContent: "space-around",
        height: "500px",
        overflowY: "auto",
      }}
    >
      {messages.map((message:ChatMessageType) => (
        <Message message ={message} />
     )) }
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
        <div style={{}}>{message.userName}</div>
      </div>
      <div> {message.message} </div>
    </div>
  );
};


const MessageForm: React.FC = () => {
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const sendMessageHandler = () => {
    if (!message) {
      return;
    }
    dispatch(sendMessage(message));
    setMessage("");
  };
  return (
    <div>
      <div>
        <textarea
          onChange={(e) => setMessage(e.currentTarget.value)}
          value={message}
        ></textarea>
        <button onClick={sendMessageHandler}>Send message</button>
      </div>
    </div>
  );
};



export default ChatPage;

// Chat
// const [wsChannel, setWsChannel] = useState<WebSocket | null>(null);

// useEffect(() => {
//   let wsChannel: WebSocket;
//   const closeHandler = () => {
//     console.log("webSocket was closed!");
//     setTimeout(connectWS, 3000);
//   };
//   function connectWS() {
//     wsChannel?.removeEventListener("close", closeHandler);
//     wsChannel?.close();
//     wsChannel = new WebSocket(
//       "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
//     );
//     wsChannel?.addEventListener("close", closeHandler);

//     setWsChannel(wsChannel);
//   }
//   connectWS();

//   return () => {
//     wsChannel.removeEventListener("close", closeHandler);
//     wsChannel.close();
//   };
// }, []);
