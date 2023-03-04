import { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];

  const points = new Uint8Array(anecdotes.length);
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState([...points]);

  const getRandom = () => {
    let random = Math.floor(Math.random() * anecdotes.length);
    do {
      return random;
    } while (random !== selected);
  };

  const addVote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  const displayMostVote = () => {
    const mostVote = Math.max(...votes);
    // console.log(mostVote);
    // console.log(votes);
    if (mostVote === 0) {
      return <p> No vote yet. Please vote!</p>;
    } else {
      const index = votes.indexOf(mostVote);
      return (
        <>
          <p>{anecdotes[index]}</p>
          <p>has {votes[index]} votes</p>
        </>
      );
    }
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={addVote}>Vote</button>
      <button onClick={() => setSelected(getRandom())}>Next anecdotes</button>
      <h1>Anecdote with most votes</h1>
      {displayMostVote()}
    </div>
  );
};

export default App;
