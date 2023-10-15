import { store } from '../index';
import { createAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.quote.value;
    event.target.quote.value = '';
    store.dispatch(createAnecdote(content));
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="quote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
