import { combineReducers } from 'redux';

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions';

// const isLoggedIn = (state = false, action) =>{
// 	switch (action.type) {
// 		case 'TOGGLE_LOGIN':
// 			return !state;
// 		default:
// 			return state
// 	}
// }





//Auth reducer

function auth(state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('naim_token') ? true : false
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
                isFetching: true,
                isAuthenticated: false,
                errorMessage: action.message
            });
        default:
            return state;
    }
}

const nostalgAIM = combineReducers({ auth });
export default nostalgAIM;
