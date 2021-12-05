import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { AppState } from "../store";
import { logout } from "../store/actions/userActions";

function Logout() {
    const dispatch = useDispatch();

    const { data } = useSelector((state: AppState) => state.user);

    useEffect(() => {
        dispatch(logout());
    }, []);

    if (!data.username) {
        return <Redirect to="/login" />;
    }
    return <div>Logging out...</div>;
}
export default Logout;
