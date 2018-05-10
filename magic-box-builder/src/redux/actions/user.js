export const LOG_IN_REQUEST = "user/LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "user/LOG_IN_SUCCESS";
export const LOG_IN_FAIL = "user/LOG_IN_FAIL";

export const GET_USER_INFO_REQUEST = "user/GET_USER_INFO_REQUEST";
export const GET_USER_INFO_SUCCESS = "user/GET_USER_INFO_SUCCESS";
export const GET_USER_INFO_FAIL = "user/GET_USER_INFO_FAIL";

export function getUserInfo() {
    return {
       types: { requset: GET_USER_INFO_REQUEST, success: GET_USER_INFO_SUCCESS, fail: GET_USER_INFO_FAIL },
       promise: client => client.get(`http://localhost:3001/api/userInfo/getUserInfo?name=root`)
   }
}
