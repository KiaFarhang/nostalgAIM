import {connect} from 'react-redux';
import {toggleLogIn} from '../../../actions';
import App from '../../presenters/App';

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.isLoggedIn
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onLoginToggle: () => {
			dispatch(toggleLogIn())
		}
	}
}


const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;