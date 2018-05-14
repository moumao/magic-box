import * as userActions from '../actions/user';

const initState = {
    hasLogin: localStorage.getItem('hasLogin') === 'true' ? true : false,
    userInfo: {},
    errorMsg: ''
};

export default function reducer(state = initState, action) {
    const { type, payload, errorMsg } = action;
    switch (type) {
        case userActions['LOG_IN_SUCCESS']:
        case userActions['SIGN_IN_SUCCESS']:
        case userActions['GET_USER_INFO_SUCCESS']:
            return {
                ...state,
                hasLogin: true,
                userInfo: payload.data.userInfo,
                errorMsg: ''
            };
        case userActions['GET_USER_INFO_FAIL']:
        case userActions['LOG_IN_FAIL']:
        case userActions['SIGN_IN_FAIL']:
            return {
                ...state,
                userInfo: {},
                errorMsg
            };
        case userActions['LOG_OUT']:
            return {
                ...state,
                hasLogin: false,
                userInfo: {},
                errorMsg: ''
            };
        default:
            return state;
    }
}
