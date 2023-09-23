const Total = (props) => {
  return (
    <>
      <p>
        Number of exercises{' '}
        {props.parts[0].exercises1 +
          props.parts[1].exercises2 +
          props.parts[2].exercises3}
      </p>
    </>
  );
};

export default Total;
