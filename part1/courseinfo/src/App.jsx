const Header = (course) => {

  return (
    <div>
      <h1>{course.course}</h1>
    </div>
  )
}

const Content = () => {
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <p>
        {part1} {exercises1}
      </p>
      <p>
        {part2} {exercises2}
      </p>
      <p>
        {part3} {exercises3}
      </p>

    </div>
  )
}

const Total = () => {
  const exercises1 = 10
  const exercises2 = 7
  const exercises3 = 14

  return (
  <div>
    <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
  </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'

  return (
    <div>
      <Header course={course} />
      <Content />
      <Total />
    </div>
  )
}

export default App
