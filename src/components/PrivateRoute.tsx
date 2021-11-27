import { Redirect, Route, RouteProps } from "react-router-dom";

interface PrivateRouteProps extends RouteProps {
    component: React.FC<any>;
}

function PrivateRoute({ component: Component, ...rest }: PrivateRouteProps) {
    return (
        <Route
            {...rest}
            render={(props) => {
                return localStorage.getItem("token") ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                );
            }}
        />
    );
}

export default PrivateRoute;
