import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware,compose} from 'redux';
import {BrowserRouter} from 'react-router-dom';
import reduxPromise from 'redux-promise';//for resolve request in actions
import reduxThunk from 'redux-thunk'

import reducers from './reducers';
import App from './App';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

// const createStoreWithMiddleware = applyMiddleware(
// 	reduxPromise,
// 	reduxThunk
// )(createStore);

// const store = {
// 	createStoreWithMiddleware(reducers),
// 	(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
// }

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	reducers,
	composeEnhancers(
		applyMiddleware(
			reduxPromise,
			reduxThunk
		)
	)
);

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App/>
		</BrowserRouter>
	</Provider>
	, document.getElementById('root'));
registerServiceWorker();