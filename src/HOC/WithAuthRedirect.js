import React from "react";
import {
    Navigate,
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";


export const WithAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuth) return <Navigate to="/login" />

            return <Component {...this.props} />

        }
    }
    return RedirectComponent;
}

export const withRouter = (Component) => {

    function RouterComponent(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return <Component {...props} router={{ location, navigate, params }} />

    }
    return RouterComponent;
}
