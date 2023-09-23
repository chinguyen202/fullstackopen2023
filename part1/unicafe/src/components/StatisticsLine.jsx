const StatisticsLine = (props) => {
  if (props.text.toLowerCase() === 'positive') {
    return (
      <p>
        {props.text}: {props.value}%
      </p>
    );
  } else {
    return (
      <p>
        {props.text}: {props.value}
      </p>
    );
  }
};

export default StatisticsLine;
