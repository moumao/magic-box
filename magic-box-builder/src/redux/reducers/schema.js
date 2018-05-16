import * as schemaActions from '../actions/schema';

const initState = {
    schemaList: [],
    edit: {},
    errorMsg: ''
};

export default function reducer(state = initState, action) {
    const { type, payload, errorMsg } = action;
    switch (type) {
        case schemaActions['GET_SCHEMA_SUCCESS']:
        case schemaActions['DEL_SCHEMA_SUCCESS']:
            return {
                ...state,
                schemaList: payload.data.schemaDataList,
                errorMsg: ''
            };
        case schemaActions['UPDATE_SCHEMA_SUCCESS']:
            return {
                ...state,
                errorMsg: ''
            };
        case schemaActions['GET_SCHEMA_FAIL']:
            return {
                ...state,
                schemaList: [],
                errorMsg
            };
        case schemaActions['DEL_SCHEMA_FAIL']:
        case schemaActions['UPDATE_SCHEMA_FAIL']:
            return {
                ...state,
                errorMsg
            };
        case schemaActions['EDIT_SCHEMA_SUCCESS']:
            return {
                ...state,
                edit: payload,
                errorMsg: ''
            };
        default:
            return state;
    }

}
