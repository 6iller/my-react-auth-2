import { LOGIN_SUCCESS, LOGIN_FAIL, AuthActionTypes } from '../actions/authActions';

interface AuthState {
    isAuthenticated: boolean;
    error: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    error: null,
};

const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return { ...state, isAuthenticated: true, error: null };
        case LOGIN_FAIL:
            return { ...state, isAuthenticated: false, error: action.payload };
        default:
            return state;
    }
};

export default authReducer;

// import { LOGIN_SUCCESS, LOGIN_FAIL, AuthActionTypes } from '../actions/authActions';

// interface AuthState {
//     isAuthenticated: boolean;
//     // user: { id: number; name: string } | null;
//     error: string | null;
// }

// const initialState: AuthState = {
//     isAuthenticated: false,
//     // user: null,
//     error: null,
// };

// const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
//     switch (action.type) {
//         case LOGIN_SUCCESS:
//             return {
//                 ...state,
//                 isAuthenticated: true,
//                 // user: action.payload,
//                 error: null,
//             };
//         case LOGIN_FAIL:
//             return {
//                 ...state,
//                 isAuthenticated: false,
//                 error: action.payload,
//             };
//         default:
//             return state;
//     }
// };

// export default authReducer;
