import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({country}) => {
  return (
    <div>{country.name}</div>
  )
}

const CountryDetail = ({country}) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h3>languages</h3>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt={`flag of ${country.name}`} width="20%"></img>
    </div>
  )
}

const Countries = ({countries, newFilter}) => {
  const filteredCountries = countries
    .filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))

  if (filteredCountries.length > 10) {
    return (<div>Too many matches, specify another filter</div>)
  } else if (filteredCountries.length > 1) {
    return filteredCountries.map(country => <Country key={country.name} country={country}/>)
  } else if (filteredCountries.length === 1) {
    return <CountryDetail key={filteredCountries[0].name} country={filteredCountries[0]}/>
  } else {
    return null
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [ newFilter, setNewFilter ] = useState('')

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
  }

  return (
    <div>
      find countries:
        <input
        value={newFilter}
        onChange={handleFilterChange}
        />
      <Countries countries={countries} newFilter={newFilter} />
    </div>
  )
}

export default App
