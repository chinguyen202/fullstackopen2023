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
      <Part text={props.part1.name} num={props.part1.exercises} />
      <Part text={props.part2.name} num={props.part2.exercises} />
      <Part text={props.part3.name} num={props.part3.exercises} />
    </div>
  );
};

const Total = (props) => {
  return (
    <div>
      <p>
        Number of exercises{' '}
        {props.part1.exercises + props.part2.exercises + props.part3.exercises}
      </p>
    </div>
  );
};

const App = () => {
  const course = 'Half Stack application development';
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10,
  };
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7,
  };
  const part3 = {
    name: 'State of a component',
    exercises: 14,
  };

  return (
    <div>
      <Header text={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total part1={part1} part2={part2} part3={part3} />
    </div>
  );
};

export default App;
