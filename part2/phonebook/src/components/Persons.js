import React from 'react'
import personService from '../services/persons'

const Person = ({person, setPersons, persons, setNotificationMessage}) => {
  const deleteButton = () => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(person.id)
        .then(() => {
          const newPersons = persons.filter(pers => pers.id !== person.id)
          setPersons(newPersons)
          setNotificationMessage({message:`Deleted ${person.name}`, type:'notification'})
          setTimeout(() => {
            setNotificationMessage({message: null, type: null})
          }, 5000)
        })
        .catch(() => {
          setNotificationMessage({message:`Information of ${person.name} has already been removed from server`, type:'error'})
          setTimeout(() => {
            setNotificationMessage({message: null, type: null})
          }, 5000)
          setPersons(persons.filter(pers => pers.id !== person.id))
        })
    }
  }
  return (
    <div>{person.name} {person.number} <button onClick={deleteButton}>delete</button></div>
  )
}

const Persons = ({persons, newFilter, setPersons, setNotificationMessage }) => {
  const filteredPersons = persons.map(
    person => {
    if (person.name.toLowerCase().includes(newFilter.toLowerCase())) {
      return (<Person
                key={person.name}
                person={person}
                setPersons={setPersons}
                persons={persons}
                setNotificationMessage={setNotificationMessage}
              />)
    }
    return null
    }
  )
  return filteredPersons
}

export default Persons