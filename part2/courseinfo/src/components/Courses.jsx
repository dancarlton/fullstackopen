const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </div>
)

const Header = ({ heading }) => <h3>{heading}</h3>

const Total = ({ parts }) => {
  const totalExcercises = parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <p>
      <strong>total of {totalExcercises} exercises</strong>
    </p>
  )
}

const Courses = ({ courses }) => (
  <>
    <h2>Web development curriculum</h2>
    {courses.map((course) => (
      <div key={course.id}>
        <Header heading={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    ))}
  </>
)

export default Courses
