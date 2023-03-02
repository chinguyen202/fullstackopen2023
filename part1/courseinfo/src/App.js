const Header = (props) => {
  return (
    <div>
      <h1>{props.text}</h1>
    </div>
  );
};

const Content = (props) => {
  return (
    <div>
      <p>
        {props.firstText} {props.firstNum}
      </p>
      <p>
        {props.secondText} {props.secondNum}
      </p>
      <p>
        {props.thirdText} {props.thirdNum}
      </p>
    </div>
  );
};

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.num}</p>
    </div>
  );
};

const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  return (
    <div>
      <Header text={course} />
      <Content
        firstText={part1}
        firstNum={exercises1}
        secondText={part2}
        secondNum={exercises2}
        thirdText={part3}
        thirdNum={exercises3}
      />
      <Total num={exercises1 + exercises2 + exercises3} />
    </div>
  );
};

export default App;
