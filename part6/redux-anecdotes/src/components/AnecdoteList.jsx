import { useSelector } from 'react-redux';
import store from '../store';
import { addVote } from '../reducers/anecdoteReducer';
import { handleNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, quotes }) => {
    if (filter === '') {
      return [...quotes].sort((a, b) => b.votes - a.votes);
    } else {
      return quotes.filter((quote) => quote.content.includes(filter));
    }
  });

  const vote = (id) => {
    console.log('vote', id);
    store.dispatch(addVote(id));
    store.dispatch(
      handleNotification(
        `you voted '${anecdotes.find((a) => a.id === id).content}'`
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
