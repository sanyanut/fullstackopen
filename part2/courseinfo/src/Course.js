const Header = ({course}) => {
    return (
        <h2>{course.name}</h2>
    )
  }
  
const Part = ({ name, exercises}) => {
    return (
        <p>
            {name} {exercises}
        </p>
    )
  }
  
const Content = ({course}) => {
    const {parts} = course;
    const total = parts.reduce((s, p) => s + p.exercises, 0)
  
    return (
        <div>
          {parts.map(item => 
            <Part 
              key={item.id} 
              name={item.name}
              exercises={item.exercises}
            />
          )}
          <p>total of <strong>{total}</strong> exercises</p>
        </div>
    )
  }
  
export const Course = ({courses}) => {
    return (
      <>
        {courses.map(course => (
          <div key={course.id}>
            <Header course={course} />
            <Content course={course} />
          </div>
        ))}
      </>
    )
  }