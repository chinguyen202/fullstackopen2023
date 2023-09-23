const StatisticsLine = (props) => {
  if (props.text.toLowerCase() === 'positive') {
    return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value} %</td>
      </tr>
    );
  } else {
    return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    );
  }
};

export default StatisticsLine;
