import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {

  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [showDetail, setShowDetail] = useState(null)

  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }
  useEffect(hook, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    setShowDetail(null)
  }

  return (
    <div>
      find countries:
        <input
        value={newFilter}
        onChange={handleFilterChange}
        />
      <Countries countries={countries} newFilter={newFilter} showDetail={showDetail} setShowDetail={setShowDetail}/>
    </div>
  )
}

export default App
