const Header = ({ course }) => <h2>{course}</h2>;

const Total = ({ sum }) => <p>Number of exercises {sum}</p>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) =>
  parts.map((part, id) => <Part key={id} part={part} />);

export const Course = ({ course }) => {
  let sum = 0;
  for (let i = 0; i < course.parts.length; i++) {
    sum += course.parts[i].exercises;
  }
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={sum} />
    </>
  );
};
