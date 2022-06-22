const Person = ({name, number, removePerson}) => {
    return (
        <div style={{display: 'flex' }}>
            <p>{name} {number}</p>
            <button onClick={removePerson}>delete</button>
        </div>
    )
}

const Persons = ({persons, filterValue, removePerson}) => (
    persons
        .filter(person => person.name.toLowerCase()
        .indexOf(filterValue.toLowerCase()) > -1 || filterValue === '')
        .map(person => 
            <Person 
                key={person.id}
                id={person.id} 
                name={person.name} 
                number={person.number}
                removePerson={() => removePerson(person.id)}
            />)
)
export default Persons;