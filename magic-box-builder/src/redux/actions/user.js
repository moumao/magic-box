import request from 'util/axios'

export const LOG_IN_SUCCESS = 'user/LOG_IN_SUCCESS';
export const LOG_IN_FAIL = 'user/LOG_IN_FAIL';

export const SIGN_IN_SUCCESS = 'user/SIGN_IN_SUCCESS';
export const SIGN_IN_FAIL = 'user/SIGN_IN_FAIL';

export const LOG_OUT = 'user/LOG_OUT'

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

export const login = params => {
    const { password, userName, remember } = params

    return async dispatch => {
        try {
            const result = await request.get(`http://my.magic.com/api/user/login?userName=${userName}&password=${password}&remember=${remember}`)
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

export const signIn = (params, dispatch) => {
    const { password, userName } = params

    return async dispatch => {
        try {
            const result = await request.get(`http://my.magic.com/api/user/signIn?userName=${userName}&password=${password}`)
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

export const logOut = () => {
    localStorage.removeItem('hasLogin');

    return {
      type: LOG_OUT
    }
}

export const getUserInfo = () => {

    return async dispatch => {
        try {
            const result = await request.get(`http://my.magic.com/api/user/getUserInfo`)
            result['data']['state_code'] === '0' ? dispatch(success(result, GET_USER_INFO_SUCCESS)) : dispatch(fail(result['data']['state_code'], GET_USER_INFO_FAIL))
            return result
        } catch (err) {
            dispatch(fail(err, GET_USER_INFO_FAIL))
            return err
        }
    }
}
