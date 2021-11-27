import { User, UserAction, UserState } from "../../types/user";

const defaultState: UserState = {
    data: {} as User,
    error: "",
    loading: false,
};
const userReducer = (state: UserState = defaultState, action: UserAction) => {
    return state;
};

export default userReducer;
