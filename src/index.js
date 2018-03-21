import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux'

import './index.css';

import App from './App';
import commentsListReducer from './reducers/commentsListReducer';
import registerServiceWorker from './registerServiceWorker';

const jiminnyApp = combineReducers({
  comments: commentsListReducer
})

let store = createStore(jiminnyApp);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
