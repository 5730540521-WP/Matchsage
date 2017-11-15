import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {BrowserRouter} from 'react-router-dom';
import reduxPromise from 'redux-promise';//for resolve request in actions
import reduxThunk from 'redux-thunk'

import reducers from './reducers';
import App from './App';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

const createStoreWithMiddleware = applyMiddleware(
	reduxPromise,
	reduxThunk
)(createStore);

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<BrowserRouter>
			<App/>
		</BrowserRouter>
	</Provider>
	, document.getElementById('root'));
registerServiceWorker();