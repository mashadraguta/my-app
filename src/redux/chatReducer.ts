import { InferActionsTypes, RootStateType } from "./reduxStore";
import { ThunkAction } from "redux-thunk";
import { chatAPI, ChatMessageType } from "../components/api/chatAPI";
import { Dispatch } from "redux";

type InitialStateType = typeof initialState;
type ThunkType = ThunkAction<void, RootStateType, unknown, ActionsTypes>;
type ActionsTypes = InferActionsTypes<typeof actions>;

const initialState = {
  messages: [] as ChatMessageType[],
};

const chatReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "MESSAGES_RECEIVED": {
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages],
      };
    }
    default:
      return state;
  }
};

const actions = {
  messagesReceived: (messages: ChatMessageType[]) =>
    ({ type: "MESSAGES_RECEIVED", payload: { messages } } as const),
};

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null;

const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(actions.messagesReceived(messages));
    };
  }
  return _newMessageHandler;
};

export const startMessagesListening = (): any => async (dispatch: any) => {
  chatAPI.start();
  chatAPI.subscribe(newMessageHandlerCreator(dispatch));
};
export const stopMessagesListening = (): any => async (dispatch: any) => {
  chatAPI.unsubscribe(newMessageHandlerCreator(dispatch));
  chatAPI.stop();
};
export const sendMessage =
  (message: string): any =>
  async () => {
    chatAPI.sendMessage(message);
  };

export default chatReducer;
