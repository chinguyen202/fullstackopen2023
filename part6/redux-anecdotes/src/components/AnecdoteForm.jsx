import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { handleNotification } from '../reducers/notificationReducer.js';
import anecdotes from '../services/anecdotes';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.quote.value;
    event.target.quote.value = '';
    const newQuote = await anecdotes.createNew(content);
    dispatch(createAnecdote(newQuote));
    dispatch(handleNotification(`you created '${content}'`));
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
