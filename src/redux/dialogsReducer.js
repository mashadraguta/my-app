const ADD_POST = 'ADD-POST';
// const UPDATE_NEW_POST = 'UPDATE-NEW-POST';

let initialState = {
    dialogsPage: [
        { name: 'Senegal ', id: '1' },
        { name: ' Belgrade', id: '2' },
        { name: 'Sighisoara ', id: '3' },
        { name: 'Maguri - Racatau ', id: '4' },
        { name: 'Tabriz ', id: '5' },

    ],

    messagesPage: [
        { id: '1', text: 'Many months have gone' },
        { id: '2', text: 'You worked real hard to have what you have' },
        { id: '3', text: 'The happiness is real only when is shared' },
        { id: '4', text: 'Come ride with me!' },

    ],
};
const dialogsReducer = (state = initialState, action) => {

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

//export const addPostCreator = (newPostMessage) => ({ type: ADD_POST }, newPostMessage)

export const addPostCreator = (newPostMessage) => (dispatch) => {
    dispatch({
        type: ADD_POST,
        newPostMessage: newPostMessage
    })
}

export default dialogsReducer;


// export const updateOnChange = (text) => ({
//     type: 'UPDATE-NEW-POST',
//     newText: text, //  {text} este ceea ce introduce utilizatorul,
//     datele care vin din UI prin React.createRef()
// });

   // let obj = {
        //     id: '5',
        //     text: state.newTextPost,
        // };
        // let newState = { ...state };
        // newState.messagesPage = [...state.messagesPage];
        // newState.messagesPage.push(obj);
        // newState.newTextPost = '';
        // return newState;

        // case UPDATE_NEW_POST: {

        //     return {
        //         ...state,
        //         newTextPost: action.newText,
        //     }

        //     let newState = { ...state };
        //     newState.newTextPost = action.newText;
        //      return newState;
        // }