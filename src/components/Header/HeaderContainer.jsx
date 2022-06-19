
import React, { Component } from 'react';
import Header from './Header';
import { logOutThunkCreator } from '../../redux/authReducer.ts';
import { connect } from 'react-redux';





class HeaderContainer extends Component {

    componentDidMount() {



    }
    render() {
        return (<Header {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        id: state.auth.id,
        isAuth: state.auth.isAuth,
        email: state.auth.email,
        login: state.auth.login,
    }
};

export default connect(mapStateToProps, { logOutThunkCreator })(HeaderContainer);




 // this.props.toggleFetching(true);
        // baseAPI.getAuthMe().then((data) => {
        //     if (data.resultCode === 0) {

        //         let { id, email, login } = data.data; //destructuration
        //         this.props.setAuthUserData(id, email, login);

        //     }
        // })