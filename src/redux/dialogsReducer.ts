import { Dispatch } from 'redux';
const ADD_POST = 'ADD-POST';

export type DialogsPageType = {
    name: string
    id?: string
}

export type MessagesPageType = {
    id?: string
    text: string
}

type addPostCreatorType = {
    type: typeof ADD_POST
    newPostMessage: string
}


type ActionUsersType = addPostCreatorType


let initialState = {
    dialogsPage: [
        { name: 'Robert M. Pirsig', id: '1' },
        { name: 'Nikos Kazantzakis', id: '2' },
        { name: 'Nicolas Bouvier', id: '3' },
        { name: 'Richard Bach', id: '4' },

    ] as Array<DialogsPageType>,

    messagesPage: [
        { id: '1', text: `We just have to keep going until we find out what’s wrong or find out why we don’t know what’s wrong.` },
        { id: '2', text: 'You have everything but one thing: madness. A man needs a little madness or else - he never dares cut the rope and be free.' },
        { id: '3', text: `On croit qu'on fait un voyage, mais bientôt c'est le voyage qui vous fait, ou vous défait.` },
        { id: '4', text: 'To fly as fast as thought, to anywhere that is, you must begin by knowing that you have already arrived' },

    ] as Array<MessagesPageType>,
}


export type InitialStateType = typeof initialState



const dialogsReducer = (state = initialState, action: ActionUsersType): InitialStateType => {

    switch (action.type) {
        case ADD_POST: {

            let obj = action.newPostMessage;

            return {
                ...state,
                messagesPage: [
                    { text: obj },
                    ...state.messagesPage],
            }

        }

        default:
            return state;
    }
}



export const addPostCreator = (newPostMessage: string) => (dispatch: Dispatch<ActionUsersType>) => {
    dispatch({
        type: ADD_POST,
        newPostMessage: newPostMessage
    })
}

export default dialogsReducer;


