import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import app from './redux/reducers';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './App'

const windowD: any = window
const store = createStore(app, windowD.__REDUX_DEVTOOLS_EXTENSION__ && windowD.__REDUX_DEVTOOLS_EXTENSION__())
ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));

serviceWorker.unregister();
