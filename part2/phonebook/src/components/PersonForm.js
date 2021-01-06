import React from 'react'
import axios from 'axios'

const PersonForm = ({persons, setPersons, newName, setNewName, newNumber, setNewNumber}) => {
  const addName = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }

    axios
    .post('http://localhost:3001/persons', newPerson)
    .then(response => {
      if (persons.some(person => person.name === newName)) {
        window.alert(`${newName} is already added to phonebook`)
      }
      else {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      }
    })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <form onSubmit={addName}>
        <div>
          name:
          <input
          value={newName}
          onChange={handleNameChange}
          />
        </div>
        <div>
          number:
          <input
          value={newNumber}
          onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

export default PersonForm