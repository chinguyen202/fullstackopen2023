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

  const [selected, setSelected] = useState(0);
  const getRandomArbitrary = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length - 1));

  const copy = [...points];
  const handleVote = () => {
    console.log(`Vote on ${selected}`);
    copy[selected] += 1;
    setPoints(copy);
  };
  const findMostVoted = (array) => {
    let max = array[0];
    for (let i = 1; i < array.length; i++) {
      if (array[i] > max) {
        max = array[i];
      }
    }
    return max;
  };

  return (
    <>
      <div>
        <h2>Anecdote of the day</h2>
        <p>{anecdotes[selected]}</p>
      </div>
      <p>has {points[selected]} votes</p>
      <button onClick={handleVote}>Vote</button>
      <button
        onClick={() => setSelected(getRandomArbitrary(0, anecdotes.length - 1))}
      >
        Next anecdote
      </button>
      <div>
        <h2>Anecdote with most votes</h2>
        <p>{anecdotes[findMostVoted(points)]}</p>
        <p>has {findMostVoted(points)} votes</p>
      </div>
    </>
  );
};

export default App;
