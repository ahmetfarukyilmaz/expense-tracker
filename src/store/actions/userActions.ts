import { LoginForm, User, UserDispatch } from "../../types/user";
import api from "../../utils/api";

export const login =
    (credentials: LoginForm) => async (dispatch: UserDispatch) => {
        dispatch({ type: "LOGIN_START" });
        try {
            const response = await api.post<User>("/users/login", credentials);
            dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
            localStorage.setItem("token", response.data.token);
        } catch (error) {
            dispatch({ type: "LOGIN_ERROR" });
        }
    };
