// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
// import { Router, Route, browserHistory } from 'react-router';
import nostalgAIM from './reducers';
import thunk from 'redux-thunk';
// import Root from './components/Root/Root';
import AppContainer from './components/containers/AppContainer';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

// let createStoreWithMiddleware = applyMiddleware(thunkMiddleware, )

let store = createStore(nostalgAIM, applyMiddleware(thunk));

ReactDOM.render(
	<Provider store={store}>
		<AppContainer />
	</Provider>,
	document.getElementById('root'));

registerServiceWorker();
