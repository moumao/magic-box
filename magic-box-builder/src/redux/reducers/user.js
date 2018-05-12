import * as userActions from '../actions/user';

const initState = {
    hasLogin: localStorage.getItem('hasLogin') === 'true' ? true : false,
    isLoading: false,
    userInfo: {},
    errorMsg: ''
};

export default function reducer(state = initState, action) {
    const { type, payload, errorMsg } = action;
    switch (type) {
        case userActions['GET_USER_INFO_REQUEST']:
        case userActions['LOG_IN_REQUEST']:
            return {
                ...state,
                isLoading: true,
                userInfo: {},
                errorMsg: ''
            };
        case userActions['LOG_IN_SUCCESS']:
        case userActions['SIGN_IN_SUCCESS']:
        case userActions['GET_USER_INFO_SUCCESS']:
            return {
                ...state,
                hasLogin: true,
                isLoading: false,
                userInfo: payload.data.userInfo,
                errorMsg: ''
            };
        case userActions['GET_USER_INFO_FAIL']:
        case userActions['LOG_IN_FAIL']:
        case userActions['SIGN_IN_FAIL']:
            return {
                ...state,
                isLoading: false,
                userInfo: {},
                errorMsg
            };
        case userActions['LOG_OUT']:
            return {
                ...state,
                hasLogin: false,
                isLoading: false,
                userInfo: {},
                errorMsg: ''
            };
        default:
            return state;
    }
}
