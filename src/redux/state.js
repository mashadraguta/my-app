import dialogsReducer from "./dialogsReducer";
import postsReducer from "./postsReducer";


let store = {

  _state: {
    profile: {
      posts: [
        { id: '1', desc: 'Eu nu strivesc corola de minuni a lumii şi nu ucid' },
        { id: '2', desc: 'cu mintea tainele ce-mi ies in cale' },
        { id: '3', desc: 'în flori, în ochi, pe buze ori morminte.' },
        { id: '4', desc: 'Lumina altora sugrumă vraja nepătrunsului ascuns' },
        { id: '5', desc: 'eu cu lumina mea sporesc a lumii taină -' },
        { id: '6', desc: 'şi-ntocmai cum cu razele ei albe luna', author: 'L.Blaga' },

      ],
      profileInfo: [
        { id: 0, text: 'Lapte Condensat' },
        { id: 1, text: 'Actual residence city: Timisoara' },
        { id: 2, text: 'Motto : Citezen of Planet' },
        { id: 3, text: 'Riding. Exploring.Doing' },
        { id: 4, text: 'Happiness is a state of mind' },
      ],
      newPoetry: 'noi nu suntem ființe umane care parcurg o experiență spirituală \n noi suntem ființe spirituale care parcurg o experiență umană',
    },
    dialogs: {
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
      newTextPost: 'patience will conquer all thing',

    },
    sideBar: [
      { id: '1', option: 'Profile' },
      { id: '2', option: 'Messages' },
      { id: '3', option: 'News' },
      { id: '4', option: 'Settings' },
    ],
  },
  _rerenderEntireTree() { console.log(`State was changed`) },

  getState() { return this._state },
  subscribe(observer) {
    this._rerenderEntireTree = observer;
  },

  dispatch(action) {

    this._state.profile = postsReducer(this._state.profile, action);
    this._state.dialogs = dialogsReducer(this._state.dialogs, action);
    this._state.sideBar = sideBarReducer(this._state.sideBar, action);

    this._rerenderEntireTree(this._state);
  }
}




export default store;










































{/*let rerenderEntireTree = () => {
  console.log(`State was changed`);
};


let state = {
  posts: [
    { id: '1', desc: 'Eu nu strivesc corola de minuni a lumii şi nu ucid' },
    { id: '2', desc: 'cu mintea tainele ce-mi ies in cale' },
    { id: '3', desc: 'în flori, în ochi, pe buze ori morminte.' },
    { id: '4', desc: 'Lumina altora sugrumă vraja nepătrunsului ascuns' },
    { id: '5', desc: 'eu cu lumina mea sporesc a lumii taină -' },
    { id: '6', desc: 'şi-ntocmai cum cu razele ei albe luna', author: 'L.Blaga' },

  ],
  dialogs: {
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
    newTextPost: 'patience will conquer all thing',
  },
  sideBar: [
    { id: '1', option: 'Profile' },
    { id: '2', option: 'Messages' },
    { id: '3', option: 'News' },
    { id: '4', option: 'Settings' },
  ],

}



export const addPost = () => {

  let obj = {
    id: '5',
    text: state.dialogs.newTextPost,
  };
  state.dialogs.messagesPage.push(obj);
  state.dialogs.newTextPost = '';
  rerenderEntireTree();
}

export const updateNewPostText = (newText) => {


  state.dialogs.newTextPost = newText;

  rerenderEntireTree();

}

export const subscribe = (observer) => {
  rerenderEntireTree = observer;
}


export default state; */}