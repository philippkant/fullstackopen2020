import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'


const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ notificationMessage, setNotificationMessage ] = useState(null)


  const hook = () => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }
  
  useEffect(hook, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage}/>
      <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
      <h3>add a new</h3>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        setNotificationMessage={setNotificationMessage}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        newFilter={newFilter}
        setPersons={setPersons}
        setNotificationMessage={setNotificationMessage}
      />
    </div>
  )
}

export default App