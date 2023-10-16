import { useDispatch, useSelector } from 'react-redux';
import { voteQuote } from '../reducers/anecdoteReducer';
import { handleNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ filter, quotes }) => {
    if (filter === '') {
      return [...quotes].sort((a, b) => b.votes - a.votes);
    } else {
      return quotes.filter((quote) => quote.content.includes(filter));
    }
  });

  const vote = (id) => {
    console.log('vote', id);
    dispatch(voteQuote(id));
    dispatch(
      handleNotification(
        `you voted '${anecdotes.find((a) => a.id === id).content}'`,
        5000
      )
    );
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
