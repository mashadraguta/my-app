const ADD_POST = 'ADD-POST';

export type DialogsPageType = {
    name: string
    id?: string
}

export type MessagesPageType = {
    id?: string
    text: string
}

let initialState = {
    dialogsPage: [
        { name: 'Senegal ', id: '1' },
        { name: ' Belgrade', id: '2' },
        { name: 'Sighisoara ', id: '3' },
        { name: 'Maguri - Racatau ', id: '4' },
        { name: 'Tabriz ', id: '5' },
    ] as Array<DialogsPageType>,

    messagesPage: [
        { id: '1', text: 'Many months have gone' },
        { id: '2', text: 'You worked real hard to have what you have' },
        { id: '3', text: 'The happiness is real only when is shared' },
        { id: '4', text: 'Come ride with me!' },

    ] as Array<MessagesPageType>,
}


export type InitialStateType = typeof initialState



const dialogsReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {
        case ADD_POST: {

            let obj = action.newPostMessage;

            return {
                ...state,
                messagesPage: [{ text: obj }, ...state.messagesPage],

            }

        }

        default:
            return state;
    }
}

type addPostCreatorType = {
    type: typeof ADD_POST
    newPostMessage: string
}


export const addPostCreator = (newPostMessage: string) => (dispatch: any) => {
    dispatch({
        type: ADD_POST,
        newPostMessage: newPostMessage
    })
}

export default dialogsReducer;


