import React from "react";
import {
    Navigate,
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";


type MapPropsType = {
    isAuth: boolean
}

type DispatchPropsType = {

}


export function WithAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {
    const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {
        let { isAuth, ...restProps } = props
        if (!isAuth) return <Navigate to="/login" />

        return <WrappedComponent {...restProps as WCP} />

    }
    return RedirectComponent;
}

type MapPropsTypeTwo = {

}

type DispatchPropsTypeTwo = {

}

export function withRouter<P>(WrappedComponent: React.ComponentType<P>) {

    const RouterComponent: React.FC<MapPropsTypeTwo & DispatchPropsTypeTwo> = (props) => {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return <WrappedComponent {...props as P} router={{ location, navigate, params }} />

    }
    return RouterComponent;
}

// export const withRouter = <P extends object>(Component: React.ComponentType<P>) => {
//     class RouterComponent extends React.Component<P & WithLoadingProps, {}, ReactNode> {
//         render() {
//             let location = useLocation();
//             let navigate = useNavigate();
//             let params = useParams();
//             return <Component {...this.props} router={{ location, navigate, params }} />
//         }
//     }
//     return RouterComponent;

// };

// export const WithAuthRedirect = <P extends object>(Component: React.ComponentType<P>):
// ReactElement<P & WithLoadingProps>  => ({

//               isAuth, ...props } )
//             return isAuth ? navigate("/login") : <Component {...props as P} />;

//     return WithLoading;

// };

// export const withRouter = (Component) => {

//     function RouterComponent(props) {
//         let location = useLocation();
//         let navigate = useNavigate();
//         let params = useParams();
//         return <Component {...props} router={{ location, navigate, params }} />

//     }
//     return RouterComponent;
// }

// export const WithAuthRedirect = (Component) => {
//     class RedirectComponent extends React.Component {
//         render() {
//             if (!this.props.isAuth) return <Navigate to="/login" />

//             return <Component {...this.props} />

//         }
//     }
//     return RedirectComponent;
// }