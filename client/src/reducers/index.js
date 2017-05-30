import {combineReducers} from 'redux';

const isLoggedIn = (state = false, action) =>{
	switch (action.type) {
		case 'TOGGLE_LOGIN':
			return !state;
		default:
			return state
	}
}

const nostalgAIM = combineReducers({isLoggedIn});

export default nostalgAIM;