import React from 'react';
import ReactDOM from 'react-dom/client';
import { combineReducers, legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import quoteReducer from './reducers/anecdoteReducer';
import filterReducer from './reducers/filterReducer';

const reducer = combineReducers({
  quotes: quoteReducer,
  filter: filterReducer,
});

export const store = createStore(reducer);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
