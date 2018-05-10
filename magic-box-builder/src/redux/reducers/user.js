import * as userActions from '../actions/user';

const initState = {
    hasLogin: false,
    isLoading: false,
    userInfo: {},
    errorMsg: ''
};

export default function reducer(state = initState, action) {
    switch (action.type) {
        case userActions['GET_USER_INFO_REQUEST']:
            return {
                ...state,
                isLoading: true,
                userInfo: {},
                errorMsg: ''
            };
        case userActions['GET_USER_INFO_SUCCESS']:
            return {
                ...state,
                isLoading: false,
                userInfo: action.result.data,
                errorMsg: ''
            };
        case userActions['GET_USER_INFO_FAIL']:
            return {
                ...state,
                isLoading: false,
                userInfo: {},
                errorMsg: '请求错误'
            };
        default:
            return state;
    }
}
