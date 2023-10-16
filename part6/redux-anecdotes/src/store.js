import { configureStore } from '@reduxjs/toolkit';
import anecdotes from './services/anecdotes';
import quoteReducer, { setQuotes } from './reducers/anecdoteReducer';
import filterReducer from './reducers/filterReducer';
import notificationReducer from './reducers/notificationReducer';

const store = configureStore({
  reducer: {
    quotes: quoteReducer,
    filter: filterReducer,
    notification: notificationReducer,
  },
});

anecdotes.getAll().then((quotes) => store.dispatch(setQuotes(quotes)));

export default store;
