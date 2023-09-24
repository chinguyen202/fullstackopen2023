const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => <p>Total of {sum} exercises </p>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((item, index) => (
      <Part key={index} part={item} />
    ))}
  </>
);

const Course = ({ course }) => {
  const sum = course.parts.reduce((total, part) => total + part.exercises, 0);

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={sum} />
    </>
  );
};

export default Course;
