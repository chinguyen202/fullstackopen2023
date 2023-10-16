import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createQuote } from '../requests';
import { useNotificationDispatch } from '../NotificationContext';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();
  const newQuoteMutation = useMutation(createQuote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes');
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    newQuoteMutation.mutate(
      { content, votes: 0 },
      {
        onSuccess: () => {
          dispatch({
            type: 'SHOW',
            data: `you created a quote '${content}'`,
          });
          setTimeout(() => {
            dispatch({ type: 'HIDE' });
          }, 5000);
        },
        onError: () => {
          dispatch({
            type: 'SHOW',
            data: `The anecdote must have length 5 or more`,
          });
          setTimeout(() => {
            dispatch({ type: 'HIDE' });
          }, 5000);
        },
      }
    );
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
