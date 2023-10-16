import { configureStore } from '@reduxjs/toolkit';
import quoteReducer from './reducers/anecdoteReducer';
import filterReducer from './reducers/filterReducer';
import notificationReducer from './reducers/notificationReducer';

const store = configureStore({
  reducer: {
    quotes: quoteReducer,
    filter: filterReducer,
    notification: notificationReducer,
  },
});

export default store;
