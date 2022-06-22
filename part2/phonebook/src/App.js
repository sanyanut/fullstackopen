import { useState, useEffect } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import personsService from './services/persons';

const Notification = ({message, isError}) => {
  if(message === null) {
    return null
  }
  return (
    <div className={`${isError ? 'error notification' : 'notification'}`}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [notification, setNotification] = useState('');
  const [error, setError] = useState(false);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value)
  }

  const handleNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 5000)
  }

  const handleDeletePerson = (id) => {
    const personObj = persons.find(person => person.id === id)
    const {name} = personObj;

    if(window.confirm(`Delete ${name} ?`)) {
      personsService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    } else {
      return null;
    }
    
  }

  const handleAddPerson = (event) => {
    event.preventDefault();
    const nameObj = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    if(persons.some(el => el.name === newName)) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const findId = persons
          .filter(person => person.name === newName)
          .map(person => person.id)[0];

        const specificPerson = persons.find(person => person.id === findId)

        const changedPerson = {...specificPerson, number: newNumber}

        personsService
          .update(findId, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== findId ? person : returnedPerson))
          })
          .catch(error => {
            setError(true)
            setPersons(persons.filter(person => person.id !== findId))
            handleNotification(`Information of ${changedPerson.name} has already been removed from server`)
          })

      } else {
        return null;
      }
    } else {
      personsService
        .create(nameObj)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
          setError(false);
          handleNotification(`Added ${returnedPerson.name}`);
        })
    }
  }

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      {notification ? <Notification message={notification} isError={error} /> : null}
      <Filter value={filterValue} onChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm 
        nameValue={newName} 
        numberValue={newNumber}
        nameChange={handleNameChange}
        numberChange={handleNumberChange}
        addPerson={handleAddPerson}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filterValue={filterValue} removePerson={handleDeletePerson} />
    </div>
  )
}

export default App