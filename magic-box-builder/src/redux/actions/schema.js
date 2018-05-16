import request from 'util/axios'
import { message } from 'antd';
import { jsonToObjEscape } from 'util/json'
export const GET_SCHEMA_SUCCESS = 'schema/GET_SCHEMA_SUCCESS';
export const GET_SCHEMA_FAIL = 'schema/GET_SCHEMA_FAIL';

export const DEL_SCHEMA_SUCCESS = 'schema/DEL_SCHEMA_SUCCESS';
export const DEL_SCHEMA_FAIL = 'schema/DEL_SCHEMA_FAIL';

export const EDIT_SCHEMA_SUCCESS = 'schema/EDIT_SCHEMA_SUCCESS';

export const UPDATE_SCHEMA_SUCCESS = 'schema/UPDATE_SCHEMA_SUCCESS';
export const UPDATE_SCHEMA_FAIL = 'schema/UPDATE_SCHEMA_FAIL';

const successToast = text => {
    message.success(text);
};

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

export const getEditSchema = payload => {

    return {
        type: EDIT_SCHEMA_SUCCESS,
        payload
    }
}

export const getSchemaList = () => {

    return async dispatch => {
        try {
            const result = await request.get(`http://my.magic.com/api/schema/getByUser`)
            // JSON.parse(jsonToObjEscape(schema))
            if (result['data']['state_code'] === '0') {
                result['data']['schemaDataList'] = result['data']['schemaDataList'].map(item => {
                    item['schema'] = JSON.parse(jsonToObjEscape(item['schemaData']))
                    return item
                })
                dispatch(success(result, GET_SCHEMA_SUCCESS))
            }else {
                dispatch(fail(result['data']['state_code'], GET_SCHEMA_FAIL))
            }
            return result
        } catch (err) {
            dispatch(fail(err, GET_SCHEMA_FAIL))
            return err
        }
    }
}

export const deleteSchemaById = id => {

    return async dispatch => {
        try {
            const result = await request.get(`http://my.magic.com/api/schema/deleteById?id=${id}`)
            if (result['data']['state_code'] === '0'){
                successToast('删除成功！')
                result['data']['schemaDataList'] = result['data']['schemaDataList'].map(item => {
                    item['schema'] = JSON.parse(jsonToObjEscape(item['schemaData']))
                    return item
                })
                dispatch(success(result, DEL_SCHEMA_SUCCESS))
            } else {
                dispatch(fail(result['data']['state_code'], DEL_SCHEMA_FAIL))
            }
            return result
        } catch (err) {
            dispatch(fail(err, DEL_SCHEMA_FAIL))
            return err
        }
    }
}

export const saveSchema = (schema, id) => {

    return async dispatch => {
        try {
            const result = await request.post(`http://my.magic.com/api/schema/save`, {schema, id})
            if (result['data']['state_code'] === '0')  {
                successToast('保存成功！')
                dispatch(success(result, UPDATE_SCHEMA_SUCCESS))
            } else {

            }
        } catch (err) {
            dispatch(fail(err, UPDATE_SCHEMA_FAIL))
            return err
        }
    }
}
