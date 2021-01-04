import React from 'react'

const Person = ({person}) => {
  return (
    <div>{person.name} {person.number}</div>
  )
}

const Persons = ({persons, newFilter}) => {
  const filteredPersons = persons.map(
    person => {
    if (person.name.toLowerCase().includes(newFilter.toLowerCase())) {
      return (<Person key={person.name} person={person}/>)
    }
    return null
    }
  )
  return filteredPersons
}

export default Persons