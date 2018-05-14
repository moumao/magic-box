import * as schemaActions from '../actions/schema';

const initState = {
    schemaList: [],
    errorMsg: ''
};

export default function reducer(state = initState, action) {
    const { type, payload, errorMsg } = action;
    switch (type) {
        case schemaActions['GET_SCHEMA_SUCCESS']:
        case schemaActions['DEL_SCHEMA_SUCCESS']:
            return {
                ...state,
                schemaList: payload.data.schemaData,
                errorMsg: ''
            };
        case schemaActions['GET_SCHEMA_FAIL']:
            return {
                ...state,
                schemaList: [],
                errorMsg
            };
        case schemaActions['DEL_SCHEMA_FAIL']:
            return {
                ...state,
                errorMsg
            };
        default:
            return state;
    }

}
