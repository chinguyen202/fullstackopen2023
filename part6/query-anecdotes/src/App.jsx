import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { getQuotes, updateQuote } from './requests';

const App = () => {
  const queryClient = useQueryClient();
  const addVoteMutation = useMutation(updateQuote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes');
    },
  });

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getQuotes,
    refetchOnWindowFocus: false,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  const anecdotes = result.data;
  const handleVote = (anecdote) => {
    console.log('vote', anecdote);
    addVoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
