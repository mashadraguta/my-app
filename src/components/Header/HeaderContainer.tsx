
import React from 'react';
import Header, { MapDispatchToPropsType, MapStateToPropsType }  from './Header';
import { logOutThunkCreator } from '../../redux/authReducer';
import { connect} from 'react-redux';
import { RootStateType } from '../../redux/reduxStore';






class HeaderContainer extends React.Component<MapStateToPropsType & MapDispatchToPropsType> {

    render() {
        return (<Header {...this.props} />
        );
    }
}

const mapStateToProps = (state:RootStateType) => {
    return {
       // id: state.auth.id,
        isAuth: state.auth.isAuth,
        email: state.auth.email,
       // login: state.auth.login,
    } 
};


// <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>(mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>, mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps>): InferableComponentEnhancerWithProps<TStateProps & ResolveThunks<TDispatchProps>, TOwnProps>;

export default connect< MapStateToPropsType,  MapDispatchToPropsType, {},RootStateType>(mapStateToProps, { logOutThunkCreator })(HeaderContainer);




 // this.props.toggleFetching(true);
        // baseAPI.getAuthMe().then((data) => {
        //     if (data.resultCode === 0) {

        //         let { id, email, login } = data.data; //destructuration
        //         this.props.setAuthUserData(id, email, login);

        //     }
        // })


// email={null} isAuth={false} logOutThunkCreator={function (): void {
//     throw new Error('Function not implemented.');
// } } 