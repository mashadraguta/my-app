export type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};

type SubscriberType = (messages: ChatMessageType[]) => void;

let subscribers = [] as SubscriberType[];

let wsChannel: WebSocket | null = null;
const closeHandler = () => {
  console.log("webSocket was closed!");
  setTimeout(connectWS, 3000);
};

const messageHandler = (e: any) => {
  const newMessages = JSON.parse(e.data);
  subscribers.forEach((s) => s(newMessages));
};

function connectWS() {
  wsChannel?.removeEventListener("close", closeHandler);
  wsChannel?.close();
  wsChannel = new WebSocket(
    "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
  );
  wsChannel?.addEventListener("close", closeHandler);
  wsChannel?.addEventListener("message", messageHandler);
}

export const chatAPI = {
  subscribe(callback: SubscriberType) {
    subscribers.push(callback);
    return () => {
      subscribers = subscribers.filter((s) => s !== callback);
    };
  },
  unsubscribe(callback: SubscriberType) {
    subscribers = subscribers.filter((s) => s !== callback);
  },
  start() {
    connectWS();
  },
  stop() {
    subscribers = [];
    wsChannel?.removeEventListener("close", closeHandler);
    wsChannel?.removeEventListener("message", messageHandler);
    wsChannel?.close();
  },
  sendMessage(message: string) {
    wsChannel?.send(message);
  },
};
