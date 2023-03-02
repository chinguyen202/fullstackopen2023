import { useState } from 'react';
const Statistics = (props) => {
  console.log(props);
  const total = props.good + props.neutral + props.bad;
  if (total === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Statistics</h1>
        <p>Good {props.good}</p>
        <p>Neutral {props.neutral}</p>
        <p>Bad {props.bad}</p>
        <p>Total {total}</p>
        <p>Average {(props.good * 1 + props.bad * -1) / 3}</p>
        <p>Positive {(100 * props.good) / total}</p>
      </div>
    );
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <button onClick={() => setGood(good + 1)}>Good</button>
        <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
        <button onClick={() => setBad(bad + 1)}>Bad</button>
      </div>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
