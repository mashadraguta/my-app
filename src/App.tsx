import React, { Component, ComponentType, lazy, Suspense } from 'react';
import './App.css';
import NavBar from './components/Nav/Nav';
import Friends from './components/Friends/Friends';
import Settings from './components/Settings/Settings';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
//import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import { initialized } from './redux/appReducer';
import LoginPage from './LoginPage/LoginPage';
import { connect } from 'react-redux';
import { withRouter } from './HOC/WithAuthRedirect';
import { compose } from 'redux';
import store, { RootStateType } from './redux/reduxStore';
import { Provider } from 'react-redux';
import { PropsType } from './components/Dialogs/Dialogs';
import Preloader from './components/common/Preloader';
import ProfileContainerMain from './components/Profile/ProfileContainer';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

type MapStateToProps = ReturnType<typeof mapStateToProps>
type MapDispatchToProps = {
  initialized: () => void
}


class App extends Component<MapStateToProps & MapDispatchToProps> {

  componentDidMount() {
    this.props.initialized();
  }
  render() {

    if (!this.props.isInitialized) {
      return <Preloader />
    }

    return (
      <div className="grid" >
        <HeaderContainer />
        < NavBar />

        <div className='grid-main'>
          <Suspense fallback={<div>LOADING </div>}>
            <Routes>
              <Route path="/" element={< ProfileContainerMain />} />
              < Route path='/profile/:userId' element={< ProfileContainerMain />} />
              < Route path='/profile' element={< ProfileContainerMain />} />
              < Route path='/dialogs' element={< DialogsContainer />} />
              < Route path='/news' element={< Friends />} />
              < Route path='/settings' element={< Settings />} />
              < Route path='/users' element={< UsersContainer title={'SW'} />} />
              < Route path='/auth' element={< LoginPage email={''} password={''} general={''} />} />
              < Route path='/login' element={< LoginPage email={''} password={''} general={''} />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state: RootStateType) => ({
  isInitialized: state.app.isInitialized,
})

const AppContainer = compose<ComponentType>(

  connect(mapStateToProps, { initialized }),
  withRouter,
)(App);

const MainApp = () => {


  return (
    <HashRouter>
      <Provider store={store} >
        <AppContainer />
      </Provider>
    </HashRouter>
  )


}


export default MainApp;




