import { User, UserAction, UserState } from "../../types/user";

const defaultState: UserState = {
    data: {} as User,
    error: "",
    loading: false,
};
const userReducer = (state: UserState = defaultState, action: UserAction) => {
    switch (action.type) {
        case "LOGIN_START":
        case "IS_LOGGED_IN_START":
            return {
                ...state,
                loading: true,
            };
        case "LOGIN_SUCCESS":
        case "IS_LOGGED_IN_SUCCESS":
            return {
                ...state,
                loading: false,
                data: action.payload,
            };
        case "LOGIN_ERROR":
            return {
                ...state,
                loading: false,
                error: "Login failed",
            };
        case "IS_LOGGED_IN_ERROR":
            return {
                ...state,
                loading: false,
                error: "Invalid or expired token",
            };
        case "LOGOUT":
            return {
                ...state,
                data: {} as User,
            };

        default:
            return state;
    }
};

export default userReducer;
