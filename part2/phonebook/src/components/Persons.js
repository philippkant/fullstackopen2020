import React from 'react'
import personService from '../services/persons'

const Person = ({person, setPersons, persons}) => {
  const deleteButton = () => {
    personService
      .deletePerson(person.id)
      .then(() => {
        const newPersons = persons.filter(pers => pers.id !== person.id)
        setPersons(newPersons)
      })
  }
  return (
    <div>{person.name} {person.number} <button onClick={deleteButton}>delete</button></div>
  )
}

const Persons = ({persons, newFilter, setPersons}) => {
  const filteredPersons = persons.map(
    person => {
    if (person.name.toLowerCase().includes(newFilter.toLowerCase())) {
      return (<Person key={person.name} person={person} setPersons={setPersons} persons={persons}/>)
    }
    return null
    }
  )
  return filteredPersons
}

export default Persons