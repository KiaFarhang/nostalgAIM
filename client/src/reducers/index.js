import { combineReducers } from 'redux';

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions';

//Auth reducer

const auth = function auth(state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('naim_token') ? true : false,
    errorMessage: ''
}, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false,
                user: action.creds
            });
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: true,
                errorMessage: ''
            });
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.errorMessage
            });
        default:
            return state;
    }
}

const nostalgAIM = combineReducers({ auth });
export default nostalgAIM;
