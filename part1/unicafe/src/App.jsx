import { useState } from 'react';

const Statistics = (props) => {
  return (
    <>
      <h2>Statistics</h2>
      <p>Good: {props.good}</p>
      <p>Neutral: {props.neutral}</p>
      <p>Bad: {props.bad}</p>
      <p>All: {props.good + props.neutral + props.bad}</p>
      <p>
        Average:{' '}
        {(props.good * 1 + props.neutral * 0 + props.bad * -1) /
          (props.good + props.neutral + props.bad)}
      </p>
      <p>
        Positive:{' '}
        {(props.good / (props.good + props.neutral + props.bad)) * 100}%
      </p>
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <div>
        <h2>Give feedback</h2>
        <button onClick={() => setGood(good + 1)}>Good</button>
        <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
        <button onClick={() => setBad(bad + 1)}>Bad</button>
      </div>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </>
  );
};

export default App;
