import { useDispatch } from 'react-redux';
import { createQuote } from '../reducers/anecdoteReducer';
import { handleNotification } from '../reducers/notificationReducer.js';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.quote.value;
    event.target.quote.value = '';
    dispatch(createQuote(content));
    dispatch(handleNotification(`you created '${content}'`, 5000));
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
