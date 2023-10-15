import { useSelector } from 'react-redux';
import { store } from '../index';
import { addVote } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    console.log('STATE', state);
    if (state.filter === '') {
      return state.quotes.sort((a, b) => b.votes - a.votes);
    } else {
      return state.quotes.filter((quote) =>
        quote.content.includes(state.filter)
      );
    }
  });

  const vote = (id) => {
    console.log('vote', id);
    store.dispatch(addVote(id));
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
