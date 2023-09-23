import StatisticsLine from './StatisticsLine';

const Statistics = (props) => {
  if (props.bad !== 0 || props.good !== 0 || props.neutral !== 0) {
    return (
      <>
        <h2>Statistics</h2>
        <table>
          <tbody>
            <StatisticsLine text="Good" value={props.good} />
            <StatisticsLine text="Neutral" value={props.neutral} />
            <StatisticsLine text="Bad" value={props.bad} />
            <StatisticsLine
              text="All"
              value={props.good + props.neutral + props.bad}
            />
            <StatisticsLine
              text="Average"
              value={
                (props.good * 1 + props.neutral * 0 + props.bad * -1) /
                (props.good + props.neutral + props.bad)
              }
            />
            <StatisticsLine
              text="Positive"
              value={
                (props.good / (props.good + props.neutral + props.bad)) * 100
              }
            />
          </tbody>
        </table>
      </>
    );
  } else {
    return (
      <>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </>
    );
  }
};

export default Statistics;
