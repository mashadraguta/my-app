
import React from 'react';
import ReactDOM from 'react-dom/client';
import MainApp from './App';
import { BrowserRouter } from 'react-router-dom';


const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);


root.render(

    <MainApp />

);



// setInterval(() => {
//     store.dispatch({ type: 'FAKE' })
// }, 1000)


// let p = document.createElement('p');
// p.innerHTML = "Cavalcade Suzuki";
// document.querySelector("body").appendChild(p);


// let rerenderEntireTree = (state) => {

//     root.render(

//         <React.StrictMode>
//             <BrowserRouter>
//                 <Provider store={store}>
//                     <App />
//                 </Provider>
//             </BrowserRouter>
//         </React.StrictMode>,

//     );

// }

// rerenderEntireTree(store.getState()); //patterns
// store.subscribe(() => {
//     let state = store.getState();
//     rerenderEntireTree(state);
// });

