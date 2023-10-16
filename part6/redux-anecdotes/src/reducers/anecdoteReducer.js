import { createSlice } from '@reduxjs/toolkit';

const getId = () => (100000 * Math.random()).toFixed(0);

const quoteSlice = createSlice({
  name: 'quotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    addVote(state, action) {
      const id = action.payload;
      const quoteToChange = state.find((n) => n.id === id);
      const changedQuote = {
        ...quoteToChange,
        votes: quoteToChange.votes + 1,
      };
      return state.map((quote) => (quote.id !== id ? quote : changedQuote));
    },
    appendQuote(state, action) {
      state.push(action.payload);
    },
    setQuotes(state, action) {
      return action.payload;
    },
  },
});

export const { createAnecdote, addVote, appendQuote, setQuotes } =
  quoteSlice.actions;
export default quoteSlice.reducer;
