import { useState } from 'react';
const StatisticLine = (props) => {
  return (
    <div>
      <p>
        {props.text} {props.value}
      </p>
    </div>
  );
};
const Statistics = (props) => {
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
        <StatisticLine text="Good" value={props.good} />
        <StatisticLine text="Neutral" value={props.neutral} />
        <StatisticLine text="Bad" value={props.bad} />
        <StatisticLine text="Total" value={total} />
        <StatisticLine
          text="Average"
          value={(props.good * 1 + props.bad * -1) / 3}
        />
        <StatisticLine text="Positive" value={(100 * props.good) / total} />
      </div>
    );
  }
};

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
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
        <Button text="Good" handleClick={() => setGood(good + 1)} />
        <Button text="Neutral" handleClick={() => setNeutral(neutral + 1)} />
        <Button text="Bad" handleClick={() => setBad(bad + 1)} />
      </div>

      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
