import {combineReducers} from "redux";

import user from './reducers/user'
import schema from './reducers/schema'

export default combineReducers({
    user,
    schema
});
