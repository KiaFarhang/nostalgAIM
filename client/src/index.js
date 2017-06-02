// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
// import { Router, Route, browserHistory } from 'react-router';
import nostalgAIM from './reducers';
// import Root from './components/Root/Root';
import AppContainer from './components/containers/AppContainer';
import registerServiceWorker from './registerServiceWorker';
import './index.css';


//Root
	//App - CONTAINER COMPONENT (track login state)
		//(if logged in) ChatScreen
		//(if not logged in) LoginScreen

let store = createStore(nostalgAIM);

ReactDOM.render(
	<Provider store={store}>
		<AppContainer />
	</Provider>,
	document.getElementById('root'));

registerServiceWorker();
