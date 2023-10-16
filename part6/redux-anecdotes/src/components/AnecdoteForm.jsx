import store from '../store.js';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { handleNotification } from '../reducers/notificationReducer.js';

const AnecdoteForm = () => {
  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.quote.value;
    event.target.quote.value = '';
    store.dispatch(createAnecdote(content));
    store.dispatch(handleNotification(`you created '${content}'`));
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
