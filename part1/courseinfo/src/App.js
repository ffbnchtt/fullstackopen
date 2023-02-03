const Header = ({ course }) => <h1>{course.name}</h1>;

const Part = ({ part, exercises }) => <p>{part} {exercises}</p>

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => <Part key="" part={part.name} exercises={part.exercises} />)}
    </div>
  )
}

const Total = ({ parts }) => {
  let total = parts.map(part => part.exercises).reduce((a, b) => a + b)
  return (
    <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App