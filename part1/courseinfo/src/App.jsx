const Header = (course) => {
  return (
    <div>
      <h1>{course.course}</h1>
    </div>
  );
};

const Content = () => {
  return (
    <div>
      <Part part='Fundamentals of React' exercises={10} />
      <Part part='Using props to pass data' exercises={7} />
      <Part part='State of a component' exercises={14} />
    </div>
  );
};

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.exercises}
      </p>
    </div>
  );
};

const Total = () => {
  const exercises1 = 10;
  const exercises2 = 7;
  const exercises3 = 14;

  return (
    <div>
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </div>
  );
};

const App = () => {
  const course = 'Half Stack application development';

  return (
    <div>
      <Header course={course} />
      <Content />
      <Total />
    </div>
  );
};

export default App;
