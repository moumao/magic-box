import axios from 'axios'

export const LOG_IN_REQUEST = 'user/LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'user/LOG_IN_SUCCESS';
export const LOG_IN_FAIL = 'user/LOG_IN_FAIL';

export const SIGN_IN_REQUEST = 'user/SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'user/SIGN_IN_SUCCESS';
export const SIGN_IN_FAIL = 'user/SIGN_IN_FAIL';

export const LOG_OUT = 'user/LOG_OUT'

export const GET_USER_INFO_REQUEST = 'user/GET_USER_INFO_REQUEST';
export const GET_USER_INFO_SUCCESS = 'user/GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_FAIL = 'user/GET_USER_INFO_FAIL';

const success = (payload, type)=> {

    return {
        type,
        payload
    }
}

const fail = (errorMsg, type) => {

    return {
        type,
        errorMsg
    }
}

export function login (params) {
    const { password, userName, remember } = params

    return async dispatch => {
        try {
            const result = await axios.get(`http://my.magic.com/api/user/login?userName=${userName}&password=${password}&remember=${remember}`, {
                                                headers: {
                                                  withCredentials: true
                                                }
                                            })
            if (result['data']['state_code'] === '0'){
                remember && localStorage.setItem('hasLogin', 'true');
                dispatch(success(result, LOG_IN_SUCCESS))
            }else {
                dispatch(fail(result['data']['state_code'], LOG_IN_FAIL))
            }
            return result
        } catch (err) {
            dispatch(fail(err, LOG_IN_FAIL))
            return err
        }
    }
}

export function signIn (params, dispatch) {
    const { password, userName } = params

    return async dispatch => {
        try {
            const result = await axios.get(`http://my.magic.com/api/user/signIn?userName=${userName}&password=${password}`, {
                                                headers: {
                                                  withCredentials: true
                                                }
                                            })
            if (result['data']['state_code'] === '0'){
                localStorage.setItem('hasLogin', 'true');
                dispatch(success(result, SIGN_IN_SUCCESS))
            }else {
                dispatch(fail(result['data']['state_code'], SIGN_IN_FAIL))
            }
            return result
        } catch (err) {
            dispatch(fail(err, SIGN_IN_FAIL))
            return err
        }
    }
}

export function logOut() {
    localStorage.removeItem('hasLogin');

    return {
      type: LOG_OUT
    }
}

export function getUserInfo() {

    return {
       types: { requset: GET_USER_INFO_REQUEST, success: GET_USER_INFO_SUCCESS, fail: GET_USER_INFO_FAIL },
       promise: client => client.get(`http://my.magic.com/api/user/getUserInfo`, {
                                           headers: {
                                             withCredentials: true
                                           }
                                       })
   }
}
