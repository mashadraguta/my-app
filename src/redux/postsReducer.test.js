import postsReducer, { actionAddPoetryCreator, actionDeletePost } from "./postsReducer";


let state = {
    posts: [
        { id: '1', desc: 'Eu nu strivesc corola de minuni a lumii şi nu ucid' },
        { id: '2', desc: 'cu mintea tainele ce-mi ies in cale' },
        { id: '3', desc: 'în flori, în ochi, pe buze ori morminte.' },
        { id: '4', desc: 'Lumina altora sugrumă vraja nepătrunsului ascuns' },
        { id: '5', desc: 'eu cu lumina mea sporesc a lumii taină -' },
        { id: '6', desc: 'şi-ntocmai cum cu razele ei albe luna', author: 'L.Blaga' },
    ],
};


it('new post should be added', () => {
    // 1. test data
    let action = actionAddPoetryCreator("Today is present");

    // 2. action
    let newState = postsReducer(state, action)
    // 3. expected output
    expect(newState.posts.length).toBe(7);

});


it('new post should match', () => {
    // 1. test data
    let action = actionAddPoetryCreator("Today is present");

    // 2. action
    let newState = postsReducer(state, action)
    // 3. expected output

    expect(newState.posts[6].desc).toBe("Today is present");
});


it('new post should be deleted', () => {
    // 1. test data
    let action = actionDeletePost(1);

    // 2. action
    let newState = postsReducer(state, action)

    // 3. expected output
    expect(newState.posts.length).toBe(5);
});


it('posts length should stay the same if the id is incorrect', () => {
    // 1. test data
    let action = actionDeletePost(123232);

    // 2. action
    let newState = postsReducer(state, action)

    // 3. expected output
    expect(newState.posts.length).toBe(6);
});


