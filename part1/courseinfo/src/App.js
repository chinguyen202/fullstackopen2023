const Header = (props) => {
  return (
    <div>
      <h1>{props.text}</h1>
    </div>
  );
};
const Part = (props) => {
  return (
    <div>
      <p>
        {props.text} {props.num}
      </p>
    </div>
  );
};
const Content = (props) => {
  return (
    <div>
      <Part text={props.part1} num={props.exercise1} />
      <Part text={props.part3} num={props.exercise2} />
      <Part text={props.part3} num={props.exercise3} />
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
        part1={part1}
        exercise1={exercises1}
        part2={part2}
        exercise2={exercises2}
        part3={part3}
        exercise3={exercises3}
      />
      <Total num={exercises1 + exercises2 + exercises3} />
    </div>
  );
};

export default App;
