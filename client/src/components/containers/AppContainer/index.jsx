// @flow

import {connect} from 'react-redux';
import {logInUser} from '../../../actions';
import App from '../../presenters/App';

const mapStateToProps = (state) => {
	return {
		isFetching: state.auth.isFetching,
		isAuthenticated: state.auth.isAuthenticated
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		logInUser: (creds) => {
			dispatch(logInUser(creds))
		}
	}
}


const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;