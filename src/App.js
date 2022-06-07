import React, { Component, Suspense } from 'react';
import './App.css';
import NavBar from './components/Nav/Nav';
import News from './components/News/News';
import Friends from './components/Friends/Friends';
import Settings from './components/Settings/Settings';
import { HashRouter, Routes, Route } from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import { initialized } from './redux/appReducer';
import LoginPage from './LoginPage/LoginPage';
import { connect } from 'react-redux';
import { withRouter } from './HOC/WithAuthRedirect';
import { compose } from 'redux';
import preloader from './components/images/preloader.svg';
import store from './redux/reduxStore';
import { Provider } from 'react-redux';


//import DialogsContainer from './components/Dialogs/DialogsContainer';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));




class App extends Component {

  componentDidMount() {
    this.props.initialized();
  }
  render() {

    if (!this.props.isInitialized) {
      return <img src={preloader} />
    }

    return (
      <div className="grid">
        <HeaderContainer />
        <NavBar />

        <div className='grid-main'>
          <Suspense fallback={<div> LOADING </div>}>
            <Routes>
              <Route path='/profile/:userId' element={<ProfileContainer animate={true} />} />
              <Route path='/profile' element={<ProfileContainer />} />
              <Route path='/dialogs' element={<DialogsContainer />} />
              <Route path='/news' element={<News />} />
              <Route path='/friends' element={<Friends />} />
              <Route path='/settings' element={<Settings />} />
              <Route path='/users' element={< UsersContainer />} />
              <Route path='/auth' element={< LoginPage />} />
              <Route path='/login' element={< LoginPage />} />
            </Routes>
          </Suspense >
        </div>
      </div >
    );
  }
}


const mapStateToProps = (state) => ({
  isInitialized: state.app.isInitialized,
})

const AppContainer = compose(

  connect(mapStateToProps, { initialized }),
  withRouter,
)(App);

const MainApp = (props) => {


  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </HashRouter>
  )


}


export default MainApp;




